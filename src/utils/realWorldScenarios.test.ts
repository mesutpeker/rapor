import { describe, expect, it, vi } from 'vitest';
import { allBranches, getBranchStyle } from '../data/branchSpeechStyles';
import { getDefaultAgendaForPeriod } from '../data/periodAgendas';
import { getPeriodProfile } from '../data/meetingPeriods';
import type {
  AchievementLevelId,
  GenerationSettings,
  MeetingInfo,
  MeetingPeriod,
  Teacher
} from '../types';
import { generateMinutes } from './generateMinutes';

const periods: MeetingPeriod[] = ['sene-basi', 'ikinci-donem', 'sene-sonu'];
const levels: AchievementLevelId[] = [
  'veryHigh',
  'high',
  'medium',
  'needsSupport',
  'low',
  'mixed'
];
const randomValues = [0, 0.17, 0.34, 0.51, 0.68, 0.85, 0.999];

const teachers: Teacher[] = [
  { id: 'class', fullName: 'AYŞE YILMAZ', branch: 'Matematik', isClassTeacher: true },
  { id: 'literature', fullName: 'MEHMET DEMİR', branch: 'Türk Dili ve Edebiyatı', isClassTeacher: false },
  { id: 'guidance', fullName: 'SELİN ÖZTÜRK', branch: 'Rehberlik', isClassTeacher: false },
  { id: 'language', fullName: 'IŞIL ÖZDOĞAN', branch: 'Arapça', isClassTeacher: false },
  { id: 'arts', fullName: 'CAN AKIN', branch: 'Drama', isClassTeacher: false },
  { id: 'project', fullName: 'ECE ŞAHİN', branch: 'Proje Hazırlama', isClassTeacher: false }
];

const settings: GenerationSettings = {
  variationMode: 'manual',
  variationId: 1,
  tone: 'detailed',
  speechLength: 'long'
};

const makeMeetingInfo = (
  period: MeetingPeriod,
  classAchievementLevel: AchievementLevelId
): MeetingInfo => ({
  schoolName: 'Atatürk Anadolu Lisesi',
  academicYear: '2026-2027',
  period,
  term: getPeriodProfile(period).termLabel,
  date: period === 'sene-basi' ? '2026-09-10' : '2027-02-08',
  time: '15:30',
  location: 'Öğretmenler Odası',
  className: '10/A',
  gradeLevel: 10,
  classAchievementLevel,
  chairpersonId: '',
  clerkId: ''
});

describe('gerçek dünya toplantı senaryoları', () => {
  it('üç dönemi, tüm başarı düzeylerini ve farklı rastgele seçimleri güvenli üretir', () => {
    const random = vi.spyOn(Math, 'random');
    const forbidden =
      /RAM['’][ae]|koruma kurum|ev ziyaret|risk altındaki|öğrenme güçlüğü tanısı|madde bağımlılığı|şiddet|ihmal|ihtiyaç duyulan öğrencilerin|öğrencilerin gelecek yıl için not edilmesi/i;

    for (const period of periods) {
      for (const level of levels) {
        for (const randomValue of randomValues) {
          random.mockReturnValue(randomValue);
          const result = generateMinutes(
            makeMeetingInfo(period, level),
            teachers,
            getDefaultAgendaForPeriod(period),
            settings
          );
          const allText = result.agendaMinutes.flatMap(item => [
            item.bodyText ?? '',
            ...item.speeches.map(speech => speech.content),
            ...item.decisions
          ]).join(' ');

          expect(result.teachers).toHaveLength(teachers.length);
          expect('absentTeachers' in result).toBe(false);
          expect(result.agendaMinutes[0].bodyText)
            .toContain('adı bulunan tüm öğretmenlerin toplantıya katıldığı');
          expect(allText).not.toMatch(forbidden);

          for (const item of result.agendaMinutes) {
            for (const speech of item.speeches) {
              expect(speech.content).toMatch(/^[A-ZÇĞİÖŞÜ]/);
              expect(speech.content).not.toMatch(/[.!?]{2,}/);
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
  });

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
});
