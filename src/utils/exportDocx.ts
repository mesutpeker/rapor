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
import type { GeneratedMinutes } from '../types';
import { formatDateTr, lowercaseSentenceStartTr } from './textFormat';

const font = 'Times New Roman';
const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

const cell = (text: string, opts?: { bold?: boolean; center?: boolean; width?: number }) =>
  new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: opts?.bold, size: 22, font })],
      alignment: opts?.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      indent: opts?.center ? undefined : { left: 100 },
      spacing: { before: 140, after: 140 }
    })],
    width: opts?.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    borders: { top: border, bottom: border, left: border, right: border },
    verticalAlign: 'center' as never
  });

export const exportToDocx = async (minutes: GeneratedMinutes, filename: string): Promise<void> => {
  const children: Paragraph[] = [];
  const createPageNumberFooter = () => new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            children: ['Sayfa ', PageNumber.CURRENT],
            size: 18,
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
          size: 18,
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

  children.push(new Paragraph({ text: '', spacing: { after: 200 } }));

  const infoFields = [
    { label: 'Okul Adı', value: minutes.meetingInfo.schoolName },
    { label: 'Eğitim Yılı', value: minutes.meetingInfo.academicYear },
    { label: 'Dönem', value: minutes.meetingInfo.term },
    { label: 'Tarih / Saat', value: `${formatDateTr(minutes.meetingInfo.date)} - ${minutes.meetingInfo.time}` },
    { label: 'Yer', value: minutes.meetingInfo.location },
    { label: 'Sınıf', value: minutes.meetingInfo.className },
    {
      label: 'Kurul Başkanı',
      value: `${minutes.meetingInfo.chairpersonTitle} ${minutes.meetingInfo.chairpersonName || ''}`.trim()
    },
    { label: 'Yazman', value: minutes.clerkName || '—' },
  ];

  for (const field of infoFields) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${field.label}: `, bold: true, size: 24, font }),
          new TextRun({ text: field.value, size: 24, font }),
        ],
        spacing: { before: 100, after: 140 },
      })
    );
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Toplantıya Katılan Öğretmenler', bold: true, size: 24, font })
      ],
      spacing: { before: 300, after: 150 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
      }
    })
  );

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
        cell(teacher.fullName),
        cell(teacher.branch),
      ],
    })
  );

  children.push(
    new Table({
      rows: [attendanceHeaderRow, ...attendanceRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }) as unknown as Paragraph
  );

  children.push(
    new Paragraph({
      children: [new TextRun({ text: 'Gündem Maddeleri', bold: true, size: 24, font })],
      spacing: { before: 300, after: 150 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' } }
    })
  );

  minutes.agendaSummary.forEach((title, index) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `${index + 1}. ${title}`, size: 22, font })],
        spacing: { after: 60 }
      })
    );
  });

  if (minutes.studentEvaluations.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'Öğrenci Değerlendirmesi', bold: true, size: 24, font })],
        spacing: { before: 300, after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' } }
      })
    );
    children.push(
      new Paragraph({
        children: [new TextRun({
          text: 'Kişisel veriler yalnızca eğitimsel ihtiyaç ve tedbir düzeyinde kaydedilmiştir.',
          italics: true,
          size: 18,
          font
        })],
        spacing: { after: 120 }
      })
    );

    const studentHeader = new TableRow({
      tableHeader: true,
      children: [
        cell('Öğrenci', { bold: true, center: true, width: 20 }),
        cell('Gözlem / İhtiyaç', { bold: true, center: true, width: 40 }),
        cell('Alınacak Tedbir', { bold: true, center: true, width: 40 }),
      ]
    });
    const studentRows = minutes.studentEvaluations.map(student =>
      new TableRow({
        children: [
          cell(student.studentLabel),
          cell(student.observation || '—'),
          cell(student.measure || '—'),
        ]
      })
    );
    children.push(
      new Table({
        rows: [studentHeader, ...studentRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
      }) as unknown as Paragraph
    );
  }

  const agendaChildren: Paragraph[] = [];

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
          new TextRun({ text: `${agenda.agendaNumber}. ${agenda.agendaTitle}`, bold: true, size: 24, font })
        ],
        spacing: { before: 300, after: 150 },
      })
    );

    if (agenda.bodyText) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: agenda.bodyText, size: 22, font }),
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
            new TextRun({ text: `${speech.branch} Öğretmeni ${speech.teacherName} `, bold: true, size: 22, font }),
            new TextRun({ text: lowercaseSentenceStartTr(speech.content), size: 22, font }),
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
            new TextRun({ text: 'Alınan Kararlar:', bold: true, size: 22, font })
          ],
          spacing: { before: 100, after: 80 },
        })
      );

      for (const decision of agenda.decisions) {
        agendaChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `• ${decision.text}`, size: 22, font }),
            ],
            spacing: { after: 40 },
            indent: { left: 360 },
          })
        );
        agendaChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Sorumlu: ${decision.responsible} · İzleme: ${decision.followUp}`,
                size: 18,
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
      children: [
        cell(`${index + 1}`, { center: true }),
        cell(teacher.fullName),
        cell(teacher.branch),
        new TableCell({
          children: [new Paragraph({ text: '', spacing: { before: 350, after: 350 } })],
          borders: { top: border, bottom: border, left: border, right: border },
          verticalAlign: 'center' as never,
        }),
      ],
    })
  );

  const signatureChildren: (Paragraph | Table)[] = [
    new Paragraph({
      children: [new TextRun({ text: 'Toplantı Tutanağı İmza Tablosu', bold: true, size: 24, font })],
      spacing: { after: 200 }
    }),
    new Table({
      rows: [headerRow, ...teacherRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
    new Paragraph({ text: '', spacing: { before: 400 } }),
    new Paragraph({
      children: [new TextRun({ text: 'Kurul Başkanı', bold: true, size: 22, font })],
      spacing: { after: 120 }
    }),
    new Paragraph({
      children: [new TextRun({
        text: `${minutes.meetingInfo.chairpersonTitle} ${minutes.meetingInfo.chairpersonName || ''}`.trim(),
        size: 22,
        font
      })],
      spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'İmza: _______________', size: 22, font })],
      spacing: { after: 300 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Okul Müdürü Onayı', bold: true, size: 22, font })],
      spacing: { after: 120 }
    }),
    new Paragraph({
      children: [new TextRun({
        text: `Okul Müdürü ${minutes.meetingInfo.principalName || ''}`.trim(),
        size: 22,
        font
      })],
      spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({
        text: `Tarih: ${formatDateTr(minutes.meetingInfo.date)}`,
        size: 22,
        font
      })],
      spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'İmza / Onay: _______________', size: 22, font })]
    }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        footers: { default: createPageNumberFooter() },
        children: children,
      },
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        footers: { default: createPageNumberFooter() },
        children: agendaChildren,
      },
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        footers: { default: createPageNumberFooter() },
        children: signatureChildren as Paragraph[],
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
