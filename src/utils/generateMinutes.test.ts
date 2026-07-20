import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AgendaItem, GenerationSettings, MeetingInfo, Teacher } from '../types';
import { generateMinutes } from './generateMinutes';

const meetingInfo: MeetingInfo = {
  schoolName: 'Atatürk Lisesi',
  academicYear: '2026-2027',
  period: 'sene-basi',
  term: '1. Dönem',
  date: '2026-09-10',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: '9/A',
  gradeLevel: 9,
  classAchievementLevel: 'medium',
  chairpersonId: '',
  clerkId: ''
};

const teachers: Teacher[] = [
  {
    id: 'teacher-1',
    fullName: 'AYŞE YILMAZ',
    branch: 'Matematik',
    isAttending: true,
    isClassTeacher: false
  }
];

const agenda: AgendaItem[] = [
  {
    id: 'agenda-1',
    title: 'Akademik başarı durumunun değerlendirilmesi',
    enabled: true,
    category: 'akademik-basari',
    speakerCountMode: 'two'
  }
];

const baseSettings: GenerationSettings = {
  variationMode: 'manual',
  variationId: 1,
  tone: 'balanced',
  speechLength: 'short'
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('tutanak üretimi', () => {
  it('seçilen resmî anlatım biçimini konuşmaya uygular', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = generateMinutes(meetingInfo, teachers, agenda, {
      ...baseSettings,
      tone: 'official'
    });

    expect(result.agendaMinutes[0].speeches[0].content)
      .toContain('konuya ilişkin değerlendirmelerini kurul üyeleriyle paylaştı');
  });

  it('öğretmen adını ve seçilen varyasyonu çıktıya taşır', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = generateMinutes(meetingInfo, teachers, agenda, baseSettings);

    expect(result.attendingTeachers[0].fullName).toBe('Ayşe Yılmaz');
    expect(result.variationId).toBe(1);
    expect(result.agendaMinutes).toHaveLength(1);
  });
});
