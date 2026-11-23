# Şube Öğretmenler Kurulu Tutanak Oluşturucu

Lise düzeyindeki şube öğretmenler kurulu toplantıları için düzenlenebilir gündem, öğretmen katılım listesi ve Word çıktısı hazırlayan React uygulamasıdır. Dönem modeli MEB Eğitim Kurulları ve Zümreleri Yönergesi Madde 10’a göre Kasım / Nisan (+ yıl sonu/ihtiyaç) şeklindedir.

## Özellikler

- Kasım, Nisan ve yıl sonu/ihtiyaç için ayrı gündem ve içerik yapısı
- Okul, sınıf, eğitim yılı, tarih, saat, yer, kurul başkanı ve müdür onayı
- Öğretmen katılım listesi ve rehberlik üyesi uyarısı
- Numaralı kararlar ve okulun kullandığı biçimde imza sirküsü (sınıf rehber öğretmeni, kurul başkanı, okul müdürü)
- Girdiler değişmedikçe sabit kalan önizleme ve “Metni Yeniden Üret” seçeneği
- Konuşma uzunluğu, anlatım biçimi ve içerik varyasyonu ayarları
- Düzenlenebilir gündem maddeleri (Madde 10/(8) seçilebilir başlıklar dâhil); varsayılan
  gündem dönem ve sınıf düzeyine göre gelir
- Sayfa numaralı Word belgesi çıktısı
- Masaüstü ve mobil ekranlara uyumlu arayüz

## Kurulum ve çalıştırma

Node.js 22 veya daha yeni bir sürüm önerilir.

```bash
npm install
npm run dev
```

Vite, terminalde yerel erişim adresini gösterir.

## Kalite kontrolleri

```bash
npm run lint
npm test
npm run test:audit
npm run build
```

GitHub Pages dağıtım iş akışı lint, standart test ve üretim derlemesi başarıyla
tamamlandıktan sonra paketi yayımlar. `test:audit` komutu ayrıca 152.064 üretim
kombinasyonunu Türkçe, konu bütünlüğü ve karar uygunluğu açısından tarar.
`engineRegression.test.ts`, üç dönemin tam gündemini çok konuşmacılı olarak
üretip belge içinde yinelenen cümle veya karar bulunmadığını denetler.

## Gündem dayanağı

Varsayılan gündemler MEB Eğitim Kurulları ve Zümreleri Yönergesi Madde 10'a
dayanır (bu maddenin son değişikliği 02/01/2024; 21/01/2025 ve 12/02/2025
değişiklikleri yalnızca zümre maddelerini kapsar).

- Ortaöğretimde kurullar kasım ve nisan aylarında toplanır; ders yılı sonundaki
  toplantıda yıl boyunca alınan kararlar ve sonuçları değerlendirilir (10/(2)).
- Her dönemde "bir önceki toplantıda alınan kararlar" maddesi bulunur (10/(8)-a).
  9. sınıfların kasım toplantısında görüşülecek önceki karar olmadığından bu
  madde 9. sınıfta kapalı gelir.
- Başarı durumu (b), öğretim programlarıyla uyum (c), kaynaştırma (d), atölye ve
  laboratuvardan güvenli yararlanma (e), okul-çevre iş birliği (f), etkinlik,
  yarışma, gezi, kulüp ve sosyal sorumluluk (ğ), kişilik ve sosyal gelişim (i),
  okul sağlığı (j), değerler eğitimi (k) ve iş sağlığı ve güvenliği (l)
  başlıkları yönerge diliyle yer alır.
- (ç) ortaokula, (g) ve (h) mesleki ve teknik eğitime özgü olduğu için varsayılan
  gündemde yoktur; gerekirse elle eklenebilir. Devamsızlık, davranış ve
  ölçme-değerlendirme maddeleri yönergedeki "benzeri konular" kapsamındadır.

## Metin üretimi

- Kasım içeriği birinci dönemin ortasına (dönem başından bu yana yapılan
  gözlemler, ilk sınav sonuçları), Nisan içeriği ikinci dönemin ortasına
  (birinci dönem sonuçları, ders yılının kalan bölümü) göre yazılmıştır.
- Bir konu için döneme özgü içerik yoksa konunun dönemden bağımsız içeriği
  (`categorySpeechContent.ts`) kullanılır.
- Aynı gözlem, öneri ve karar bir belgede yalnızca bir kez kullanılır. Aynı konu
  türünden çok sayıda madde eklendiğinde havuz tükenirse sonraki maddeler daha
  kısa kalır veya kararsız bırakılır.
- Maddenin ilk konuşmacısı konuyu adıyla açar; sonraki konuşmacılar doğrudan bir
  gözlemle, önceki konuşmacının görüşüne katılarak veya maddeye gönderme yaparak
  söze başlar. Öneri yüklemleri ("önerdi", "gerekli gördü", "önemine değindi" …)
  belge genelinde dengeli dağıtılır; aynı kök art arda yinelenmez.
- Rehberlik öğretmeni akademik maddelerde ders öğretmenine özgü sınav ve kazanım
  cümleleri yerine hedef belirleme, sınav kaygısı ve bireysel takip gibi
  rehberlik servisinin bakış açısını taşır.
- Kullanıcının eklediği genel maddelerde başlığı yalnızca ilk konuşmacı anar;
  60 karakterden uzun başlıklar konuşmalarda yinelenmez.
- Elle yazılan branş adları tek biçime getirilir (“rehber öğretmen” →
  “Rehberlik”, “matematik öğretmeni” → “Matematik”).

## Veri gizliliği

Uygulama mevcut hâliyle öğretmen ve toplantı bilgilerini bir sunucuya göndermez. Veriler tarayıcı belleğinde işlenir ve sayfa yenilendiğinde sıfırlanır. Oluşturulan Word dosyası doğrudan kullanıcının cihazına indirilir.

Ortak veya herkese açık bilgisayarlarda kişisel bilgi girerken kurumun veri güvenliği kurallarına uyulmalıdır.

## Belge doğruluğu

Üretilen metin bir taslaktır. Konuşmaların, değerlendirmelerin, katılım bilgilerinin ve kararların gerçek toplantı içeriğiyle örtüştüğü kullanıcı tarafından kontrol edilmelidir. Kesinleştirilmeden veya imzalanmadan önce kurumun kullandığı resmî şablon ve uygulamalarla karşılaştırılmalıdır.

## Proje yapısı

- `src/components`: Formlar, ayar panelleri ve tutanak önizlemesi
- `src/data`: Dönem, sınıf düzeyi, başarı düzeyi ve branş içerikleri
- `src/utils`: Tutanak üretimi, biçimlendirme ve Word dışa aktarımı
- `src/types`: Ortak TypeScript veri tipleri
