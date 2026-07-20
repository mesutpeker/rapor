import type { Teacher } from '../types';

export const toggleExclusiveClassTeacher = (
  teachers: Teacher[],
  teacherId: string
): Teacher[] => {
  const selectedTeacher = teachers.find(teacher => teacher.id === teacherId);
  const willSelect = !selectedTeacher?.isClassTeacher;

  return teachers.map(teacher => {
    if (teacher.id === teacherId) {
      return { ...teacher, isClassTeacher: willSelect };
    }

    return willSelect && teacher.isClassTeacher
      ? { ...teacher, isClassTeacher: false }
      : teacher;
  });
};
