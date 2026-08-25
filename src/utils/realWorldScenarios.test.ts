import { describe, expect, it, vi } from 'vitest';
import { allBranches, getBranchStyle } from '../data/branchSpeechStyles';
import { getDefaultAgendaForPeriod } from '../data/periodAgendas';
import { getPeriodProfile } from '../data/meetingPeriods';
import type {
  AchievementLevelId,
  GenerationSettings,
  GradeLevel,
  MeetingInfo,
  MeetingPeriod,
  Teacher
} from '../types';
import { generateMinutes } from './generateMinutes';
import { lowercaseSentenceStartTr } from './textFormat';

const periods: MeetingPeriod[] = ['sene-basi', 'ikinci-donem', 'sene-sonu'];
const levels: AchievementLevelId[] = [
  'veryHigh',
  'high',
  'medium',
  'needsSupport',
  'low',
  'mixed'
];
const grades: GradeLevel[] = [9, 10, 11, 12];
const tones: GenerationSettings['tone'][] = ['official', 'balanced', 'detailed'];
const lengths: GenerationSettings['speechLength'][] = ['short', 'medium', 'long'];
const randomValues = [0, 0.34, 0.68, 0.999];

const teachers: Teacher[] = [
  { id: 'class', fullName: 'AYŞE YILMAZ', branch: 'Matematik', isClassTeacher: true },
  { id: 'literature', fullName: 'MEHMET DEMİR', branch: 'Türk Dili ve Edebiyatı', isClassTeacher: false },
  { id: 'guidance', fullName: 'SELİN ÖZTÜRK', branch: 'Rehberlik', isClassTeacher: false },
  { id: 'language', fullName: 'IŞIL ÖZDOĞAN', branch: 'Arapça', isClassTeacher: false },
  { id: 'arts', fullName: 'CAN AKIN', branch: 'Drama', isClassTeacher: false },
  { id: 'project', fullName: 'ECE ŞAHİN', branch: 'Proje Hazırlama', isClassTeacher: false }
];

const makeMeetingInfo = (
  period: MeetingPeriod,
  classAchievementLevel: AchievementLevelId,
  gradeLevel: GradeLevel
): MeetingInfo => ({
  schoolName: 'Atatürk Anadolu Lisesi',
  academicYear: '2026-2027',
  period,
  term: getPeriodProfile(period).termLabel,
  date: period === 'sene-basi' ? '2026-09-10' : '2027-02-08',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: `${gradeLevel}/A`,
  gradeLevel,
  classAchievementLevel,
  chairpersonId: '',
  clerkId: ''
});

describe('gerçek dünya toplantı senaryoları', () => {
  it('tüm dönem, sınıf, başarı, anlatım ve uzunluk birleşimlerini doğal üretir', () => {
    const random = vi.spyOn(Math, 'random');
    const forbidden =
      /RAM['’][ae]|koruma kurum|ev ziyaret|risk altındaki|öğrenme güçlüğü tanısı|madde bağımlılığı|şiddet|ihmal|ihtiyaç duyulan öğrencilerin|öğrencilerin gelecek yıl için not edilmesi|gözlem ve önerilerini aktardı|değerlendirmede bulundu|belirtildi|ifade edildi|vurgulandı|gözlemlendi/i;

    let scenarioCount = 0;

    for (const period of periods) {
      for (const level of levels) {
        for (const gradeLevel of grades) {
          for (const tone of tones) {
            for (const speechLength of lengths) {
              for (const randomValue of randomValues) {
                random.mockReturnValue(randomValue);
                const result = generateMinutes(
                  makeMeetingInfo(period, level, gradeLevel),
                  teachers,
                  getDefaultAgendaForPeriod(period),
                  {
                    variationMode: 'random',
                    variationId: 1,
                    tone,
                    speechLength
                  }
                );
                const speechText = result.agendaMinutes
                  .flatMap(item => item.speeches.map(speech => speech.content))
                  .join(' ');
                const allText = result.agendaMinutes.flatMap(item => [
                  item.bodyText ?? '',
                  ...item.speeches.map(speech => speech.content),
                  ...item.decisions
                ]).join(' ');

                scenarioCount += 1;
                expect(result.teachers).toHaveLength(teachers.length);
                expect('absentTeachers' in result).toBe(false);
                expect(result.agendaMinutes[0].bodyText)
                  .toContain('adı bulunan tüm öğretmenlerin toplantıya katıldığı');
                expect(speechText).not.toMatch(forbidden);

                for (const item of result.agendaMinutes) {
                  for (const speech of item.speeches) {
                    expect(speech.content).toMatch(/^[A-ZÇĞİÖŞÜ]/);
                    expect(speech.content).not.toMatch(/[.!?]{2,}/);
                    expect((speech.content.match(/ önerdi\./g) ?? []).length)
                      .toBeLessThanOrEqual(1);
                    expect(`${speech.branch} Öğretmeni ${speech.teacherName} ${lowercaseSentenceStartTr(speech.content)}`)
                      .not.toContain(`${speech.teacherName}:`);
                  }
                }

                if (period === 'sene-basi') {
                  expect(allText).not.toMatch(/Yıl sonu itibarıyla|İkinci dönemde|Birinci dönem karne/i);
                } else if (period === 'ikinci-donem') {
                  expect(allText).not.toMatch(/Yıl sonu itibarıyla|gelecek eğitim öğretim yılına|yıl başından itibaren/i);
                } else {
                  expect(allText).not.toMatch(/Dönem başında|İkinci dönemde|Birinci dönem karne/i);
                }
              }
            }
          }
        }
      }
    }

    expect(scenarioCount).toBe(2_592);
  }, 120_000);

  it('tüm branş başlangıçlarını büyük harfli ve doğal bir yapıda tutar', () => {
    for (const branch of allBranches) {
      for (const starter of getBranchStyle(branch).sentenceStarters) {
        expect(starter, `${branch}: ${starter}`).toMatch(/^[A-ZÇĞİÖŞÜ]/);
        expect(starter).not.toMatch(
          /dinleme ve konuşma becerileri ve okuma ve anlama|uygulama ve performans ve estetik|dayanıklılık ve koordinasyon ve takım çalışması|araştırma ve veri toplama ve sürdürülebilirlik/i
        );
      }
    }
  });

  it('branş başlangıcını doğal olmayan “becerilerinde söz alarak” dizisine bağlamaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.68);

    const result = generateMinutes(
      makeMeetingInfo('sene-basi', 'medium', 10),
      [teachers[0]],
      [{
        id: 'academic',
        title: 'Akademik gelişimin değerlendirilmesi',
        enabled: true,
        category: 'akademik-basari',
        speakerCountMode: 'two'
      }],
      {
        variationMode: 'manual',
        variationId: 1,
        tone: 'balanced',
        speechLength: 'long'
      }
    );

    expect(result.agendaMinutes[0].speeches[0].content)
      .not.toMatch(/\bbecerilerinde söz alarak\b/i);
  });

  it('12. sınıf sene sonu tutanağını mezuniyet bağlamında tutar', () => {
    const random = vi.spyOn(Math, 'random');

    for (const randomValue of randomValues) {
      random.mockReturnValue(randomValue);
      const result = generateMinutes(
        makeMeetingInfo('sene-sonu', 'medium', 12),
        teachers,
        getDefaultAgendaForPeriod('sene-sonu'),
        {
          variationMode: 'manual',
          variationId: 1,
          tone: 'detailed',
          speechLength: 'long'
        }
      );
      const allText = result.agendaMinutes.flatMap(item => [
        item.agendaTitle,
        item.bodyText ?? '',
        ...item.speeches.map(speech => speech.content),
        ...item.decisions
      ]).join(' ');

      expect(allText).toMatch(/mezuniyet|mezun olan/i);
      expect(allText).not.toMatch(
        /gelecek yıl|gelecek eğitim öğretim yılı|bir sonraki eğitim öğretim yılı/i
      );
    }
  });

  it('ölçme konuşmasına konu dışı rastgele branş önerisi sızdırmaz', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    const speech = generateMinutes(
      makeMeetingInfo('sene-sonu', 'medium', 11),
      [teachers[2]],
      [{
        id: 'assessment',
        title: 'Yıl sonu ölçme sonuçlarının değerlendirilmesi',
        enabled: true,
        category: 'olcme-degerlendirme',
        speakerCountMode: 'two'
      }],
      {
        variationMode: 'manual',
        variationId: 1,
        tone: 'detailed',
        speechLength: 'long'
      }
    ).agendaMinutes[0].speeches[0].content;

    expect(speech).toMatch(/ölçme|değerlendirme|sonuç/i);
    expect(speech).not.toMatch(
      /veli görüşmelerinin artırılması|motivasyon artırıcı etkinlik|sosyal-duygusal gelişim programlarının uygulanması/i
    );
  });

  it('otomatik genel içeriği kullanıcının gündem başlığına bağlar', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const item = generateMinutes(
      makeMeetingInfo('sene-basi', 'medium', 10),
      [teachers[0]],
      [{
        id: 'trip',
        title: 'Okul gezisi hazırlıklarının görüşülmesi',
        enabled: true,
        category: 'auto',
        speakerCountMode: 'two'
      }],
      {
        variationMode: 'manual',
        variationId: 1,
        tone: 'balanced',
        speechLength: 'medium'
      }
    ).agendaMinutes[0];

    expect(item.speeches[0].content)
      .toContain('Okul gezisi hazırlıklarının görüşülmesi maddesi kapsamında');
  });

  it('öğretmen öznesinden sonra dil adlarının yazımını korur', () => {
    const english = lowercaseSentenceStartTr(
      'İngilizce dersindeki ölçme sonuçlarını değerlendirdi.'
    );
    const literature = lowercaseSentenceStartTr(
      'Türk dili ve edebiyatı alanındaki gelişimi değerlendirdi.'
    );

    expect(`İngilizce Öğretmeni Ayşe Yılmaz ${english}`)
      .toContain('Ayşe Yılmaz İngilizce dersindeki');
    expect(`Türk Dili ve Edebiyatı Öğretmeni Mehmet Demir ${literature}`)
      .toContain('Mehmet Demir Türk dili ve edebiyatı alanındaki');
  });
});
