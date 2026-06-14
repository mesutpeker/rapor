import type { 
  MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes,
  TeacherSpeech, AgendaMinutes 
} from '../types';
import { getGradeProfile } from '../data/gradeProfiles';
import { getAchievementLevel } from '../data/achievementLevels';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { getAgendaCategory } from '../data/agendaItems';
import { generalDecisions } from '../data/decisionTemplates';
import { getRandomItem, getRandomInt } from './randomizer';
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
  
  // Başarı düzeyine ait TÜM versiyonların cümlelerini birleştir — daha fazla
  // çeşitlilik, daha az tekrar (üslup yine aynı başarı düzeyinde kalır)
  const allPositiveEmphasis = achievementLevel.versions.flatMap(v => v.positiveEmphasis);
  const allCommonIssues = achievementLevel.versions.flatMap(v => v.commonIssues);
  const allSpeechModifiers = achievementLevel.versions.flatMap(v => v.speechModifiers);

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

  // Her öğretmen için kullanılmış ifadeleri takip et: aynı öğretmenin farklı
  // gündem maddelerinde aynı cümleleri tekrarlamasını önler.
  type UsedSets = {
    starters: Set<string>; focus: Set<string>; suggestions: Set<string>;
    issues: Set<string>; modifiers: Set<string>; emphasis: Set<string>;
    variation: Set<string>; openers: Set<string>; tone: Set<string>;
  };
  const usedByTeacher = new Map<string, UsedSets>();
  const getUsed = (id: string): UsedSets => {
    let u = usedByTeacher.get(id);
    if (!u) {
      u = {
        starters: new Set(), focus: new Set(), suggestions: new Set(),
        issues: new Set(), modifiers: new Set(), emphasis: new Set(),
        variation: new Set(), openers: new Set(), tone: new Set()
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
  const pickGlobalOnce = (arr: string[], used: Set<string>): string | null => {
    const available = arr.filter(x => !used.has(x));
    if (!available.length) return null;
    const choice = available[Math.floor(Math.random() * available.length)];
    used.add(choice);
    return choice;
  };

  for (const agenda of agendaItems) {
    if (!agenda.enabled) continue;

    const category = getAgendaCategory(agenda.title);
    
    // Konuşmacı sayısını belirle
    let speakerCount = 2;
    if (agenda.speakerCountMode === 'three') speakerCount = 3;
    if (agenda.speakerCountMode === 'four') speakerCount = 4;
    if (agenda.speakerCountMode === 'random') speakerCount = getRandomInt(2, 4);
    
    // Açılış ve Kapanış için özel durum
    if (category === 'acilis' || category === 'kapanis') {
      agendaMinutes.push({
        agendaId: agenda.id,
        agendaTitle: agenda.title,
        agendaNumber: agendaNumber++,
        speeches: [],
        decisions: []
      });
      continue;
    }

    const selectedTeachers = selectTeachersForAgenda(attendingTeachers, category, speakerCount, speakerHistory);
    const speeches: TeacherSpeech[] = [];

    for (const teacher of selectedTeachers) {
      speakerHistory.push(teacher.id);
      const branchStyle = getBranchStyle(teacher.branch);
      const used = getUsed(teacher.id);

      // Açılış cümlesi (öğretmene göre tekrar etmeyen başlangıç + fiil)
      const starter = pickUnused(branchStyle.sentenceStarters, used.starters);
      const opener = pickUnused(speechOpeners, used.openers);
      const opening = `${starter} ${opener}.`;

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak.
      // Branşa özel cümleler önce gelir ki kısa konuşmalarda bile öğretmen kendi
      // dersinden bahsetsin; sınıf düzeyine ait genel cümleler sona eklenir.
      const optionalSentences: string[] = [];

      // 1) Branşa özel odak alanı (her zaman, öğretmene göre tekrarsız)
      const focusArea = pickUnused(branchStyle.focusAreas, used.focus);
      const speechModifier = pickUnused(allSpeechModifiers, used.modifiers);
      optionalSentences.push(`Bu kapsamda ${focusArea} konusunda ${speechModifier} gerektiğini ifade etti.`);

      // 2) Branş önerisi (her zaman, öğretmene göre tekrarsız)
      const suggestion = pickUnused(branchStyle.suggestions, used.suggestions);
      optionalSentences.push(`Ayrıca ${suggestion} gerektiğini vurguladı.`);

      // 3) Akademik başarı maddesinde olumlu vurgu (öğretmene göre tekrarsız)
      if (category === 'akademik-basari') {
        optionalSentences.push(pickUnused(allPositiveEmphasis, used.emphasis));
      }

      // 4) Sınıf düzeyi varyasyon cümlesi — belge genelinde yalnızca bir kez
      const variationTemplates = variation.speechTemplates['genel'];
      if (variationTemplates && variationTemplates.length) {
        const vs = pickGlobalOnce(variationTemplates, usedVariationGlobal);
        if (vs) optionalSentences.push(vs);
      }

      // 5) Ortak sınıf sorunu — her konuşmada değil, yaklaşık %50 ihtimalle
      //    (ve aynı öğretmende tekrar etmeden)
      if (getRandomInt(1, 2) === 1) {
        optionalSentences.push(pickUnused(allCommonIssues, used.issues));
      }

      // 6) Sınıfın genel akademik düzeyi değerlendirmesi — belge genelinde bir kez
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
        teacherName: teacher.fullName,
        branch: teacher.branch,
        content: content.trim()
      });
    }

    // Karar oluşturma
    const decisions: string[] = [];
    if (category !== 'dilek-temenniler') {
      const decisionCount = getRandomInt(1, 2);
      for (let i = 0; i < decisionCount; i++) {
        decisions.push(getRandomItem(generalDecisions));
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
    title: `${meetingInfo.schoolName.toUpperCase()} ${meetingInfo.academicYear} EĞİTİM ÖĞRETİM YILI ${meetingInfo.term.toUpperCase()} ${meetingInfo.className} SINIFI ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI`,
    meetingInfo,
    attendingTeachers,
    absentTeachers,
    agendaMinutes,
    closingText: 'Toplantı başkanı tarafından toplantı iyi dileklerle sonlandırılmıştır.',
    generatedAt: new Date().toISOString(),
    variationId: variation.id
  };
};
