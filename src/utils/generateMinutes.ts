import type {
  MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes,
  TeacherSpeech, AgendaMinutes, AchievementLevelId, DecisionRecord
} from '../types';
import { getGradeProfile } from '../data/gradeProfiles';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { resolveAgendaCategory } from '../data/agendaItems';
import { getCategoryContent, academicCategories } from '../data/categorySpeechContent';
import { getPeriodContent } from '../data/periodContent';
import {
  getGuidanceContent,
  guidanceFocusByCategory,
  isGuidanceCategory
} from '../data/guidanceContent';
import {
  buildOpeningText,
  getPeriodProfile,
  graduatingFollowUp
} from '../data/meetingPeriods';
import { getRandomItem, getRandomInt } from './randomizer';
import {
  capitalizeSentenceStartTr,
  toCourseNameInSentenceTr,
  toSentenceCaseTr,
  toTitleCaseTr
} from './textFormat';
import { selectTeachersForAgenda } from './teacherSelector';
import { isGuidanceBranch, normalizeBranchName } from './teachers';
import { v4 as uuidv4 } from 'uuid';

const TR = 'tr-TR';

const achievementPriorities: Record<AchievementLevelId, string> = {
  veryHigh:
    'yüksek akademik performansın korunmasını ve çok yönlü gelişimin dengeli biçimde desteklenmesini',
  high:
    'güçlü akademik performansın korunmasını ve bireysel gelişim farklılıklarının düzenli izlenmesini',
  medium:
    'temel kazanımların pekiştirilmesini ve düzenli çalışma alışkanlıklarının geliştirilmesini',
  needsSupport:
    'ulaşılabilir hedefler belirlenmesini ve desteğe ihtiyaç duyan öğrencilerin bireysel olarak izlenmesini',
  low:
    'temel kazanım eksikliklerine öncelik verilmesini ve her öğrencinin mevcut düzeyine göre desteklenmesini',
  mixed:
    'farklı başarı düzeylerine uygun çalışmalar planlanmasını ve her öğrencinin kendi gelişimi içinde izlenmesini'
};

const achievementReviewDimensions: Record<AchievementLevelId, string> = {
  veryHigh:
    'yüksek akademik performansın sürdürülebilirliği ile çok yönlü gelişim arasındaki denge bakımından',
  high:
    'güçlü akademik performansın sürekliliği ve bireysel gelişim farklılıkları bakımından',
  medium:
    'temel kazanımların edinilme düzeyi ve çalışma alışkanlıkları bakımından',
  needsSupport:
    'ulaşılabilir hedeflere ilerleme ve bireysel destek gereksinimleri bakımından',
  low:
    'temel kazanım eksiklikleri ve öğrencilerin bireysel gelişimi bakımından',
  mixed:
    'farklı başarı düzeyleri ile öğrencilerin bireysel gelişimi bakımından'
};

const introClosersByTone: Record<GenerationSettings['tone'], string[]> = {
  official: [
    'değerlendirmelerini kurula sundu',
    'uygulanacak esaslara ilişkin görüşlerini sundu',
    'kurulun dikkate alması gereken noktaları açıkladı',
    'öncelikli hususları ele aldı',
    'tespitlerini kurul üyeleriyle paylaştı',
    'görüşlerini kurul üyelerine aktardı'
  ],
  balanced: [
    'gözlemlerini ve önceliklerini paylaştı',
    'değerlendirmelerini aktardı',
    'uygulanabilecek çalışmaları ele aldı',
    'dikkat çeken noktaları paylaştı',
    'izlenebilecek adımları paylaştı',
    'görüşlerini paylaştı'
  ],
  detailed: [
    'gözlemlerini, öğrenci ihtiyaçlarını ve izlenecek adımları birlikte değerlendirdi',
    'eldeki bilgileri uygulanabilecek adımlarla birlikte ele aldı',
    'öncelikleri, uygulama sürecini ve beklenen katkıları ayrıntılandırdı',
    'öğrenci ihtiyaçlarını ve uygulanabilecek çalışmaları birlikte ele aldı',
    'tespitlerini ve bunlara dayalı önerilerini ayrıntılı biçimde paylaştı',
    'gözlemlerini gerekçeleriyle birlikte aktardı',
    'görüşlerini somut örneklerle açıkladı'
  ]
};

const generalIntroClosersByTone: Record<GenerationSettings['tone'], string[]> = {
  official: [
    'konuya ilişkin değerlendirmelerini kurula sundu',
    'uygulanacak esaslara ilişkin görüşlerini sundu',
    'kurulun dikkate alması gereken noktaları açıkladı',
    'öncelikli hususları ele aldı',
    'tespitlerini kurul üyeleriyle paylaştı',
    'görüşlerini kurul üyelerine aktardı'
  ],
  balanced: [
    'konuya ilişkin gözlemlerini ve önceliklerini paylaştı',
    'değerlendirmelerini aktardı',
    'uygulanabilecek çalışmaları ele aldı',
    'dikkat çeken noktaları paylaştı',
    'izlenebilecek adımları paylaştı'
  ],
  detailed: [
    'tespitlerini ve izlenebilecek adımları birlikte değerlendirdi',
    'eldeki bilgileri uygulanabilecek adımlarla birlikte ele aldı',
    'öncelikleri, uygulama sürecini ve beklenen katkıları ayrıntılandırdı',
    'konuya ilişkin sonuçları ve önerileri birlikte ele aldı',
    'tespitlerini ve bunlara dayalı önerilerini ayrıntılı biçimde paylaştı',
    'görüşlerini gerekçeleriyle birlikte aktardı'
  ]
};

const detailedRationales: Record<string, string[]> = {
  'akademik-basari': [
    'Bu değerlendirmelerin öğrenme sürecindeki güçlü ve gelişime açık yönleri görünür kılacağını ekledi.',
    'Düzenli izlemenin öğrenci ihtiyaçlarına uygun hedefler belirlemeyi kolaylaştıracağını açıkladı.',
    'Ortak ölçütlerle yapılacak değerlendirmenin öğretmenler arasındaki bilgi paylaşımını güçlendireceğini belirtti.',
    'Somut verilere dayalı planlamanın uygulanacak desteği daha işlevsel kılacağını ifade etti.'
  ],
  devamsizlik: [
    'Devam kayıtlarının düzenli incelenmesinin devamsızlığın öğrenme sürecine etkisini görünür kılacağını açıkladı.',
    'Devamsızlık nedenlerinin öğrenci özelinde ele alınmasının uygulanacak desteği daha işlevsel kılacağını belirtti.',
    'Okul ile aile arasındaki düzenli bilgi paylaşımının devam takibini güçlendireceğini ekledi.',
    'Devamsızlık ile konu eksiklerinin birlikte izlenmesinin telafi ihtiyacını belirlemeyi kolaylaştıracağını ifade etti.'
  ],
  'davranis-disiplin': [
    'Kuralların öğretmenlerce tutarlı uygulanmasının güvenli bir öğrenme ortamını destekleyeceğini ekledi.',
    'Davranışların tekil olaylar yerine süreç içindeki gelişimle birlikte ele alınmasını önemli buldu.',
    'Olumlu davranışların görünür kılınmasının öğrencilerin sorumluluk bilincini güçlendireceğini belirtti.',
    'Ortak yaklaşımın sınıf içindeki beklentileri öğrenciler için daha anlaşılır hâle getireceğini açıkladı.'
  ],
  'motivasyon-katilim': [
    'Öğrencilerin ilgi ve ihtiyaçlarını dikkate alan etkinliklerin derse katılımı güçlendireceğini açıkladı.',
    'Ulaşılabilir hedeflerin öğrencilerin çaba ile sonuç arasındaki ilişkiyi görmesine yardımcı olacağını belirtti.',
    'Farklı katılım yolları sunulmasının daha fazla öğrencinin öğrenme sürecine dâhil olmasını sağlayacağını ekledi.',
    'Düzenli ve geliştirici geri bildirimin öğrencilerin öğrenme isteğini destekleyeceğini ifade etti.'
  ],
  'sosyal-duygusal': [
    'Rehberlik ihtiyaçlarının somut gözlem ve bilgilerle ele alınmasının desteği daha işlevsel kılacağını belirtti.',
    'Güvenli iletişim ortamının öğrencilerin kendilerini ifade etmelerini kolaylaştıracağını ekledi.',
    'Akran ilişkileri ile bireysel ihtiyaçların birlikte değerlendirilmesinin bütüncül bir yaklaşım sağlayacağını açıkladı.',
    'Öğretmenler arasındaki düzenli bilgi paylaşımının rehberlik çalışmalarındaki sürekliliği güçlendireceğini ifade etti.'
  ],
  'olcme-degerlendirme': [
    'Çeşitli değerlendirme araçlarının yalnızca sonucu değil, öğrenme sürecini de görünür kılacağını açıkladı.',
    'Ortak ölçütlerin öğrenci gelişimini daha tutarlı değerlendirmeye yardımcı olacağını belirtti.',
    'Sonuçların kazanım bazında incelenmesinin tamamlayıcı çalışma ihtiyacını netleştireceğini ekledi.',
    'Zamanında verilen geri bildirimin öğrencilerin kendi öğrenmelerini düzenlemelerini destekleyeceğini ifade etti.'
  ],
  'veli-iletisim': [
    'Açık ve düzenli iletişimin okul ile aile arasında güvene dayalı iş birliğini güçlendireceğini ekledi.',
    'Somut gözlemlere dayalı bilgilendirmenin veli görüşmelerini daha işlevsel kılacağını belirtti.',
    'Farklı iletişim kanallarının velilere zamanında ulaşmayı kolaylaştıracağını açıkladı.',
    'Olumlu gelişmelerin de paylaşılmasının okul-aile iletişimindeki sürekliliği destekleyeceğini ifade etti.'
  ],
  destekleme: [
    'Çalışmaların öğrenci düzeyine göre planlanmasının verilen desteği daha işlevsel hâle getireceğini açıkladı.',
    'Küçük ve izlenebilir hedeflerin öğrencinin ilerlemesini görünür kılacağını belirtti.',
    'Ders öğretmenleri arasındaki bilgi paylaşımının destek çalışmalarında bütünlük sağlayacağını ekledi.',
    'Düzenli geri bildirimin çalışma planlarının öğrenci ihtiyacına göre güncellenmesini kolaylaştıracağını ifade etti.'
  ],
  'dilek-temenniler': [
    'Öğretmenler arasındaki dayanışmanın ortak çalışmaların sağlıklı yürütülmesine katkı sağlayacağını ekledi.',
    'Düzenli bilgi paylaşımının kurul kararlarının uygulanmasını kolaylaştıracağını belirtti.',
    'Ortak hedefler etrafındaki iş birliğinin öğrenci yararını güçlendireceğini ifade etti.',
    'Kurul üyeleri arasındaki açık iletişimin çalışma sürecine katkı sağlayacağını açıkladı.'
  ],
  'onceki-kararlar': [
    'Kararların uygulama sonuçlarının düzenli izlenmesinin kurul çalışmalarına süreklilik kazandıracağını açıkladı.',
    'Sonuç alınamayan kararların nedenlerinin bilinmesinin yeni kararları daha uygulanabilir kılacağını belirtti.',
    'Kararların sorumlu ve izleme zamanıyla birlikte kayda geçirilmesinin uygulamayı kolaylaştıracağını ekledi.'
  ],
  genel: [
    'Sorumlulukların ve izleme zamanının açıkça belirlenmesinin uygulamayı kolaylaştıracağını açıkladı.',
    'Somut bilgilere dayalı ortak değerlendirmenin kurul çalışmalarına yön vereceğini belirtti.',
    'Öğretmenler arasındaki düzenli bilgi paylaşımının ortak yaklaşımı güçlendireceğini ekledi.',
    'Belirlenen adımların sonuçlarının gözden geçirilmesinin sonraki değerlendirmelere veri sağlayacağını ifade etti.'
  ],
  'ogretim-programi': [
    'Program kazanımlarının ders planlarıyla birlikte izlenmesinin uygulamada birlik sağlayacağını açıkladı.',
    'Ortak ölçütlerin öğretim sürecindeki sapmaları erken fark etmeye yardımcı olacağını belirtti.',
    'Branşlar arası bilgi paylaşımının program uyumunu güçlendireceğini ekledi.'
  ],
  kaynastirma: [
    'Bireyselleştirilmiş destek planlarının ders öğretmenleriyle birlikte yürütülmesinin yararlı olacağını belirtti.',
    'Kaynaştırma öğrencilerinin sınıf içi katılımının düzenli izlenmesinin desteği işlevsel kılacağını açıkladı.',
    'Rehberlik servisiyle koordinasyonun özel eğitim ihtiyacına daha bütüncül yanıt vereceğini ekledi.'
  ],
  'etkinlik-sosyal': [
    'Etkinliklerin öğrenme hedefleriyle ilişkilendirilmesinin katılımı anlamlı kılacağını açıkladı.',
    'Kulüp ve sosyal sorumluluk çalışmalarının düzenli kayıt altına alınmasının izlemeyi kolaylaştıracağını belirtti.',
    'Farklı öğrenci gruplarına uygun etkinlik seçeneklerinin sunulmasının kapsayıcılığı güçlendireceğini ekledi.'
  ],
  'degerler-egitimi': [
    'Değerler eğitiminin ders içi örneklerle bütünleştirilmesinin kalıcı öğrenmeyi destekleyeceğini belirtti.',
    'Ortak tutum ve davranış beklentilerinin değerler çalışmalarını güçlendireceğini açıkladı.',
    'Öğrenci kulüp faaliyetlerinin değerler eğitimiyle ilişkilendirilmesinin yararlı olacağını ekledi.'
  ],
  'okul-sagligi-isg': [
    'Sağlık ve güvenlik tedbirlerinin düzenli hatırlatılmasının riskleri azaltacağını açıkladı.',
    'Atölye ve laboratuvar kullanımında ortak güvenlik kurallarının uygulanmasını önemli buldu.',
    'Öğrenci farkındalığının artırılmasının güvenli öğrenme ortamını destekleyeceğini belirtti.'
  ]
};

const wishOpenings: Record<MeetingInfo['period'], string[]> = {
  'kasim': [
    'Eğitim öğretim yılının kalan bölümüne ilişkin iyi dileklerini ve iş birliğine dair beklentilerini paylaştı.',
    'Kurul üyelerine verimli ve sağlıklı bir eğitim öğretim yılı diledi.',
    'Yıl boyunca sürdürülecek ortak çalışmalara ilişkin temennilerini dile getirdi.',
    'Öğrenciler ve öğretmenler için başarılı bir eğitim öğretim yılı diledi.'
  ],
  'nisan': [
    'Ders yılının kalan bölümüne ilişkin iyi dileklerini ve ortak çalışmaya dair beklentilerini paylaştı.',
    'Kurul üyelerine sağlıklı ve verimli bir çalışma dönemi diledi.',
    'Yıl boyunca kurulan iş birliğinin sürmesine ilişkin temennilerini dile getirdi.',
    'Öğrenciler ve öğretmenler için başarılı bir ders yılı sonu diledi.'
  ],
  'sene-sonu': [
    'Yıl boyunca yürütülen çalışmalar için kurul üyelerine teşekkür etti.',
    'Gelecek eğitim öğretim yılına ilişkin iyi dileklerini paylaştı.',
    'Öğrenciler ve öğretmenler için sağlıklı ve verimli bir tatil dönemi diledi.',
    'Kurul üyelerine katkıları için teşekkür ederek iyi dileklerini sundu.'
  ]
};

const graduatingWishOpenings = [
  'Yıl boyunca yürütülen çalışmalar için kurul üyelerine teşekkür etti.',
  'Öğrencilere mezuniyet sonrası yaşamlarında sağlık ve başarı diledi.',
  'Öğrenciler ve öğretmenler için sağlıklı ve verimli bir tatil dönemi diledi.',
  'Kurul üyelerine katkıları için teşekkür ederek mezun olan öğrencilere iyi dileklerini sundu.'
];

const semanticStopWords = new Set([
  'ayrıca', 'bunun', 'için', 'olarak', 'olduğu', 'olacağını', 'gerektiği',
  'gerektiğine', 'öğrencilerin', 'öğrenciler', 'dönem', 'yılında', 'yılın',
  'yıl', 'birlikte', 'biçimde', 'yönelik', 'konusunda', 'çalışmaların'
]);

// Aynı cümleler bir belgede yüzlerce kez karşılaştırıldığı için sözcük
// kümeleri ve kök sınamaları önbelleğe alınır. Önbellek sınırlı tutulur.
const CACHE_LIMIT = 5000;
const tokenCache = new Map<string, Set<string>>();
const semanticTokens = (text: string): Set<string> => {
  const cached = tokenCache.get(text);
  if (cached) return cached;
  const tokens = new Set(
    text
      .toLocaleLowerCase(TR)
      .replace(/[^a-zçğıöşü0-9\s]/gi, ' ')
      .split(/\s+/)
      .filter(token => token.length >= 5 && !semanticStopWords.has(token))
      .map(token => token.slice(0, 7))
  );
  if (tokenCache.size >= CACHE_LIMIT) tokenCache.clear();
  tokenCache.set(text, tokens);
  return tokens;
};

const rootPatternCache = new Map<string, RegExp>();
const rootPattern = (root: string): RegExp => {
  let pattern = rootPatternCache.get(root);
  if (!pattern) {
    pattern = new RegExp(`(?<![\\p{L}])${root}`, 'u');
    rootPatternCache.set(root, pattern);
  }
  return pattern;
};
const lowerCache = new Map<string, string>();
const lowerTr = (text: string): string => {
  let lower = lowerCache.get(text);
  if (lower === undefined) {
    lower = text.toLocaleLowerCase(TR);
    if (lowerCache.size >= CACHE_LIMIT) lowerCache.clear();
    lowerCache.set(text, lower);
  }
  return lower;
};

const isSemanticallySimilar = (left: string, right: string): boolean => {
  const normalizedLeft = left.toLocaleLowerCase(TR).replace(/[^a-zçğıöşü0-9]/gi, '');
  const normalizedRight = right.toLocaleLowerCase(TR).replace(/[^a-zçğıöşü0-9]/gi, '');
  if (normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft)) {
    return true;
  }

  const leftTokens = semanticTokens(left);
  const rightTokens = semanticTokens(right);
  const smallestSize = Math.min(leftTokens.size, rightTokens.size);
  if (smallestSize < 3) return false;

  const common = [...leftTokens].filter(token => rightTokens.has(token)).length;
  return common / smallestSize >= 0.6;
};

// Aynı konuşmanın gövdesinde, aynı ana sözcükle başlayıp iki temel sözcüğü
// paylaşan iki cümle aynı düşünceyi yineler: "Katılımın adil ve kapsayıcı
// tutulmasının …" ile "Katılımın kapsayıcı biçimde teşvik edilmesinin …" gibi.
// Yalnızca gövde cümlelerinin kendi aralarında uygulanır; konu girişi ile
// gözlemin aynı sözcükle başlaması olağandır.
const restatesSameIdea = (left: string, right: string): boolean => {
  const leftTokens = semanticTokens(left);
  const rightTokens = semanticTokens(right);
  const [leftHead] = leftTokens;
  const [rightHead] = rightTokens;
  if (!leftHead || leftHead !== rightHead) return false;
  const common = [...leftTokens].filter(token => rightTokens.has(token)).length;
  return common >= 2;
};

// Dilek ve temenniler maddesinde aynı söz eyleminin (teşekkür, dilek, temenni)
// tek konuşmada iki kez geçmesini önlemek için kullanılır.
const repeatsWishSpeechAct = (left: string, right: string): boolean => {
  const speechActs = [/teşekkür/i, /(?:diledi|dilek)/i, /temenni/i];
  return speechActs.some(pattern => pattern.test(left) && pattern.test(right));
};

const formatFocusList = (focus: string): string =>
  focus.replace(/,\s*([^,]+)$/, ' ve $1');

const countFocusItems = (focus: string): number =>
  focus.split(',').filter(part => part.trim()).length;

const toAccusativeGerund = (phrase: string): string => phrase
  .replace(/ması$/, 'masını')
  .replace(/mesi$/, 'mesini');

// Bir yüklemin kökü cümlenin içinde zaten geçiyorsa o yüklem kullanılmaz:
// "…öncelik verilmesini öncelikli gördü", "gerekli görülen … gerektiğine" gibi
// yinelemeler anlatımı bozar.
const endingRoots: Record<string, string> = {
  'öncelikli gördü.': 'öncelik',
  'gerekli gördü.': 'gerek',
  'yararlı buldu.': 'yarar',
  'önemli buldu.': 'önem',
  'önerdi.': 'öner',
  'tavsiye etti.': 'tavsiye',
  'teklif etti.': 'teklif',
  'gerektiğine dikkat çekti.': 'gerek',
  'yararlı olacağını belirtti.': 'yarar',
  'önerisinde bulundu.': 'öner',
  'önemine değindi.': 'önem'
};

// Kök yalnızca sözcük başında aranır; aksi hâlde "dönem" içindeki "önem" gibi
// rastlantısal eşleşmeler yüklem seçimini gereksiz yere daraltır.
const echoesRoot = (text: string, ending: string): boolean => {
  const root = endingRoots[ending];
  if (!root) return false;
  return rootPattern(root).test(lowerTr(text));
};

const toGenitiveGerund = (phrase: string): string => phrase
  .replace(/ması$/, 'masının')
  .replace(/mesi$/, 'mesinin');

const hasWordRoot = (text: string, root: string): boolean =>
  rootPattern(root).test(lowerTr(text));

// Öneri ad öbeğini ("…yapılması") bir yükleme bağlayan kalıplar. Her kalıp
// öbeğe kendi hâl ekini verir (önerdi → "yapılmasını", önemine değindi →
// "yapılmasının"). Belge genelinde en az kullanılan kalıp seçilir; böylece
// tutanak boyunca aynı yüklemler ("önerdi", "öncelikli gördü") yığılmaz.
// root: öbekte aynı kök geçiyorsa kalıp kullanılmaz ("öncelik verilmesini
// öncelikli gördü" gibi yinelemeleri önler). weight: doğallığı daha düşük
// kalıpların seçilme önceliğini azaltır.
interface SuggestionEnding {
  key: string;
  root?: string;
  weight?: number;
  build: (phrase: string) => string;
}

const suggestionEndings: SuggestionEnding[] = [
  { key: 'önerdi.', root: 'öner', build: phrase => `${toAccusativeGerund(phrase)} önerdi.` },
  { key: 'gerektiğine dikkat çekti.', root: 'gerek', build: phrase => `${phrase} gerektiğine dikkat çekti.` },
  { key: 'yönünde görüş bildirdi.', build: phrase => `${phrase} yönünde görüş bildirdi.` },
  { key: 'yararlı olacağını belirtti.', root: 'yarar', build: phrase => `${toGenitiveGerund(phrase)} yararlı olacağını belirtti.` },
  { key: 'önemli buldu.', root: 'önem', build: phrase => `${toAccusativeGerund(phrase)} önemli buldu.` },
  { key: 'gerekli gördü.', root: 'gerek', build: phrase => `${toAccusativeGerund(phrase)} gerekli gördü.` },
  { key: 'önerisinde bulundu.', root: 'öner', weight: 0.5, build: phrase => `${phrase} önerisinde bulundu.` },
  { key: 'önemine değindi.', root: 'önem', weight: 0.5, build: phrase => `${toGenitiveGerund(phrase)} önemine değindi.` },
  { key: 'öncelikli gördü.', root: 'öncelik', weight: 1, build: phrase => `${toAccusativeGerund(phrase)} öncelikli gördü.` }
];

const isGerundPhrase = (phrase: string): boolean => /m[ae]s[ıi]$/.test(phrase.trim());

// Belgede kullanılan öneri yüklemlerini sayar; sayım tamamlanmış konuşmalardan
// yapılır, böylece seçilip sonra elenen cümleler dengeyi bozmaz.
const countSuggestionEndings = (sentences: string[], counts: Map<string, number>): void => {
  for (const sentence of sentences) {
    const ending = suggestionEndings.find(candidate => sentence.endsWith(` ${candidate.key}`));
    if (ending) counts.set(ending.key, (counts.get(ending.key) ?? 0) + 1);
  }
};

// context: konuşmada bu cümleden önce kurulan cümleler. Yüklemin kökü onlarda
// geçiyorsa ("…öncelik verilmesini önerdi. …öncelikli gördü.", "…önemli buldu.
// …önemine değindi.") başka bir yüklem tercih edilir.
const buildSuggestionSentence = (
  phrase: string,
  counts: Map<string, number>,
  usedInSpeech: Set<string>,
  context: string[] = []
): string => {
  const usable = suggestionEndings.filter(ending =>
    !(ending.root && hasWordRoot(phrase, ending.root))
    && (isGerundPhrase(phrase) || ending.key === 'yönünde görüş bildirdi.')
  );
  const fresh = usable.filter(ending =>
    !usedInSpeech.has(ending.key)
    && !(ending.root && context.some(sentence => hasWordRoot(sentence, ending.root!)))
  );
  const pool = fresh.length ? fresh : usable;
  const score = (ending: SuggestionEnding): number =>
    (counts.get(ending.key) ?? 0) + (ending.weight ?? 0);
  const lowest = Math.min(...pool.map(score));
  const choice = getRandomItem(pool.filter(ending => score(ending) === lowest));
  usedInSpeech.add(choice.key);
  return capitalizeSentenceStartTr(choice.build(phrase));
};

// Konuşmanın ilk cümlesi olabilecek bir cümle mi? Gerekçe cümleleri ("Bu
// değerlendirmelerin … ekledi.") önceki bir söze gönderme yaptığı için
// konuşmayı açamaz.
const canOpenSpeech = (sentence: string): boolean =>
  !/^(?:Bu|Bunun|Ayrıca|Aynı|Böylece)\b/u.test(sentence)
  && !/\b(?:ekledi|açıkladı)\.$/u.test(sentence);

// Önceki konuşmacının görüşüne katılarak söze başlama kalıpları. Branş adı
// cümle içinde küçük harfle yazılır; özel adlar korunur ("İngilizce
// öğretmeninin", "Türk dili ve edebiyatı öğretmeninin").
const agreementOpenings = [
  (previous: string) => `${previous} öğretmeninin görüşlerine katıldığını belirtti.`,
  (previous: string) => `${previous} öğretmeninin değerlendirmelerine katıldığını ifade etti.`,
  (previous: string) => `${previous} öğretmeninin dile getirdiği hususlara katılarak kendi gözlemlerini aktardı.`,
  (previous: string) => `${previous} öğretmeninin tespitlerini desteklediğini belirtti.`
];

// Kullanıcının eklediği genel maddelerde ilk konuşmacı başlığı anar; diğer
// konuşmacılar uzun başlığı yinelemeden maddeye gönderme yapar.
const LONG_TITLE_LENGTH = 60;
const generalFollowUpStarters = [
  'Bu madde kapsamında',
  'Maddenin görüşülmesi sırasında',
  'Aynı başlık altında'
];

type OpeningStyle = 'topic' | 'direct' | 'agree';

// Konu girişi ile giriş yükleminin aynı kökü yinelemesini önler:
// "…izlenmesi konusunda izlenebilecek adımları paylaştı", "Değerlendirme
// sonuçlarının … değerlendirmelerini aktardı" gibi.
const sharesStem = (starter: string, closer: string): boolean => {
  const starterWords = starter.toLocaleLowerCase(TR).split(/\s+/);
  return closer
    .toLocaleLowerCase(TR)
    .split(/\s+/)
    .filter(word => word.length >= 6)
    .some(word => starterWords.some(starterWord => starterWord.startsWith(word.slice(0, 5))));
};

// Sınıf düzeyine ait odak cümlesi. Tek öğeli odaklarda "başlığına", birden çok
// öğede "başlıklarına" kullanılarak sayı uyumu korunur.
const getVariationSentence = (
  period: MeetingInfo['period'],
  focus: string
): string => {
  const formattedFocus = formatFocusList(focus);
  const plural = countFocusItems(focus) > 1;
  if (period === 'nisan') {
    return `Ders yılının kalan bölümünde ${formattedFocus} ${plural ? 'başlıklarına' : 'başlığına'} öncelik verilmesini önerdi.`;
  }
  if (period === 'sene-sonu') {
    return `Eğitim öğretim yılı boyunca ${formattedFocus} ${plural ? 'başlıklarında' : 'başlığında'} yürütülen çalışmaların sonuçlarını özetledi.`;
  }
  return `Bu eğitim öğretim yılında ${formattedFocus} ${plural ? 'başlıklarına' : 'başlığına'} öncelik verilmesini önerdi.`;
};

// Aynı konuşmada öneri bildiren yüklemin yinelenmesini önler. Listedeki bütün
// seçenekler konuşmacının kendi önerisini bildirir; "uygun buldu" gibi öneriyi
// başkasına mal eden ifadeler bilinçli olarak kullanılmaz.
const diversifyRepeatedSuggestionVerbs = (sentences: string[]): string[] => {
  const endings = [
    'önerdi.',
    'öncelikli gördü.',
    'gerekli gördü.',
    'yararlı buldu.',
    'önemli buldu.',
    'tavsiye etti.',
    'teklif etti.'
  ];
  const usedEndings = new Set<string>();

  return sentences.map((sentence, index) => {
    const currentEnding = endings.find(ending => sentence.endsWith(` ${ending}`));
    if (!currentEnding) return sentence;

    const stem = sentence.slice(0, sentence.length - currentEnding.length);
    const others = sentences.filter((_, otherIndex) => otherIndex !== index);
    const replacement = usedEndings.has(currentEnding)
      ? endings.find(ending =>
          !usedEndings.has(ending)
          && !echoesRoot(stem, ending)
          && !others.some(other => echoesRoot(other, ending))
        )
        ?? endings.find(ending => !usedEndings.has(ending) && !echoesRoot(stem, ending))
        ?? currentEnding
      : currentEnding;
    usedEndings.add(replacement);
    return replacement === currentEnding ? sentence : `${stem}${replacement}`;
  });
};

// Birbirinin yerine kullanılabilen aktarma yüklemleri. Art arda gelen iki cümle
// aynı yüklemle bitiyorsa ikincisi aynı gruptan başka bir yüklemle değiştirilir
// ("…ifade etti. …ifade etti." → "…ifade etti. …belirtti.").
const interchangeableEndings: string[][] = [
  ['belirtti.', 'ifade etti.', 'açıkladı.', 'vurguladı.', 'dile getirdi.', 'ekledi.'],
  ['ele aldı.', 'değerlendirdi.', 'gözden geçirdi.'],
  ['paylaştı.', 'aktardı.'],
  ['yönünde görüş bildirdi.', 'gerektiğine dikkat çekti.']
];

const findEnding = (sentence: string): { group: string[]; ending: string } | null => {
  for (const group of interchangeableEndings) {
    const ending = group.find(candidate => sentence.endsWith(` ${candidate}`));
    if (ending) return { group, ending };
  }
  return null;
};

const avoidAdjacentVerbRepetition = (sentences: string[]): string[] => {
  const result = [...sentences];
  for (let index = 1; index < result.length; index++) {
    const current = findEnding(result[index]);
    const previous = findEnding(result[index - 1]);
    if (!current || !previous || current.ending !== previous.ending) continue;

    const next = index + 1 < result.length ? findEnding(result[index + 1]) : null;
    const stem = result[index].slice(0, result[index].length - current.ending.length);
    const replacement = current.group.find(
      candidate => candidate !== previous.ending
        && candidate !== next?.ending
        && !echoesRoot(stem, candidate)
    );
    if (!replacement) continue;
    result[index] = `${stem}${replacement}`;
  }
  return result;
};

// Branşa özgü odak alanını toplantı dönemine uygun bir cümleye dönüştürür.
// Odak alanı, dersin içinde yürütülen çalışmanın konusu olarak kurulur; böylece
// "saygı", "Soğuk Savaş" veya "problem çözme" gibi çok farklı türdeki odaklar
// aynı kalıpta anlamlı kalır ve öğrenciler hakkında doğrulanmamış bir durum
// ima edilmez. Aynı maddede art arda konuşan öğretmenlerin aynı kalıbı
// yinelememesi için her durumda üç ayrı cümle kuruluşu bulunur.
const getFocusSentence = (
  period: MeetingInfo['period'],
  focusArea: string,
  category: string,
  branch: string,
  isGuidance: boolean,
  variant: number
): string => {
  const course = capitalizeSentenceStartTr(toCourseNameInSentenceTr(branch));
  const context = isGuidance ? 'Rehberlik hizmetleri kapsamında' : `${course} dersinde`;
  const pick = (options: string[]): string => options[variant % options.length];

  // Ders bazlı ölçme ve destek cümleleri yalnızca ders öğretmenleri için
  // kurulur; rehberlik öğretmeninin dersine ait sınav sonucu veya kazanım yoktur.
  if (!isGuidance && category === 'olcme-degerlendirme') {
    if (period === 'nisan') {
      return pick([
        `${course} dersine ait birinci dönem ölçme sonuçlarını inceleyerek ikinci dönem değerlendirme çalışmalarının buna göre düzenlenmesini önerdi.`,
        `${course} dersine ait birinci dönem sonuçları ile ikinci dönemin ilk sınav sonuçlarını karşılaştırarak paylaştı.`,
        `${course} dersinde ders yılı sonuna kadar yapılacak sınav ve değerlendirme çalışmalarının kazanım eksiklerine göre planlanmasını önerdi.`
      ]);
    }
    if (period === 'sene-sonu') {
      return pick([
        `${course} dersine ait yıllık ölçme sonuçlarını ve öğrencilerin gelişim eğilimlerini paylaştı.`,
        `${course} dersine ait yıl sonu sonuçlarını kazanım bazında değerlendirdi.`,
        `${course} dersinde yıl boyunca kullanılan ölçme araçlarının öğrenci gelişimini yansıtma düzeyini ele aldı.`
      ]);
    }
    return pick([
      `${course} dersinde kullanılan ölçme araçlarının kazanımları kapsayacak biçimde planlanmasını önerdi.`,
      `${course} dersine ait ilk sınav sonuçlarını kazanım bazında inceleyerek paylaştı.`,
      `${course} dersinde sınav dışındaki değerlendirme etkinliklerinin de öğrenci gelişimini izlemek için kullanılmasını önerdi.`
    ]);
  }

  if (!isGuidance && category === 'destekleme') {
    if (period === 'nisan') {
      return pick([
        `${course} dersinde birinci dönemde belirlenen destek ihtiyaçlarını gözden geçirerek ikinci dönem çalışmalarının buna göre düzenlenmesini önerdi.`,
        `${course} dersinde birinci dönemde yürütülen destek çalışmalarının sonuçlarını paylaştı.`,
        `${course} dersinde desteğe ihtiyacı süren öğrenciler için ders yılı sonuna kadar ek çalışma yapılmasını önerdi.`
      ]);
    }
    if (period === 'sene-sonu') {
      return pick([
        `${course} dersinde yıl boyunca yürütülen destek çalışmalarının sonuçlarını paylaştı.`,
        `${course} dersinde destek çalışmalarına katılan öğrencilerin yıl içindeki gelişimini değerlendirdi.`,
        `${course} dersinde yıl boyunca etkili olan destek uygulamalarını ele aldı.`
      ]);
    }
    return pick([
      `${course} dersinde desteğe ihtiyaç duyulan kazanımların belirlenmesini önerdi.`,
      `${course} dersinde desteğe ihtiyaç duyan öğrenciler için ek çalışma planlanmasını önerdi.`,
      `${course} dersinde eksik kazanımlara yönelik tamamlayıcı çalışmaların ders içinde de sürdürülmesini önerdi.`
    ]);
  }

  if (period === 'nisan') {
    return pick([
      `${context} ${focusArea} üzerine birinci dönemde yürütülen çalışmaları değerlendirerek ders yılı sonuna kadar yapılacak etkinliklerin buna göre düzenlenmesini önerdi.`,
      `${context} ${focusArea} üzerine birinci dönemde yürütülen çalışmaların sonuçlarını paylaşarak bu çalışmaların ders yılı sonuna kadar sürdürülmesini önerdi.`,
      `${context} ${focusArea} üzerine yürütülen çalışmalara ilişkin birinci dönem gözlemlerini paylaştı.`
    ]);
  }
  if (period === 'sene-sonu') {
    return pick([
      `${context} ${focusArea} üzerine yıl boyunca yürütülen çalışmaları gözden geçirerek ulaşılan sonuçları paylaştı.`,
      `${context} ${focusArea} üzerine yıl boyunca yürütülen çalışmaları ve öğrencilerin gösterdiği ilerlemeyi değerlendirdi.`,
      `${context} ${focusArea} üzerine yıl boyunca yürütülen çalışmalara ilişkin gözlemlerini paylaştı.`
    ]);
  }
  return pick([
    `${context} ${focusArea} üzerine yürütülen çalışmaları değerlendirerek dönemin kalan bölümündeki etkinliklerin buna göre planlanmasını önerdi.`,
    `${context} ${focusArea} üzerine yürütülen çalışmaların dönem sonuna kadar düzenli olarak sürdürülmesini önerdi.`,
    `${context} ${focusArea} üzerine yürütülen çalışmalara ilişkin gözlemlerini paylaştı.`
  ]);
};

const getAchievementSentence = (
  period: MeetingInfo['period'],
  level: AchievementLevelId
): string => {
  const priority = achievementPriorities[level];
  if (period === 'nisan') {
    return `Birinci dönem sonuçlarını dikkate alarak ${priority} önemli buldu.`;
  }
  if (period === 'sene-sonu') {
    return `Yıllık sonuçları ${achievementReviewDimensions[level]} ele aldı.`;
  }
  return `Sınıfın mevcut başarı düzeyini dikkate alarak ${priority} önemli buldu.`;
};

const normalizeDecisionStyle = (decision: string): string =>
  decision
    .replace(/karar verilmiştir\.$/, 'karar verildi.')
    .replace(/uygun görülmüştür\.$/, 'uygun görüldü.')
    .replace(/kararlaştırılmıştır\.$/, 'kararlaştırıldı.')
    .replace(/önerilmiştir\.$/, 'önerildi.')
    .replace(/planlanmıştır\.$/, 'planlandı.');

const agendaTitleAsContext = (title: string): string => {
  const normalized = title.replace(/[.!?]+$/, '').trim();
  return normalized || 'Söz konusu gündem';
};

// Kararın sorumlusu, kararın niteliğine göre role dayalı belirlenir. Kararı
// maddede ilk söz alan öğretmene bağlamak, "ortak sınav takvimi" gibi bütün
// kurulu ilgilendiren kararların tek bir branş öğretmenine yazılmasına yol
// açıyordu.
const pickDecisionResponsible = (teachers: Teacher[], category: string): string => {
  const classTeacher = teachers.find(teacher => teacher.isClassTeacher);
  const guidance = teachers.find(teacher => isGuidanceBranch(teacher.branch));
  const classTeacherLabel = classTeacher
    ? `Sınıf rehber öğretmeni ${toTitleCaseTr(classTeacher.fullName)}`
    : 'Sınıf rehber öğretmeni';
  const guidanceLabel = guidance
    ? `Rehberlik öğretmeni ${toTitleCaseTr(guidance.fullName)}`
    : 'Rehberlik servisi';

  switch (category) {
    case 'sosyal-duygusal':
      return guidanceLabel;
    case 'kaynastirma':
      return `${guidanceLabel} ve şube öğretmenleri`;
    case 'veli-iletisim':
    case 'devamsizlik':
      return classTeacherLabel;
    case 'davranis-disiplin':
    case 'etkinlik-sosyal':
      return `${classTeacherLabel} ve şube öğretmenleri`;
    case 'okul-sagligi-isg':
      return 'Okul yönetimi ve şube öğretmenleri';
    default:
      return 'Şube öğretmenleri';
  }
};

const buildTitle = (meetingInfo: MeetingInfo, titleLabel: string): string =>
  [
    meetingInfo.schoolName.trim().toLocaleUpperCase(TR),
    meetingInfo.academicYear.trim()
      ? `${meetingInfo.academicYear.trim()} EĞİTİM ÖĞRETİM YILI`
      : '',
    titleLabel,
    meetingInfo.className.trim()
      ? `${meetingInfo.className.trim().toLocaleUpperCase(TR)} SINIFI`
      : '',
    'ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI'
  ].filter(Boolean).join(' ');

export const generateMinutes = (
  meetingInfo: MeetingInfo,
  teacherInput: Teacher[],
  agendaItems: AgendaItem[],
  settings: GenerationSettings
): GeneratedMinutes => {
  // Branş adları tek biçime getirilir: "rehber öğretmen" → "Rehberlik",
  // "matematik" → "Matematik".
  const teachers: Teacher[] = teacherInput.map(teacher => ({
    ...teacher,
    branch: normalizeBranchName(teacher.branch) || teacher.branch.trim()
  }));

  const gradeProfile = getGradeProfile(meetingInfo.gradeLevel);
  const achievementLevelId = meetingInfo.classAchievementLevel;
  const periodProfile = getPeriodProfile(meetingInfo.period);
  const isGraduatingYearEnd =
    meetingInfo.period === 'sene-sonu' && meetingInfo.gradeLevel === 12;

  let variation = gradeProfile.variations[0];
  if (settings.variationMode === 'manual' && settings.variationId) {
    variation = gradeProfile.variations.find(v => v.id === settings.variationId) || variation;
  } else {
    variation = getRandomItem(gradeProfile.variations);
  }

  const agendaMinutes: AgendaMinutes[] = [];
  const speakerHistory: string[] = [];
  let agendaNumber = 1;
  let decisionNumber = 1;

  const introClosers = introClosersByTone[settings.tone];

  // Her öğretmen için kullanılmış (branşa özel) ifadeleri takip et: aynı
  // öğretmenin farklı gündem maddelerinde aynı branş cümlelerini tekrarlamasını
  // önler.
  type UsedSets = {
    focus: Set<string>;
    suggestions: Set<string>;
  };
  const usedByTeacher = new Map<string, UsedSets>();
  const getUsed = (id: string): UsedSets => {
    let u = usedByTeacher.get(id);
    if (!u) {
      u = {
        focus: new Set(),
        suggestions: new Set()
      };
      usedByTeacher.set(id, u);
    }
    return u;
  };

  // Havuzdan, daha önce kullanılmamış bir öğe seç; hepsi kullanıldıysa havuzu
  // sıfırlayıp baştan başla.
  const pickUnused = (arr: string[], used: Set<string>): string => {
    const available = arr.filter(x => !used.has(x));
    const pool = available.length ? available : arr;
    if (!available.length) used.clear();
    const choice = pool[Math.floor(Math.random() * pool.length)];
    used.add(choice);
    return choice;
  };

  // Sınıf düzeyine ait (öğretmenden bağımsız) genel cümleler belge genelinde
  // yalnızca bir kez kullanılır.
  let variationSentenceUsed = false;
  let achievementSummaryUsed = false;
  // Aynı gözlem, öneri, gerekçe ve kararın belge içinde ikinci kez geçmesini
  // önleyen belge düzeyindeki kayıtlar. Aynı konu türünden birden çok madde
  // (ör. kullanıcının eklediği "genel" maddeler) aynı havuzu paylaştığı için
  // takip madde düzeyinde değil belge düzeyinde yapılır.
  const docUsedObservations = new Set<string>();
  const docUsedSuggestions = new Set<string>();
  const docUsedRationales = new Set<string>();
  const docUsedDecisions = new Set<string>();
  // Branşa özgü odak ve öneri cümleleri: aynı branştan iki öğretmen veya aynı
  // öneri havuzunu paylaşan yakın branşlar (ör. yabancı diller) belgeye aynı
  // cümleyi ikinci kez yazmasın.
  const docUsedBranchSentences = new Set<string>();
  const docUsedBranchSuggestions = new Set<string>();
  // Son güvence: yüklem çeşitlendirmesinden sonra belgede daha önce aynen
  // geçmiş bir gövde cümlesi kalırsa atılır.
  const docBodySentences = new Set<string>();
  // Kalıp hissini azaltmak için belge düzeyindeki kullanım sayaçları: öneri
  // yüklemleri, giriş yüklemleri ve katılma kalıpları en az kullanılandan
  // seçilir; konuşmaların açılış biçimi bir öncekiyle mümkün olduğunca aynı
  // olmaz.
  const docSuggestionEndingCounts = new Map<string, number>();
  const docIntroCloserCounts = new Map<string, number>();
  let docAgreementCount = 0;
  let lastOpeningStyle: OpeningStyle | null = null;

  const pickLeastUsed = (pool: string[], counts: Map<string, number>, avoid: Set<string>): string => {
    const fresh = pool.filter(item => !avoid.has(item));
    const candidates = fresh.length ? fresh : pool;
    const lowest = Math.min(...candidates.map(item => counts.get(item) ?? 0));
    const choice = getRandomItem(candidates.filter(item => (counts.get(item) ?? 0) === lowest));
    counts.set(choice, (counts.get(choice) ?? 0) + 1);
    avoid.add(choice);
    return choice;
  };

  // İlk konuşmacı maddeyi konusuyla açar; sonrakiler doğrudan bir gözlemle,
  // önceki konuşmacıya katılarak veya konuya gönderme yaparak söze başlar.
  const chooseOpeningStyle = (options: OpeningStyle[]): OpeningStyle => {
    const baseWeight: Record<OpeningStyle, number> = { topic: 3, direct: 3, agree: 2 };
    const weighted = options.map(style => ({
      style,
      weight: style === lastOpeningStyle && options.length > 1
        ? baseWeight[style] / 3
        : baseWeight[style]
    }));
    const total = weighted.reduce((sum, item) => sum + item.weight, 0);
    let threshold = Math.random() * total;
    for (const item of weighted) {
      threshold -= item.weight;
      if (threshold < 0) return item.style;
    }
    return weighted[weighted.length - 1].style;
  };

  for (const agenda of agendaItems) {
    if (!agenda.enabled) continue;

    const category = resolveAgendaCategory(agenda.title, agenda.category);
    const displayTitle = toSentenceCaseTr(agenda.title) || 'Gündem maddesi';

    // Açılış ve kapanış — döneme özgü anlatı metni eklenir.
    if (category === 'acilis' || category === 'kapanis') {
      agendaMinutes.push({
        agendaId: agenda.id,
        agendaTitle: displayTitle,
        agendaNumber: agendaNumber++,
        speeches: [],
        decisions: [],
        bodyText: category === 'acilis'
          ? buildOpeningText(
              periodProfile,
              toTitleCaseTr(meetingInfo.chairpersonName)
            )
          : periodProfile.closingText
      });
      continue;
    }

    // Konuşmacı sayısını belirle
    let speakerCount = 2;
    if (agenda.speakerCountMode === 'three') speakerCount = 3;
    if (agenda.speakerCountMode === 'four') speakerCount = 4;
    if (agenda.speakerCountMode === 'random') speakerCount = getRandomInt(2, 4);

    const selectedTeachers = selectTeachersForAgenda(teachers, category, speakerCount, speakerHistory);
    const speeches: TeacherSpeech[] = [];

    // Konunun dönemden bağımsız havuzu ile döneme özgü havuzu.
    const catContent = getCategoryContent(category);
    const perContent = getPeriodContent(
      meetingInfo.period,
      category,
      meetingInfo.gradeLevel
    );
    const isAcademic = academicCategories.has(category);

    // Döneme özgü bir havuz varsa yalnızca o kullanılır; dönem ve genel
    // havuzları karıştırmak zamansal kopukluklara yol açar. Genel havuz yalnızca
    // dönem içeriği bulunmadığında yedektir.
    const observationPool = perContent.observations?.length
      ? perContent.observations
      : catContent.observations;
    const suggestionPool = perContent.suggestions?.length
      ? perContent.suggestions
      : catContent.suggestions;
    const rationalePool = detailedRationales[category] ?? detailedRationales.genel;

    // Madde-içi tekrarsızlık: aynı gündem maddesinde konuşan farklı öğretmenlerin
    // paylaşılan havuzlardan aynı giriş ifadesini seçmemesi için.
    const itemUsedStarters = new Set<string>();
    const itemUsedIntroClosers = new Set<string>();
    const itemUsedObs = new Set<string>();
    const itemUsedSug = new Set<string>();
    // Bu maddede kullanılmış gerekçe cümleleri: bazı konularda gerekçe ve
    // değerlendirme havuzları aynı düşünceyi farklı yüklemle taşıdığı için
    // birbirini yineleyen cümleler elenir.
    const itemUsedRationales: string[] = [];
    // Rehberlik öğretmenine ders kazanımı veya ders planına dayanan gerekçeler
    // verilmez.
    const pickRationale = (avoid: string[] = [], forGuidance = false): string | null => {
      const candidates = rationalePool.filter(rationale =>
        !docUsedRationales.has(rationale)
        && !(forGuidance && /kazanım|ders plan/i.test(rationale))
        && [...itemUsedObs, ...itemUsedSug, ...avoid].every(
          sentence => !isSemanticallySimilar(sentence, rationale)
        )
      );
      if (!candidates.length) return null;
      const choice = getRandomItem(candidates);
      docUsedRationales.add(choice);
      itemUsedRationales.push(choice);
      return choice;
    };

    for (const [speakerIndex, teacher] of selectedTeachers.entries()) {
      speakerHistory.push(teacher.id);
      const branchStyle = getBranchStyle(teacher.branch);
      const isGuidance = isGuidanceBranch(teacher.branch);
      const used = getUsed(teacher.id);
      // Rehberlik öğretmeni akademik maddelerde ders öğretmenine özgü
      // ("sınav sonuçlarını analiz ederek konu eksiklerini paylaştı")
      // cümleler yerine rehberlik servisinin bakış açısını taşır.
      const guidanceContent = isGuidance
        ? getGuidanceContent(meetingInfo.period, category)
        : null;
      const speakerObservationPool = guidanceContent?.observations ?? observationPool;
      const speakerSuggestionPool = guidanceContent?.suggestions ?? suggestionPool;
      const speechSuggestionEndings = new Set<string>();

      // Gövde cümleleri. Konuya özgü cümleler önce gelir ki kısa konuşmalarda
      // bile gündem maddesinin konusu işlensin. Açılış cümlesi gövde
      // kurulduktan sonra seçilir; gövdedeki bir gözlem konuşmayı doğrudan da
      // açabilir.
      const optionalSentences: string[] = [];

      // 1) Maddenin konusuna ve döneme özgü değerlendirme.
      const freshObservations = speakerObservationPool.filter(
        observation => !docUsedObservations.has(observation)
          && itemUsedRationales.every(
            rationale => !isSemanticallySimilar(rationale, observation)
          )
      );
      // Yalnızca önceki önerilerle aynı düşünceyi yinelemeyen değerlendirmeler
      // kullanılır; kalan tek seçenek bir yinelemeyse cümle hiç eklenmez.
      const effectiveObservations = freshObservations.filter(
        observation => [...itemUsedSug].every(
          suggestion => !isSemanticallySimilar(observation, suggestion)
        )
      );
      if (effectiveObservations.length) {
        const observation = getRandomItem(effectiveObservations);
        docUsedObservations.add(observation);
        itemUsedObs.add(observation);
        optionalSentences.push(observation);
      } else if (settings.tone !== 'detailed') {
        // Havuz tükendiyse aynı gözlemi kopyalamak yerine konuya uygun,
        // zamandan bağımsız bir açıklama kullanılır.
        const rationale = pickRationale([], isGuidance);
        if (rationale) optionalSentences.push(rationale);
      }

      // 2) Sınıf düzeyine ait odak yalnızca akademik başarı maddesinde ve
      // seçilen dönemin zaman bakış açısıyla bir kez kullanılır.
      if (category === 'akademik-basari' && !variationSentenceUsed) {
        optionalSentences.push(getVariationSentence(meetingInfo.period, variation.focus));
        variationSentenceUsed = true;
      }

      // 3) Başarı düzeyi cümlesi yalnızca akademik başarı maddesinde ve belge
      // genelinde bir kez kullanılır.
      if (category === 'akademik-basari' && !achievementSummaryUsed) {
        optionalSentences.push(
          getAchievementSentence(meetingInfo.period, achievementLevelId)
        );
        achievementSummaryUsed = true;
      }

      // Ayrıntılı anlatım, konuya özgü gerekçeyi de konuşmanın gövdesine ekler.
      if (settings.tone === 'detailed') {
        const rationale = pickRationale([], isGuidance);
        if (rationale) optionalSentences.push(rationale);
      }

      // 4) Akademik maddelerde branşa özel odak alanı. Rehberlik öğretmeninde
      // yalnızca maddenin konusuna uyan odaklar kullanılır.
      if (isAcademic) {
        const focusAreas = isGuidance && isGuidanceCategory(category)
          ? guidanceFocusByCategory[category]
          : branchStyle.focusAreas;
        const focusOrder = [
          ...focusAreas.filter(area => !used.focus.has(area)),
          ...focusAreas.filter(area => used.focus.has(area))
        ];
        const startIndex = focusOrder.length
          ? Math.floor(Math.random() * Math.max(1, focusOrder.length - used.focus.size))
          : 0;
        const orderedAreas = [
          ...focusOrder.slice(startIndex),
          ...focusOrder.slice(0, startIndex)
        ];
        const pickFocusSentence = (): string | null => {
          for (const focusArea of orderedAreas) {
            for (let offset = 0; offset < 3; offset++) {
              const sentence = getFocusSentence(
                meetingInfo.period,
                focusArea,
                category,
                branchStyle.branch,
                isGuidance,
                speakerIndex + offset
              );
              if (docUsedBranchSentences.has(sentence)) continue;
              docUsedBranchSentences.add(sentence);
              used.focus.add(focusArea);
              return sentence;
            }
          }
          return null;
        };
        const focusSentence = pickFocusSentence();
        if (focusSentence) optionalSentences.push(focusSentence);
      }

      // 5) Maddenin konusuna ve döneme özgü öneri. Bu maddede dile getirilmiş
      // bir değerlendirmeyle aynı düşünceyi yineleyen öneriler kullanılmaz.
      const freshSuggestions = speakerSuggestionPool.filter(
        suggestion => !docUsedSuggestions.has(suggestion)
      );
      const effectiveSuggestions = freshSuggestions.filter(
        suggestion => [...itemUsedObs].every(
          usedObservation => !isSemanticallySimilar(usedObservation, suggestion)
        )
      );
      if (effectiveSuggestions.length) {
        const categorySuggestion = getRandomItem(effectiveSuggestions);
        docUsedSuggestions.add(categorySuggestion);
        itemUsedSug.add(categorySuggestion);
        optionalSentences.push(buildSuggestionSentence(
          categorySuggestion,
          docSuggestionEndingCounts,
          speechSuggestionEndings,
          optionalSentences
        ));
      } else if (settings.tone !== 'detailed') {
        const rationale = pickRationale([], isGuidance);
        if (rationale) optionalSentences.push(rationale);
      }

      // 6) Akademik maddelerde ek branş önerisi. Rehberlik öğretmeninin
      // önerileri yukarıdaki rehberliğe özgü havuzdan geldiği için bu adım
      // atlanır; aksi hâlde "sosyal-duygusal gelişim programları" gibi konu
      // dışı öneriler akademik maddeye sızıyordu.
      if (
        (category === 'akademik-basari' || category === 'destekleme')
        && !isGraduatingYearEnd
        && !guidanceContent
      ) {
        const freshBranchSuggestions = branchStyle.suggestions.filter(
          suggestion => !used.suggestions.has(suggestion)
            && !docUsedBranchSuggestions.has(suggestion)
            && optionalSentences.every(
              sentence => !isSemanticallySimilar(sentence, suggestion)
            )
        );
        if (freshBranchSuggestions.length) {
          const suggestion = getRandomItem(freshBranchSuggestions);
          used.suggestions.add(suggestion);
          docUsedBranchSuggestions.add(suggestion);
          optionalSentences.push(buildSuggestionSentence(
            suggestion,
            docSuggestionEndingCounts,
            speechSuggestionEndings,
            optionalSentences
          ));
        }
      }

      // Bütün havuzlar tükendiyse (aynı konu türünden çok sayıda madde) konuşma
      // yalnızca giriş cümlesinden ibaret kalmasın diye, bu maddede henüz
      // kullanılmamış bir değerlendirme son çare olarak yeniden kullanılır.
      if (!optionalSentences.length) {
        const reusable = speakerObservationPool.filter(observation => !itemUsedObs.has(observation));
        if (reusable.length) {
          const observation = getRandomItem(reusable);
          itemUsedObs.add(observation);
          optionalSentences.push(observation);
        }
      }

      // Aynı konuşmadaki yakın anlamlı cümleleri tekilleştir.
      const isWish = category === 'dilek-temenniler';
      const repeatsEachOther = (left: string, right: string): boolean =>
        isSemanticallySimilar(left, right)
        || (isWish && repeatsWishSpeechAct(left, right));
      const distinctBody = optionalSentences.filter((sentence, index, sentences) =>
        sentences.slice(0, index).every(previous =>
          !repeatsEachOther(previous, sentence) && !restatesSameIdea(previous, sentence)
        )
      );

      // Her öğretmen için cümle sayısını rastgele belirle (farklı uzunluklarda konuşmalar)
      const lengthRange: Record<string, [number, number]> = {
        short: [1, 2],
        medium: [2, 4],
        long: [4, 6]
      };
      const [minSentences, maxSentences] = lengthRange[settings.speechLength] ?? [2, 5];
      const toneDetail = settings.tone === 'detailed' ? 1 : 0;
      const requestedKeepCount = getRandomInt(
        minSentences + toneDetail,
        maxSentences + toneDetail
      );
      // Akademik başarı maddesinin ilk konuşması; dönem gözlemini, seçilen
      // sınıf odağını ve başarı düzeyi özetini mutlaka taşır.
      const requiredAcademicSummaryCount =
        category === 'akademik-basari' && speakerIndex === 0
          ? 3 + toneDetail
          : 0;
      const requestedCount = Math.max(requestedKeepCount, requiredAcademicSummaryCount);

      // Açılış biçimi. Maddenin ilk konuşmacısı konuyu adıyla açar; sonraki
      // konuşmacılar konuya gönderme yaparak, doğrudan bir gözlemle veya önceki
      // konuşmacının görüşüne katılarak söze başlar. Böylece her konuşmanın
      // "… bakımından … paylaştı." kalıbıyla başlaması önlenir.
      const previousBranch = speakerIndex > 0
        ? selectedTeachers[speakerIndex - 1].branch
        : null;
      const canAgree = previousBranch !== null
        && previousBranch !== teacher.branch
        && docAgreementCount < agreementOpenings.length;
      const directIndex = distinctBody.slice(0, requestedCount + 1).findIndex(canOpenSpeech);
      let style: OpeningStyle = 'topic';
      if (!isWish && speakerIndex > 0) {
        const options: OpeningStyle[] = ['topic'];
        if (directIndex >= 0) options.push('direct');
        if (canAgree) options.push('agree');
        style = chooseOpeningStyle(options);
      }

      const buildTopicOpening = (): string => {
        let starterPool: string[];
        if (category === 'genel') {
          // Kullanıcının eklediği maddede ilk konuşmacı başlığı anar; uzun
          // başlıklar ve sonraki konuşmacılar başlığı yinelemez.
          const title = agendaTitleAsContext(displayTitle);
          starterPool = speakerIndex === 0
            ? [title.length <= LONG_TITLE_LENGTH ? `${title} maddesi kapsamında` : 'Bu gündem maddesi kapsamında']
            : generalFollowUpStarters;
        } else if (category === 'akademik-basari') {
          const branchStarters = isGuidance
            ? branchStyle.sentenceStarters.filter(starter => !/sosyal-duygusal|veli/i.test(starter))
            : branchStyle.sentenceStarters;
          starterPool = [...branchStarters, ...(perContent.intros ?? [])];
        } else {
          starterPool = [...(perContent.intros ?? []), ...catContent.intros];
        }
        const starter = pickUnused(starterPool, itemUsedStarters);
        const closerPool = category === 'genel'
          ? generalIntroClosersByTone[settings.tone]
          : introClosers;
        // Önce hem girişle hem ilk gövde cümlesiyle kök paylaşmayan, sonra
        // yalnızca girişle paylaşmayan yüklemler denenir; bu maddede henüz
        // kullanılmamış bir yüklem bulunan ilk kademe seçilir.
        const fitStarter = closerPool.filter(closer => !sharesStem(starter, closer));
        const fitBoth = fitStarter.filter(closer => !sharesStem(distinctBody[0] ?? '', closer));
        const tiers = [fitBoth, fitStarter, closerPool];
        const closerTier = tiers.find(tier => tier.some(closer => !itemUsedIntroClosers.has(closer)))
          ?? tiers.find(tier => tier.length > 0)
          ?? closerPool;
        const introCloser = pickLeastUsed(closerTier, docIntroCloserCounts, itemUsedIntroClosers);
        return `${capitalizeSentenceStartTr(starter)} ${introCloser}.`;
      };

      let opening: string;
      let body: string[];
      if (isWish) {
        opening = pickUnused(
          isGraduatingYearEnd ? graduatingWishOpenings : wishOpenings[meetingInfo.period],
          itemUsedStarters
        );
        body = distinctBody.filter(sentence => !repeatsEachOther(opening, sentence));
      } else if (style === 'direct') {
        opening = distinctBody[directIndex];
        body = distinctBody.filter((_, index) => index !== directIndex);
      } else if (style === 'agree') {
        const previousCourse = capitalizeSentenceStartTr(
          toCourseNameInSentenceTr(previousBranch ?? '')
        );
        opening = agreementOpenings[docAgreementCount % agreementOpenings.length](previousCourse);
        docAgreementCount += 1;
        body = distinctBody.filter(sentence => !isSemanticallySimilar(opening, sentence));
        // Katılma cümlesinden sonra genel bir gerekçe değil, konuya özgü bir
        // gözlem veya öneri gelsin; kısa konuşmada tek gövde cümlesi odur.
        const firstTopical = body.findIndex(canOpenSpeech);
        if (firstTopical > 0) body.unshift(...body.splice(firstTopical, 1));
      } else {
        opening = buildTopicOpening();
        body = distinctBody.filter(sentence => !isSemanticallySimilar(opening, sentence));
      }
      if (!isWish) lastOpeningStyle = style;

      // Gövde cümlelerinin tamamı giriş cümlesini yinelediği için elendiyse
      // konuşma yalnızca girişten ibaret kalmasın diye bir gerekçe eklenir.
      if (!body.length && !isWish) {
        const rationale = pickRationale([opening], isGuidance);
        if (rationale) body.push(rationale);
      }

      const keepCount = Math.min(requestedCount, body.length);
      const [finalOpening, ...finalBody] = avoidAdjacentVerbRepetition(
        diversifyRepeatedSuggestionVerbs([
          opening,
          ...body.slice(0, keepCount)
        ])
      );
      // Doğrudan açılışta ilk cümle de bir gövde cümlesidir; belgede
      // yinelenmemesi için kayda alınır.
      if (style === 'direct') docBodySentences.add(finalOpening);
      const keptSentences = [
        finalOpening,
        ...finalBody.filter(sentence => {
          if (docBodySentences.has(sentence)) return false;
          docBodySentences.add(sentence);
          return true;
        })
      ];
      countSuggestionEndings(keptSentences, docSuggestionEndingCounts);

      speeches.push({
        teacherId: teacher.id,
        teacherName: toTitleCaseTr(teacher.fullName),
        branch: teacher.branch,
        content: keptSentences.join(' ').trim()
      });
    }

    // Karar oluşturma — döneme özgü kararlar varsa yalnızca onlar kullanılır.
    // Konuşmalarda dile getirilen önerilerle örtüşen kararlar önceliklidir.
    // Belgede daha önce kullanılmış bir karar yinelenmez; uygun karar kalmadıysa
    // madde kararsız bırakılır. Konuşma yapılmayan maddede karar da üretilmez.
    const decisions: DecisionRecord[] = [];
    if (category !== 'dilek-temenniler' && speeches.length > 0) {
      const periodDecisions = perContent.decisions ?? [];
      const decisionCount = category === 'genel' ? 1 : getRandomInt(1, 2);
      const decisionPool = (
        periodDecisions.length ? periodDecisions : catContent.decisions
      ).map(normalizeDecisionStyle);
      const speechBlob = speeches.map(s => s.content).join(' ');

      for (let i = 0; i < decisionCount; i++) {
        const available = decisionPool.filter(decision => !docUsedDecisions.has(decision));
        if (!available.length) break;
        const matching = available.filter(decision => isSemanticallySimilar(decision, speechBlob));
        const text = getRandomItem(matching.length ? matching : available);
        docUsedDecisions.add(text);
        decisions.push({
          number: decisionNumber++,
          text,
          responsible: pickDecisionResponsible(teachers, category),
          followUp: isGraduatingYearEnd ? graduatingFollowUp : periodProfile.defaultFollowUp
        });
      }
    }

    agendaMinutes.push({
      agendaId: agenda.id,
      agendaTitle: displayTitle,
      agendaNumber: agendaNumber++,
      speeches,
      decisions
    });
  }

  return {
    id: uuidv4(),
    title: buildTitle(meetingInfo, periodProfile.titleLabel),
    meetingInfo,
    teachers: teachers.map(t => ({ ...t, fullName: toTitleCaseTr(t.fullName) })),
    agendaSummary: agendaMinutes.map(item => item.agendaTitle),
    agendaMinutes,
    generatedAt: new Date().toISOString(),
    variationId: variation.id
  };
};
