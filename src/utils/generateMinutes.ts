import type { 
  MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes,
  TeacherSpeech, AgendaMinutes, AchievementLevelId
} from '../types';
import { getGradeProfile } from '../data/gradeProfiles';
import { getAchievementLevel } from '../data/achievementLevels';
import { getBranchStyle } from '../data/branchSpeechStyles';
import { resolveAgendaCategory } from '../data/agendaItems';
import { getCategoryContent, academicCategories } from '../data/categorySpeechContent';
import { getPeriodContent } from '../data/periodContent';
import { getPeriodProfile } from '../data/meetingPeriods';
import { generalDecisions } from '../data/decisionTemplates';
import { getRandomItem, getRandomInt } from './randomizer';
import {
  capitalizeSentenceStartTr,
  toCourseNameInSentenceTr,
  toSentenceCaseTr,
  toTitleCaseTr
} from './textFormat';
import { selectTeachersForAgenda } from './teacherSelector';
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
    'tespitlerini kurul üyeleriyle paylaştı'
  ],
  balanced: [
    'gözlemlerini ve önceliklerini paylaştı',
    'değerlendirmelerini aktardı',
    'uygulanabilecek çalışmaları ele aldı',
    'dikkat çeken noktaları paylaştı',
    'izlenebilecek adımları paylaştı'
  ],
  detailed: [
    'gözlemlerini, öğrenci ihtiyaçlarını ve izlenecek adımları birlikte değerlendirdi',
    'eldeki bilgileri uygulanabilecek adımlarla birlikte ele aldı',
    'öncelikleri, uygulama sürecini ve beklenen katkıları ayrıntılandırdı',
    'öğrenci ihtiyaçlarıyla uygulanabilecek çalışmaları birlikte ele aldı',
    'tespitlerini ve bunlara dayalı önerilerini ayrıntılı biçimde paylaştı'
  ]
};

const generalIntroClosersByTone: Record<GenerationSettings['tone'], string[]> = {
  official: [
    'konuya ilişkin değerlendirmelerini kurula sundu',
    'uygulanacak esaslara ilişkin görüşlerini sundu',
    'kurulun dikkate alması gereken noktaları açıkladı',
    'öncelikli hususları ele aldı',
    'tespitlerini kurul üyeleriyle paylaştı'
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
    'tespitlerini ve bunlara dayalı önerilerini ayrıntılı biçimde paylaştı'
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
    'Kurul üyeleri arasındaki açık iletişimin çalışma sürecine olumlu katkı sağlayacağını açıkladı.'
  ],
  genel: [
    'Sorumlulukların ve izleme zamanının açıkça belirlenmesinin uygulamayı kolaylaştıracağını açıkladı.',
    'Somut bilgilere dayalı ortak değerlendirmenin kurul çalışmalarına yön vereceğini belirtti.',
    'Öğretmenler arasındaki düzenli bilgi paylaşımının ortak yaklaşımı güçlendireceğini ekledi.',
    'Belirlenen adımların sonuçlarının gözden geçirilmesinin sonraki değerlendirmelere veri sağlayacağını ifade etti.'
  ]
};

const wishOpenings: Record<MeetingInfo['period'], string[]> = {
  'sene-basi': [
    'Yeni eğitim öğretim yılına ilişkin iyi dileklerini ve iş birliği önerilerini paylaştı.',
    'Kurul üyelerine verimli ve sağlıklı bir eğitim öğretim yılı diledi.',
    'Yıl boyunca sürdürülecek ortak çalışmalara ilişkin temennilerini dile getirdi.',
    'Öğrenciler ve öğretmenler için başarılı bir eğitim öğretim yılı diledi.'
  ],
  'ikinci-donem': [
    'İkinci döneme ilişkin iyi dileklerini ve ortak çalışma önerilerini paylaştı.',
    'Kurul üyelerine sağlıklı ve verimli bir ikinci dönem diledi.',
    'Birinci dönemde kurulan iş birliğinin sürmesine ilişkin temennilerini dile getirdi.',
    'Öğrenciler ve öğretmenler için başarılı bir ikinci dönem diledi.'
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

const semanticTokens = (text: string): Set<string> => new Set(
  text
    .toLocaleLowerCase(TR)
    .replace(/[^a-zçğıöşü0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 5 && !semanticStopWords.has(token))
    .map(token => token.slice(0, 7))
);

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

const repeatsWishSpeechAct = (left: string, right: string): boolean => {
  const speechActs = [/teşekkür/i, /(?:diledi|dilek)/i];
  return speechActs.some(pattern => pattern.test(left) && pattern.test(right));
};

const formatFocusList = (focus: string): string =>
  focus.replace(/,\s*([^,]+)$/, ' ve $1');

const toAccusativeGerund = (phrase: string): string => phrase
  .replace(/ması$/, 'masını')
  .replace(/mesi$/, 'mesini');

const buildSuggestionSentence = (phrase: string, variant: number): string => {
  const normalizedVariant = variant % 4;
  if (normalizedVariant === 0) {
    return `${capitalizeSentenceStartTr(toAccusativeGerund(phrase))} önerdi.`;
  }
  if (normalizedVariant === 1) {
    return `${capitalizeSentenceStartTr(phrase)} gerektiğine dikkat çekti.`;
  }
  if (normalizedVariant === 2) {
    return `${capitalizeSentenceStartTr(phrase)} yönünde görüş bildirdi.`;
  }
  return `${capitalizeSentenceStartTr(toAccusativeGerund(phrase))} öncelikli gördü.`;
};

const getVariationSentence = (
  period: MeetingInfo['period'],
  focus: string
): string => {
  const formattedFocus = formatFocusList(focus);
  if (period === 'ikinci-donem') {
    return `İkinci dönem çalışmalarında ${formattedFocus} başlıklarına öncelik verilmesini önerdi.`;
  }
  if (period === 'sene-sonu') {
    return `Eğitim öğretim yılı boyunca ${formattedFocus} başlıklarında yürütülen çalışmaların sonuçlarını özetledi.`;
  }
  return `Bu eğitim öğretim yılında ${formattedFocus} başlıklarına öncelik verilmesini önerdi.`;
};

const diversifyRepeatedSuggestionVerbs = (sentences: string[]): string[] => {
  const endings = [
    'önerdi.',
    'uygun buldu.',
    'öncelikli gördü.',
    'yerinde buldu.',
    'uygulanabilir gördü.',
    'yararlı buldu.',
    'önemli buldu.'
  ];
  const usedEndings = new Set<string>();

  return sentences.map(sentence => {
    const currentEnding = endings.find(ending => sentence.endsWith(` ${ending}`));
    if (!currentEnding) return sentence;

    const replacement = usedEndings.has(currentEnding)
      ? endings.find(ending => !usedEndings.has(ending)) ?? currentEnding
      : currentEnding;
    usedEndings.add(replacement);
    return replacement === currentEnding
      ? sentence
      : sentence.replace(new RegExp(` ${currentEnding.replace('.', '\\.')}$`), ` ${replacement}`);
  });
};

const getFocusSentence = (
  period: MeetingInfo['period'],
  focusArea: string,
  category: string,
  branch: string
): string => {
  const focus = capitalizeSentenceStartTr(focusArea);

  if (category === 'olcme-degerlendirme') {
    const course = capitalizeSentenceStartTr(toCourseNameInSentenceTr(branch));
    if (period === 'ikinci-donem') {
      return `${course} alanına ait birinci dönem ölçme sonuçlarını inceleyerek ikinci dönem değerlendirme çalışmalarının buna göre düzenlenmesini önerdi.`;
    }
    if (period === 'sene-sonu') {
      return `${course} alanına ait yıllık ölçme sonuçlarını ve öğrencilerin gelişim eğilimlerini paylaştı.`;
    }
    return `${course} alanında kullanılacak ölçme araçlarının öğrenci düzeyine uygun biçimde planlanmasını önerdi.`;
  }

  if (category === 'destekleme') {
    const course = capitalizeSentenceStartTr(toCourseNameInSentenceTr(branch));
    if (period === 'ikinci-donem') {
      return `${course} alanında birinci dönem belirlenen destek ihtiyaçlarını gözden geçirerek ikinci dönem çalışmalarının buna göre düzenlenmesini önerdi.`;
    }
    if (period === 'sene-sonu') {
      return `${course} alanında yıl boyunca yürütülen destek çalışmalarının sonuçlarını paylaştı.`;
    }
    return `${course} alanında desteğe ihtiyaç duyulan kazanımların belirlenmesini önerdi.`;
  }

  if (period === 'ikinci-donem') {
    return `${focus} konusundaki birinci dönem sonuçlarını gözden geçirerek ikinci dönem çalışmalarının buna göre düzenlenmesini önerdi.`;
  }
  if (period === 'sene-sonu') {
    return `${focus} konusunda yıl boyunca yürütülen çalışmaları gözden geçirerek ulaşılan sonuçları paylaştı.`;
  }
  return `${focus} konusundaki mevcut durumun belirlenerek ilgili çalışmaların buna göre planlanmasını önerdi.`;
};

const getAchievementSentence = (
  period: MeetingInfo['period'],
  level: AchievementLevelId
): string => {
  const priority = achievementPriorities[level];
  if (period === 'ikinci-donem') {
    return `Birinci dönem sonuçlarını dikkate alarak ${priority} öncelikli gördü.`;
  }
  if (period === 'sene-sonu') {
    return `Yıllık sonuçları ${achievementReviewDimensions[level]} ele aldı.`;
  }
  return `Sınıfın başlangıç düzeyini dikkate alarak ${priority} öncelikli gördü.`;
};

const normalizeDecisionStyle = (decision: string): string =>
  decision
    .replace(/karar verilmiştir\.$/, 'karar verildi.')
    .replace(/uygun görülmüştür\.$/, 'uygun görüldü.')
    .replace(/kararlaştırılmıştır\.$/, 'kararlaştırıldı.')
    .replace(/önerilmiştir\.$/, 'önerildi.')
    .replace(/planlanmıştır\.$/, 'planlandı.');

const rotatePool = <T>(items: T[], offset: number): T[] => {
  if (items.length < 2) return items;
  const normalizedOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(normalizedOffset), ...items.slice(0, normalizedOffset)];
};

const agendaTitleAsContext = (title: string): string => {
  const normalized = toSentenceCaseTr(title).replace(/[.!?]+$/, '').trim();
  return normalized || 'Söz konusu gündem';
};

export const generateMinutes = (
  meetingInfo: MeetingInfo,
  teachers: Teacher[],
  agendaItems: AgendaItem[],
  settings: GenerationSettings
): GeneratedMinutes => {
  const gradeProfile = getGradeProfile(meetingInfo.gradeLevel);
  const achievementLevel = getAchievementLevel(meetingInfo.classAchievementLevel);
  const periodProfile = getPeriodProfile(meetingInfo.period);
  
  let variation = gradeProfile.variations[0];
  if (settings.variationMode === 'manual' && settings.variationId) {
    variation = gradeProfile.variations.find(v => v.id === settings.variationId) || variation;
  } else {
    variation = getRandomItem(gradeProfile.variations);
  }

  const agendaMinutes: AgendaMinutes[] = [];
  const speakerHistory: string[] = [];
  let agendaNumber = 1;

  const introClosers = introClosersByTone[settings.tone];

  // Her öğretmen için kullanılmış (branşa özel) ifadeleri takip et: aynı
  // öğretmenin farklı gündem maddelerinde aynı branş cümlelerini tekrarlamasını
  // önler. Konuya özgü ve giriş cümleleri ise madde-içi setlerle takip edilir.
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

  // Havuzdan, o öğretmenin daha önce kullanmadığı bir öğe seç; hepsi
  // kullanıldıysa havuzu sıfırlayıp baştan başla.
  const pickUnused = (arr: string[], used: Set<string>): string => {
    const available = arr.filter(x => !used.has(x));
    const pool = available.length ? available : arr;
    if (!available.length) used.clear();
    const choice = pool[Math.floor(Math.random() * pool.length)];
    used.add(choice);
    return choice;
  };

  // Sınıf düzeyine ait (öğretmenden bağımsız) genel cümleler için: belge genelinde
  // her cümle yalnızca bir kez kullanılsın ki her konuşmada tekrarlanmasın.
  let variationSentenceUsed = false;
  let achievementSummaryUsed = false;
  // Aynı kararın belge genelinde tekrar etmesini önler.
  const usedDecisionsGlobal = new Set<string>();
  const pickGlobalOnce = (arr: string[], used: Set<string>): string | null => {
    const available = arr.filter(x => !used.has(x));
    if (!available.length) return null;
    const choice = available[Math.floor(Math.random() * available.length)];
    used.add(choice);
    return choice;
  };

  for (const agenda of agendaItems) {
    if (!agenda.enabled) continue;

    const category = resolveAgendaCategory(agenda.title, agenda.category);
    
    // Konuşmacı sayısını belirle
    let speakerCount = 2;
    if (agenda.speakerCountMode === 'three') speakerCount = 3;
    if (agenda.speakerCountMode === 'four') speakerCount = 4;
    if (agenda.speakerCountMode === 'random') speakerCount = getRandomInt(2, 4);
    
    // Açılış ve Kapanış için özel durum — döneme özgü anlatı metni eklenir.
    if (category === 'acilis' || category === 'kapanis') {
      agendaMinutes.push({
        agendaId: agenda.id,
        agendaTitle: agenda.title,
        agendaNumber: agendaNumber++,
        speeches: [],
        decisions: [],
        bodyText: category === 'acilis' ? periodProfile.openingText : periodProfile.closingText
      });
      continue;
    }

    const selectedTeachers = selectTeachersForAgenda(teachers, category, speakerCount, speakerHistory);
    const speeches: TeacherSpeech[] = [];

    // Maddeye (konuya) özgü içerik havuzu ve branş içeriğinin yerinde olup
    // olmadığı bilgisi
    const catContent = getCategoryContent(category);
    // Döneme özgü içerik (sene başı / 2. dönem / sene sonu bakış açısı)
    const perContent = getPeriodContent(
      meetingInfo.period,
      category,
      meetingInfo.gradeLevel
    );
    const isAcademic = academicCategories.has(category);

    // Döneme özgü bir havuz varsa yalnızca onu kullan. Dizi sırasının rastgele
    // seçimde ağırlık oluşturmadığı için dönem ve genel havuzları birleştirmek,
    // sene başında yıl sonu değerlendirmesi gibi zamansal kopukluklara yol
    // açıyordu. Genel havuz yalnızca dönem içeriği bulunmadığında yedektir.
    const observationPool = rotatePool(
      perContent.observations?.length
        ? perContent.observations
        : catContent.observations,
      agendaNumber - 1
    );
    const suggestionPool = rotatePool(
      perContent.suggestions?.length
        ? perContent.suggestions
        : catContent.suggestions,
      agendaNumber - 1
    );

    // Madde-içi tekrarsızlık: aynı gündem maddesinde konuşan farklı öğretmenlerin
    // paylaşılan havuzlardan (giriş cümlesi, fiil, konuya özgü gözlem/öneri) AYNI
    // ifadeyi seçmemesi için bu setler madde başında sıfırlanır.
    const itemUsedStarters = new Set<string>();
    const itemUsedIntroClosers = new Set<string>();
    const itemUsedObs = new Set<string>();
    const itemUsedSug = new Set<string>();
    const itemUsedRationales = new Set<string>();

    for (const [speakerIndex, teacher] of selectedTeachers.entries()) {
      speakerHistory.push(teacher.id);
      const branchStyle = getBranchStyle(teacher.branch);
      const used = getUsed(teacher.id);

      // Açılış cümlesi (madde içinde tekrar etmeyen başlangıç + fiil).
      // Akademik maddelerde branş giriş cümlesi (konu zaten branşla ilgili);
      // diğer maddelerde konuya özgü giriş cümlesi kullanılır. Öğretmenin branşı
      // her hâlükârda konuşmanın başındaki branş ve öğretmen bilgisiyle
      // gösterildiği için kimlik korunur.
      // Akademik maddelerde branş giriş cümlesine döneme özgü girişler de
      // eklenir; akademik olmayan maddelerde döneme özgü + konuya özgü girişler.
      const opening = category === 'dilek-temenniler'
        ? pickUnused(
            meetingInfo.period === 'sene-sonu' && meetingInfo.gradeLevel === 12
              ? graduatingWishOpenings
              : wishOpenings[meetingInfo.period],
            itemUsedStarters
          )
        : (() => {
            const starterPool = category === 'genel'
              ? [`${agendaTitleAsContext(agenda.title)} maddesi kapsamında`]
              : (category === 'akademik-basari'
                  ? [...branchStyle.sentenceStarters, ...(perContent.intros ?? [])]
                  : [...(perContent.intros ?? []), ...catContent.intros]);
            const starter = pickUnused(starterPool, itemUsedStarters);
            const introCloser = pickUnused(
              category === 'genel'
                ? generalIntroClosersByTone[settings.tone]
                : introClosers,
              itemUsedIntroClosers
            );
            return `${capitalizeSentenceStartTr(starter)} ${introCloser}.`;
          })();

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak.
      // Konuya özgü cümleler önce gelir ki kısa konuşmalarda bile gündem maddesinin
      // konusu işlensin; sınıf düzeyine ait genel cümleler sona eklenir.
      const optionalSentences: string[] = [];

      // 1) Maddenin konusuna ve döneme özgü öğretmen değerlendirmesi.
      const unusedObservations = observationPool.filter(
        observation => !itemUsedObs.has(observation)
      );
      const observationsDistinctFromEarlierSuggestions = unusedObservations.filter(
        observation => [...itemUsedSug].every(
          suggestion => !isSemanticallySimilar(observation, suggestion)
        )
      );
      const effectiveObservations = observationsDistinctFromEarlierSuggestions.length
        ? observationsDistinctFromEarlierSuggestions
        : unusedObservations;
      const observation = effectiveObservations.length
        ? getRandomItem(effectiveObservations)
        : null;
      if (observation) {
        itemUsedObs.add(observation);
        optionalSentences.push(observation);
      } else if (settings.tone !== 'detailed') {
        // Dört konuşmacılı bir maddede dönem havuzu tükenirse aynı gözlemi
        // kopyalamak yerine konuya uygun, zamandan bağımsız bir açıklama kullan.
        optionalSentences.push(
          pickUnused(
            detailedRationales[category] ?? detailedRationales.genel,
            itemUsedRationales
          )
        );
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
          getAchievementSentence(meetingInfo.period, achievementLevel.id)
        );
        achievementSummaryUsed = true;
      }

      // Ayrıntılı anlatım, yalnızca daha iddialı bir giriş kullanmaz; konuya
      // özgü gerekçeyi de konuşmanın gövdesine ekler. Akademik özetlerden sonra
      // gelmesi, kısa metinlerde kullanıcının seçtiği odak ve başarı düzeyinin
      // gerekçe cümlesi yüzünden kesilmesini önler.
      if (settings.tone === 'detailed') {
        optionalSentences.push(
          pickUnused(
            detailedRationales[category] ?? detailedRationales.genel,
            itemUsedRationales
          )
        );
      }

      // 4) Akademik maddelerde branşa özel odak alanı. Başarı düzeyinden gelen
      // bağımsız bir eylemle çaprazlanmaz.
      if (isAcademic) {
        const focusArea = pickUnused(branchStyle.focusAreas, used.focus);
        optionalSentences.push(
          getFocusSentence(
            meetingInfo.period,
            focusArea,
            category,
            branchStyle.branch
          )
        );
      }

      // 5) Maddenin konusuna ve döneme özgü öneri. Gözlemle aynı düşünceyi
      // yineleyen bir öneri varsa mümkün olduğunda başka bir öneri seçilir.
      const unusedSuggestions = suggestionPool.filter(suggestion => !itemUsedSug.has(suggestion));
      const distinctSuggestions = unusedSuggestions.filter(
        suggestion => [...itemUsedObs].every(
          usedObservation => !isSemanticallySimilar(usedObservation, suggestion)
        )
      );
      const effectiveSuggestions = distinctSuggestions.length
        ? distinctSuggestions
        : unusedSuggestions;
      if (effectiveSuggestions.length) {
        const categorySuggestion = getRandomItem(effectiveSuggestions);
        itemUsedSug.add(categorySuggestion);
        optionalSentences.push(buildSuggestionSentence(categorySuggestion, speakerIndex + 1));
      } else if (settings.tone !== 'detailed') {
        optionalSentences.push(
          pickUnused(
            detailedRationales[category] ?? detailedRationales.genel,
            itemUsedRationales
          )
        );
      }

      // 6) Akademik maddelerde ek branş önerisi
      if (
        (category === 'akademik-basari' || category === 'destekleme')
        && !(meetingInfo.period === 'sene-sonu' && meetingInfo.gradeLevel === 12)
      ) {
        const suggestion = pickUnused(branchStyle.suggestions, used.suggestions);
        if (!optionalSentences.some(sentence => isSemanticallySimilar(sentence, suggestion))) {
          optionalSentences.push(buildSuggestionSentence(suggestion, speakerIndex + 2));
        }
      }

      // Aynı konuşmadaki yakın anlamlı cümleleri tekilleştir.
      const distinctOptionalSentences = optionalSentences.filter((sentence, index, sentences) =>
        !isSemanticallySimilar(opening, sentence)
        && !(category === 'dilek-temenniler' && repeatsWishSpeechAct(opening, sentence))
        && sentences.slice(0, index).every(
          previous => !isSemanticallySimilar(previous, sentence)
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
      // sınıf odağını ve başarı düzeyi özetini mutlaka taşır. Aksi hâlde kısa
      // metin ayarı bu iki kullanıcı seçimini daha metne girmeden kesiyordu.
      const requiredAcademicSummaryCount =
        category === 'akademik-basari' && speakerIndex === 0
          ? 3 + toneDetail
          : 0;
      const keepCount = Math.min(
        Math.max(requestedKeepCount, requiredAcademicSummaryCount),
        distinctOptionalSentences.length
      );

      const keptSentences = diversifyRepeatedSuggestionVerbs([
        opening,
        ...distinctOptionalSentences.slice(0, keepCount)
      ]);
      const content = keptSentences.join(' ');

      speeches.push({
        teacherId: teacher.id,
        teacherName: toTitleCaseTr(teacher.fullName),
        branch: teacher.branch,
        content: content.trim()
      });
    }

    // Karar oluşturma — döneme özgü kararlar varsa yalnızca onlar kullanılır.
    // Başarı düzeyi tek başına tanı, ev ziyareti veya kurum bildirimi gibi ağır
    // kararlar için yeterli veri olmadığından başarı profili kararları üretime
    // katılmaz.
    const decisions: string[] = [];
    if (category !== 'dilek-temenniler') {
      const periodDecisions = perContent.decisions ?? [];
      const decisionCount = category === 'genel' ? 1 : getRandomInt(1, 2);
      const decisionPool = (
        periodDecisions.length ? periodDecisions : catContent.decisions
      ).map(normalizeDecisionStyle);

      const fallbackPool = generalDecisions.map(normalizeDecisionStyle);
      const effectivePool = decisionPool.length ? decisionPool : fallbackPool;

      for (let i = 0; i < decisionCount; i++) {
        const unusedGlobally = pickGlobalOnce(effectivePool, usedDecisionsGlobal);
        const unusedInCurrentItem = effectivePool.filter(
          decision => !decisions.includes(decision)
        );
        const d = unusedGlobally
          ?? (unusedInCurrentItem.length ? getRandomItem(unusedInCurrentItem) : null);

        if (d) {
          usedDecisionsGlobal.add(d);
          decisions.push(d);
        }
      }
    }

    agendaMinutes.push({
      agendaId: agenda.id,
      agendaTitle: agenda.title,
      agendaNumber: agendaNumber++,
      speeches,
      decisions: [...new Set(decisions)] // Tekrarları kaldır
    });
  }

  return {
    id: uuidv4(),
    title: `${meetingInfo.schoolName.toLocaleUpperCase(TR)} ${meetingInfo.academicYear} EĞİTİM ÖĞRETİM YILI ${periodProfile.titleLabel} ${meetingInfo.className.toLocaleUpperCase(TR)} SINIFI ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI`,
    meetingInfo,
    teachers: teachers.map(t => ({ ...t, fullName: toTitleCaseTr(t.fullName) })),
    agendaMinutes,
    closingText: periodProfile.closingText,
    generatedAt: new Date().toISOString(),
    variationId: variation.id
  };
};
