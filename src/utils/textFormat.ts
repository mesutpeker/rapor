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

// Yalnızca ilk harf büyük, kalan tümüyle küçük (gündem maddesi başlığı için).
// "DEVAMSIZLIK DURUMU" / "devamsızlık DURUMU" → "Devamsızlık durumu"
export const toSentenceCaseTr = (input: string): string => {
  const text = input.trim().replace(/\s+/g, ' ');
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase(TR) + text.slice(1).toLocaleLowerCase(TR);
};
