import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AgendaCategory,
  AgendaItem,
  GenerationSettings,
  MeetingInfo,
  MeetingPeriod,
  Teacher
} from '../types';
import { achievementLevels } from '../data/achievementLevels';
import {
  allBranches,
  branchSpeechStyles,
  getBranchStyle
} from '../data/branchSpeechStyles';
import { getCategoryContent } from '../data/categorySpeechContent';
import { resolveAgendaCategory } from '../data/agendaItems';
import { gradeProfiles } from '../data/gradeProfiles';
import { getPeriodContent } from '../data/periodContent';
import { generateMinutes } from './generateMinutes';
import { selectTeachersForAgenda } from './teacherSelector';
import { toggleExclusiveClassTeacher } from './teachers';

const categories: Exclude<AgendaCategory, 'auto' | 'acilis' | 'kapanis'>[] = [
  'akademik-basari',
  'devamsizlik',
  'davranis-disiplin',
  'motivasyon-katilim',
  'sosyal-duygusal',
  'olcme-degerlendirme',
  'veli-iletisim',
  'destekleme',
  'ogretim-programi',
  'kaynastirma',
  'etkinlik-sosyal',
  'degerler-egitimi',
  'okul-sagligi-isg',
  'dilek-temenniler',
  'genel'
];

// Branş stillerindeki agendaRelevance anahtarları (konuşmacı seçimi için).
const relevanceCategories = [
  'akademik-basari',
  'devamsizlik',
  'davranis-disiplin',
  'motivasyon-katilim',
  'sosyal-duygusal',
  'olcme-degerlendirme',
  'veli-iletisim',
  'destekleme',
  'ogretim-programi',
  'kaynastirma',
  'etkinlik-sosyal',
  'degerler-egitimi',
  'okul-sagligi-isg',
  'genel',
  'dilek-temenniler'
] as const;

const meetingInfo: MeetingInfo = {
  schoolName: 'Atatürk Lisesi',
  academicYear: '2026-2027',
  period: 'kasim',
  term: '1. Dönem',
  date: '2026-09-10',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: '9/i',
  gradeLevel: 9,
  classAchievementLevel: 'medium',
  chairpersonName: 'Ali Vural',
  chairpersonTitle: 'Müdür Yardımcısı',
  clerkId: '',
  principalName: 'Ayşe Kaya'
};

const settings: GenerationSettings = {
  variationMode: 'manual',
  variationId: 1,
  tone: 'detailed',
  speechLength: 'long'
};

const makeTeacher = (
  id: string,
  branch: string,
  isClassTeacher = false
): Teacher => ({
  id,
  fullName: `ÖĞRETMEN ${id}`,
  branch,
  isClassTeacher
});

const makeAgenda = (
  category: Exclude<AgendaCategory, 'auto'>,
  id: string = category
): AgendaItem => ({
  id,
  title: `${category} gündemi`,
  enabled: true,
  category,
  speakerCountMode: 'two'
});

const generateFor = (
  branch: string,
  category: Exclude<AgendaCategory, 'auto' | 'acilis' | 'kapanis'>,
  overrides: Partial<MeetingInfo> = {}
) => generateMinutes(
  { ...meetingInfo, ...overrides },
  [makeTeacher('1', branch)],
  [makeAgenda(category)],
  settings
);

const normalizeDecision = (decision: string): string =>
  decision
    .replace(/karar verilmiştir\.$/, 'karar verildi.')
    .replace(/uygun görülmüştür\.$/, 'uygun görüldü.')
    .replace(/kararlaştırılmıştır\.$/, 'kararlaştırıldı.')
    .replace(/önerilmiştir\.$/, 'önerildi.')
    .replace(/planlanmıştır\.$/, 'planlandı.');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Türkçe ve konu bütünlüğü', () => {
  it('64 seçilebilir branşın tamamını açık ve dolu bir üslup profiline bağlar', () => {
    const listedBranches = [...new Set(allBranches)].sort((a, b) => a.localeCompare(b, 'tr'));
    const styledBranches = Object.keys(branchSpeechStyles)
      .sort((a, b) => a.localeCompare(b, 'tr'));

    expect(allBranches).toHaveLength(64);
    expect(listedBranches).toHaveLength(64);
    expect(styledBranches).toEqual(listedBranches);

    for (const branch of allBranches) {
      const style = branchSpeechStyles[branch];
      expect(style.branch).toBe(branch);
      expect(style.focusAreas.length).toBeGreaterThan(0);
      expect(style.sentenceStarters.length).toBeGreaterThan(0);
      expect(style.suggestions.length).toBeGreaterThan(0);
      expect(Object.keys(style.agendaRelevance).sort()).toEqual([...relevanceCategories].sort());

      for (const starter of style.sentenceStarters) {
        expect(starter).toMatch(/^[A-ZÇĞİÖŞÜ]/);
        expect(starter).not.toMatch(
          /dinleme ve konuşma becerileri ve okuma ve anlama|uygulama ve performans ve estetik|dayanıklılık ve koordinasyon ve takım çalışması|araştırma ve veri toplama ve sürdürülebilirlik/i
        );
      }
    }

    expect(getBranchStyle('Robotik ve Kodlama').focusAreas)
      .toContain('programlama becerileri');
    expect(getBranchStyle('Biyoloji').sentenceStarters.join(' '))
      .not.toContain('öğrencilerin kavram haritaları ve görsel materyaller kullanımı');
    expect(getBranchStyle('Beden Eğitimi ve Spor').sentenceStarters.join(' '))
      .not.toContain('öğrencilerin sorumluluk bilinci ve kurallara uyum bakımından');
    expect(getBranchStyle('Sağlık Bilgisi').sentenceStarters.join(' '))
      .toContain('sağlıklı yaşam bilinci düzeyi açısından');
    expect(getBranchStyle('Seçmeli Geometri').sentenceStarters[0])
      .toContain('Seçmeli geometri dersinde');
  });

  it('Türkçe büyük/küçük harf dönüşümlerini doğru yapar', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = generateFor('İşletme', 'akademik-basari');

    expect(result.title).toContain('ATATÜRK LİSESİ');
    expect(result.title).toContain('9/İ SINIFI');
    expect(resolveAgendaCategory('DEVAMSIZLIK DURUMLARI')).toBe('devamsizlik');
    expect(getBranchStyle('İŞLETME').branch).toBe('İşletme');
    expect(getBranchStyle('  işletme  ').branch).toBe('İşletme');
  });

  it('branş odağıyla başarı düzeyi ifadelerini anlamsız biçimde çaprazlamaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.8);

    const speech = generateFor(
      'Rehberlik',
      'akademik-basari',
      { classAchievementLevel: 'veryHigh' }
    ).agendaMinutes[0].speeches[0].content;

    expect(speech).toContain(
      'Veli görüşmesi konusundaki mevcut durumun belirlenerek ilgili çalışmaların buna göre planlanması'
    );
    expect(speech).not.toMatch(/veli görüşmesi konusunda yarışma ve olimpiyat/i);
    expect(speech).not.toMatch(/konusunda mevcut başarı düzeyinin/i);
  });

  it('başarı düzeyine ait ham iddia ve sorunları akademik olmayan gündemlere sızdırmaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const rawAchievementClaims = achievementLevels.flatMap(level =>
      level.versions.flatMap(version => [
        ...version.positiveEmphasis,
        ...version.commonIssues
      ])
    );

    for (const level of achievementLevels) {
      const speech = generateFor(
        'Matematik',
        'devamsizlik',
        { classAchievementLevel: level.id }
      ).agendaMinutes[0].speeches[0].content;

      expect(rawAchievementClaims.some(claim => speech.includes(claim))).toBe(false);
      expect(speech).not.toMatch(/rehavet|olimpiyat|üst düzey performans/i);
    }
  });

  it('başarı düzeyinden hareketle ağır veya doğrulanmamış karar üretmez', () => {
    const random = vi.spyOn(Math, 'random');
    const forbidden = /RAM['’][ae]|koruma kurum|ev ziyaret|risk altındaki|öğrenme güçlüğü tanısı|madde bağımlılığı|şiddet|ihmal/i;

    for (const randomValue of [0, 0.15, 0.35, 0.55, 0.75, 0.999]) {
      random.mockReturnValue(randomValue);

      for (const level of achievementLevels) {
        const item = generateFor(
          'Matematik',
          'akademik-basari',
          { classAchievementLevel: level.id }
        ).agendaMinutes[0];
        const text = [
          ...item.speeches.map(speech => speech.content),
          ...item.decisions.map(decision => decision.text)
        ].join(' ');

        expect(text).not.toMatch(forbidden);
      }
    }
  });

  it('ikinci kararı da gündemin kendi karar havuzundan üretir', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const repeatedAgenda = Array.from(
      { length: 6 },
      (_, index) => makeAgenda('devamsizlik', `devamsizlik-${index}`)
    );
    const result = generateMinutes(
      meetingInfo,
      [makeTeacher('1', 'Matematik')],
      repeatedAgenda,
      settings
    );
    const allowedDecisions = new Set([
      ...(getPeriodContent('kasim', 'devamsizlik').decisions ?? []),
      ...getCategoryContent('devamsizlik').decisions
    ].map(normalizeDecision));

    for (const item of result.agendaMinutes) {
      expect(item.decisions).toHaveLength(2);
      expect(item.decisions.every(decision => allowedDecisions.has(decision.text))).toBe(true);
      expect(item.decisions.map(d => d.text).join(' ')).not.toMatch(/olimpiyat|yarışma|üst düzey/i);
    }
  });

  it('dilek ve temennileri her dönem için genel havuza düşmeden üretir', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const periods: MeetingPeriod[] = ['kasim', 'nisan', 'sene-sonu'];

    for (const period of periods) {
      const periodContent = getPeriodContent(period, 'dilek-temenniler');
      const result = generateFor('Müzik', 'dilek-temenniler', { period });
      const item = result.agendaMinutes[0];

      expect(periodContent.intros?.length).toBeGreaterThan(0);
      expect(periodContent.decisions).toEqual([]);
      expect(item.decisions).toEqual([]);
      expect(item.speeches[0].content).toMatch(/dilek|temenni|iş birliği|teşekkür|sağlık|başarı/i);
      expect(item.speeches[0].content).not.toContain('Konuyla ilgili dönem başında');
    }
  });

  it('gözlem ve kararları seçilen dönemin kendi havuzundan üretir', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.63);
    const periods: MeetingPeriod[] = ['kasim', 'nisan', 'sene-sonu'];

    for (const period of periods) {
      for (const category of categories) {
        const periodContent = getPeriodContent(period, category);
        const item = generateFor('Matematik', category, { period })
          .agendaMinutes[0];
        const speech = item.speeches[0].content;

        if (periodContent.observations?.length && category !== 'dilek-temenniler') {
          expect(
            periodContent.observations.some(observation => speech.includes(observation)),
            `${period}/${category}: döneme özgü gözlem kullanılmadı`
          ).toBe(true);
        }

        if (periodContent.decisions?.length) {
          const allowedDecisions = new Set(
            periodContent.decisions.map(normalizeDecision)
          );
          expect(
            item.decisions.every(decision => allowedDecisions.has(decision.text)),
            `${period}/${category}: dönem dışı karar üretildi`
          ).toBe(true);
        }
      }
    }
  });

  it('akademik olmayan konuşmalarda branşı yapay bir ders kalıbıyla zorlamaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const mathSpeech = generateFor('Matematik', 'devamsizlik')
      .agendaMinutes[0].speeches[0].content;
    const guidanceSpeech = generateFor('Rehberlik', 'devamsizlik')
      .agendaMinutes[0].speeches[0].content;

    expect(mathSpeech).toMatch(/devam|devamsızlık/i);
    expect(guidanceSpeech).toMatch(/devam|devamsızlık/i);
    expect(mathSpeech).not.toContain('Matematik dersi');
    expect(guidanceSpeech).not.toContain('Rehberlik dersi');
  });

  it('varyasyon odağını yalnız akademik başarı konuşmasına ekler', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = generateMinutes(
      meetingInfo,
      [makeTeacher('1', 'Matematik')],
      [
        makeAgenda('akademik-basari'),
        makeAgenda('devamsizlik')
      ],
      settings
    );
    const academicSpeech = result.agendaMinutes[0].speeches[0].content;
    const attendanceSpeech = result.agendaMinutes[1].speeches[0].content;

    expect(academicSpeech).toContain(
      'Bu eğitim öğretim yılında liseye uyum, okul kültürünü tanıma ve sınıf kuralları başlıklarına öncelik verilmesini'
    );
    expect(academicSpeech).not.toMatch(/seçilen|varyasyon|odak doğrultusunda/i);
    expect(attendanceSpeech).not.toMatch(/seçilen|varyasyon|odak doğrultusunda/i);
    expect(attendanceSpeech).not.toContain('liseye uyum');
  });

  it('20 içerik odağının tamamını doğal öğretmen anlatımıyla yazar', () => {
    const variations = gradeProfiles.flatMap(profile => profile.variations);
    const templates = variations.flatMap(variation =>
      Object.values(variation.speechTemplates).flat()
    );

    expect(variations).toHaveLength(20);
    expect(templates.length).toBeGreaterThanOrEqual(20);

    for (const template of templates) {
      expect(template).not.toMatch(
        /seçilen|varyasyon|odak doğrultusunda|gözlemlenmektedir|gerekmektedir|belirtilmiştir|ifade edilmiştir|vurgulanmıştır/i
      );
      expect(template).toMatch(/(?:belirtti|ifade etti|vurguladı)\.$/);
    }
  });

  it('detaylı üslupta yinelenen “açısından” ve eski zaman kalıpları üretmez', () => {
    const random = vi.spyOn(Math, 'random');

    for (const randomValue of [0, 0.2, 0.4, 0.6, 0.8, 0.999]) {
      random.mockReturnValue(randomValue);

      for (const branch of allBranches) {
        for (const category of categories) {
          const result = generateFor(branch, category);
          const text = result.agendaMinutes
            .flatMap(item => [
              ...item.speeches.map(speech => speech.content),
              ...item.decisions.map(decision => decision.text)
            ])
            .join(' ');

          expect(text).not.toMatch(/\baçısından\b[^.!?]{0,120}\baçısından\b/i);
          expect(text).not.toMatch(
            /karar verilmiştir|uygun görülmüştür|kararlaştırılmıştır|önerilmiştir|planlanmıştır|gözlemlenmektedir|gerekmektedir/i
          );
          expect(text).not.toMatch(
            /seçilen varyasyon|varyasyon odağı|odak doğrultusunda|dersi bağlamında|branşın yapısına/i
          );
          expect(text).not.toMatch(/\bundefined\b|\bNaN\b/);
        }
      }
    }
  });
});

describe('konuşmacı seçimi ve sınıf rehberi', () => {
  it('devamsızlıkta sınıf rehberini, sosyal-duygusal maddede Rehberliği seçer', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const teachers = [
      makeTeacher('math', 'Matematik', true),
      makeTeacher('music', 'Müzik'),
      makeTeacher('guidance', 'Rehberlik')
    ];

    expect(selectTeachersForAgenda(teachers, 'devamsizlik', 1, [])[0].id)
      .toBe('math');
    expect(selectTeachersForAgenda(teachers, 'sosyal-duygusal', 1, [])[0].id)
      .toBe('guidance');
  });

  it('sınıf rehberi işaretini tek öğretmenle sınırlar ve kapatılmasına izin verir', () => {
    const teachers = [
      makeTeacher('1', 'Matematik', true),
      makeTeacher('2', 'Müzik')
    ];

    const secondSelected = toggleExclusiveClassTeacher(teachers, '2');
    expect(secondSelected.filter(teacher => teacher.isClassTeacher).map(teacher => teacher.id))
      .toEqual(['2']);

    const noneSelected = toggleExclusiveClassTeacher(secondSelected, '2');
    expect(noneSelected.some(teacher => teacher.isClassTeacher)).toBe(false);
  });

  it('eşit puanlı öğretmenlerde giriş sırasına sabitlenmez', () => {
    const random = vi.spyOn(Math, 'random');
    const teachers = [
      makeTeacher('first', 'Matematik'),
      makeTeacher('second', 'Müzik'),
      makeTeacher('third', 'Fizik')
    ];

    random.mockReturnValue(0.999);
    const firstSelection = selectTeachersForAgenda(teachers, 'genel', 1, [])[0].id;
    random.mockReturnValue(0);
    const secondSelection = selectTeachersForAgenda(teachers, 'genel', 1, [])[0].id;

    expect(firstSelection).toBe('first');
    expect(secondSelection).not.toBe('first');
  });
});
