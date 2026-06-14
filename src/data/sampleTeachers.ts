import type { Teacher } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const sampleTeachers: Teacher[] = [
  { id: uuidv4(), fullName: 'Ayşe Yılmaz', branch: 'Matematik', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Zeynep Kara', branch: 'Türk Dili ve Edebiyatı', isAttending: true, isClassTeacher: true },
  { id: uuidv4(), fullName: 'Mehmet Demir', branch: 'Rehberlik', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Elif Arslan', branch: 'Fizik', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Ahmet Kaya', branch: 'Kimya', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Fatma Çelik', branch: 'Biyoloji', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Ali Yıldız', branch: 'Tarih', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Hasan Aydın', branch: 'Coğrafya', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Merve Şahin', branch: 'İngilizce', isAttending: true, isClassTeacher: false },
  { id: uuidv4(), fullName: 'Emre Can', branch: 'Beden Eğitimi', isAttending: true, isClassTeacher: false }
];
