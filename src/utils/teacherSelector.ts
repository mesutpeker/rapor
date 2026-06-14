import type { Teacher } from '../types';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { getRandomItems } from './randomizer';

export const selectTeachersForAgenda = (
  teachers: Teacher[],
  category: string,
  count: number,
  previousSpeakers: string[]
): Teacher[] => {
  const attendingTeachers = teachers.filter(t => t.isAttending);
  
  if (attendingTeachers.length <= count) {
    return attendingTeachers;
  }

  // Puanlama sistemi ile öğretmen seçimi
  const scoredTeachers = attendingTeachers.map(teacher => {
    const style = getBranchStyle(teacher.branch);
    let score = style.agendaRelevance[category] || 5;

    // Daha önce az konuşanlara öncelik ver
    const speakCount = previousSpeakers.filter(id => id === teacher.id).length;
    score -= speakCount * 2;

    // Özel durumlar (Rehberlik, Sınıf Öğretmeni vs. için bonus verilebilir)
    if (category === 'sosyal-duygusal' && teacher.branch === 'Rehberlik') score += 5;
    if (category === 'veli-iletisim' && teacher.isClassTeacher) score += 3;

    return { teacher, score };
  });

  // Puana göre sırala ve en yüksek puanlılardan rastgele seç
  scoredTeachers.sort((a, b) => b.score - a.score);
  
  // En yüksek puanlı havuzdan (istenen sayının 2 katı kadar) rastgele seç
  const topPool = scoredTeachers.slice(0, Math.max(count * 2, count)).map(st => st.teacher);
  
  return getRandomItems(topPool, count);
};
