import type { AgendaItem, AgendaCategory, GradeLevel, MeetingPeriod, SpeakerCountMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Döneme özgü varsayılan gündem maddeleri.
//
// Dayanak: MEB Eğitim Kurulları ve Zümreleri Yönergesi Madde 10 (son değişiklik
// 02/01/2024; 2025 değişiklikleri bu maddeye dokunmadı).
//  - (2) Ortaöğretimde kurullar kasım ve nisan aylarında yapılır; ders yılı
//    sonundaki toplantıda yıl boyunca alınan kararlar ve sonuçları değerlendirilir.
//  - (8) Gündem bentleri: a) bir önceki toplantıda alınan kararlar, b) başarı
//    durumu ve başarıyı artırıcı önlemler, c) öğretim programlarıyla uyum,
//    d) kaynaştırma/bütünleştirme, e) atölye/laboratuvardan güvenli yararlanma,
//    f) okul-çevre iş birliği, ğ) etkinlik, yarışma, gezi, kulüp ve sosyal
//    sorumluluk, i) kişilik ve sosyal gelişim, sağlık ve beslenme, j) okul
//    sağlığı, k) değerler eğitimi, l) iş sağlığı ve güvenliği "ve benzeri konular".
//    (ç) ortaokula, (g) ve (h) mesleki ve teknik eğitime özgü olduğu için
//    varsayılanlara alınmadı. Devamsızlık, davranış, ölçme-değerlendirme gibi
//    maddeler "benzeri konular" kapsamında okul uygulamalarında yaygındır.

type AgendaSeed = {
  title: string;
  category: AgendaCategory;
  speakerCountMode: SpeakerCountMode;
  // Sabit değer veya sınıf düzeyine göre karar veren işlev.
  enabled?: boolean | ((gradeLevel: GradeLevel) => boolean);
};

const build = (seeds: AgendaSeed[], gradeLevel: GradeLevel): AgendaItem[] =>
  seeds.map(s => ({
    id: uuidv4(),
    title: s.title,
    enabled: typeof s.enabled === 'function' ? s.enabled(gradeLevel) : s.enabled ?? true,
    speakerCountMode: s.speakerCountMode,
    category: s.category
  }));

// 9. sınıf şubesi kasımda ilk kez toplanır; görüşülecek bir önceki kurul kararı
// bulunmadığından bu madde 9. sınıflarda kapalı gelir.
const hasPreviousBoard = (gradeLevel: GradeLevel): boolean => gradeLevel !== 9;

const activityTitle =
  'Bilimsel, sosyal, kültürel, sanatsal ve sportif etkinlikler, yarışmalar, geziler ile öğrenci kulübü ve sosyal sorumluluk çalışmaları';
const healthSafetyTitle =
  'Okul sağlığı, iş sağlığı ve güvenliği tedbirleri ile atölye ve laboratuvarlardan güvenli yararlanma';
const personalDevelopmentTitle =
  'Öğrencilerin kişilik ve sosyal gelişimlerinin desteklenmesi ile rehberlik ihtiyaçlarının değerlendirilmesi';

// ─────────────────────────────────────────────────────────────
// KASIM — düzenli ortaöğretim ŞÖK (izleme, tedbir, planlama)
// ─────────────────────────────────────────────────────────────
const kasimSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Bir önceki toplantıda alınan kararların gözden geçirilmesi', category: 'onceki-kararlar', speakerCountMode: 'two', enabled: hasPreviousBoard },
  { title: 'Öğrencilerin başarı durumlarının incelenmesi ve başarıyı artırıcı önlemlerin alınması', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu olarak yürütülmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Devamsızlık takibi ve alınacak tedbirler', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Derse katılım ve motivasyonun artırılmasına yönelik çalışmalar', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: personalDevelopmentTitle, category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Özel eğitim ihtiyacı olan kaynaştırma/bütünleştirme öğrencilerine yönelik tedbirler', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme çalışmalarının planlanması ve izlenmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi, okul-aile ve okul-çevre iş birliği', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları', category: 'destekleme', speakerCountMode: 'three' },
  { title: activityTitle, category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmaları', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: healthSafetyTitle, category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// NİSAN — önceki kararlar + dönem değerlendirmesi
// ─────────────────────────────────────────────────────────────
const nisanSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Bir önceki toplantıda alınan kararların uygulama sonuçlarının değerlendirilmesi', category: 'onceki-kararlar', speakerCountMode: 'three' },
  { title: 'Öğrencilerin başarı durumlarının incelenmesi ve başarıyı artırıcı önlemlerin alınması', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu olarak yürütülmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Devamsızlık durumlarının değerlendirilmesi ve alınacak tedbirler', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: personalDevelopmentTitle, category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Özel eğitim ihtiyacı olan kaynaştırma/bütünleştirme öğrencilerine yönelik tedbirler', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme sonuçlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi, okul-aile ve okul-çevre iş birliğinin değerlendirilmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları', category: 'destekleme', speakerCountMode: 'three' },
  { title: activityTitle, category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmaları', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: healthSafetyTitle, category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// YIL SONU — karar sonuçları + genel değerlendirme
// ─────────────────────────────────────────────────────────────
const seneSonuSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Eğitim öğretim yılı boyunca alınan kararların ve sonuçlarının değerlendirilmesi', category: 'onceki-kararlar', speakerCountMode: 'three' },
  { title: 'Yıl sonu genel akademik başarı durumunun değerlendirilmesi', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu yürütülmesine ilişkin yıl sonu değerlendirmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Yıl sonu devamsızlık durumlarının değerlendirilmesi', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının yıl sonu değerlendirmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Öğrencilerin kişilik ve sosyal gelişimleri ile rehberlik çalışmalarının yıl sonu değerlendirmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Kaynaştırma/bütünleştirme öğrencilerine yönelik çalışmaların yıl sonu değerlendirmesi', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme sonuçları ile yönlendirme ihtiyaçlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi, okul-aile ve okul-çevre iş birliğinin yıl sonu değerlendirmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme ve yetiştirme çalışmalarının sonuçlarının değerlendirilmesi', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Etkinlik, yarışma, gezi, öğrenci kulübü ve sosyal sorumluluk çalışmalarının yıl sonu değerlendirmesi', category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmalarının değerlendirilmesi', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: 'Okul sağlığı, iş sağlığı ve güvenliği tedbirleri ile atölye ve laboratuvar kullanımının yıl sonu değerlendirmesi', category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Yıl sonu değerlendirmelerinden çıkarılan sonuç ve öneriler', category: 'genel', speakerCountMode: 'three' },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

const periodAgendaSeeds: Record<MeetingPeriod, AgendaSeed[]> = {
  kasim: kasimSeeds,
  nisan: nisanSeeds,
  'sene-sonu': seneSonuSeeds
};

export const getDefaultAgendaForPeriod = (
  period: MeetingPeriod,
  gradeLevel: GradeLevel = 9
): AgendaItem[] => build(periodAgendaSeeds[period] ?? kasimSeeds, gradeLevel);
