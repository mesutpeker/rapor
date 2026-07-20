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
import { capitalizeSentenceStartTr, toTitleCaseTr } from './textFormat';
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

const introClosersByTone: Record<GenerationSettings['tone'], string[]> = {
  official: [
    'mevcut durumu değerlendirdi',
    'uygulanacak esaslara ilişkin görüşlerini sundu',
    'kurulun dikkate alması gereken noktaları paylaştı'
  ],
  balanced: [
    'mevcut durumu ve öncelikleri değerlendirdi',
    'konuya ilişkin görüşlerini paylaştı',
    'uygulanabilecek çalışmaları ele aldı'
  ],
  detailed: [
    'mevcut durumu, öğrenci ihtiyaçlarını ve izlenecek adımları birlikte değerlendirdi',
    'eldeki bilgileri uygulanabilecek adımlarla birlikte ele aldı',
    'öncelikleri, uygulama sürecini ve beklenen katkıları ayrıntılandırdı'
  ]
};

const detailedRationales: Record<string, string> = {
  'akademik-basari':
    'Bu yaklaşımın öğrenme eksiklerini zamanında belirlemeye ve ulaşılabilir hedefler oluşturmaya yardımcı olacağını ekledi.',
  devamsizlik:
    'Düzenli kaydın, devam sorunu yaşayan öğrenciler için erken önlem alınmasını kolaylaştıracağını açıkladı.',
  'davranis-disiplin':
    'Kuralların bütün öğretmenlerce tutarlı uygulanmasının güvenli bir öğrenme ortamını destekleyeceğini ekledi.',
  'motivasyon-katilim':
    'Öğrencilerin ilgi ve ihtiyaçlarını dikkate alan etkinliklerin derse katılımı güçlendireceğini açıkladı.',
  'sosyal-duygusal':
    'Erken rehberlik desteğinin öğrencilerin okula uyumunu ve akran ilişkilerini güçlendireceğini ekledi.',
  'olcme-degerlendirme':
    'Çeşitli değerlendirme araçlarının yalnızca sonucu değil, öğrenme sürecini de görünür kılacağını açıkladı.',
  'veli-iletisim':
    'Açık ve düzenli iletişimin okul ile aile arasında güvene dayalı iş birliğini güçlendireceğini ekledi.',
  destekleme:
    'Çalışmaların öğrenci düzeyine göre planlanmasının verilen desteği daha işlevsel hâle getireceğini açıkladı.',
  'dilek-temenniler':
    'Öğretmenler arasındaki düzenli bilgi paylaşımının alınan kararların uygulanmasını kolaylaştıracağını ekledi.',
  genel:
    'Belirlenen adımların sorumluları ve izleme zamanı netleştirildiğinde uygulamanın daha sağlıklı yürütüleceğini açıkladı.'
};

const wishOpenings: Record<MeetingInfo['period'], string[]> = {
  'sene-basi': [
    'Yeni eğitim öğretim yılına ilişkin iyi dileklerini ve iş birliği önerilerini paylaştı.',
    'Kurul üyelerine verimli ve sağlıklı bir eğitim öğretim yılı diledi.',
    'Yıl boyunca sürdürülecek ortak çalışmalara ilişkin temennilerini dile getirdi.'
  ],
  'ikinci-donem': [
    'İkinci döneme ilişkin iyi dileklerini ve ortak çalışma önerilerini paylaştı.',
    'Kurul üyelerine sağlıklı ve verimli bir ikinci dönem diledi.',
    'Birinci dönemde kurulan iş birliğinin sürmesine ilişkin temennilerini dile getirdi.'
  ],
  'sene-sonu': [
    'Yıl boyunca yürütülen çalışmalar için kurul üyelerine teşekkür etti.',
    'Gelecek eğitim öğretim yılına ilişkin iyi dileklerini paylaştı.',
    'Öğrenciler ve öğretmenler için sağlıklı ve verimli bir tatil dönemi diledi.'
  ]
};

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
    return `Gelecek eğitim öğretim yılına yönelik çalışmalarda ${formattedFocus} başlıklarının dikkate alınmasını önerdi.`;
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
  focusArea: string
): string => {
  const focus = capitalizeSentenceStartTr(focusArea);
  if (period === 'ikinci-donem') {
    return `${focus} alanındaki birinci dönem sonuçlarını değerlendirerek ikinci dönem çalışmalarının buna göre düzenlenmesini önerdi.`;
  }
  if (period === 'sene-sonu') {
    return `${focus} alanındaki yıllık gelişimi değerlendirdi ve gelecek yıl izlenecek noktaları paylaştı.`;
  }
  return `${focus} alanındaki hazırbulunuşluğun belirlenerek ders çalışmalarının buna göre planlanmasını önerdi.`;
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
    return `Yıllık sonuçları dikkate alarak gelecek yıl ${priority} önerdi.`;
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
    const perContent = getPeriodContent(meetingInfo.period, category);
    const isAcademic = academicCategories.has(category);

    // Döneme özgü bir havuz varsa yalnızca onu kullan. Dizi sırasının rastgele
    // seçimde ağırlık oluşturmadığı için dönem ve genel havuzları birleştirmek,
    // sene başında yıl sonu değerlendirmesi gibi zamansal kopukluklara yol
    // açıyordu. Genel havuz yalnızca dönem içeriği bulunmadığında yedektir.
    const observationPool = perContent.observations?.length
      ? perContent.observations
      : catContent.observations;
    const suggestionPool = perContent.suggestions?.length
      ? perContent.suggestions
      : catContent.suggestions;

    // Madde-içi tekrarsızlık: aynı gündem maddesinde konuşan farklı öğretmenlerin
    // paylaşılan havuzlardan (giriş cümlesi, fiil, konuya özgü gözlem/öneri) AYNI
    // ifadeyi seçmemesi için bu setler madde başında sıfırlanır.
    const itemUsedStarters = new Set<string>();
    const itemUsedIntroClosers = new Set<string>();
    const itemUsedObs = new Set<string>();
    const itemUsedSug = new Set<string>();

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
        ? pickUnused(wishOpenings[meetingInfo.period], itemUsedStarters)
        : (() => {
            const starterPool = isAcademic
              ? [...branchStyle.sentenceStarters, ...(perContent.intros ?? [])]
              : [...(perContent.intros ?? []), ...catContent.intros];
            const starter = pickUnused(starterPool, itemUsedStarters);
            const introCloser = pickUnused(introClosers, itemUsedIntroClosers);
            return `${capitalizeSentenceStartTr(starter)} ${introCloser}.`;
          })();

      // Opsiyonel cümleler havuzu — her öğretmen için farklı sayıda kullanılacak.
      // Konuya özgü cümleler önce gelir ki kısa konuşmalarda bile gündem maddesinin
      // konusu işlensin; sınıf düzeyine ait genel cümleler sona eklenir.
      const optionalSentences: string[] = [];

      // 1) Maddenin konusuna ve döneme özgü öğretmen değerlendirmesi.
      const observation = pickUnused(observationPool, itemUsedObs);
      optionalSentences.push(observation);

      // Ayrıntılı anlatım, yalnızca daha iddialı bir giriş kullanmaz; konuya
      // özgü gerekçeyi de konuşmanın gövdesine ekler.
      if (settings.tone === 'detailed') {
        optionalSentences.push(detailedRationales[category] ?? detailedRationales.genel);
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

      // 4) Akademik maddelerde branşa özel odak alanı. Başarı düzeyinden gelen
      // bağımsız bir eylemle çaprazlanmaz.
      if (isAcademic) {
        const focusArea = pickUnused(branchStyle.focusAreas, used.focus);
        optionalSentences.push(getFocusSentence(meetingInfo.period, focusArea));
      }

      // 5) Maddenin konusuna ve döneme özgü öneri. Gözlemle aynı düşünceyi
      // yineleyen bir öneri varsa mümkün olduğunda başka bir öneri seçilir.
      const unusedSuggestions = suggestionPool.filter(suggestion => !itemUsedSug.has(suggestion));
      const distinctSuggestions = unusedSuggestions.filter(
        suggestion => !isSemanticallySimilar(observation, suggestion)
      );
      const effectiveSuggestions = distinctSuggestions.length
        ? distinctSuggestions
        : (unusedSuggestions.length ? unusedSuggestions : suggestionPool);
      const categorySuggestion = getRandomItem(effectiveSuggestions);
      itemUsedSug.add(categorySuggestion);
      optionalSentences.push(buildSuggestionSentence(categorySuggestion, speakerIndex));

      // 6) Akademik maddelerde ek branş önerisi
      if (isAcademic) {
        const suggestion = pickUnused(branchStyle.suggestions, used.suggestions);
        if (!optionalSentences.some(sentence => isSemanticallySimilar(sentence, suggestion))) {
          optionalSentences.push(buildSuggestionSentence(suggestion, speakerIndex + 2));
        }
      }

      // Aynı konuşmadaki yakın anlamlı cümleleri tekilleştir.
      const distinctOptionalSentences = optionalSentences.filter((sentence, index, sentences) =>
        sentences.slice(0, index).every(previous => !isSemanticallySimilar(previous, sentence))
      );

      // Her öğretmen için cümle sayısını rastgele belirle (farklı uzunluklarda konuşmalar)
      const lengthRange: Record<string, [number, number]> = {
        short: [1, 2],
        medium: [2, 4],
        long: [4, 6]
      };
      const [minSentences, maxSentences] = lengthRange[settings.speechLength] ?? [2, 5];
      const toneDetail = settings.tone === 'detailed' ? 1 : 0;
      const keepCount = Math.min(
        getRandomInt(minSentences + toneDetail, maxSentences + toneDetail),
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
      const decisionCount = getRandomInt(1, 2);
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
