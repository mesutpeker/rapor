import type { 
  MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes,
  TeacherSpeech, AgendaMinutes 
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
import { toTitleCaseTr } from './textFormat';
import { selectTeachersForAgenda } from './teacherSelector';
import { v4 as uuidv4 } from 'uuid';

export const generateMinutes = (
  meetingInfo: MeetingInfo,
  teachers: Teacher[],
  agendaItems: AgendaItem[],
  settings: GenerationSettings
): GeneratedMinutes => {
  const gradeProfile = getGradeProfile(meetingInfo.gradeLevel);
  const achievementLevel = getAchievementLevel(meetingInfo.classAchievementLevel);
  const periodProfile = getPeriodProfile(meetingInfo.period);
  
  // Başarı düzeyine ait TÜM versiyonların cümlelerini birleştir — daha fazla
  // çeşitlilik, daha az tekrar (üslup yine aynı başarı düzeyinde kalır)
  const allPositiveEmphasis = achievementLevel.versions.flatMap(v => v.positiveEmphasis);
  const allCommonIssues = achievementLevel.versions.flatMap(v => v.commonIssues);
  const allSpeechModifiers = achievementLevel.versions.flatMap(v => v.speechModifiers);
  // Başarı düzeyine özel karar önerileri (kategori kararlarıyla harmanlanır)
  const allDecisionHints = achievementLevel.versions.flatMap(v => v.decisionHints);

  let variation = gradeProfile.variations[0];
  if (settings.variationMode === 'manual' && settings.variationId) {
    variation = gradeProfile.variations.find(v => v.id === settings.variationId) || variation;
  } else {
    variation = getRandomItem(gradeProfile.variations);
  }

  const attendingTeachers = teachers.filter(t => t.isAttending);
  const absentTeachers = teachers.filter(t => !t.isAttending);
  
  const agendaMinutes: AgendaMinutes[] = [];
  const speakerHistory: string[] = [];
  let agendaNumber = 1;

  // Açılış fiilini de çeşitlendir (hep "görüşlerini dile getirdi" olmasın)
  const speechOpeners = [
    'görüşlerini dile getirdi',
    'değerlendirmelerini paylaştı',
    'konuya ilişkin görüşlerini aktardı',
    'söz alarak genel kanaatini ifade etti',
    'değerlendirmede bulundu'
  ];

  // Her öğretmen için kullanılmış (branşa özel) ifadeleri takip et: aynı
  // öğretmenin farklı gündem maddelerinde aynı branş cümlelerini tekrarlamasını
  // önler. Konuya özgü ve giriş cümleleri ise madde-içi setlerle takip edilir.
  type UsedSets = {
    focus: Set<string>; suggestions: Set<string>;
    issues: Set<string>; modifiers: Set<string>; emphasis: Set<string>;
  };
  const usedByTeacher = new Map<string, UsedSets>();
  const getUsed = (id: string): UsedSets => {
    let u = usedByTeacher.get(id);
    if (!u) {
      u = {
        focus: new Set(), suggestions: new Set(),
        issues: new Set(), modifiers: new Set(), emphasis: new Set()
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
  const usedToneGlobal = new Set<string>();
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

    const selectedTeachers = selectTeachersForAgenda(attendingTeachers, category, speakerCount, speakerHistory);
    const speeches: TeacherSpeech[] = [];

    // Maddeye (konuya) özgü içerik havuzu ve branş içeriğinin yerinde olup
    // olmadığı bilgisi
    const catContent = getCategoryContent(category);
    // Döneme özgü içerik (sene başı / 2. dönem / sene sonu bakış açısı)
    const perContent = getPeriodContent(meetingInfo.period, category);
    const isAcademic = academicCategories.has(category);

    // Havuzları döneme özgü içerikle harmanla. Döneme özgü ifadeler önce
    // gelir ki kısa konuşmalarda bile dönemin bakış açısı öne çıksın.
    const observationPool = [...(perContent.observations ?? []), ...catContent.observations];
    const suggestionPool = [...(perContent.suggestions ?? []), ...catContent.suggestions];

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
      // her hâlükârda konuşmanın başında "<Branş> Öğretmeni ... söz alarak;"
      // ön ekiyle gösterildiği için kimlik korunur.
      // Akademik maddelerde branş giriş cümlesine döneme özgü girişler de
      // eklenir; akademik olmayan maddelerde döneme özgü + konuya özgü girişler.
      const starterPool = isAcademic
        ? [...branchStyle.sentenceStarters, ...(perContent.intros ?? [])]
        : [...(perContent.intros ?? []), ...catContent.intros];
      const starter = pickUnused(starterPool, itemUsedStarters);
      const opener = pickUnused(speechOpeners, itemUsedOpeners);
      const opening = `${starter} ${opener}.`;

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak.
      // Konuya özgü cümleler önce gelir ki kısa konuşmalarda bile gündem maddesinin
      // konusu işlensin; sınıf düzeyine ait genel cümleler sona eklenir.
      const optionalSentences: string[] = [];

      // 1) Maddenin konusuna + döneme özgü gözlem (her zaman, madde içinde tekrarsız)
      optionalSentences.push(pickUnused(observationPool, itemUsedObs));

      // 2) Akademik maddelerde branşa özel odak alanı (branş içeriği yerinde)
      if (isAcademic) {
        const focusArea = pickUnused(branchStyle.focusAreas, used.focus);
        const speechModifier = pickUnused(allSpeechModifiers, used.modifiers);
        optionalSentences.push(`Bu kapsamda ${focusArea} konusunda ${speechModifier} gerektiğini ifade etti.`);
      }

      // 3) Maddenin konusuna + döneme özgü öneri (her zaman, madde içinde tekrarsız)
      optionalSentences.push(`Ayrıca ${pickUnused(suggestionPool, itemUsedSug)} gerektiğini vurguladı.`);

      // 4) Akademik maddelerde ek branş önerisi
      if (isAcademic) {
        const suggestion = pickUnused(branchStyle.suggestions, used.suggestions);
        optionalSentences.push(`Bunun yanı sıra ${suggestion} gerektiğini ifade etti.`);
      }

      // 5) Akademik başarı maddesinde olumlu vurgu (öğretmene göre tekrarsız)
      if (category === 'akademik-basari') {
        optionalSentences.push(pickUnused(allPositiveEmphasis, used.emphasis));
      }

      // 6) Sınıf düzeyi varyasyon cümlesi — önce kategoriye özel, yoksa genel;
      //    belge genelinde yalnızca bir kez
      const variationTemplates = variation.speechTemplates[category] ?? variation.speechTemplates['genel'];
      if (variationTemplates && variationTemplates.length) {
        const vs = pickGlobalOnce(variationTemplates, usedVariationGlobal);
        if (vs) optionalSentences.push(vs);
      }

      // 7) Ortak sınıf sorunu — her konuşmada değil, yaklaşık %50 ihtimalle
      //    (ve aynı öğretmende tekrar etmeden)
      if (getRandomInt(1, 2) === 1) {
        optionalSentences.push(pickUnused(allCommonIssues, used.issues));
      }

      // 8) Sınıfın genel akademik düzeyi değerlendirmesi — belge genelinde bir kez
      const tone = pickGlobalOnce([achievementLevel.academicTone], usedToneGlobal);
      if (tone) optionalSentences.push(tone);

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

      const content = [opening, ...optionalSentences.slice(0, keepCount)].join(' ');

      speeches.push({
        teacherId: teacher.id,
        teacherName: toTitleCaseTr(teacher.fullName),
        branch: teacher.branch,
        content: content.trim()
      });
    }

    // Karar oluşturma — ilk karar döneme + konuya özgü (önce döneme özgü kararlar
    // denenir), ikinci karar (varsa) sınıfın başarı düzeyine özgü; hepsi belge
    // genelinde tekrarsız.
    const decisions: string[] = [];
    if (category !== 'dilek-temenniler') {
      const periodDecisions = perContent.decisions ?? [];
      const decisionCount = getRandomInt(1, 2);
      for (let i = 0; i < decisionCount; i++) {
        // İlk karar: döneme özgü kararlar önceliklidir, biterse konuya özgü;
        // sonraki karar başarı düzeyine özgü. Genel havuz son yedektir.
        const primary = i === 0
          ? pickGlobalOnce(periodDecisions, usedDecisionsGlobal)
            ?? pickGlobalOnce(catContent.decisions, usedDecisionsGlobal)
          : pickGlobalOnce(allDecisionHints, usedDecisionsGlobal);
        const d = primary ?? pickGlobalOnce(generalDecisions, usedDecisionsGlobal);
        if (d) decisions.push(d);
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
    title: `${meetingInfo.schoolName.toUpperCase()} ${meetingInfo.academicYear} EĞİTİM ÖĞRETİM YILI ${periodProfile.titleLabel} ${meetingInfo.className} SINIFI ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI`,
    meetingInfo,
    attendingTeachers: attendingTeachers.map(t => ({ ...t, fullName: toTitleCaseTr(t.fullName) })),
    absentTeachers: absentTeachers.map(t => ({ ...t, fullName: toTitleCaseTr(t.fullName) })),
    agendaMinutes,
    closingText: periodProfile.closingText,
    generatedAt: new Date().toISOString(),
    variationId: variation.id
  };
};
