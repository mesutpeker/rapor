import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, TableRow, TableCell, Table, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import type { GeneratedMinutes } from '../types';

export const exportToDocx = async (minutes: GeneratedMinutes, filename: string): Promise<void> => {
  const children: Paragraph[] = [];

  // Başlık
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: minutes.title, bold: true, size: 28, font: 'Times New Roman' })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 500 },
    })
  );

  children.push(new Paragraph({ text: '', spacing: { after: 300 } }));

  // Toplantı Bilgileri
  const infoFields = [
    { label: 'Okul Adı', value: minutes.meetingInfo.schoolName },
    { label: 'Eğitim Yılı', value: minutes.meetingInfo.academicYear },
    { label: 'Dönem', value: minutes.meetingInfo.term },
    { label: 'Tarih / Saat', value: `${minutes.meetingInfo.date} - ${minutes.meetingInfo.time}` },
    { label: 'Yer', value: minutes.meetingInfo.location },
    { label: 'Sınıf', value: minutes.meetingInfo.className },
  ];

  for (const field of infoFields) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${field.label}: `, bold: true, size: 24, font: 'Times New Roman' }),
          new TextRun({ text: field.value, size: 24, font: 'Times New Roman' }),
        ],
        spacing: { before: 100, after: 140 },
      })
    );
  }

  // Katılan Öğretmenler Tablosu
  const attendanceTableBorder = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Toplantıya Katılan Öğretmenler', bold: true, size: 24, font: 'Times New Roman' })
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
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Sıra No', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 15, type: WidthType.PERCENTAGE },
        borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
        verticalAlign: 'center' as never,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Adı Soyadı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 45, type: WidthType.PERCENTAGE },
        borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
        verticalAlign: 'center' as never,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Branşı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 40, type: WidthType.PERCENTAGE },
        borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
        verticalAlign: 'center' as never,
      }),
    ],
  });

  const attendanceRows = minutes.attendingTeachers.map((teacher, index) =>
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}`, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 140, after: 140 } })],
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: teacher.fullName, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: teacher.branch, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
      ],
    })
  );

  children.push(
    new Table({
      rows: [attendanceHeaderRow, ...attendanceRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }) as unknown as Paragraph
  );

  // Katılmayan Öğretmenler Tablosu
  if (minutes.absentTeachers.length > 0) {
    children.push(new Paragraph({ text: '', spacing: { after: 300 } }));
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Toplantıya Katılmayan Öğretmenler', bold: true, size: 24, font: 'Times New Roman' })
        ],
        spacing: { before: 300, after: 150 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
        }
      })
    );

    const absentHeaderRow = new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Sıra No', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
          width: { size: 15, type: WidthType.PERCENTAGE },
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Adı Soyadı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
          width: { size: 45, type: WidthType.PERCENTAGE },
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Branşı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
          width: { size: 40, type: WidthType.PERCENTAGE },
          borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
          verticalAlign: 'center' as never,
        }),
      ],
    });

    const absentRows = minutes.absentTeachers.map((teacher, index) =>
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}`, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 140, after: 140 } })],
            borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
            verticalAlign: 'center' as never,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: teacher.fullName, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
            borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
            verticalAlign: 'center' as never,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: teacher.branch, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
            borders: { top: attendanceTableBorder, bottom: attendanceTableBorder, left: attendanceTableBorder, right: attendanceTableBorder },
            verticalAlign: 'center' as never,
          }),
        ],
      })
    );

    children.push(
      new Table({
        rows: [absentHeaderRow, ...absentRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
      }) as unknown as Paragraph
    );
  }

  // Gündem Maddeleri ayrı sayfada başlayacak (agendaChildren olarak ayrı section)
  const agendaChildren: Paragraph[] = [];

  // Gündem Maddeleri ve Görüşmeler Başlığı
  agendaChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'GÜNDEM MADDELERİ VE GÖRÜŞMELER', bold: true, size: 26, font: 'Times New Roman' })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
      }
    })
  );

  // Her gündem maddesi
  for (const agenda of minutes.agendaMinutes) {
    // Gündem başlığı
    agendaChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${agenda.agendaNumber}. ${agenda.agendaTitle}`, bold: true, size: 24, font: 'Times New Roman' })
        ],
        spacing: { before: 300, after: 150 },
      })
    );

    // Açılış / kapanış gibi maddelerin düz anlatı metni
    if (agenda.bodyText) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: agenda.bodyText, size: 22, font: 'Times New Roman' }),
          ],
          spacing: { after: 120 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }

    // Konuşmalar
    for (const speech of agenda.speeches) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${speech.branch} Öğretmeni ${speech.teacherName}: `, bold: true, size: 22, font: 'Times New Roman' }),
            new TextRun({ text: speech.content, size: 22, font: 'Times New Roman' }),
          ],
          spacing: { after: 120 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }

    // Kararlar
    if (agenda.decisions.length > 0) {
      agendaChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Alınan Kararlar:', bold: true, size: 22, font: 'Times New Roman' })
          ],
          spacing: { before: 100, after: 80 },
        })
      );

      for (const decision of agenda.decisions) {
        agendaChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `• ${decision}`, size: 22, font: 'Times New Roman' }),
            ],
            spacing: { after: 60 },
            indent: { left: 360 },
          })
        );
      }
    }
  }

  // İmza tablosu
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

  // Başlık satırı
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Sıra No', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 10, type: WidthType.PERCENTAGE },
        borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
        verticalAlign: 'center' as never,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Adı Soyadı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 35, type: WidthType.PERCENTAGE },
        borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
        verticalAlign: 'center' as never,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'Branşı', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 30, type: WidthType.PERCENTAGE },
        borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
        verticalAlign: 'center' as never,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: 'İmza', bold: true, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 180, after: 180 } })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
        verticalAlign: 'center' as never,
      }),
    ],
  });

  // Öğretmen satırları
  const teacherRows = minutes.attendingTeachers.map((teacher, index) =>
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}`, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 140, after: 140 } })],
          borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: teacher.fullName, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
          borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: teacher.branch, size: 22, font: 'Times New Roman' })], alignment: AlignmentType.LEFT, indent: { left: 100 }, spacing: { before: 140, after: 140 } })],
          borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
          verticalAlign: 'center' as never,
        }),
        new TableCell({
          children: [new Paragraph({ text: '', spacing: { before: 350, after: 350 } })],
          borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
          verticalAlign: 'center' as never,
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        // Sayfa 1: Toplantı bilgileri + Katılan/Katılmayan Öğretmenler tablosu
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        children: children,
      },
      {
        // Sayfa 2+: Gündem Maddeleri ve Görüşmeler (yeni sayfada başlar)
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        children: agendaChildren,
      },
      {
        // Son sayfa: İmza tablosu
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 }
          }
        },
        children: [
          new Table({
            rows: [headerRow, ...teacherRows],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }) as unknown as Paragraph
        ],
      }
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
};
