import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AgendaCategory,
  AgendaItem,
  GenerationSettings,
  GradeLevel,
  MeetingInfo,
  MeetingPeriod,
  Teacher
} from '../types';
import { getCategoryContent } from '../data/categorySpeechContent';
import { getDefaultAgendaForPeriod } from '../data/periodAgendas';
import { getPeriodContent } from '../data/periodContent';
import { resolveAgendaCategory } from '../data/agendaItems';
import { generateMinutes } from './generateMinutes';
import { isGuidanceBranch, normalizeBranchName } from './teachers';

// Tekrarlanabilir rastgelelik: testler her çalıştırmada aynı tutanakları üretir.
const seedRandom = (seed: number): void => {
  let state = seed >>> 0;
  vi.spyOn(Math, 'random').mockImplementation(() => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  });
};

const makeInfo = (
  period: MeetingPeriod,
  gradeLevel: GradeLevel = 9,
  overrides: Partial<MeetingInfo> = {}
): MeetingInfo => ({
  schoolName: 'Atatürk Lisesi',
  academicYear: '2026-2027',
  period,
  term: period === 'kasim' ? '1. Dönem' : '2. Dönem',
  date: '2026-11-16',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: `${gradeLevel}/A`,
  gradeLevel,
  classAchievementLevel: 'medium',
  chairpersonName: 'ali vural',
  principalName: 'Ayşe Kaya',
  ...overrides
});

const teachers: Teacher[] = [
  { id: 't1', fullName: 'AHMET YILMAZ', branch: 'Matematik', isClassTeacher: true },
  { id: 't2', fullName: 'Ayşe Demir', branch: 'Türk Dili ve Edebiyatı', isClassTeacher: false },
  { id: 't3', fullName: 'Işıl İnce', branch: 'Rehberlik', isClassTeacher: false },
  { id: 't4', fullName: 'Mehmet Kaya', branch: 'Fizik', isClassTeacher: false },
  { id: 't5', fullName: 'Zeynep Çelik', branch: 'İngilizce', isClassTeacher: false },
  { id: 't6', fullName: 'Ali Öztürk', branch: 'Almanca', isClassTeacher: false },
  { id: 't7', fullName: 'Elif Şahin', branch: 'Tarih', isClassTeacher: false },
  { id: 't8', fullName: 'Can Aydın', branch: 'Matematik', isClassTeacher: false }
];

const baseSettings: GenerationSettings = {
  variationMode: 'random',
  variationId: 1,
  tone: 'balanced',
  speechLength: 'medium'
};

const makeAgenda = (
  category: Exclude<AgendaCategory, 'auto'>,
  title = `${category} gündemi`,
  id: string = category
): AgendaItem => ({ id, title, enabled: true, category, speakerCountMode: 'three' });

const allEnabled = (period: MeetingPeriod): AgendaItem[] =>
  getDefaultAgendaForPeriod(period).map(item => ({ ...item, enabled: true }));

const bodySentences = (content: string): string[] =>
  content.split(/(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ])/).slice(1).filter(sentence => sentence.length > 25);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('tutanak bütünlüğü', () => {
  it('varsayılan gündemlerde hiçbir cümleyi veya kararı belgede yinelemez', () => {
    const periods: MeetingPeriod[] = ['kasim', 'nisan', 'sene-sonu'];
    const combos: Array<Pick<GenerationSettings, 'tone' | 'speechLength'>> = [
      { tone: 'official', speechLength: 'short' },
      { tone: 'balanced', speechLength: 'medium' },
      { tone: 'detailed', speechLength: 'long' }
    ];

    for (const period of periods) {
      for (const gradeLevel of [9, 12] as GradeLevel[]) {
        for (const combo of combos) {
          for (let seed = 1; seed <= 4; seed++) {
            seedRandom(seed * 7919 + gradeLevel);
            const result = generateMinutes(
              makeInfo(period, gradeLevel),
              teachers,
              allEnabled(period),
              { ...baseSettings, ...combo }
            );
            const key = `${period}/${gradeLevel}/${combo.tone}/${combo.speechLength}/${seed}`;
            const sentences = result.agendaMinutes.flatMap(
              item => item.speeches.flatMap(speech => bodySentences(speech.content))
            );
            const decisions = result.agendaMinutes.flatMap(item => item.decisions);

            expect(new Set(sentences).size, `${key}: yinelenen cümle`).toBe(sentences.length);
            expect(new Set(decisions.map(d => d.text)).size, `${key}: yinelenen karar`)
              .toBe(decisions.length);
            expect(decisions.map(d => d.number), `${key}: karar numaraları`)
              .toEqual(decisions.map((_, index) => index + 1));

            for (const item of result.agendaMinutes) {
              for (const speech of item.speeches) {
                const parts = speech.content.split(/(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ])/);
                for (let index = 1; index < parts.length; index++) {
                  const ending = (text: string) => text.split(' ').slice(-2).join(' ');
                  expect(ending(parts[index]), `${key}: art arda aynı yüklem`)
                    .not.toBe(ending(parts[index - 1]));
                }
                expect(speech.content, key).not.toMatch(
                  /uygun buldu|yerinde buldu|uygulanabilir gördü|konusundaki mevcut durumun|Konuyla ilgili|olumlu katkı/
                );
                expect(speech.content, key).not.toMatch(
                  /(?<!\p{L})öncelik\p{L}* [^.]*öncelikli gördü|(?<!\p{L})gerek\p{L}* [^.]*gerektiğine dikkat/iu
                );
              }
            }
          }
        }
      }
    }
  });

  it('Kasım tutanağını yıl başı planlaması gibi yazmaz', () => {
    for (let seed = 1; seed <= 6; seed++) {
      seedRandom(seed);
      const result = generateMinutes(
        makeInfo('kasim'),
        teachers,
        allEnabled('kasim'),
        { ...baseSettings, speechLength: 'long' }
      );
      const text = result.agendaMinutes
        .flatMap(item => [
          item.bodyText ?? '',
          ...item.speeches.map(speech => speech.content),
          ...item.decisions.map(decision => decision.text)
        ])
        .join(' ');

      expect(text).not.toMatch(
        /yeni eğitim öğretim yılının başında|hazırbulunuşluk|yıl başından itibaren|yeni yılda|başlangıç düzeyi|veli bilgilendirme toplantısının dönem başında/i
      );
      expect(text).toMatch(/ilk sınav sonuçları|dönem başından bu yana/);
    }
  });

  it('Nisan tutanağında dilekleri dönem başı gibi sunmaz', () => {
    for (let seed = 1; seed <= 6; seed++) {
      seedRandom(seed);
      const result = generateMinutes(
        makeInfo('nisan', 10),
        teachers,
        [makeAgenda('dilek-temenniler', 'Dilek ve temenniler')],
        { ...baseSettings, speechLength: 'long' }
      );
      const text = result.agendaMinutes[0].speeches.map(speech => speech.content).join(' ');
      expect(text).not.toMatch(/bir ikinci dönem diledi|İkinci dönemin .* geçmesini diledi/);
    }
  });

  it('Madde 10/(8) konularında konunun kendi içeriğini kullanır', () => {
    const categories: Exclude<AgendaCategory, 'auto'>[] = [
      'ogretim-programi',
      'kaynastirma',
      'etkinlik-sosyal',
      'degerler-egitimi',
      'okul-sagligi-isg'
    ];
    const stem = (sentence: string): string => sentence.split(' ').slice(0, -2).join(' ');

    for (const period of ['kasim', 'nisan', 'sene-sonu'] as MeetingPeriod[]) {
      for (const category of categories) {
        seedRandom(42);
        const item = generateMinutes(
          makeInfo(period),
          teachers,
          [makeAgenda(category)],
          baseSettings
        ).agendaMinutes[0];
        const periodContent = getPeriodContent(period, category);
        const categoryContent = getCategoryContent(category);
        const observations = periodContent.observations?.length
          ? periodContent.observations
          : categoryContent.observations;
        const decisions = periodContent.decisions?.length
          ? periodContent.decisions
          : categoryContent.decisions;
        const speechText = item.speeches.map(speech => speech.content).join(' ');

        expect(
          observations.some(observation => speechText.includes(stem(observation))),
          `${period}/${category}: konuya özgü değerlendirme kullanılmadı`
        ).toBe(true);
        expect(item.decisions.length, `${period}/${category}`).toBeGreaterThan(0);
        expect(
          item.decisions.every(decision => decisions.includes(decision.text)),
          `${period}/${category}: konu dışı karar`
        ).toBe(true);
        expect(speechText).not.toMatch(/Konuyla ilgili|Gündem başlığına ilişkin/);
      }
    }
  });

  it('son sınıfların yıl sonu kararlarını gelecek yılın kuruluna devretmez', () => {
    seedRandom(3);
    const graduating = generateMinutes(
      makeInfo('sene-sonu', 12), teachers, allEnabled('sene-sonu'), baseSettings
    );
    seedRandom(3);
    const continuing = generateMinutes(
      makeInfo('sene-sonu', 10), teachers, allEnabled('sene-sonu'), baseSettings
    );
    const followUps = (minutes: typeof graduating) =>
      minutes.agendaMinutes.flatMap(item => item.decisions.map(d => d.followUp));

    expect(followUps(graduating).length).toBeGreaterThan(0);
    expect(followUps(graduating).every(text => !/gelecek eğitim öğretim yılı/i.test(text)))
      .toBe(true);
    expect(followUps(continuing).every(text => /Gelecek eğitim öğretim yılı/.test(text)))
      .toBe(true);
  });

  it('karar sorumlusunu kararın niteliğine göre role dayalı belirler', () => {
    seedRandom(5);
    const result = generateMinutes(
      makeInfo('kasim'),
      teachers,
      [
        makeAgenda('devamsizlik'),
        makeAgenda('sosyal-duygusal'),
        makeAgenda('olcme-degerlendirme'),
        makeAgenda('okul-sagligi-isg')
      ],
      baseSettings
    );
    const responsibleOf = (index: number) => result.agendaMinutes[index].decisions[0].responsible;

    expect(responsibleOf(0)).toBe('Sınıf rehber öğretmeni Ahmet Yılmaz');
    expect(responsibleOf(1)).toBe('Rehberlik öğretmeni Işıl İnce');
    expect(responsibleOf(2)).toBe('Şube öğretmenleri');
    expect(responsibleOf(3)).toBe('Okul yönetimi ve şube öğretmenleri');
  });

  it('tek öğeli sınıf odağında sayı uyumunu korur', () => {
    seedRandom(1);
    const speech = generateMinutes(
      makeInfo('kasim', 11),
      [teachers[0]],
      [makeAgenda('akademik-basari')],
      { ...baseSettings, variationMode: 'manual', variationId: 3 }
    ).agendaMinutes[0].speeches[0].content;

    expect(speech).toContain('mesleki yönelim başlığına öncelik verilmesini');
    expect(speech).not.toContain('mesleki yönelim başlıklarına');
  });

  it('açılışta kurul başkanını anar, ad girilmemişse sabit metni kullanır', () => {
    seedRandom(1);
    const withChair = generateMinutes(
      makeInfo('kasim'), teachers, [makeAgenda('acilis', 'Açılış ve yoklama')], baseSettings
    ).agendaMinutes[0].bodyText ?? '';
    const withoutChair = generateMinutes(
      makeInfo('kasim', 9, { chairpersonName: '  ' }),
      teachers,
      [makeAgenda('acilis', 'Açılış ve yoklama')],
      baseSettings
    ).agendaMinutes[0].bodyText ?? '';

    expect(withChair).toContain('toplantısı, Ali Vural başkanlığında açıldı.');
    expect(withChair).toContain('Saygı duruşunda bulunulmasının ve İstiklal Marşı’nın okunmasının ardından');
    expect(withoutChair).toContain('toplantısı açıldı.');
    expect(withoutChair).not.toContain('başkanlığında');
  });

  it('gündem başlığını özet listesinde ve madde başlığında aynı biçimde yazar', () => {
    seedRandom(1);
    const result = generateMinutes(
      makeInfo('kasim'),
      teachers,
      [
        makeAgenda('genel', '29 Ekim Cumhuriyet Bayramı hazırlıkları', 'a'),
        makeAgenda('genel', 'YKS HAZIRLIK ÇALIŞMALARI', 'b')
      ],
      baseSettings
    );

    expect(result.agendaSummary).toEqual([
      '29 Ekim Cumhuriyet Bayramı hazırlıkları',
      'YKS hazırlık çalışmaları'
    ]);
    expect(result.agendaMinutes.map(item => item.agendaTitle)).toEqual(result.agendaSummary);
    expect(result.agendaMinutes[0].speeches[0].content)
      .toContain('29 Ekim Cumhuriyet Bayramı hazırlıkları maddesi kapsamında');
  });

  it('başlığı boş bilgilerle bozmaz ve konuşma yoksa karar üretmez', () => {
    seedRandom(1);
    const result = generateMinutes(
      makeInfo('kasim', 9, { schoolName: '  ', className: '' }),
      [],
      [makeAgenda('devamsizlik')],
      baseSettings
    );

    expect(result.title)
      .toBe('2026-2027 EĞİTİM ÖĞRETİM YILI KASIM AYI ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI');
    expect(result.agendaMinutes[0].speeches).toHaveLength(0);
    expect(result.agendaMinutes[0].decisions).toHaveLength(0);
  });
});

describe('branş adı ve konu türü', () => {
  it('elle yazılan branş adlarını tek biçime getirir', () => {
    expect(normalizeBranchName('  rehber   öğretmen ')).toBe('Rehberlik');
    expect(normalizeBranchName('Psikolojik Danışman')).toBe('Rehberlik');
    expect(normalizeBranchName('matematik öğretmeni')).toBe('Matematik');
    expect(normalizeBranchName('TÜRK DİLİ VE EDEBİYATI')).toBe('Türk Dili ve Edebiyatı');
    expect(normalizeBranchName('görsel iletişim ve tasarım')).toBe('Görsel İletişim ve Tasarım');
    expect(normalizeBranchName('   ')).toBe('');
    expect(isGuidanceBranch('PDR')).toBe(true);
    expect(isGuidanceBranch('Matematik')).toBe(false);
  });

  it('elle yazılmış rehberlik branşını yapay bir ders kalıbına dönüştürmez', () => {
    seedRandom(2);
    const result = generateMinutes(
      makeInfo('nisan'),
      [{ id: 'g', fullName: 'Işıl İnce', branch: 'rehber öğretmen', isClassTeacher: false }],
      [makeAgenda('olcme-degerlendirme'), makeAgenda('destekleme')],
      { ...baseSettings, speechLength: 'long' }
    );
    const text = result.agendaMinutes.flatMap(item => item.speeches)
      .map(speech => `${speech.branch} Öğretmeni: ${speech.content}`)
      .join(' ');

    expect(result.teachers[0].branch).toBe('Rehberlik');
    expect(text).toContain('Rehberlik Öğretmeni:');
    expect(text).not.toMatch(/Öğretmen Öğretmeni|rehber öğretmen dersi|Rehberlik dersi|Rehberlik alanı/i);
  });

  it('ek almış sözcüklerde de konu türünü doğru tahmin eder', () => {
    expect(resolveAgendaCategory('Okul güvenliği')).toBe('okul-sagligi-isg');
    expect(resolveAgendaCategory('Kulübün yıllık etkinliği')).toBe('etkinlik-sosyal');
    expect(resolveAgendaCategory('Katılım belgeleri')).toBe('genel');
    expect(resolveAgendaCategory('Derse katılım ve motivasyonun artırılmasına yönelik çalışmalar'))
      .toBe('motivasyon-katilim');
  });

  it('varsayılan gündemleri Yönerge Madde 10/(8) bentleriyle hizalar', () => {
    const titles = (period: MeetingPeriod, grade: GradeLevel) =>
      getDefaultAgendaForPeriod(period, grade).map(item => ({
        title: item.title,
        enabled: item.enabled,
        category: item.category
      }));

    // (a) Bir önceki toplantıda alınan kararlar: 9. sınıfın kasımdaki ilk
    // kurulunda görüşülecek önceki karar yoktur.
    const kasim9 = titles('kasim', 9).find(item => item.category === 'onceki-kararlar');
    const kasim10 = titles('kasim', 10).find(item => item.category === 'onceki-kararlar');
    expect(kasim9?.enabled).toBe(false);
    expect(kasim10?.enabled).toBe(true);
    for (const period of ['nisan', 'sene-sonu'] as MeetingPeriod[]) {
      const item = titles(period, 9).find(entry => entry.category === 'onceki-kararlar');
      expect(item?.enabled, period).toBe(true);
    }

    for (const period of ['kasim', 'nisan', 'sene-sonu'] as MeetingPeriod[]) {
      const all = titles(period, 10).map(item => item.title).join(' | ');
      expect(all).toMatch(/başarı/i);
      expect(all).toMatch(/öğretim program/i);
      expect(all).toMatch(/kaynaştırma\/bütünleştirme/i);
      expect(all).toMatch(/atölye ve laboratuvar/i);
      expect(all).toMatch(/okul-çevre/i);
      expect(all).toMatch(/yarışma/i);
      expect(all).toMatch(/kişilik ve sosyal geliş/i);
      expect(all).toMatch(/değerler eğitimi/i);
      expect(all).toMatch(/iş sağlığı ve güvenliği/i);
    }
  });

  it('önceki kararlar maddesindeki her konuşmada kararlara değinir', () => {
    for (const period of ['kasim', 'nisan', 'sene-sonu'] as MeetingPeriod[]) {
      for (let seed = 1; seed <= 5; seed++) {
        seedRandom(seed * 13);
        const item = generateMinutes(
          makeInfo(period, 10),
          teachers,
          [makeAgenda('onceki-kararlar', 'Bir önceki toplantıda alınan kararlar')],
          { ...baseSettings, speechLength: 'short' }
        ).agendaMinutes[0];
        for (const speech of item.speeches) {
          expect(speech.content, `${period}/${seed}`).toMatch(/karar/i);
        }
        expect(item.decisions.every(decision => /karar.*karar verildi\.$/i.test(decision.text)), period)
          .toBe(true);
      }
    }
  });

  it('rehberlik öğretmenine ders öğretmenine özgü sınav ve kazanım iddiaları yazmaz', () => {
    const guidance: Teacher[] = [
      { id: 'g', fullName: 'Işıl İnce', branch: 'Rehberlik', isClassTeacher: false }
    ];
    for (const period of ['kasim', 'nisan', 'sene-sonu'] as MeetingPeriod[]) {
      for (const category of ['akademik-basari', 'olcme-degerlendirme', 'destekleme'] as const) {
        for (let seed = 1; seed <= 6; seed++) {
          seedRandom(seed * 101);
          const speech = generateMinutes(
            makeInfo(period, 11),
            guidance,
            [makeAgenda(category)],
            { ...baseSettings, tone: 'detailed', speechLength: 'long' }
          ).agendaMinutes[0].speeches[0].content;
          expect(speech, `${period}/${category}`).not.toMatch(
            /sınav sonuçlarını (?:analiz|inceley|karşılaştır)|konu eksik|dersine ait|dersinde|kazanım bazında|sosyal-duygusal gelişim|veli görüşmesi üzerine/i
          );
        }
      }
    }
  });

  it('genel maddede başlığı yalnız ilk konuşmacı anar', () => {
    for (let seed = 1; seed <= 6; seed++) {
      seedRandom(seed * 7);
      const title = 'Sınıf panosu güncelleme planının görüşülmesi';
      const item = generateMinutes(
        makeInfo('kasim', 10),
        teachers,
        [{ ...makeAgenda('genel', title), speakerCountMode: 'four' }],
        baseSettings
      ).agendaMinutes[0];
      expect(item.speeches[0].content).toContain(`${title} maddesi kapsamında`);
      for (const speech of item.speeches.slice(1)) {
        expect(speech.content).not.toContain(title);
      }
    }

    // Uzun başlık ilk konuşmada da yinelenmez.
    seedRandom(3);
    const longTitle =
      'Okul bahçesinde yürütülecek çevre düzenlemesi ve ağaçlandırma çalışmalarında öğrenci görevlendirmelerinin planlanması';
    const longItem = generateMinutes(
      makeInfo('kasim', 10),
      teachers,
      [makeAgenda('genel', longTitle)],
      baseSettings
    ).agendaMinutes[0];
    expect(longItem.speeches.map(speech => speech.content).join(' ')).not.toContain(longTitle);
  });

  it('konuşmaları farklı biçimlerde açar ve öneri yüklemlerini belgeye dağıtır', () => {
    seedRandom(2026);
    const result = generateMinutes(
      makeInfo('nisan', 11),
      teachers,
      getDefaultAgendaForPeriod('nisan', 11),
      baseSettings
    );
    const speeches = result.agendaMinutes.flatMap(item => item.speeches);
    const firstSentences = speeches.map(speech => speech.content.split(/(?<=\.)\s+/)[0]);
    const agreements = firstSentences.filter(sentence => /öğretmeninin .*(?:katıl|destekle)/.test(sentence));
    const topicOpenings = firstSentences.filter(sentence =>
      /(?:bakımından|açısından|hakkında|konusunda|kapsamında|ilgili olarak) /.test(sentence)
    );

    // Konuşmaların hepsi "… bakımından … paylaştı" kalıbıyla açılmaz.
    expect(topicOpenings.length).toBeLessThan(speeches.length * 0.8);
    expect(agreements.length).toBeGreaterThan(0);

    // Öneriler tek bir kalıba yığılmaz: belgede en az altı farklı öneri
    // yüklemi kullanılır ve eskiden baskın olan "öncelikli gördü" sınırlı kalır.
    const text = speeches.map(speech => speech.content).join(' ');
    const suggestionEndings = [
      'önerdi.', 'gerektiğine dikkat çekti.', 'yönünde görüş bildirdi.',
      'yararlı olacağını belirtti.', 'önemli buldu.', 'gerekli gördü.',
      'önerisinde bulundu.', 'önemine değindi.', 'öncelikli gördü.'
    ];
    const used = suggestionEndings.filter(ending => text.includes(` ${ending}`));
    expect(used.length).toBeGreaterThanOrEqual(6);
    expect((text.match(/ öncelikli gördü\./g) ?? []).length).toBeLessThanOrEqual(4);
  });

  it('konuşmacı kendi branşından birine katıldığını yazmaz ve aynı kökü art arda yinelemez', () => {
    const sameBranch: Teacher[] = [
      { id: 'm1', fullName: 'Okan Su', branch: 'Matematik', isClassTeacher: false },
      { id: 'm2', fullName: 'Ece Gül', branch: 'Matematik', isClassTeacher: true }
    ];
    for (let seed = 1; seed <= 10; seed++) {
      seedRandom(seed * 31);
      const result = generateMinutes(
        makeInfo('kasim', 10),
        sameBranch,
        getDefaultAgendaForPeriod('kasim', 10),
        baseSettings
      );
      for (const speech of result.agendaMinutes.flatMap(item => item.speeches)) {
        expect(speech.content).not.toMatch(/^Matematik öğretmeninin/);
        expect(speech.content).not.toMatch(
          /(?<!\p{L})önem\p{L}*[^.]*\.\s+[^.]*önem\p{L}* (?:buldu|değindi)\.|öncelik verilmesini önerdi\.\s+[^.]*öncelikli gördü\./u
        );
      }
    }
  });
});
