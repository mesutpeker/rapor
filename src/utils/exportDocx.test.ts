import JSZip from 'jszip';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GeneratedMinutes } from '../types';

const { saveAsMock } = vi.hoisted(() => ({
  saveAsMock: vi.fn()
}));

vi.mock('file-saver', () => ({
  saveAs: saveAsMock
}));

import { exportToDocx } from './exportDocx';

const minutes: GeneratedMinutes = {
  id: 'minutes',
  title: 'ATATÜRK LİSESİ 2026-2027 EĞİTİM ÖĞRETİM YILI 9/A SINIFI TOPLANTI TUTANAĞI',
  meetingInfo: {
    schoolName: 'Atatürk Lisesi',
    academicYear: '2026-2027',
    period: 'kasim',
    term: '1. Dönem',
    date: '2026-09-10',
    time: '15:30',
    location: 'Öğretmenler Odası',
    className: '9/A',
    gradeLevel: 9,
    classAchievementLevel: 'medium',
    chairpersonName: 'Ali Vural',
    chairpersonTitle: 'Müdür Yardımcısı',
    clerkId: '',
    principalName: 'Ayşe Kaya'
  },
  teachers: [{
    id: 'teacher',
    fullName: 'Ayşe Yılmaz',
    branch: 'Matematik',
    isClassTeacher: true
  }],
  agendaMinutes: [{
    agendaId: 'agenda',
    agendaTitle: 'Akademik başarı',
    agendaNumber: 1,
    speeches: [{
      teacherId: 'teacher',
      teacherName: 'Ayşe Yılmaz',
      branch: 'Matematik',
      content: 'Öğrenci gelişimine ilişkin değerlendirmelerini paylaştı.'
    }],
    decisions: [{
      text: 'Öğrenci gelişiminin izlenmesine karar verildi.',
      responsible: 'Ayşe Yılmaz',
      followUp: 'Nisan ayı ŞÖK toplantısı'
    }]
  }],
  agendaSummary: ['Akademik başarı'],
  studentEvaluations: [],
  closingText: 'Toplantı sona erdi.',
  generatedAt: '2026-09-10T12:30:00.000Z',
  variationId: 1,
  clerkName: ''
};

beforeEach(() => {
  saveAsMock.mockReset();
});

describe('Word çıktısı', () => {
  it('toplantı alanlarını, sayfa numarasını ve güvenli dosya adını belgeye yazar', async () => {
    await exportToDocx(minutes, 'SOK_9/A');

    expect(saveAsMock).toHaveBeenCalledTimes(1);
    const [blob, filename] = saveAsMock.mock.calls[0] as [Blob, string];
    expect(filename).toBe('SOK_9_A.docx');

    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const documentXml = await zip.file('word/document.xml')?.async('string');
    const footerFiles = Object.keys(zip.files)
      .filter(path => /^word\/footer\d+\.xml$/.test(path));
    const footerXml = await Promise.all(
      footerFiles.map(path => zip.file(path)?.async('string'))
    );

    expect(documentXml).toContain('2026-2027');
    expect(documentXml).toContain('10.09.2026');
    expect(documentXml).toContain('15:30');
    expect(documentXml).toContain('Öğretmenler Odası');
    expect(documentXml).toContain('Ali Vural');
    expect(documentXml).toContain('Okul Müdürü Onayı');
    expect(documentXml).toContain('Ayşe Kaya');
    expect(documentXml).toContain('Sorumlu: Ayşe Yılmaz');
    expect(documentXml).toContain('Matematik Öğretmeni Ayşe Yılmaz ');
    expect(documentXml).toContain('öğrenci gelişimine ilişkin değerlendirmelerini paylaştı.');
    expect(documentXml).not.toContain('Matematik Öğretmeni Ayşe Yılmaz:');
    expect(footerFiles.length).toBeGreaterThan(0);
    expect(footerXml.every(xml => xml?.includes('PAGE'))).toBe(true);
  });
});
