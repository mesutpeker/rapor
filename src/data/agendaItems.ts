// Gündem başlığından konu türünü (kategori) belirleyen yardımcılar.

// Başlıktan kategori tahmini için anahtar kelimeler. Sıra önemlidir: daha ayırt
// edici kelimeler önce gelir. Eşleşme, başlığın küçük harfli hâlinde anahtar
// kelimenin geçip geçmediğine bakılarak yapılır. Ünsüz yumuşaması (güvenlik →
// güvenliği, etkinlik → etkinliği) eşleşmeyi bozmasın diye kökler kısa tutulur.
const categoryKeywords: { category: string; keywords: string[] }[] = [
  { category: 'acilis', keywords: ['açılış', 'yoklama'] },
  { category: 'kapanis', keywords: ['kapanış'] },
  { category: 'dilek-temenniler', keywords: ['dilek', 'temenni'] },
  { category: 'onceki-kararlar', keywords: ['önceki toplantı', 'önceki karar', 'alınan kararların'] },
  { category: 'kaynastirma', keywords: ['kaynaştırma', 'bütünleştirme', 'özel eğitim', 'bep'] },
  { category: 'ogretim-programi', keywords: ['öğretim program', 'program uyum', 'kazanım'] },
  { category: 'etkinlik-sosyal', keywords: ['kulüp', 'kulüb', 'sosyal sorumluluk', 'etkinli', 'gezi', 'sportif', 'yarışma'] },
  { category: 'degerler-egitimi', keywords: ['değerler eğitimi', 'değerler'] },
  { category: 'okul-sagligi-isg', keywords: ['okul sağlığı', 'iş sağlığı', 'güvenli', 'isg', 'atölye', 'laboratuvar', 'beslenme'] },
  { category: 'devamsizlik', keywords: ['devamsız', 'devam durum'] },
  { category: 'olcme-degerlendirme', keywords: ['ölçme', 'sınav', 'deneme'] },
  { category: 'davranis-disiplin', keywords: ['davranış', 'disiplin', 'tutum', 'kural'] },
  { category: 'motivasyon-katilim', keywords: ['motivasyon', 'derse katılım', 'derse ilgi', 'katılımın artırılması'] },
  { category: 'sosyal-duygusal', keywords: ['sosyal', 'duygusal', 'rehberli', 'psikoloj'] },
  { category: 'veli-iletisim', keywords: ['veli', 'okul-aile', 'aile iş birliği', 'okul-çevre', 'okul çevre'] },
  { category: 'destekleme', keywords: ['destekleme', 'yetiştirme', 'bireysel takip', 'etüt', 'kurs'] },
  { category: 'akademik-basari', keywords: ['akademik', 'başarı', 'not ortalama'] }
];

// Başlıktan otomatik kategori tahmini.
const inferCategoryFromTitle = (title: string): string => {
  const t = title.toLocaleLowerCase('tr-TR');
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
