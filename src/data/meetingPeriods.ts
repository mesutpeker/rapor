import type { MeetingPeriod } from '../types';

// Toplantı döneminin üst düzey kimliği. Gündem maddeleri ve konuşma içeriği
// ayrı dosyalarda (periodAgendas.ts, periodContent.ts) tanımlanır; burada her
// dönemin etiketleri ve dönem geneline ait sabit metinler bulunur.
export interface PeriodProfile {
  id: MeetingPeriod;
  // Arayüzde gösterilen kısa ad (ör. "Sene Başı").
  label: string;
  // Tutanak başlığında geçen büyük harfli ifade (ör. "SENE BAŞI").
  titleLabel: string;
  // Tutanakta "Dönem:" satırında gösterilecek etiket.
  termLabel: string;
  // Dönemin kısa açıklaması (arayüzde yardımcı metin).
  description: string;
  // Açılış maddesi için döneme özgü giriş paragrafı.
  openingText: string;
  // Kapanış maddesi için döneme özgü kapanış paragrafı.
  closingText: string;
}

export const meetingPeriods: PeriodProfile[] = [
  {
    id: 'sene-basi',
    label: 'Sene Başı',
    titleLabel: 'SENE BAŞI',
    termLabel: '1. Dönem',
    description: 'Yeni eğitim öğretim yılının başında; öğrencileri tanıma, hedef belirleme ve dönem planlaması.',
    openingText:
      'Eğitim öğretim yılının başında, sınıfta ders okutan öğretmenlerin katılımıyla şube öğretmenler kurulu toplantısı, sınıf rehber öğretmeni başkanlığında açıldı. Yapılan yoklamada öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından, yeni eğitim öğretim yılının hayırlı olması dileğiyle gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Yeni eğitim öğretim yılının başında alınan kararların titizlikle uygulanması ve öğrencilerin gelişiminin yıl boyunca yakından izlenmesi temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.'
  },
  {
    id: 'ikinci-donem',
    label: '2. Dönem',
    titleLabel: '2. DÖNEM',
    termLabel: '2. Dönem',
    description: 'İkinci dönem başında; birinci dönemin değerlendirilmesi ve ikinci dönem planlaması.',
    openingText:
      'İkinci dönemin başında, sınıfta ders okutan öğretmenlerin katılımıyla şube öğretmenler kurulu toplantısı, sınıf rehber öğretmeni başkanlığında açıldı. Yapılan yoklamada öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından, birinci dönemin genel değerlendirmesi yapılarak ikinci döneme ilişkin gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Birinci dönem elde edilen kazanımların ikinci dönemde pekiştirilmesi, belirlenen hedeflere ulaşılması ve alınan kararların uygulanması temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.'
  },
  {
    id: 'sene-sonu',
    label: 'Sene Sonu',
    titleLabel: 'SENE SONU',
    termLabel: '2. Dönem',
    description: 'Eğitim öğretim yılının sonunda; yıl genelinin değerlendirilmesi ve gelecek yıla öneriler.',
    openingText:
      'Eğitim öğretim yılının sonunda, sınıfta ders okutan öğretmenlerin katılımıyla şube öğretmenler kurulu toplantısı, sınıf rehber öğretmeni başkanlığında açıldı. Yapılan yoklamada öğretmenlerin toplantıya katıldığı görüldü. Saygı duruşu ve İstiklal Marşı’nın okunmasının ardından, eğitim öğretim yılının genel değerlendirmesinin yapılması amacıyla gündem maddelerinin görüşülmesine geçildi.',
    closingText:
      'Eğitim öğretim yılı boyunca gösterilen çaba için tüm öğretmenlere teşekkür edilerek, alınan kararların ve değerlendirmelerin gelecek yıl için yol gösterici olması temennisiyle toplantı, başkan tarafından iyi dileklerle sonlandırıldı.'
  }
];

export const getPeriodProfile = (id: MeetingPeriod): PeriodProfile =>
  meetingPeriods.find(p => p.id === id) ?? meetingPeriods[0];
