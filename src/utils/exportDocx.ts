import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Packer,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from 'docx';
import { saveAs } from 'file-saver';
import type { GeneratedMinutes, Teacher } from '../types';
import {
  formatDateTr,
  lowercaseSentenceStartTr,
  toSignatureNameTr
} from './textFormat';

const font = 'Times New Roman';
// Punto değerleri yarım punto cinsindendir: 24 → 12 punto.
const BODY_SIZE = 24;
const TABLE_SIZE = 22;
const NOTE_SIZE = 18;
// 1,5 cm kenar boşluğu (1 cm ≈ 567 twip).
const PAGE_MARGIN = 850;
const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

type Block = Paragraph | Table;

const cell = (text: string, opts?: { bold?: boolean; center?: boolean; width?: number }) =>
  new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: opts?.bold, size: TABLE_SIZE, font })],
      alignment: opts?.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      indent: opts?.center ? undefined : { left: 100 },
      spacing: { before: 140, after: 140 }
    })],
    width: opts?.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    borders: { top: border, bottom: border, left: border, right: border },
    verticalAlign: 'center' as never
  });

const sectionHeading = (text: string): Paragraph =>
  new Paragraph({
    children: [new TextRun({ text, bold: true, size: BODY_SIZE, font })],
    spacing: { before: 300, after: 150 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' } }
  });

const branchLabel = (teacher: Teacher): string =>
  teacher.isClassTeacher ? `${teacher.branch} (Sınıf Rehber Öğretmeni)` : teacher.branch;

const titledName = (title: string, name: string): string =>
  `${title} ${toSignatureNameTr(name)}`.trim();

export const exportToDocx = async (minutes: GeneratedMinutes, filename: string): Promise<void> => {
  const { meetingInfo } = minutes;
  const children: Block[] = [];
  const createPageNumberFooter = () => new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            children: ['Sayfa ', PageNumber.CURRENT],
            size: NOTE_SIZE,
            font
          })
        ]
      })
    ]
  });

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Bu belge bir taslaktır. Gerçek toplantı içeriğiyle doğrulanmadan imzalanmamalıdır.',
          italics: true,
          size: NOTE_SIZE,
          font
        })
      ],
      spacing: { after: 200 }
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: minutes.title, bold: true, size: 28, font })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 500 },
    })
  );

  const infoFields = [
    { label: 'Okul Adı', value: meetingInfo.schoolName },
    { label: 'Eğitim Yılı', value: meetingInfo.academicYear },
    { label: 'Dönem', value: meetingInfo.term },
    { label: 'Tarih / Saat', value: `${formatDateTr(meetingInfo.date)} - ${meetingInfo.time}` },
    { label: 'Yer', value: meetingInfo.location },
    { label: 'Sınıf', value: meetingInfo.className },
    { label: 'Kurul Başkanı', value: toSignatureNameTr(meetingInfo.chairpersonName) || '—' },
  ];

  for (const field of infoFields) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${field.label}: `, bold: true, size: BODY_SIZE, font }),
          new TextRun({ text: field.value, size: BODY_SIZE, font }),
        ],
        spacing: { before: 100, after: 140 },
      })
    );
  }

  children.push(sectionHeading('Toplantıya Katılan Öğretmenler'));

  const attendanceHeaderRow = new TableRow({
    tableHeader: true,
    children: [
      cell('Sıra No', { bold: true, center: true, width: 15 }),
      cell('Adı Soyadı', { bold: true, center: true, width: 45 }),
      cell('Branşı', { bold: true, center: true, width: 40 }),
    ],
  });

  const attendanceRows = minutes.teachers.map((teacher, index) =>
    new TableRow({
      children: [
        cell(`${index + 1}`, { center: true }),
        cell(toSignatureNameTr(teacher.fullName)),
        cell(branchLabel(teacher)),
      ],
    })
  );

  children.push(
    new Table({
      rows: [attendanceHeaderRow, ...attendanceRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  children.push(sectionHeading('Gündem Maddeleri'));

  minutes.agendaSummary.forEach((title, index) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `${index + 1}. ${title}`, size: BODY_SIZE, font })],
        spacing: { after: 60 }
      })
    );
  });

  const agendaChildren: Block[] = [];

  agendaChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'GÜNDEM MADDELERİ VE GÖRÜŞMELER', bold: true, size: 26, font })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
      }
    })
  );

  for (const agenda of minutes.agendaMinutes) {
    agendaChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${agenda.agendaNumber}. ${agenda.agendaTitle}`, bold: true, size: BODY_SIZE, font })
        ],
        spacing: { before: 300, after: 150 },
        keepNext: true,
      })
    );

    if (agenda.bodyText) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: agenda.bodyText, size: BODY_SIZE, font }),
          ],
          spacing: { after: 120 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }

    for (const speech of agenda.speeches) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${speech.branch} Öğretmeni ${speech.teacherName}`, bold: true, size: BODY_SIZE, font }),
            new TextRun({ text: `, ${lowercaseSentenceStartTr(speech.content)}`, size: BODY_SIZE, font }),
          ],
          spacing: { after: 120 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }

    if (agenda.decisions.length > 0) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Alınan Kararlar:', bold: true, size: BODY_SIZE, font })
          ],
          spacing: { before: 100, after: 80 },
          keepNext: true,
        })
      );

      for (const decision of agenda.decisions) {
        agendaChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Karar ${decision.number}: `, bold: true, size: BODY_SIZE, font }),
              new TextRun({ text: decision.text, size: BODY_SIZE, font }),
            ],
            spacing: { after: 40 },
            indent: { left: 360 },
            alignment: AlignmentType.JUSTIFIED,
            keepNext: true,
          })
        );
        agendaChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Sorumlu: ${decision.responsible} · İzleme: ${decision.followUp}`,
                size: 20,
                italics: true,
                font
              }),
            ],
            spacing: { after: 80 },
            indent: { left: 360 },
          })
        );
      }
    }
  }

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell('Sıra No', { bold: true, center: true, width: 10 }),
      cell('Adı Soyadı', { bold: true, center: true, width: 35 }),
      cell('Branşı', { bold: true, center: true, width: 30 }),
      cell('İmza', { bold: true, center: true, width: 25 }),
    ],
  });

  const teacherRows = minutes.teachers.map((teacher, index) =>
    new TableRow({
      cantSplit: true,
      children: [
        cell(`${index + 1}`, { center: true }),
        cell(toSignatureNameTr(teacher.fullName)),
        cell(branchLabel(teacher)),
        new TableCell({
          children: [new Paragraph({ text: '', spacing: { before: 350, after: 350 } })],
          borders: { top: border, bottom: border, left: border, right: border },
          verticalAlign: 'center' as never,
        }),
      ],
    })
  );

  const signatureChildren: Block[] = [
    new Paragraph({
      children: [new TextRun({ text: 'Toplantı Tutanağı İmza Tablosu', bold: true, size: BODY_SIZE, font })],
      spacing: { after: 200 }
    }),
    new Table({
      rows: [headerRow, ...teacherRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
    new Paragraph({ text: '', spacing: { before: 400 } }),
    new Paragraph({
      children: [new TextRun({ text: 'Kurul Başkanı', bold: true, size: BODY_SIZE, font })],
      spacing: { after: 120 },
      keepNext: true,
    }),
    new Paragraph({
      children: [new TextRun({
        text: toSignatureNameTr(meetingInfo.chairpersonName) || '________________',
        size: BODY_SIZE,
        font
      })],
      spacing: { after: 80 },
      keepNext: true,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'İmza: _______________', size: BODY_SIZE, font })],
      spacing: { after: 300 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Okul Müdürü Onayı', bold: true, size: BODY_SIZE, font })],
      spacing: { after: 120 },
      keepNext: true,
    }),
    new Paragraph({
      children: [new TextRun({
        text: titledName('Okul Müdürü', meetingInfo.principalName),
        size: BODY_SIZE,
        font
      })],
      spacing: { after: 80 },
      keepNext: true,
    }),
    new Paragraph({
      children: [new TextRun({
        text: `Tarih: ${formatDateTr(meetingInfo.date)}`,
        size: BODY_SIZE,
        font
      })],
      spacing: { after: 80 },
      keepNext: true,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'İmza / Onay: _______________', size: BODY_SIZE, font })]
    }),
  ];

  const pageProperties = {
    page: {
      margin: { top: PAGE_MARGIN, right: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN }
    }
  };

  const doc = new Document({
    creator: 'Şube Öğretmenler Kurulu Tutanak Oluşturucu',
    title: minutes.title,
    description: 'Şube öğretmenler kurulu toplantı tutanağı taslağı',
    // Word'ün yazım denetimi belgeyi Türkçe olarak ele alsın.
    styles: {
      default: {
        document: {
          run: { font, size: BODY_SIZE, language: { value: 'tr-TR' } }
        }
      }
    },
    sections: [
      {
        properties: pageProperties,
        footers: { default: createPageNumberFooter() },
        children,
      },
      {
        properties: pageProperties,
        footers: { default: createPageNumberFooter() },
        children: agendaChildren,
      },
      {
        properties: pageProperties,
        footers: { default: createPageNumberFooter() },
        children: signatureChildren,
      }
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = filename
    .trim()
    .replace(/[<>:"/\\|?*]/g, '_')
    .split('')
    .map(character => character.charCodeAt(0) < 32 ? '_' : character)
    .join('')
    .replace(/\s+/g, '_');
  saveAs(blob, `${safeFilename || 'SOK_Tutanagi'}.docx`);
};
