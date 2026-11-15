// Türkçe-duyarlı metin biçimlendirme yardımcıları.
// 'i' → 'İ', 'ı' → 'I' gibi Türkçe büyük/küçük harf kurallarını dikkate alır.
const TR = 'tr-TR';

// JavaScript'in \b sınırı yalnızca ASCII harflerini tanır; "osmanlı", "çince"
// gibi Türkçe harfle başlayan veya biten sözcüklerde çalışmaz. Bu yüzden sözcük
// sınırı Unicode harf/rakam sınıflarıyla tanımlanır.
const WORD_CHAR = '\\p{L}\\p{N}';
const wholeWord = (source: string): RegExp =>
  new RegExp(`(?<![${WORD_CHAR}])(?:${source})(?![${WORD_CHAR}])`, 'gu');

// Cümle içinde de büyük harfle yazılması gereken özel adlar ve kısaltmalar.
// Kalıplar küçük harfe çevrilmiş metin üzerinde çalışır. Sıra önemlidir: uzun
// ve daha özel kalıplar önce gelir.
const properNameReplacements: Array<[RegExp, string]> = [
  [wholeWord("kur['’]an-ı kerim"), "Kur'an-ı Kerim"],
  [wholeWord('mill[iî] mücadele'), 'Millî Mücadele'],
  [wholeWord('kurtuluş savaşı'), 'Kurtuluş Savaşı'],
  [wholeWord('soğuk savaş'), 'Soğuk Savaş'],
  [wholeWord('istiklal marşı'), 'İstiklal Marşı'],
  [wholeWord('cumhuriyet bayramı'), 'Cumhuriyet Bayramı'],
  [wholeWord('cumhuriyet'), 'Cumhuriyet'],
  [wholeWord('atatürkçülük'), 'Atatürkçülük'],
  [wholeWord('atatürk'), 'Atatürk'],
  [wholeWord('türkiye'), 'Türkiye'],
  [wholeWord('türkçesi'), 'Türkçesi'],
  [wholeWord('türkçe'), 'Türkçe'],
  [wholeWord('türk'), 'Türk'],
  [wholeWord('ingilizce'), 'İngilizce'],
  [wholeWord('almanca'), 'Almanca'],
  [wholeWord('fransızca'), 'Fransızca'],
  [wholeWord('ispanyolca'), 'İspanyolca'],
  [wholeWord('arapça'), 'Arapça'],
  [wholeWord('rusça'), 'Rusça'],
  [wholeWord('italyanca'), 'İtalyanca'],
  [wholeWord('çince'), 'Çince'],
  [wholeWord('japonca'), 'Japonca'],
  [wholeWord('osmanlı'), 'Osmanlı'],
  [wholeWord('muhammed'), 'Muhammed'],
  [/(?<![\p{L}\p{N}])t\.c\.(?=\s|$)/gu, 'T.C.'],
  [/(?<![\p{L}\p{N}])hz\.(?=\s|$)/gu, 'Hz.'],
  [wholeWord('e-okul'), 'e-Okul'],
  [wholeWord('tübitak'), 'TÜBİTAK'],
  [wholeWord('mebbis'), 'MEBBİS'],
  [wholeWord('bilsem'), 'BİLSEM'],
  [wholeWord('ösym'), 'ÖSYM'],
  [wholeWord('kvkk'), 'KVKK'],
  [wholeWord('yks'), 'YKS'],
  [wholeWord('tyt'), 'TYT'],
  [wholeWord('ayt'), 'AYT'],
  [wholeWord('lgs'), 'LGS'],
  [wholeWord('ram'), 'RAM'],
  [wholeWord('meb'), 'MEB'],
  [wholeWord('bep'), 'BEP'],
  [wholeWord('dyk'), 'DYK'],
  [wholeWord('isg'), 'İSG'],
  [wholeWord('şök'), 'ŞÖK'],
  [wholeWord('pdr'), 'PDR'],
  [wholeWord('eba'), 'EBA']
];

// Belirli bir tarihi gösteren ay adları büyük harfle yazılır: "29 Ekim".
const datedMonthPattern =
  /(?<![\p{L}\p{N}])(\d{1,2}) (ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)(?![\p{L}\p{N}])/gu;

const restoreProperNamesTr = (input: string): string =>
  properNameReplacements
    .reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), input)
    .replace(
      datedMonthPattern,
      (_match, day: string, month: string) =>
        `${day} ${month.charAt(0).toLocaleUpperCase(TR)}${month.slice(1)}`
    );

// Cümle başında küçültülmemesi gereken özel adlar.
const sentenceInitialProperNames = [
  ...new Set(properNameReplacements.map(([, replacement]) => replacement)),
  "Kur'an-ı"
];

const capitalizeWordTr = (word: string): string =>
  word
    ? word.charAt(0).toLocaleUpperCase(TR) + word.slice(1).toLocaleLowerCase(TR)
    : word;

// Her kelimenin ilk harfi büyük, kalanı küçük (öğretmen adı-soyadı için).
// "AHMET yılmaz" / "ahmet YILMAZ" → "Ahmet Yılmaz"; tireli soyadlarında her
// parça ayrı büyütülür: "öztürk-kaya" → "Öztürk-Kaya".
export const toTitleCaseTr = (input: string): string =>
  input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.split('-').map(capitalizeWordTr).join('-'))
    .join(' ');

// Resmî yazışma düzenindeki ad-soyad biçimi: ad(lar) yalnızca ilk harfi büyük,
// soyadı tümüyle büyük harf. "ahmet yılmaz" → "Ahmet YILMAZ".
// Tek sözcüklü girişler başlık düzeninde bırakılır.
export const toSignatureNameTr = (input: string): string => {
  const words = toTitleCaseTr(input).split(' ').filter(Boolean);
  if (words.length < 2) return words.join(' ');
  const surname = words[words.length - 1].toLocaleUpperCase(TR);
  return [...words.slice(0, -1), surname].join(' ');
};

// Hazır cümle parçaları küçük harfle saklansa bile çıktıdaki ilk harfi Türkçe
// kurallarına göre büyütür. Cümlenin geri kalanındaki özel adlara dokunmaz.
export const capitalizeSentenceStartTr = (input: string): string => {
  const text = input.trim();
  if (!text) return text;
  // "e-Okul" gibi bilinçli küçük harfle başlayan adlar korunur.
  if (/^[a-zçğıöşü]-\p{Lu}/u.test(text)) return text;
  return text.charAt(0).toLocaleUpperCase(TR) + text.slice(1);
};

// Öğretmen adı cümlenin öznesi olarak ayrı biçimlendirildiğinde devamındaki
// konuşma metnini küçük harfle başlatır. T.C. ve YKS gibi kısaltmaları ve
// Cumhuriyet, Millî Mücadele gibi özel adları korur.
export const lowercaseSentenceStartTr = (input: string): string => {
  const text = input.trim();
  if (!text) return text;

  const firstToken = text.split(/\s+/, 1)[0];
  const isInitialism = /^(?:[A-ZÇĞİÖŞÜ]\.){2,}$/.test(firstToken)
    || /^[A-ZÇĞİÖŞÜ0-9]{2,}$/.test(firstToken);
  const startsWithProperName = sentenceInitialProperNames.some(name => {
    if (!text.startsWith(name)) return false;
    const next = text.charAt(name.length);
    return name.endsWith('.') || !next || !/[\p{L}\p{N}]/u.test(next);
  });
  if (isInitialism || startsWithProperName) return text;

  return text.charAt(0).toLocaleLowerCase(TR) + text.slice(1);
};

const hasLetters = (text: string): boolean => /\p{L}/u.test(text);

// Gündem maddesi başlığını cümle düzenine getirir.
// - Tümü BÜYÜK veya tümü küçük yazılmış başlıklar: yalnızca ilk harf büyük,
//   özel adlar ve kısaltmalar geri yüklenir.
//   "DEVAMSIZLIK DURUMU" → "Devamsızlık durumu"
// - Karışık yazılmış başlıklar: kullanıcının yazımı korunur, yalnızca ilk harf
//   büyütülür. Böylece "29 Ekim Cumhuriyet Bayramı" veya "TÜBİTAK projeleri"
//   gibi özel adlar bozulmaz.
export const toSentenceCaseTr = (input: string): string => {
  const text = input.trim().replace(/\s+/g, ' ');
  if (!text || !hasLetters(text)) return text;

  const isAllUpper = text === text.toLocaleUpperCase(TR);
  const isAllLower = text === text.toLocaleLowerCase(TR);
  if (!isAllUpper && !isAllLower) return capitalizeSentenceStartTr(text);

  return capitalizeSentenceStartTr(restoreProperNamesTr(text.toLocaleLowerCase(TR)));
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
