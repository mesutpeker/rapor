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
  
  // Başarı düzeyi versiyonu seçimi (her oluşturmada farklı cümleler için)
  const achievementVersion = getRandomItem(achievementLevel.versions);
  
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

      // Temel cümle oluşturma mantığı (her konuşmada sabit açılış)
      const starter = getRandomItem(branchStyle.sentenceStarters);
      const suggestion = getRandomItem(branchStyle.suggestions);

      const opening = `${starter} görüşlerini dile getirdi.`;

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak
      const optionalSentences: string[] = [];

      // Başarı düzeyi eklemesi
      if (category === 'akademik-basari') {
        optionalSentences.push(getRandomItem(achievementVersion.positiveEmphasis));
      }

      // Sınıf düzeyi varyasyon eklemesi
      const variationSpeech = variation.speechTemplates['genel'] ? getRandomItem(variation.speechTemplates['genel']) : '';
      if (variationSpeech) optionalSentences.push(variationSpeech);

      // Branşa özel odak alanı
      const focusArea = getRandomItem(branchStyle.focusAreas);
      const speechModifier = getRandomItem(achievementVersion.speechModifiers);
      optionalSentences.push(`Bu kapsamda ${focusArea} konusunda ${speechModifier} gerektiğini ifade etti.`);

      // Ortak sorun (achievementVersion'dan gelen tam cümle — olduğu gibi eklenir)
      const commonIssue = getRandomItem(achievementVersion.commonIssues);
      optionalSentences.push(commonIssue);

      // Branş önerisi
      optionalSentences.push(`Ayrıca ${suggestion} gerektiğini vurguladı.`);

      // Sınıfın genel akademik düzeyine dair değerlendirme (tam cümle — olduğu gibi eklenir)
      optionalSentences.push(achievementLevel.academicTone);

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
