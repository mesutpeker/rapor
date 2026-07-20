// Türkçe-duyarlı metin biçimlendirme yardımcıları.
// 'i' → 'İ', 'ı' → 'I' gibi Türkçe büyük/küçük harf kurallarını dikkate alır.
const TR = 'tr-TR';

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
  if (isInitialism) return text;

  return text.charAt(0).toLocaleLowerCase(TR) + text.slice(1);
};

// Yalnızca ilk harf büyük, kalan tümüyle küçük (gündem maddesi başlığı için).
// "DEVAMSIZLIK DURUMU" / "devamsızlık DURUMU" → "Devamsızlık durumu"
export const toSentenceCaseTr = (input: string): string => {
  const text = input.trim().replace(/\s+/g, ' ');
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase(TR) + text.slice(1).toLocaleLowerCase(TR);
};

// Tarih alanının ISO biçimini (YYYY-MM-DD) tutanakta kullanılan Türkçe biçime çevirir.
// Eski veya elle girilmiş farklı biçimleri değiştirmeden bırakır.
export const formatDateTr = (input: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!match) return input;
  return `${match[3]}.${match[2]}.${match[1]}`;
};
