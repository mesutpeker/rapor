import type { MeetingPeriod } from '../types';

// Toplantı döneminin üst düzey kimliği. Gündem maddeleri ve konuşma içeriği
// ayrı dosyalarda (periodAgendas.ts, periodContent.ts) tanımlanır; burada her
// dönemin etiketleri ve dönem geneline ait sabit metinler bulunur.
export interface PeriodProfile {
  id: MeetingPeriod;
  // Arayüzde gösterilen kısa ad (ör. "Kasım").
  label: string;
  // Tutanak başlığında geçen büyük harfli ifade (ör. "KASIM").
  titleLabel: string;
  // Tutanakta "Dönem:" satırında gösterilecek etiket.
  termLabel: string;
  // Dönemin kısa açıklaması (arayüzde yardımcı metin).
  description: string;
  // Açılış maddesi için döneme özgü giriş paragrafı.
  openingText: string;
  // Kapanış maddesi için döneme özgü kapanış paragrafı.
  closingText: string;
  // Karar izleme zamanı için varsayılan ifade.
  defaultFollowUp: string;
}

export const meetingPeriods: PeriodProfile[] = [
  {
    id: 'kasim',
    label: 'Kasım',
    titleLabel: 'KASIM',
    termLabel: '1. Dönem',
    description:
      'Ortaöğretim düzenli ŞÖK toplantısı (Kasım). Öğrenci durumunun izlenmesi, başarıyı artırıcı tedbirler ve dönem içi planlama.',
    openingText:
      'Kasım ayı şube öğretmenler kurulu toplantısı açıldı. Yapılan yoklamada kurul listesinde adı bulunan öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Alınan kararların titizlikle uygulanması, öğrencilerin gelişiminin yakından izlenmesi ve sonuçların bir sonraki kurulda değerlendirilmesi temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.',
    defaultFollowUp: 'Nisan ayı ŞÖK toplantısı'
  },
  {
    id: 'nisan',
    label: 'Nisan',
    titleLabel: 'NİSAN',
    termLabel: '2. Dönem',
    description:
      'Ortaöğretim düzenli ŞÖK toplantısı (Nisan). Birinci dönem sonuçlarının değerlendirilmesi ve ikinci dönem tedbirlerinin güncellenmesi.',
    openingText:
      'Nisan ayı şube öğretmenler kurulu toplantısı açıldı. Yapılan yoklamada kurul listesinde adı bulunan öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından önceki kararlar ile dönem içi gelişmelerin değerlendirilmesi amacıyla gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Önceki kararların uygulama sonuçlarının dikkate alınması, belirlenen hedeflere ulaşılması ve alınan kararların uygulanması temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.',
    defaultFollowUp: 'Yıl sonu / ihtiyaç hâlinde yapılacak ŞÖK toplantısı'
  },
  {
    id: 'sene-sonu',
    label: 'Yıl Sonu',
    titleLabel: 'YIL SONU',
    termLabel: '2. Dönem',
    description:
      'İhtiyaç hâlinde veya yıl sonunda; eğitim öğretim yılı boyunca alınan kararların ve sonuçlarının değerlendirilmesi (Madde 10/(2)).',
    openingText:
      'Eğitim öğretim yılı sonuna ilişkin şube öğretmenler kurulu toplantısı açıldı. Yapılan yoklamada kurul listesinde adı bulunan öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından yıl boyunca alınan kararlar ile sonuçlarının değerlendirilmesi amacıyla gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Eğitim öğretim yılı boyunca gösterilen çaba için tüm öğretmenlere teşekkür edilerek, alınan kararların ve değerlendirmelerin sonraki kurul çalışmalarına yol göstermesi temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.',
    defaultFollowUp: 'Gelecek eğitim öğretim yılı Kasım ayı ŞÖK toplantısı'
  }
];

export const getPeriodProfile = (id: MeetingPeriod): PeriodProfile =>
  meetingPeriods.find(p => p.id === id) ?? meetingPeriods[0];
