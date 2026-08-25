import type { AgendaItem, AgendaCategory, MeetingPeriod, SpeakerCountMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Döneme özgü varsayılan gündem maddeleri.
//
// Her madde, başlıktan bağımsız olarak doğru konuşma içeriğinin üretilmesi için
// `category` alanıyla açıkça etiketlenmiştir. Başlıklar dönemin bakış açısını
// (sene başı: planlama, ikinci dönem: değerlendirme + plan, sene sonu: yıl sonu
// değerlendirmesi) yansıtacak biçimde yazılmıştır.

type AgendaSeed = {
  title: string;
  category: AgendaCategory;
  speakerCountMode: SpeakerCountMode;
};

const build = (seeds: AgendaSeed[]): AgendaItem[] =>
  seeds.map(s => ({
    id: uuidv4(),
    title: s.title,
    enabled: true,
    speakerCountMode: s.speakerCountMode,
    category: s.category
  }));

// ─────────────────────────────────────────────────────────────
// SENE BAŞI — ileriye dönük: tanıma, hedef belirleme, planlama
// ─────────────────────────────────────────────────────────────
const seneBasiSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Öğrencilerin hazırbulunuşluk düzeylerinin değerlendirilmesi ve akademik hedeflerin belirlenmesi', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Sınıf kurallarının belirlenmesi, davranış ve uyum sürecinin planlanması', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Devamsızlık takibi ve önleyici tedbirlerin planlanması', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Derse katılım ve motivasyonun artırılmasına yönelik çalışmaların planlanması', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Ölçme ve değerlendirme çalışmalarının ve ortak sınav takviminin planlanması', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi ve okul-aile iş birliği planının oluşturulması', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme, yetiştirme ve bireysel takip çalışmalarının planlanması', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// 2. DÖNEM — birinci dönem değerlendirmesi + ikinci dönem planı
// ─────────────────────────────────────────────────────────────
const ikinciDonemSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Birinci dönem genel akademik başarı durumunun değerlendirilmesi', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Birinci dönemde alınan kararların gözden geçirilmesi ve ikinci dönem hedeflerinin belirlenmesi', category: 'genel', speakerCountMode: 'three' },
  { title: 'Devamsızlık durumlarının değerlendirilmesi ve alınacak tedbirler', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi', category: 'motivasyon-katilim', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Birinci dönem ölçme ve değerlendirme sonuçlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi ve okul-aile iş birliğinin değerlendirilmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'İkinci dönem destekleme, yetiştirme ve bireysel takip çalışmaları', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

// ─────────────────────────────────────────────────────────────
// SENE SONU — yıl sonu genel değerlendirme + gelecek yıla öneriler
// ─────────────────────────────────────────────────────────────
const seneSonuSeeds: AgendaSeed[] = [
  { title: 'Açılış ve yoklama', category: 'acilis', speakerCountMode: 'three' },
  { title: 'Yıl sonu genel akademik başarı durumunun değerlendirilmesi', category: 'akademik-basari', speakerCountMode: 'four' },
  { title: 'Yıl içinde alınan kararların sonuçlarının değerlendirilmesi', category: 'genel', speakerCountMode: 'three' },
  { title: 'Yıl sonu devamsızlık durumlarının değerlendirilmesi', category: 'devamsizlik', speakerCountMode: 'three' },
  { title: 'Öğrencilerin davranışlarının ve sosyal gelişimlerinin yıl sonunda değerlendirilmesi', category: 'davranis-disiplin', speakerCountMode: 'three' },
  { title: 'Öğrencilerin sosyal ve duygusal gelişimleri ile rehberlik süreçlerinin değerlendirilmesi', category: 'sosyal-duygusal', speakerCountMode: 'three' },
  { title: 'Ölçme ve değerlendirme sonuçları ile sınıf geçme durumlarının görüşülmesi', category: 'olcme-degerlendirme', speakerCountMode: 'three' },
  { title: 'Veli iletişimi ve okul-aile iş birliğinin yıl sonu değerlendirmesi', category: 'veli-iletisim', speakerCountMode: 'three' },
  { title: 'Destekleme ve yetiştirme çalışmalarının sonuçlarının değerlendirilmesi', category: 'destekleme', speakerCountMode: 'three' },
  { title: 'Yıl sonu değerlendirmelerinden çıkarılan sonuç ve öneriler', category: 'genel', speakerCountMode: 'three' },
  { title: 'Dilek ve temenniler', category: 'dilek-temenniler', speakerCountMode: 'three' },
  { title: 'Kapanış', category: 'kapanis', speakerCountMode: 'three' }
];

const periodAgendaSeeds: Record<MeetingPeriod, AgendaSeed[]> = {
  'sene-basi': seneBasiSeeds,
  'ikinci-donem': ikinciDonemSeeds,
  'sene-sonu': seneSonuSeeds
};

// Seçili dönem için yeni (taze id'li) varsayılan gündem listesi üretir.
export const getDefaultAgendaForPeriod = (period: MeetingPeriod): AgendaItem[] =>
  build(periodAgendaSeeds[period] ?? seneBasiSeeds);
