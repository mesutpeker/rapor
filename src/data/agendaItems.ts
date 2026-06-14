import type { AgendaItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultAgendaItems: AgendaItem[] = [
  {
    id: uuidv4(),
    title: 'Açılış ve yoklama',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin genel akademik başarı durumlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'four'
  },
  {
    id: uuidv4(),
    title: 'Devamsızlık durumlarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Ölçme ve değerlendirme çalışmalarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Veli iletişimi ve okul-aile iş birliği',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Dilek ve temenniler',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Kapanış',
    enabled: true,
    speakerCountMode: 'three'
  }
];

export const agendaCategoryMap: Record<string, string> = {
  'Açılış ve yoklama': 'acilis',
  'Öğrencilerin genel akademik başarı durumlarının değerlendirilmesi': 'akademik-basari',
  'Devamsızlık durumlarının görüşülmesi': 'devamsizlik',
  'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi': 'davranis-disiplin',
  'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi': 'motivasyon-katilim',
  'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi': 'sosyal-duygusal',
  'Ölçme ve değerlendirme çalışmalarının görüşülmesi': 'olcme-degerlendirme',
  'Veli iletişimi ve okul-aile iş birliği': 'veli-iletisim',
  'Destekleme, yetiştirme ve bireysel takip çalışmaları': 'destekleme',
  'Dilek ve temenniler': 'dilek-temenniler',
  'Kapanış': 'kapanis'
};

// Başlıktan kategori tahmini için anahtar kelimeler. Sıra önemlidir: daha ayırt
// edici kelimeler önce gelir. Eşleşme, başlığın küçük harfli hâlinde anahtar
// kelimenin geçip geçmediğine bakılarak yapılır.
const categoryKeywords: { category: string; keywords: string[] }[] = [
  { category: 'acilis', keywords: ['açılış', 'yoklama'] },
  { category: 'kapanis', keywords: ['kapanış'] },
  { category: 'dilek-temenniler', keywords: ['dilek', 'temenni'] },
  { category: 'devamsizlik', keywords: ['devamsız', 'devam durum'] },
  { category: 'olcme-degerlendirme', keywords: ['ölçme', 'sınav', 'deneme'] },
  { category: 'davranis-disiplin', keywords: ['davranış', 'disiplin', 'tutum', 'kural'] },
  { category: 'motivasyon-katilim', keywords: ['motivasyon', 'katılım', 'derse ilgi'] },
  { category: 'sosyal-duygusal', keywords: ['sosyal', 'duygusal', 'rehberlik', 'psikoloj'] },
  { category: 'veli-iletisim', keywords: ['veli', 'okul-aile', 'aile iş birliği'] },
  { category: 'destekleme', keywords: ['destekleme', 'yetiştirme', 'bireysel takip', 'etüt', 'kurs'] },
  { category: 'akademik-basari', keywords: ['akademik', 'başarı', 'not ortalama'] }
];

// Başlıktan otomatik kategori tahmini.
const inferCategoryFromTitle = (title: string): string => {
  const t = title.toLowerCase();
  for (const { category, keywords } of categoryKeywords) {
    if (keywords.some(k => t.includes(k))) return category;
  }
  return 'genel';
};

// Bir gündem maddesinin kategorisini belirler. Elle seçilmiş geçerli bir kategori
// varsa ('auto' dışında) o kullanılır; aksi hâlde başlıktan otomatik tahmin edilir.
export const resolveAgendaCategory = (
  title: string,
  manualCategory?: string
): string => {
  if (manualCategory && manualCategory !== 'auto') return manualCategory;
  return inferCategoryFromTitle(title);
};

// Geriye dönük uyumluluk: yalnızca başlıktan tahmin.
export const getAgendaCategory = (title: string): string =>
  inferCategoryFromTitle(title);
