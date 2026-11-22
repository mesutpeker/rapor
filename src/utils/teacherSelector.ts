import type { Teacher } from '../types';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { getRandomItems } from './randomizer';
import { isGuidanceBranch } from './teachers';

export const selectTeachersForAgenda = (
  teachers: Teacher[],
  category: string,
  count: number,
  previousSpeakers: string[]
): Teacher[] => {
  if (teachers.length <= count) {
    return teachers;
  }

  // Puanlama sistemi ile öğretmen seçimi
  const scoredTeachers = teachers.map(teacher => {
    const style = getBranchStyle(teacher.branch);
    let score = style.agendaRelevance[category] ?? 5;

    // Daha önce az konuşanlara öncelik ver
    const speakCount = previousSpeakers.filter(id => id === teacher.id).length;
    score -= speakCount * 2;

    if (category === 'sosyal-duygusal' && isGuidanceBranch(teacher.branch)) score += 5;
    if (category === 'veli-iletisim' && teacher.isClassTeacher) score += 4;
    if (category === 'devamsizlik' && teacher.isClassTeacher) score += 5;
    if ((category === 'genel' || category === 'onceki-kararlar') && teacher.isClassTeacher) score += 2;

    return { teacher, score };
  });

  // En ilgili puan grubundan en az bir öğretmeni seç. Eşit puanlı öğretmenler
  // kendi aralarında rastgele seçilerek giriş sırasının sonucu belirlemesi önlenir.
  scoredTeachers.sort((a, b) => b.score - a.score);
  const highestScore = scoredTeachers[0].score;
  const highestScorePool = scoredTeachers
    .filter(item => item.score === highestScore)
    .map(item => item.teacher);
  const firstTeacher = getRandomItems(highestScorePool, 1)[0];

  if (count === 1) return [firstTeacher];

  // Kesim noktasındaki eşit puanlı öğretmenlerin tamamını havuza al.
  const initialPoolSize = Math.min(scoredTeachers.length, count * 2);
  const cutoffScore = scoredTeachers[initialPoolSize - 1].score;
  const remainingPool = scoredTeachers
    .filter(item => item.score >= cutoffScore && item.teacher.id !== firstTeacher.id)
    .map(item => item.teacher);

  return [firstTeacher, ...getRandomItems(remainingPool, count - 1)];
};
