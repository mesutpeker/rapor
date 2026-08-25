// Türkçe-duyarlı metin biçimlendirme yardımcıları.
// 'i' → 'İ', 'ı' → 'I' gibi Türkçe büyük/küçük harf kurallarını dikkate alır.
const TR = 'tr-TR';

// Cümle içinde de büyük harfle yazılması gereken özel ad ve eğitim
// kısaltmaları. Metni bütünüyle başlık biçiminde tutmak yerine yalnızca bu
// parçaları geri yüklemek, "Seçmeli Geometri dersinde" gibi yapay büyük harf
// kullanımını da önler.
const properNameReplacements: Array<[RegExp, string]> = [
  [/\btürkçe\b/giu, 'Türkçe'],
  [/\btürk\b/giu, 'Türk'],
  [/\bingilizce\b/giu, 'İngilizce'],
  [/\balmanca\b/giu, 'Almanca'],
  [/\bfransızca\b/giu, 'Fransızca'],
  [/\bispanyolca\b/giu, 'İspanyolca'],
  [/\barapça\b/giu, 'Arapça'],
  [/\brusça\b/giu, 'Rusça'],
  [/\bitalyanca\b/giu, 'İtalyanca'],
  [/\bçince\b/giu, 'Çince'],
  [/\bjaponca\b/giu, 'Japonca'],
  [/\bosmanlı\b/giu, 'Osmanlı'],
  [/\batatürk\b/giu, 'Atatürk'],
  [/\bmuhammed\b/giu, 'Muhammed'],
  [/\bkur'an-ı kerim\b/giu, "Kur'an-ı Kerim"],
  [/\bt\.c\.(?=\s|$)/giu, 'T.C.'],
  [/\bhz\.(?=\s|$)/giu, 'Hz.'],
  [/\byks\b/giu, 'YKS'],
  [/\btyt\b/giu, 'TYT'],
  [/\bayt\b/giu, 'AYT'],
  [/\blgs\b/giu, 'LGS'],
  [/\bram\b/giu, 'RAM']
];

const restoreProperNamesTr = (input: string): string =>
  properNameReplacements.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    input
  );

// Her kelimenin ilk harfi büyük, kalanı küçük (öğretmen adı-soyadı için).
// "AHMET yılmaz" / "ahmet YILMAZ" → "Ahmet Yılmaz"
export const toTitleCaseTr = (input: string): string =>
  input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word =>
      word
        ? word.charAt(0).toLocaleUpperCase(TR) + word.slice(1).toLocaleLowerCase(TR)
        : word
    )
    .join(' ');

// Hazır cümle parçaları küçük harfle saklansa bile çıktıdaki ilk harfi Türkçe
// kurallarına göre büyütür. Cümlenin geri kalanındaki özel adlara dokunmaz.
export const capitalizeSentenceStartTr = (input: string): string => {
  const text = input.trim();
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase(TR) + text.slice(1);
};

// Öğretmen adı cümlenin öznesi olarak ayrı biçimlendirildiğinde devamındaki
// konuşma metnini küçük harfle başlatır. T.C. ve YKS gibi kısaltmaları korur.
export const lowercaseSentenceStartTr = (input: string): string => {
  const text = input.trim();
  if (!text) return text;

  const firstToken = text.split(/\s+/, 1)[0];
  const isInitialism = /^(?:[A-ZÇĞİÖŞÜ]\.){2,}$/.test(firstToken)
    || /^[A-ZÇĞİÖŞÜ0-9]{2,}$/.test(firstToken);
  const startsWithProperName = [
    'Türk', 'Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca',
    'Arapça', 'Rusça', 'İtalyanca', 'Çince', 'Japonca', 'Osmanlı',
    'Atatürk', "Kur'an-ı", 'Hz.'
  ].some(name => text === name || text.startsWith(`${name} `));
  if (isInitialism || startsWithProperName) return text;

  return text.charAt(0).toLocaleLowerCase(TR) + text.slice(1);
};

// Yalnızca ilk harf büyük, kalan tümüyle küçük (gündem maddesi başlığı için).
// "DEVAMSIZLIK DURUMU" / "devamsızlık DURUMU" → "Devamsızlık durumu"
export const toSentenceCaseTr = (input: string): string => {
  const text = input.trim().replace(/\s+/g, ' ');
  if (!text) return text;
  const lower = text.toLocaleLowerCase(TR);
  return restoreProperNamesTr(
    lower.charAt(0).toLocaleUpperCase(TR) + lower.slice(1)
  );
};

// Branş adı bir cümlenin içinde kullanılırken okul arayüzündeki başlık
// biçimini doğal yazıma dönüştürür. Örnek: "Seçmeli Geometri" →
// "seçmeli geometri", "Türk Halk Müziği" → "Türk halk müziği".
export const toCourseNameInSentenceTr = (input: string): string =>
  restoreProperNamesTr(input.trim().replace(/\s+/g, ' ').toLocaleLowerCase(TR));

// Tarih alanının ISO biçimini (YYYY-MM-DD) tutanakta kullanılan Türkçe biçime çevirir.
// Eski veya elle girilmiş farklı biçimleri değiştirmeden bırakır.
export const formatDateTr = (input: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!match) return input;
  return `${match[3]}.${match[2]}.${match[1]}`;
};
