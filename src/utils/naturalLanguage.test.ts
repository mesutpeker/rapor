import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDefaultAgendaForPeriod } from '../data/periodAgendas';
import { getPeriodProfile } from '../data/meetingPeriods';
import type {
  AgendaCategory,
  AgendaItem,
  GenerationSettings,
  MeetingInfo,
  MeetingPeriod,
  Teacher
} from '../types';
import { generateMinutes } from './generateMinutes';

const teachers: Teacher[] = [
  { id: 'math', fullName: 'AYŞE YILMAZ', branch: 'Matematik', isClassTeacher: true },
  { id: 'literature', fullName: 'MEHMET DEMİR', branch: 'Türk Dili ve Edebiyatı', isClassTeacher: false },
  { id: 'physics', fullName: 'ELİF KAYA', branch: 'Fizik', isClassTeacher: false },
  { id: 'guidance', fullName: 'CAN AYDIN', branch: 'Rehberlik', isClassTeacher: false }
];

const settings: GenerationSettings = {
  variationMode: 'manual',
  variationId: 1,
  tone: 'detailed',
  speechLength: 'long'
};

const makeInfo = (period: MeetingPeriod): MeetingInfo => ({
  schoolName: 'Atatürk Lisesi',
  academicYear: '2026-2027',
  period,
  term: getPeriodProfile(period).termLabel,
  date: '2026-09-10',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: '9/A',
  gradeLevel: 9,
  classAchievementLevel: 'medium',
  chairpersonName: 'Ali Vural',
  chairpersonTitle: 'Müdür Yardımcısı',
  clerkId: 'literature',
  principalName: 'Ayşe Kaya'
});

const makeAgenda = (category: Exclude<AgendaCategory, 'auto'>): AgendaItem => ({
  id: category,
  title: `${category} gündemi`,
  enabled: true,
  category,
  speakerCountMode: 'four'
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('doğal ve döneme uygun konuşma üretimi', () => {
  it('sene başında gerçekleşmemiş bir sonucu gözlemlenmiş gibi yazmaz', () => {
    const random = vi.spyOn(Math, 'random');

    for (const randomValue of [0, 0.2, 0.4, 0.6, 0.8, 0.999]) {
      random.mockReturnValue(randomValue);
      const result = generateMinutes(
        makeInfo('kasim'),
        teachers,
        getDefaultAgendaForPeriod('kasim'),
        settings
      );
      const speeches = result.agendaMinutes
        .flatMap(item => item.speeches.map(speech => speech.content))
        .join(' ');

      expect(speeches).not.toMatch(/gözlemlendi|gözlemlendiği|yıl sonu itibarıyla|ikinci dönemde/i);
      expect(speeches).not.toMatch(/belirtildi|ifade edildi|vurgulandı/i);
    }
  });

  it('aynı konuşmada aynı öneri fiilini ve aynı temel düşünceyi yinelemez', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const result = generateMinutes(
      makeInfo('kasim'),
      teachers,
      [makeAgenda('sosyal-duygusal'), makeAgenda('akademik-basari')],
      settings
    );

    for (const speech of result.agendaMinutes.flatMap(item => item.speeches)) {
      expect((speech.content.match(/ önerdi\./g) ?? []).length).toBeLessThanOrEqual(1);
      expect((speech.content.match(/ uygun buldu\./g) ?? []).length).toBeLessThanOrEqual(1);
      expect((speech.content.match(/ öncelikli gördü\./g) ?? []).length).toBeLessThanOrEqual(1);
      expect((speech.content.match(/bireysel destek gereksinim/gi) ?? []).length)
        .toBeLessThanOrEqual(1);
    }
  });

  it('Rehberlik branşını her gündemde yapay biçimde ders adı olarak kullanmaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const categories: Exclude<AgendaCategory, 'auto' | 'acilis' | 'kapanis'>[] = [
      'devamsizlik',
      'davranis-disiplin',
      'motivasyon-katilim',
      'sosyal-duygusal',
      'veli-iletisim',
      'dilek-temenniler',
      'genel'
    ];

    for (const category of categories) {
      const speech = generateMinutes(
        makeInfo('kasim'),
        [teachers[3]],
        [makeAgenda(category)],
        settings
      ).agendaMinutes[0].speeches[0].content;

      expect(speech).not.toMatch(/Rehberlik dersi(?:ne|nde|yle|yle ilgili)?/i);
    }
  });

  it('sınıf odağını her dönemin kendi zaman bakış açısıyla anlatır', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const expected: Record<MeetingPeriod, RegExp> = {
      'kasim': /Bu eğitim öğretim yılında .* başlıklarına öncelik verilmesini/,
      'nisan': /İkinci dönem çalışmalarında .* başlıklarına öncelik verilmesini/,
      'sene-sonu': /Eğitim öğretim yılı boyunca .* başlıklarında yürütülen çalışmaların sonuçlarını özetledi/
    };

    for (const period of Object.keys(expected) as MeetingPeriod[]) {
      const speech = generateMinutes(
        makeInfo(period),
        [teachers[0]],
        [makeAgenda('akademik-basari')],
        settings
      ).agendaMinutes[0].speeches[0].content;

      expect(speech).toMatch(expected[period]);
    }
  });

  it('aynı gündemde öğretmenlere aynı ayrıntı gerekçesini kopyalamaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const speeches = generateMinutes(
      makeInfo('kasim'),
      teachers,
      [makeAgenda('akademik-basari')],
      settings
    ).agendaMinutes[0].speeches;

    const detailSentences = speeches.map(speech =>
      speech.content.split('. ').find(sentence =>
        /görünür kılacağını|hedefler belirlemeyi|bilgi paylaşımını|desteği daha işlevsel/.test(sentence)
      )
    );

    expect(detailSentences.every(Boolean)).toBe(true);
    expect(new Set(detailSentences).size).toBe(speeches.length);
  });

  it('gözlem ve öneriyi farklı öğretmenlerde aynı cümle olarak yinelemez', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.34);
    const speeches = generateMinutes(
      makeInfo('nisan'),
      teachers,
      [makeAgenda('veli-iletisim')],
      { ...settings, tone: 'balanced', speechLength: 'long' }
    ).agendaMinutes[0].speeches;
    const sentences = speeches.flatMap(speech =>
      speech.content.match(/[^.!?]+[.!?]/g)?.map(sentence => sentence.trim()) ?? []
    );

    expect(new Set(sentences).size).toBe(sentences.length);
  });

  it('dilek ve temennilerde değerlendirme jargonu yerine doğal dilek cümleleri kurar', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);

    for (const period of ['kasim', 'nisan', 'sene-sonu'] as MeetingPeriod[]) {
      const speech = generateMinutes(
        makeInfo(period),
        teachers,
        [makeAgenda('dilek-temenniler')],
        settings
      ).agendaMinutes[0].speeches[0].content;

      expect(speech).toMatch(/dilek|diledi|temenni|teşekkür/i);
      expect(speech).not.toMatch(/eldeki bilgileri|mevcut durumu|uygulanabilecek çalışmaları ele aldı/i);
    }
  });

  it('tam sene başı tutanağında mekanik yüklem yoğunluğunu sınırlar', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
    const result = generateMinutes(
      makeInfo('kasim'),
      teachers,
      getDefaultAgendaForPeriod('kasim'),
      { ...settings, tone: 'balanced', speechLength: 'medium' }
    );
    const text = result.agendaMinutes
      .flatMap(item => item.speeches.map(speech => speech.content))
      .join(' ');

    expect((text.match(/gerektiğini/gi) ?? []).length).toBeLessThanOrEqual(2);
    expect((text.match(/ifade etti/gi) ?? []).length).toBeLessThanOrEqual(3);
    expect(text).not.toMatch(/gözlem ve önerilerini aktardı|değerlendirmede bulundu/i);
  });
});
