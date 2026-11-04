import { describe, expect, it, vi } from 'vitest';
import type {
  AchievementLevelId,
  AgendaCategory,
  GenerationSettings,
  GradeLevel,
  MeetingInfo,
  Teacher
} from '../types';
import { achievementLevels } from '../data/achievementLevels';
import { allBranches } from '../data/branchSpeechStyles';
import { generateMinutes } from './generateMinutes';

const runCorpusAudit = process.env.RUN_CORPUS_AUDIT === '1';

const grades: GradeLevel[] = [9, 10, 11, 12];
const levels: AchievementLevelId[] = [
  'veryHigh',
  'high',
  'medium',
  'needsSupport',
  'low',
  'mixed'
];
const categories: Exclude<AgendaCategory, 'auto' | 'acilis' | 'kapanis'>[] = [
  'akademik-basari',
  'devamsizlik',
  'davranis-disiplin',
  'motivasyon-katilim',
  'sosyal-duygusal',
  'olcme-degerlendirme',
  'veli-iletisim',
  'destekleme',
  'dilek-temenniler',
  'genel'
];
const tones: GenerationSettings['tone'][] = ['official', 'balanced', 'detailed'];
const lengths: GenerationSettings['speechLength'][] = ['short', 'medium', 'long'];

const normalizeDecision = (decision: string): string =>
  decision
    .replace(/karar verilmiştir\.$/, 'karar verildi.')
    .replace(/uygun görülmüştür\.$/, 'uygun görüldü.')
    .replace(/kararlaştırılmıştır\.$/, 'kararlaştırıldı.')
    .replace(/önerilmiştir\.$/, 'önerildi.')
    .replace(/planlanmıştır\.$/, 'planlandı.');

const achievementDecisions = new Set(
  achievementLevels.flatMap(level =>
    level.versions.flatMap(version => version.decisionHints.map(normalizeDecision))
  )
);

describe('geniş Türkçe üretim korpusu', () => {
  it.skipIf(!runCorpusAudit)(
    'tüm sınıf, başarı, branş, gündem, üslup ve uzunluk kombinasyonlarını denetler',
    () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.63);
      const failures: string[] = [];
      let sampleCount = 0;

      for (const gradeLevel of grades) {
        for (const classAchievementLevel of levels) {
          for (const branch of allBranches) {
            const teacher: Teacher = {
              id: 'teacher',
              fullName: 'ÖRNEK ÖĞRETMEN',
              branch,
              isClassTeacher: false
            };

            for (const category of categories) {
              for (const tone of tones) {
                for (const speechLength of lengths) {
                  const info: MeetingInfo = {
                    schoolName: 'Atatürk Lisesi',
                    academicYear: '2026-2027',
                    period: 'kasim',
                    term: '1. Dönem',
                    date: '2026-09-10',
                    time: '15:30',
                    location: 'Öğretmenler Odası',
                    className: `${gradeLevel}/İ`,
                    gradeLevel,
                    classAchievementLevel,
                    chairpersonName: 'Ali Vural',
                    chairpersonTitle: 'Müdür Yardımcısı',
                    clerkId: '',
                    principalName: 'Ayşe Kaya'
                  };
                  const result = generateMinutes(
                    info,
                    [teacher],
                    [{
                      id: 'agenda',
                      title: `${category} gündemi`,
                      enabled: true,
                      category,
                      speakerCountMode: 'two'
                    }],
                    {
                      variationMode: 'manual',
                      variationId: 1,
                      tone,
                      speechLength
                    }
                  );
                  const item = result.agendaMinutes[0];
                  const speech = item.speeches[0]?.content ?? '';
                  const allText = `${speech} ${item.decisions.map(d => d.text).join(' ')}`;
                  const key =
                    `${gradeLevel}/${classAchievementLevel}/${branch}/${category}/${tone}/${speechLength}`;

                  sampleCount += 1;

                  if (!speech || /\bundefined\b|\bNaN\b/.test(allText)) {
                    failures.push(`${key}: eksik/yapısal bozuk metin`);
                  }
                  if (/[.!?]{2,}/.test(allText) || /gerektiğini\s+gerektiğini/i.test(allText)) {
                    failures.push(`${key}: yinelenen noktalama veya yüklem`);
                  }
                  if (/\baçısından\b[^.!?]{0,120}\baçısından\b/i.test(allText)) {
                    failures.push(`${key}: aynı cümlede yinelenen “açısından”`);
                  }
                  if (
                    /karar verilmiştir|uygun görülmüştür|kararlaştırılmıştır|önerilmiştir|planlanmıştır|gözlemlenmektedir|gözlemlendi|gerekmektedir|belirtildi|ifade edildi|vurgulandı/i
                      .test(allText)
                  ) {
                    failures.push(`${key}: tutarsız zaman/üslup`);
                  }
                  if (
                    /seçilen varyasyon|varyasyon odağı|odak doğrultusunda|dersi bağlamında|branşın yapısına|içerik havuzu|konu kategorisi|gözlem ve önerilerini aktardı|değerlendirmede bulundu/i
                      .test(allText)
                  ) {
                    failures.push(`${key}: uygulama içi/teknik kalıp`);
                  }
                  if (item.decisions.some(decision => achievementDecisions.has(decision.text))) {
                    failures.push(`${key}: doğrulanmamış başarı düzeyi kararı`);
                  }
                  if (category === 'dilek-temenniler' && item.decisions.length > 0) {
                    failures.push(`${key}: dilek ve temennilerde karar üretildi`);
                  }
                  if (
                    category !== 'akademik-basari'
                    && speech.includes('Seçilen varyasyon odağı')
                  ) {
                    failures.push(`${key}: varyasyon başka gündeme sızdı`);
                  }
                  if (item.speeches[0]?.branch !== branch) {
                    failures.push(`${key}: konuşmacının branş bilgisi kayboldu`);
                  }
                  if (!/^[A-ZÇĞİÖŞÜ]/.test(speech)) {
                    failures.push(`${key}: konuşma küçük harfle başladı`);
                  }
                  if ((speech.match(/ önerdi\./g) ?? []).length > 1) {
                    failures.push(`${key}: aynı konuşmada “önerdi” yüklemi yinelendi`);
                  }
                  if (branch === 'Rehberlik' && /Rehberlik dersi(?:ne|nde|yle)?/i.test(speech)) {
                    failures.push(`${key}: Rehberlik branşı yapay ders kalıbına dönüştü`);
                  }
                  if (
                    /RAM['’][ae]|koruma kurum|ev ziyaret|risk altındaki|öğrenme güçlüğü tanısı|madde bağımlılığı|şiddet|ihmal/i
                      .test(allText)
                  ) {
                    failures.push(`${key}: ağır veya doğrulanmamış ifade`);
                  }
                  if (
                    /ihtiyaç duyulan öğrencilerin|öğrencilerin gelecek yıl için not edilmesi/i
                      .test(allText)
                  ) {
                    failures.push(`${key}: anlam ilişkisi bozuk ifade`);
                  }

                  if (failures.length >= 20) {
                    throw new Error(failures.join('\n'));
                  }
                }
              }
            }
          }
        }
      }

      expect(failures, failures.join('\n')).toEqual([]);
      expect(sampleCount).toBe(138_240);
    },
    120_000
  );
});
