import type { 
  MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes,
  TeacherSpeech, AgendaMinutes, AchievementLevelId
} from '../types';
import { getGradeProfile } from '../data/gradeProfiles';
import { getAchievementLevel } from '../data/achievementLevels';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { resolveAgendaCategory } from '../data/agendaItems';
import { getCategoryContent, academicCategories } from '../data/categorySpeechContent';
import { getPeriodContent } from '../data/periodContent';
import { getPeriodProfile } from '../data/meetingPeriods';
import { generalDecisions } from '../data/decisionTemplates';
import { getRandomItem, getRandomInt } from './randomizer';
import { capitalizeSentenceStartTr, toTitleCaseTr } from './textFormat';
import { selectTeachersForAgenda } from './teacherSelector';
import { v4 as uuidv4 } from 'uuid';

const TR = 'tr-TR';

const achievementSpeechSummaries: Record<AchievementLevelId, string> = {
  veryHigh:
    'Sınıfın yüksek akademik performansının korunması ve öğrencilerin çok yönlü gelişimlerinin dengeli biçimde izlenmesi gerektiğini vurguladı.',
  high:
    'Sınıfın güçlü akademik performansının sürdürülmesi ve bireysel gelişim farklılıklarının düzenli izlenmesi gerektiğini vurguladı.',
  medium:
    'Sınıfın akademik gelişimini güçlendirmek amacıyla temel kazanımların ve çalışma alışkanlıklarının düzenli izlenmesi gerektiğini vurguladı.',
  needsSupport:
    'Akademik desteğe ihtiyaç duyan öğrenciler için ulaşılabilir hedefler belirlenerek bireysel takip yapılması gerektiğini vurguladı.',
  low:
    'Temel kazanım eksikliklerinin önceliklendirilmesi ve her öğrencinin mevcut düzeyine göre desteklenmesi gerektiğini vurguladı.',
  mixed:
    'Farklı başarı düzeylerindeki öğrenciler için çeşitlendirilmiş çalışmalar planlanması ve her öğrencinin kendi gelişimi içinde izlenmesi gerektiğini vurguladı.'
};

const getBranchContextSentence = (branch: string, category: string): string => {
  switch (category) {
    case 'devamsizlik':
      return `${branch} dersine devamın ve ders takibinin düzenli olarak izlenmesi gerektiğini ifade etti.`;
    case 'davranis-disiplin':
      return `${branch} dersindeki sorumluluk, sınıf kurallarına uyum ve çalışma düzeninin birlikte takip edilmesi gerektiğini ifade etti.`;
    case 'motivasyon-katilim':
      return `${branch} dersine katılımı artırmak için öğrencilerin ilgi ve ihtiyaçlarına uygun etkinliklerin çeşitlendirilmesi gerektiğini ifade etti.`;
    case 'sosyal-duygusal':
      return `${branch} dersindeki öğrenci etkileşimlerinin güvenli, destekleyici ve kapsayıcı bir ortam içinde yürütülmesi gerektiğini ifade etti.`;
    case 'veli-iletisim':
      return `${branch} dersindeki gelişim ve ihtiyaçların velilerle somut, açık ve düzenli biçimde paylaşılması gerektiğini ifade etti.`;
    case 'dilek-temenniler':
      return `${branch} dersindeki çalışmaların öğrenci yararı gözetilerek iş birliği içinde sürdürülmesi yönündeki temennilerini paylaştı.`;
    default:
      return `${branch} dersiyle ilgili hedeflerin öğrenci ihtiyaçları doğrultusunda izlenmesi ve gerekli güncellemelerin yapılması gerektiğini ifade etti.`;
  }
};

const normalizeDecisionStyle = (decision: string): string =>
  decision
    .replace(/karar verilmiştir\.$/, 'karar verildi.')
    .replace(/uygun görülmüştür\.$/, 'uygun görüldü.')
    .replace(/kararlaştırılmıştır\.$/, 'kararlaştırıldı.')
    .replace(/önerilmiştir\.$/, 'önerildi.')
    .replace(/planlanmıştır\.$/, 'planlandı.');

export const generateMinutes = (
  meetingInfo: MeetingInfo,
  teachers: Teacher[],
  agendaItems: AgendaItem[],
  settings: GenerationSettings
): GeneratedMinutes => {
  const gradeProfile = getGradeProfile(meetingInfo.gradeLevel);
  const achievementLevel = getAchievementLevel(meetingInfo.classAchievementLevel);
  const periodProfile = getPeriodProfile(meetingInfo.period);
  
  let variation = gradeProfile.variations[0];
  if (settings.variationMode === 'manual' && settings.variationId) {
    variation = gradeProfile.variations.find(v => v.id === settings.variationId) || variation;
  } else {
    variation = getRandomItem(gradeProfile.variations);
  }

  const agendaMinutes: AgendaMinutes[] = [];
  const speakerHistory: string[] = [];
  let agendaNumber = 1;

  // Seçilen anlatım biçimi konuşmaların ifade tarzını gerçekten değiştirir.
  const speechOpenersByTone: Record<GenerationSettings['tone'], string[]> = {
    official: [
      'konuya ilişkin değerlendirmelerini kurul üyeleriyle paylaştı',
      'görüş ve önerilerini tutanağa sundu',
      'maddeye ilişkin resmî değerlendirmede bulundu',
      'kurula yönelik görüşlerini ifade etti'
    ],
    balanced: [
      'görüşlerini dile getirdi',
      'değerlendirmelerini paylaştı',
      'konuya ilişkin görüşlerini aktardı',
      'gözlem ve önerilerini aktardı',
      'değerlendirmede bulundu'
    ],
    detailed: [
      'konuyu farklı yönleriyle ele alarak değerlendirmelerini paylaştı',
      'gözlem ve önerilerini gerekçeleriyle birlikte aktardı',
      'öğrenci ihtiyaçlarını ve uygulanabilir adımları ayrıntılı biçimde değerlendirdi',
      'mevcut durumu ve izlenebilecek yolu ayrıntılı biçimde ifade etti'
    ]
  };
  const speechOpeners = speechOpenersByTone[settings.tone];

  // Her öğretmen için kullanılmış (branşa özel) ifadeleri takip et: aynı
  // öğretmenin farklı gündem maddelerinde aynı branş cümlelerini tekrarlamasını
  // önler. Konuya özgü ve giriş cümleleri ise madde-içi setlerle takip edilir.
  type UsedSets = {
    focus: Set<string>;
    suggestions: Set<string>;
  };
  const usedByTeacher = new Map<string, UsedSets>();
  const getUsed = (id: string): UsedSets => {
    let u = usedByTeacher.get(id);
    if (!u) {
      u = {
        focus: new Set(),
        suggestions: new Set()
      };
      usedByTeacher.set(id, u);
    }
    return u;
  };

  // Havuzdan, o öğretmenin daha önce kullanmadığı bir öğe seç; hepsi
  // kullanıldıysa havuzu sıfırlayıp baştan başla.
  const pickUnused = (arr: string[], used: Set<string>): string => {
    const available = arr.filter(x => !used.has(x));
    const pool = available.length ? available : arr;
    if (!available.length) used.clear();
    const choice = pool[Math.floor(Math.random() * pool.length)];
    used.add(choice);
    return choice;
  };

  // Sınıf düzeyine ait (öğretmenden bağımsız) genel cümleler için: belge genelinde
  // her cümle yalnızca bir kez kullanılsın ki her konuşmada tekrarlanmasın.
  const usedVariationGlobal = new Set<string>();
  let achievementSummaryUsed = false;
  // Aynı kararın belge genelinde tekrar etmesini önler.
  const usedDecisionsGlobal = new Set<string>();
  const pickGlobalOnce = (arr: string[], used: Set<string>): string | null => {
    const available = arr.filter(x => !used.has(x));
    if (!available.length) return null;
    const choice = available[Math.floor(Math.random() * available.length)];
    used.add(choice);
    return choice;
  };

  for (const agenda of agendaItems) {
    if (!agenda.enabled) continue;

    const category = resolveAgendaCategory(agenda.title, agenda.category);
    
    // Konuşmacı sayısını belirle
    let speakerCount = 2;
    if (agenda.speakerCountMode === 'three') speakerCount = 3;
    if (agenda.speakerCountMode === 'four') speakerCount = 4;
    if (agenda.speakerCountMode === 'random') speakerCount = getRandomInt(2, 4);
    
    // Açılış ve Kapanış için özel durum — döneme özgü anlatı metni eklenir.
    if (category === 'acilis' || category === 'kapanis') {
      agendaMinutes.push({
        agendaId: agenda.id,
        agendaTitle: agenda.title,
        agendaNumber: agendaNumber++,
        speeches: [],
        decisions: [],
        bodyText: category === 'acilis' ? periodProfile.openingText : periodProfile.closingText
      });
      continue;
    }

    const selectedTeachers = selectTeachersForAgenda(teachers, category, speakerCount, speakerHistory);
    const speeches: TeacherSpeech[] = [];

    // Maddeye (konuya) özgü içerik havuzu ve branş içeriğinin yerinde olup
    // olmadığı bilgisi
    const catContent = getCategoryContent(category);
    // Döneme özgü içerik (sene başı / 2. dönem / sene sonu bakış açısı)
    const perContent = getPeriodContent(meetingInfo.period, category);
    const isAcademic = academicCategories.has(category);

    // Döneme özgü bir havuz varsa yalnızca onu kullan. Dizi sırasının rastgele
    // seçimde ağırlık oluşturmadığı için dönem ve genel havuzları birleştirmek,
    // sene başında yıl sonu değerlendirmesi gibi zamansal kopukluklara yol
    // açıyordu. Genel havuz yalnızca dönem içeriği bulunmadığında yedektir.
    const observationPool = perContent.observations?.length
      ? perContent.observations
      : catContent.observations;
    const suggestionPool = perContent.suggestions?.length
      ? perContent.suggestions
      : catContent.suggestions;

    // Madde-içi tekrarsızlık: aynı gündem maddesinde konuşan farklı öğretmenlerin
    // paylaşılan havuzlardan (giriş cümlesi, fiil, konuya özgü gözlem/öneri) AYNI
    // ifadeyi seçmemesi için bu setler madde başında sıfırlanır.
    const itemUsedStarters = new Set<string>();
    const itemUsedOpeners = new Set<string>();
    const itemUsedObs = new Set<string>();
    const itemUsedSug = new Set<string>();

    for (const teacher of selectedTeachers) {
      speakerHistory.push(teacher.id);
      const branchStyle = getBranchStyle(teacher.branch);
      const used = getUsed(teacher.id);

      // Açılış cümlesi (madde içinde tekrar etmeyen başlangıç + fiil).
      // Akademik maddelerde branş giriş cümlesi (konu zaten branşla ilgili);
      // diğer maddelerde konuya özgü giriş cümlesi kullanılır. Öğretmenin branşı
      // her hâlükârda konuşmanın başındaki branş ve öğretmen bilgisiyle
      // gösterildiği için kimlik korunur.
      // Akademik maddelerde branş giriş cümlesine döneme özgü girişler de
      // eklenir; akademik olmayan maddelerde döneme özgü + konuya özgü girişler.
      const starterPool = isAcademic
        ? [...branchStyle.sentenceStarters, ...(perContent.intros ?? [])]
        : [...(perContent.intros ?? []), ...catContent.intros];
      const starter = pickUnused(starterPool, itemUsedStarters);
      const opener = pickUnused(speechOpeners, itemUsedOpeners);
      const opening = `${capitalizeSentenceStartTr(starter)} ${opener}.`;

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak.
      // Konuya özgü cümleler önce gelir ki kısa konuşmalarda bile gündem maddesinin
      // konusu işlensin; sınıf düzeyine ait genel cümleler sona eklenir.
      const optionalSentences: string[] = [];

      // 1) Akademik olmayan maddelerde branş bakış açısını ilk ek cümlede
      // görünür tut. Giriş cümlesi zaten gündemin konusunu belirtir.
      if (!isAcademic) {
        optionalSentences.push(getBranchContextSentence(teacher.branch, category));
      }

      // 2) Maddenin konusuna + döneme özgü gözlem
      optionalSentences.push(pickUnused(observationPool, itemUsedObs));

      // 3) Sınıf düzeyine ait içerik odağını yalnızca akademik başarı
      // maddesinde doğal bir öğretmen değerlendirmesi olarak kullan.
      if (category === 'akademik-basari') {
        const variationTemplates =
          variation.speechTemplates[category] ?? variation.speechTemplates.genel;
        const variationSentence = variationTemplates?.length
          ? getRandomItem(variationTemplates)
          : null;
        const unusedVariationSentence = pickGlobalOnce(
          variationSentence ? [variationSentence] : [],
          usedVariationGlobal
        );
        if (unusedVariationSentence) optionalSentences.push(unusedVariationSentence);
      }

      // 4) Akademik maddelerde branşa özel odak alanı. Başarı düzeyinden gelen
      // bağımsız bir eylemle çaprazlanmaz.
      if (isAcademic) {
        const focusArea = pickUnused(branchStyle.focusAreas, used.focus);
        optionalSentences.push(
          `${capitalizeSentenceStartTr(focusArea)} konusunda mevcut durumun değerlendirilmesi ve gerekli çalışmaların öğrenci ihtiyaçlarına göre planlanması gerektiğini ifade etti.`
        );
      }

      // 5) Maddenin konusuna + döneme özgü öneri
      optionalSentences.push(`Ayrıca ${pickUnused(suggestionPool, itemUsedSug)} gerektiğini vurguladı.`);

      // 6) Akademik maddelerde ek branş önerisi
      if (isAcademic) {
        const suggestion = pickUnused(branchStyle.suggestions, used.suggestions);
        optionalSentences.push(`Bunun yanı sıra ${suggestion} gerektiğini ifade etti.`);
      }

      // 7) Başarı düzeyi cümlesi yalnızca akademik başarı maddesinde ve belge
      // genelinde bir kez kullanılır. Ağır veya doğrulanmamış rastgele iddialar
      // yerine kontrollü, eylem odaklı bir değerlendirme eklenir.
      const achievementSummaryIndex =
        category === 'akademik-basari' && !achievementSummaryUsed
          ? optionalSentences.push(achievementSpeechSummaries[achievementLevel.id]) - 1
          : -1;

      // Her öğretmen için cümle sayısını rastgele belirle (farklı uzunluklarda konuşmalar)
      const lengthRange: Record<string, [number, number]> = {
        short: [1, 3],
        medium: [2, 5],
        long: [3, 6]
      };
      const [minSentences, maxSentences] = lengthRange[settings.speechLength] ?? [2, 5];
      const keepCount = Math.min(
        getRandomInt(minSentences, maxSentences),
        optionalSentences.length
      );
      if (achievementSummaryIndex >= 0 && keepCount > achievementSummaryIndex) {
        achievementSummaryUsed = true;
      }

      const content = [opening, ...optionalSentences.slice(0, keepCount)].join(' ');

      speeches.push({
        teacherId: teacher.id,
        teacherName: toTitleCaseTr(teacher.fullName),
        branch: teacher.branch,
        content: content.trim()
      });
    }

    // Karar oluşturma — döneme özgü kararlar varsa yalnızca onlar kullanılır.
    // Başarı düzeyi tek başına tanı, ev ziyareti veya kurum bildirimi gibi ağır
    // kararlar için yeterli veri olmadığından başarı profili kararları üretime
    // katılmaz.
    const decisions: string[] = [];
    if (category !== 'dilek-temenniler') {
      const periodDecisions = perContent.decisions ?? [];
      const decisionCount = getRandomInt(1, 2);
      const decisionPool = (
        periodDecisions.length ? periodDecisions : catContent.decisions
      ).map(normalizeDecisionStyle);

      const fallbackPool = generalDecisions.map(normalizeDecisionStyle);
      const effectivePool = decisionPool.length ? decisionPool : fallbackPool;

      for (let i = 0; i < decisionCount; i++) {
        const unusedGlobally = pickGlobalOnce(effectivePool, usedDecisionsGlobal);
        const unusedInCurrentItem = effectivePool.filter(
          decision => !decisions.includes(decision)
        );
        const d = unusedGlobally
          ?? (unusedInCurrentItem.length ? getRandomItem(unusedInCurrentItem) : null);

        if (d) {
          usedDecisionsGlobal.add(d);
          decisions.push(d);
        }
      }
    }

    agendaMinutes.push({
      agendaId: agenda.id,
      agendaTitle: agenda.title,
      agendaNumber: agendaNumber++,
      speeches,
      decisions: [...new Set(decisions)] // Tekrarları kaldır
    });
  }

  return {
    id: uuidv4(),
    title: `${meetingInfo.schoolName.toLocaleUpperCase(TR)} ${meetingInfo.academicYear} EĞİTİM ÖĞRETİM YILI ${periodProfile.titleLabel} ${meetingInfo.className.toLocaleUpperCase(TR)} SINIFI ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI`,
    meetingInfo,
    teachers: teachers.map(t => ({ ...t, fullName: toTitleCaseTr(t.fullName) })),
    agendaMinutes,
    closingText: periodProfile.closingText,
    generatedAt: new Date().toISOString(),
    variationId: variation.id
  };
};
