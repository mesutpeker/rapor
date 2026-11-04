import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AgendaItem, GenerationSettings, MeetingInfo, Teacher } from '../types';
import { generateMinutes } from './generateMinutes';

const meetingInfo: MeetingInfo = {
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
};

const teachers: Teacher[] = [
  {
    id: 'teacher-1',
    fullName: 'AYŞE YILMAZ',
    branch: 'Matematik',
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
      .toContain('değerlendirmelerini kurula sundu');
  });

  it('ayrıntılı anlatımda konuya özgü gerekçe ve daha fazla cümle üretir', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const balanced = generateMinutes(meetingInfo, teachers, agenda, {
      ...baseSettings,
      tone: 'balanced',
      speechLength: 'medium'
    }).agendaMinutes[0].speeches[0].content;
    const detailed = generateMinutes(meetingInfo, teachers, agenda, {
      ...baseSettings,
      tone: 'detailed',
      speechLength: 'medium'
    }).agendaMinutes[0].speeches[0].content;

    expect(detailed.split('. ').length).toBeGreaterThan(balanced.split('. ').length);
    expect(detailed).toContain(
      'Bu değerlendirmelerin öğrenme sürecindeki güçlü ve gelişime açık yönleri görünür kılacağını'
    );
  });

  it('öğretmen adını ve seçilen varyasyonu çıktıya taşır', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = generateMinutes(meetingInfo, teachers, agenda, baseSettings);

    expect(result.teachers[0].fullName).toBe('Ayşe Yılmaz');
    expect(result.variationId).toBe(1);
    expect(result.agendaMinutes).toHaveLength(1);
  });

  it('kısa konuşmada da seçilen sınıf odağını ve başarı düzeyini kullanır', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const speech = generateMinutes(meetingInfo, teachers, agenda, {
      ...baseSettings,
      variationMode: 'manual',
      variationId: 2,
      speechLength: 'short'
    }).agendaMinutes[0].speeches[0].content;

    expect(speech).toContain('temel ders çalışma alışkanlıkları, not tutma ve ödev sorumluluğu');
    expect(speech).toContain(
      'temel kazanımların pekiştirilmesini ve düzenli çalışma alışkanlıklarının geliştirilmesini'
    );
  });
});
