import type { MeetingPeriod } from '../types';
import type { PeriodCategoryContent } from './periodContent';

// Rehberlik öğretmeninin akademik gündem maddelerindeki içeriği.
//
// Rehberlik öğretmeninin okuttuğu bir ders, verdiği bir yazılı sınav veya
// sorumlu olduğu bir kazanım yoktur. Bu yüzden "ilk sınav sonuçlarını analiz
// ederek konu eksiklerini paylaştı" gibi ders öğretmenine özgü cümleler ona
// atanmaz; bunların yerine rehberlik servisinin bu konulardaki rolü (hedef
// belirleme, sınav kaygısı, çalışma alışkanlıkları, bireysel görüşme, ders
// öğretmenleriyle bilgi paylaşımı) anlatılır.
//
// Cümleler doğrulanmamış bir öğrenci durumu bildirmez; öneri ve izleme dili
// kullanır.

type GuidanceCategory = 'akademik-basari' | 'olcme-degerlendirme' | 'destekleme';

const donemIci: Record<GuidanceCategory, PeriodCategoryContent> = {
  'akademik-basari': {
    observations: [
      'Akademik güçlük yaşayan öğrencilerin ders öğretmenlerince rehberlik servisine bildirilmesinin bireysel görüşmeleri kolaylaştıracağını belirtti.',
      'Sınav sonuçlarının ardından öğrencilerle hedef belirleme görüşmeleri yapılmasını önerdi.',
      'Verimli ders çalışma ve zaman yönetimi konularında sınıf rehberlik etkinlikleri yapılabileceğini belirtti.'
    ],
    suggestions: [
      'öğrencilerle bireysel hedef belirleme görüşmeleri yapılması',
      'verimli ders çalışma ve zaman yönetimi konularında sınıf rehberlik etkinliği düzenlenmesi',
      'akademik güçlük yaşayan öğrencilerin ders öğretmenlerince rehberlik servisine bildirilmesi'
    ]
  },
  'olcme-degerlendirme': {
    observations: [
      'Sınav kaygısı yaşayan öğrencilerin rehberlik servisine yönlendirilmesini önerdi.',
      'Sınav sonuçlarının öğrencilere bireysel geri bildirimle birlikte paylaşılmasının kaygıyı azaltacağını belirtti.',
      'Ölçme sonuçlarının öğrencilerle yapılacak hedef belirleme görüşmelerinde dikkate alınmasını yararlı buldu.'
    ],
    suggestions: [
      'sınavlara hazırlık ve kaygı yönetimi konusunda sınıf rehberlik etkinliği yapılması',
      'sınav kaygısı yaşayan öğrencilerin rehberlik servisine yönlendirilmesi',
      'sınav sonuçlarının öğrencilerle bireysel görüşmelerde değerlendirilmesi'
    ]
  },
  destekleme: {
    observations: [
      'Desteğe ihtiyaç duyan öğrencilerin izlenmesinde rehberlik servisi ile ders öğretmenleri arasındaki bilgi paylaşımını önemli buldu.',
      'Bireysel çalışma planı hazırlanan öğrencilerle düzenli görüşmeler yapılmasını önerdi.',
      'Destekleme ve yetiştirme kurslarına katılımın öğrencinin motivasyonu da dikkate alınarak izlenmesini yararlı buldu.'
    ],
    suggestions: [
      'bireysel çalışma planı hazırlanan öğrencilerle düzenli görüşmeler yapılması',
      'destek çalışmalarına katılan öğrencilerin motivasyonunun rehberlik servisince izlenmesi',
      'ders öğretmenleri ile rehberlik servisi arasında düzenli bilgi paylaşımı yapılması'
    ]
  }
};

const seneSonu: Record<GuidanceCategory, PeriodCategoryContent> = {
  'akademik-basari': {
    observations: [
      'Yıl boyunca yürütülen hedef belirleme çalışmalarının öğrencilerin ders çalışma düzenine katkısını değerlendirdi.',
      'Akademik güçlük yaşayan öğrencilere yönelik yıl içindeki rehberlik çalışmalarını gözden geçirdi.',
      'Bireysel görüşmelerden edinilen bilgilerin sınıf rehber öğretmeniyle paylaşılmasını yararlı buldu.'
    ],
    suggestions: [
      'yıl boyunca yürütülen hedef belirleme çalışmalarının sonuçlarının kayda geçirilmesi',
      'bireysel görüşmelerden edinilen bilgilerin sınıf rehber öğretmeniyle paylaşılması'
    ]
  },
  'olcme-degerlendirme': {
    observations: [
      'Sınav kaygısına yönelik yıl içinde yürütülen rehberlik çalışmalarını değerlendirdi.',
      'Yıl sonu sonuçlarının öğrencilerin ilgi ve yetenekleriyle birlikte yönlendirme çalışmalarında dikkate alınmasını önerdi.',
      'Ölçme sonuçlarının bireysel görüşmelerde öğrencilerle birlikte ele alınmasını yararlı buldu.'
    ],
    suggestions: [
      'yıl sonu sonuçlarının yönlendirme çalışmalarında dikkate alınması',
      'sınav kaygısına yönelik çalışmaların sonuçlarının kayda geçirilmesi'
    ]
  },
  destekleme: {
    observations: [
      'Destek çalışmalarına katılan öğrencilerle yapılan görüşmelerin yıl içindeki katkısını değerlendirdi.',
      'Bireysel olarak izlenen öğrencilere ilişkin bilgilerin sınıf rehber öğretmeniyle paylaşılmasını önerdi.'
    ],
    suggestions: [
      'bireysel olarak izlenen öğrencilere ilişkin bilgilerin sınıf rehber öğretmeniyle paylaşılması',
      'destek çalışmalarına katılımın öğrenci motivasyonuna etkisinin değerlendirilmesi'
    ]
  }
};

// Rehberlik odak alanlarından gündem maddesinin konusuna uyanlar. Örneğin
// ölçme-değerlendirme maddesinde "sosyal-duygusal gelişim" odağı konu dışı kalır.
export const guidanceFocusByCategory: Record<GuidanceCategory, string[]> = {
  'akademik-basari': ['hedef belirleme', 'motivasyon', 'bireysel takip'],
  'olcme-degerlendirme': ['sınav kaygısı', 'hedef belirleme'],
  destekleme: ['bireysel takip', 'motivasyon']
};

export const isGuidanceCategory = (category: string): category is GuidanceCategory =>
  category in donemIci;

export const getGuidanceContent = (
  period: MeetingPeriod,
  category: string
): PeriodCategoryContent | null => {
  if (!isGuidanceCategory(category)) return null;
  return period === 'sene-sonu' ? seneSonu[category] : donemIci[category];
};
