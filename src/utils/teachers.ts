import type { Teacher } from '../types';
import { allBranches } from '../data/branchSpeechStyles';

const TR = 'tr-TR';

export const GUIDANCE_BRANCH = 'Rehberlik';

const branchKey = (branch: string): string =>
  branch.trim().replace(/\s+/g, ' ').toLocaleLowerCase(TR);

// Rehberlik öğretmeni için okullarda kullanılan farklı adlandırmalar.
const guidanceAliases = new Set([
  'rehberlik',
  'rehber',
  'rehber öğretmen',
  'rehberlik öğretmeni',
  'rehberlik servisi',
  'psikolojik danışman',
  'okul psikolojik danışmanı',
  'rehber öğretmen/psikolojik danışman',
  'rehber öğretmen / psikolojik danışman',
  'rehberlik ve psikolojik danışmanlık',
  'psikolojik danışmanlık ve rehberlik',
  'pdr'
]);

export const isGuidanceBranch = (branch: string): boolean =>
  guidanceAliases.has(branchKey(branch));

const lowercaseConnectors = new Set(['ve', 'ile', 'veya']);

// Elle yazılan branş adını tutanakta kullanılacak biçime getirir:
// - "Rehber Öğretmen", "PDR" gibi adlandırmalar → "Rehberlik"
// - sondaki "öğretmeni / öğretmenliği" eki atılır ("Matematik Öğretmeni" → "Matematik")
// - listedeki bir branşla eşleşiyorsa listedeki yazım kullanılır
// - diğerlerinde her sözcüğün ilk harfi büyütülür ("görsel sanatlar" → "Görsel Sanatlar")
export const normalizeBranchName = (input: string): string => {
  let cleaned = input.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  if (isGuidanceBranch(cleaned)) return GUIDANCE_BRANCH;

  const lowered = cleaned.toLocaleLowerCase(TR);
  for (const suffix of [' öğretmenliği', ' öğretmeni', ' öğretmen']) {
    if (lowered.endsWith(suffix) && lowered.length === cleaned.length) {
      cleaned = cleaned.slice(0, cleaned.length - suffix.length).trim();
      break;
    }
  }
  if (!cleaned) return '';
  if (isGuidanceBranch(cleaned)) return GUIDANCE_BRANCH;

  const key = branchKey(cleaned);
  const known = allBranches.find(branch => branchKey(branch) === key);
  if (known) return known;

  return cleaned
    .split(' ')
    .map((word, index) => {
      const lower = word.toLocaleLowerCase(TR);
      if (index > 0 && lowercaseConnectors.has(lower)) return lower;
      // "T.C.", "YKS" gibi kısaltmalar olduğu gibi bırakılır.
      if (/^(?:\p{Lu}\.){2,}$/u.test(word) || /^\p{Lu}{2,4}$/u.test(word)) return word;
      return word.charAt(0).toLocaleUpperCase(TR) + word.slice(1).toLocaleLowerCase(TR);
    })
    .join(' ');
};

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
