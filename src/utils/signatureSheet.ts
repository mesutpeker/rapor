import { getPeriodProfile } from '../data/meetingPeriods';
import type { GeneratedMinutes } from '../types';
import { formatDateTr, toSignatureNameTr } from './textFormat';

const TR = 'tr-TR';
// Ad girilmediğinde elle doldurulacak boş imza satırı.
export const SIGNATURE_PLACEHOLDER = '..........................';

export interface SignatureBlock {
  name: string;
  title: string;
}

export interface SignatureSheet {
  // Ortalanmış, kalın başlık satırları (okul / eğitim yılı / sirkü adı).
  headingLines: string[];
  classTeacher: SignatureBlock;
  chairperson: SignatureBlock;
  principal: SignatureBlock & { date: string };
}

// Toplantı tutanağı imza sirküsünün başlık ve alt imza bloklarını hazırlar;
// önizleme ve Word çıktısı aynı yerleşimi kullanır.
export const buildSignatureSheet = (minutes: GeneratedMinutes): SignatureSheet => {
  const { meetingInfo } = minutes;
  const className = meetingInfo.className.trim();
  const classTeacher = minutes.teachers.find(teacher => teacher.isClassTeacher);
  const titleLabel = getPeriodProfile(meetingInfo.period).titleLabel;

  const headingLines = [
    meetingInfo.schoolName.trim().toLocaleUpperCase(TR),
    meetingInfo.academicYear.trim()
      ? `${meetingInfo.academicYear.trim()} EĞİTİM-ÖĞRETİM YILI`
      : '',
    [
      className ? `${className.toLocaleUpperCase(TR)} SINIFI` : '',
      titleLabel,
      'ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI İMZA SİRKÜSÜ'
    ].filter(Boolean).join(' ')
  ].filter(Boolean);

  return {
    headingLines,
    classTeacher: {
      name: (classTeacher && toSignatureNameTr(classTeacher.fullName)) || SIGNATURE_PLACEHOLDER,
      title: className ? `${className} Sınıf Rehber Öğretmeni` : 'Sınıf Rehber Öğretmeni'
    },
    chairperson: {
      name: toSignatureNameTr(meetingInfo.chairpersonName) || SIGNATURE_PLACEHOLDER,
      title: 'Müdür Yardımcısı'
    },
    principal: {
      date: formatDateTr(meetingInfo.date) || '.../.../20...',
      name: toSignatureNameTr(meetingInfo.principalName) || SIGNATURE_PLACEHOLDER,
      title: 'Okul Müdürü'
    }
  };
};
