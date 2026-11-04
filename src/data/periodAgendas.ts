import type { AgendaItem, AgendaCategory, MeetingPeriod, SpeakerCountMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Döneme özgü varsayılan gündem maddeleri.
// Yönerge Madde 10/(8) ilgili görülen başlıkları seçilebilir varsayılanlara işler.

type AgendaSeed = {
  title: string;
  category: AgendaCategory;
  speakerCountMode: SpeakerCountMode;
  enabled?: boolean;
};

const build = (seeds: AgendaSeed[]): AgendaItem[] =>
  seeds.map(s => ({
    id: uuidv4(),
    title: s.title,
    enabled: s.enabled ?? true,
    speakerCountMode: s.speakerCountMode,
    category: s.category
  }));

// ─────────────────────────────────────────────────────────────
// KASIM — düzenli ortaöğretim ŞÖK (izleme, tedbir, planlama)
// ─────────────────────────────────────────────────────────────
const kasimSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Öğrencilerin başarı durumlarının incelenmesi ve başarıyı artırıcı önlemlerin alınması', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu olarak yürütülmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Devamsızlık takibi ve alınacak tedbirler', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Derse katılım ve motivasyonun artırılmasına yönelik çalışmalar', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Özel eğitim ihtiyacı olan kaynaştırma/bütünleştirme öğrencilerine yönelik tedbirler', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme çalışmalarının planlanması ve izlenmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi, okul-aile ve okul-çevre iş birliği', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Bilimsel, sosyal, kültürel, sportif etkinlikler ile öğrenci kulüp ve sosyal sorumluluk çalışmaları', category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmaları', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: 'Okul sağlığı ile iş sağlığı ve güvenliği tedbirleri', category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// NİSAN — önceki kararlar + dönem değerlendirmesi
// ─────────────────────────────────────────────────────────────
const nisanSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Bir önceki toplantıda alınan kararların uygulama sonuçlarının değerlendirilmesi', category: 'genel', speakerCountMode: 'three' },
  { title: 'Öğrencilerin başarı durumlarının incelenmesi ve başarıyı artırıcı önlemlerin alınması', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu olarak yürütülmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Devamsızlık durumlarının değerlendirilmesi ve alınacak tedbirler', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Özel eğitim ihtiyacı olan kaynaştırma/bütünleştirme öğrencilerine yönelik tedbirler', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme sonuçlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi, okul-aile ve okul-çevre iş birliğinin değerlendirilmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Bilimsel, sosyal, kültürel, sportif etkinlikler ile öğrenci kulüp ve sosyal sorumluluk çalışmaları', category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmaları', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: 'Okul sağlığı ile iş sağlığı ve güvenliği tedbirleri', category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// YIL SONU — karar sonuçları + genel değerlendirme
// ─────────────────────────────────────────────────────────────
const seneSonuSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Eğitim öğretim yılı boyunca alınan kararların ve sonuçlarının değerlendirilmesi', category: 'genel', speakerCountMode: 'three' },
  { title: 'Yıl sonu genel akademik başarı durumunun değerlendirilmesi', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Derslerin öğretim programlarıyla uyumlu yürütülmesine ilişkin yıl sonu değerlendirmesi', category: 'ogretim-programi', speakerCountMode: 'three' },
  { title: 'Yıl sonu devamsızlık durumlarının değerlendirilmesi', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranışlarının ve sosyal gelişimlerinin yıl sonunda değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal ve duygusal gelişimleri ile rehberlik süreçlerinin değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Kaynaştırma/bütünleştirme öğrencilerine yönelik çalışmaların yıl sonu değerlendirmesi', category: 'kaynastirma', speakerCountMode: 'three', enabled: false },
  { title: 'Ölçme ve değerlendirme sonuçları ile yönlendirme ihtiyaçlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi ve okul-aile iş birliğinin yıl sonu değerlendirmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme ve yetiştirme çalışmalarının sonuçlarının değerlendirilmesi', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Etkinlik, kulüp ve sosyal sorumluluk çalışmalarının yıl sonu değerlendirmesi', category: 'etkinlik-sosyal', speakerCountMode: 'three', enabled: false },
  { title: 'Değerler eğitimi çalışmalarının değerlendirilmesi', category: 'degerler-egitimi', speakerCountMode: 'three', enabled: false },
  { title: 'Okul sağlığı ile iş sağlığı ve güvenliği tedbirlerinin değerlendirilmesi', category: 'okul-sagligi-isg', speakerCountMode: 'three', enabled: false },
  { title: 'Yıl sonu değerlendirmelerinden çıkarılan sonuç ve öneriler', category: 'genel', speakerCountMode: 'three' },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

const periodAgendaSeeds: Record<MeetingPeriod, AgendaSeed[]> = {
  kasim: kasimSeeds,
  nisan: nisanSeeds,
  'sene-sonu': seneSonuSeeds
};

export const getDefaultAgendaForPeriod = (period: MeetingPeriod): AgendaItem[] =>
  build(periodAgendaSeeds[period] ?? kasimSeeds);
