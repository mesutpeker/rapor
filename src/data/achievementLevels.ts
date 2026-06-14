import type { AchievementLevel, AchievementLevelId } from '../types';

export const achievementLevels: AchievementLevel[] = [
  // ─────────────────────────────────────────────
  // 1. veryHigh – Çok başarılı sınıf
  // ─────────────────────────────────────────────
  {
    id: 'veryHigh',
    label: 'Çok Başarılı',
    description: 'Çok başarılı sınıf',
    academicTone: 'Akademik başarı düzeyi oldukça yüksek olan bu sınıfta öğrencilerin büyük çoğunluğu üst düzey performans sergilemektedir.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Sınıf genelinde akademik başarı ortalaması oldukça yüksek bir seviyede seyretmektedir.',
          'Öğrencilerin derslere olan ilgi ve motivasyon düzeyleri son derece tatmin edicidir.',
          'Ulusal ve uluslararası düzeyde çeşitli yarışmalara katılım sağlanmış ve başarılı sonuçlar elde edilmiştir.',
          'Öğrenciler arasında olumlu bir rekabet ortamı oluşmuş olup bu durum akademik gelişimi desteklemektedir.'
        ],
        commonIssues: [
          'Yüksek başarı beklentisinin bazı öğrencilerde aşırı stres ve kaygıya yol açabileceği değerlendirilmiştir.',
          'Başarı düzeyinin korunması için sürekli motivasyon desteğinin sağlanması gerekmektedir.',
          'Bazı öğrencilerin sosyal etkinliklere yeterli zaman ayıramadığı gözlemlenmiştir.'
        ],
        decisionHints: [
          'Öğrencilerin ilgi alanlarına yönelik proje ve araştırma çalışmalarının teşvik edilmesine karar verilmiştir.',
          'Ulusal düzeydeki akademik yarışmalara katılımın artırılması yönünde planlama yapılması uygun görülmüştür.',
          'Üst düzey düşünme becerilerini geliştirmeye yönelik ek etkinliklerin düzenlenmesi kararlaştırılmıştır.',
          'Rehberlik servisiyle iş birliği yapılarak öğrencilerin psikolojik dayanıklılıklarının desteklenmesi önerilmiştir.'
        ],
        speechModifiers: [
          'mevcut başarı düzeyinin sürdürülebilirliğinin sağlanması',
          'öğrencilerin akademik potansiyellerinin en üst seviyeye çıkarılması',
          'yarışma ve olimpiyat hazırlıklarına ağırlık verilmesi',
          'bireysel ilgi alanlarına yönelik zenginleştirme çalışmalarının yapılması'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Öğrencilerin tamamına yakını müfredat hedeflerini başarıyla karşılamaktadır.',
          'Sınıf içi tartışma ve sorgulama becerileri üst düzeyde gelişim göstermiştir.',
          'Öğrencilerin öz disiplin ve sorumluluk bilinçleri yüksek seviyededir.',
          'Ders dışı akademik faaliyetlere katılım oranı kayda değer bir düzeydedir.'
        ],
        commonIssues: [
          'Mükemmeliyetçi tutumların bazı öğrencilerde tükenmişlik sendromuna neden olabileceği endişesi dile getirilmiştir.',
          'Öğrencilerin yalnızca sınav odaklı çalışma eğilimi göstermesi konusunda dikkatli olunması gerektiği belirtilmiştir.',
          'Grup çalışmalarında bireysel üstünlük çatışmalarının zaman zaman yaşandığı ifade edilmiştir.'
        ],
        decisionHints: [
          'Öğrencilerin farklı disiplinler arası çalışmalara yönlendirilmesi kararlaştırılmıştır.',
          'Akademik başarının yanı sıra sosyal-duygusal gelişimin de desteklenmesine önem verilmesine karar verilmiştir.',
          'Mentorluk programı kapsamında başarılı öğrencilerin akranlarına rehberlik etmesi önerilmiştir.'
        ],
        speechModifiers: [
          'öğrencilerin çok yönlü gelişimlerinin desteklenmesi',
          'akademik başarının kalıcı hâle getirilmesi için stratejik planlama yapılması',
          'disiplinler arası proje çalışmalarının artırılması',
          'sınav kaygısını azaltmaya yönelik rehberlik çalışmalarının yürütülmesi'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Öğrencilerin analitik düşünme ve problem çözme becerileri dikkat çekici bir düzeye ulaşmıştır.',
          'Sınıfta yürütülen bilimsel proje çalışmaları başarılı sonuçlar vermektedir.',
          'Öğrencilerin okuma alışkanlıkları ve araştırma becerileri gelişmiş düzeydedir.'
        ],
        commonIssues: [
          'Başarılı öğrencilerin bir kısmında rehavet belirtilerinin gözlemlendiği ifade edilmiştir.',
          'Bazı derslerde müfredat dışı konulara aşırı ilgi gösterilmesinin ders akışını olumsuz etkileyebildiği belirtilmiştir.',
          'Öğrencilerin bir bölümünün fiziksel aktivitelere yeterince katılım sağlamadığı tespit edilmiştir.',
          'Yüksek tempolu çalışma düzeninin uzun vadede sürdürülebilirliği konusunda endişeler paylaşılmıştır.'
        ],
        decisionHints: [
          'TÜBİTAK proje yarışmalarına hazırlık süreçlerinin koordineli biçimde yürütülmesi kararlaştırılmıştır.',
          'Öğrencilerin sportif ve kültürel faaliyetlere dengeli katılımının teşvik edilmesi uygun görülmüştür.',
          'Akademik danışmanlık sisteminin etkinleştirilmesi yönünde adımlar atılmasına karar verilmiştir.',
          'Rehaveti önlemek amacıyla hedef belirleme çalışmalarının yapılması önerilmiştir.'
        ],
        speechModifiers: [
          'öğrencilerin bilimsel araştırma yetkinliklerinin pekiştirilmesi',
          'başarı motivasyonunun canlı tutulması için hedef odaklı çalışmalar yapılması',
          'akademik ve sportif dengenin gözetilmesi',
          'ileri düzey çalışma programlarının hayata geçirilmesi'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Sınıfın genel not ortalaması okul genelinin belirgin biçimde üzerinde seyretmektedir.',
          'Öğrencilerin büyük çoğunluğu üst öğrenim kurumlarına hazırlık sürecinde bilinçli bir tutum sergilemektedir.',
          'Öğretmen-öğrenci iletişimi yapıcı ve verimli bir düzeyde sürdürülmektedir.',
          'Eleştirel düşünme ve yaratıcı problem çözme alanlarında kayda değer bir ilerleme kaydedilmiştir.'
        ],
        commonIssues: [
          'Bazı öğrencilerin aşırı rekabet duygusunun sınıf içi dayanışmayı zayıflatabileceği değerlendirilmiştir.',
          'Dijital ortamda geçirilen sürenin akademik verimlilik üzerindeki olası olumsuz etkilerine dikkat çekilmiştir.',
          'Az sayıda öğrencide başarı baskısından kaynaklanan motivasyon düşüklüğü gözlemlenmiştir.'
        ],
        decisionHints: [
          'Üniversite tanıtım ve kariyer rehberliği etkinliklerinin düzenlenmesine karar verilmiştir.',
          'İş birliğine dayalı öğrenme tekniklerinin sınıf ortamında daha sık uygulanması önerilmiştir.',
          'Dijital okuryazarlık ve bilinçli teknoloji kullanımı konularında seminerler planlanmıştır.',
          'Takım çalışmasını güçlendirmeye yönelik sosyal sorumluluk projelerinin desteklenmesi uygun görülmüştür.'
        ],
        speechModifiers: [
          'kariyer planlama çalışmalarının erken dönemde başlatılması',
          'iş birlikçi öğrenme ortamlarının güçlendirilmesi',
          'dijital yetkinliklerin bilinçli biçimde geliştirilmesi',
          'öğrencilerin duygusal zekâ becerilerinin desteklenmesi'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Sınıfta öğrenmeye karşı güçlü bir içsel motivasyon hâkim olup öğrenciler öğrenme süreçlerine aktif katılım göstermektedir.',
          'Öğrencilerin özgün fikirler üretme ve bunları savunma becerileri takdir edilecek düzeydedir.',
          'Akran öğrenimi ve yardımlaşma kültürü sınıf genelinde olumlu bir şekilde yerleşmiştir.'
        ],
        commonIssues: [
          'Yoğun müfredat programının öğrencilerin bireysel gelişim alanlarına zaman bırakmadığı gündeme getirilmiştir.',
          'Bazı öğrencilerin yalnızca sayısal veya sözel alana yoğunlaşarak diğer alanları ihmal ettiği belirtilmiştir.',
          'Sınıf mevcudunun yüksek olmasının bireysel ilgiyi sınırlandırdığı ifade edilmiştir.',
          'Sürekli yüksek performans beklentisinin bazı öğrencilerde kaçınma davranışlarına yol açabildiği gözlemlenmiştir.'
        ],
        decisionHints: [
          'Bireysel yeteneklerin keşfedilmesine yönelik seçmeli ders ve atölye çalışmalarının çeşitlendirilmesi önerilmiştir.',
          'Öğrenci koçluğu sisteminin uygulamaya konularak her öğrencinin bireysel takibinin yapılması kararlaştırılmıştır.',
          'Dengeli alan gelişimini teşvik eden rehberlik çalışmalarının planlanması uygun görülmüştür.'
        ],
        speechModifiers: [
          'bireysel yetenek alanlarının tespit edilerek desteklenmesi',
          'dengeli bir akademik gelişim süreci izlenmesi',
          'öğrenci koçluğu uygulamalarının yaygınlaştırılması',
          'bütüncül gelişim perspektifinin benimsenmesi'
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 2. high – Başarılı sınıf
  // ─────────────────────────────────────────────
  {
    id: 'high',
    label: 'Başarılı',
    description: 'Başarılı sınıf',
    academicTone: 'Akademik başarı düzeyi yüksek olan bu sınıfta öğrencilerin çoğunluğu beklenen hedeflerin üzerinde performans göstermektedir.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Sınıfın genel akademik performansı iyi düzeyde olup öğrencilerin çoğunluğu başarılı sonuçlar elde etmektedir.',
          'Öğrencilerin derse katılım ve ödev tamamlama oranları yüksek seviyededir.',
          'Sınıf içi disiplin ve öğrenme ortamı olumlu bir atmosfere sahiptir.',
          'Öğrencilerin önemli bir kısmı akademik hedeflerine ulaşma konusunda kararlı bir tutum sergilemektedir.'
        ],
        commonIssues: [
          'Bazı öğrencilerin belirli derslerde performans dalgalanmaları yaşadığı gözlemlenmiştir.',
          'Motivasyon düzeyindeki küçük düşüşlerin erken dönemde tespit edilmesi gerektiği vurgulanmıştır.',
          'Sınıfta az sayıda öğrencinin devamsızlık sorunu yaşadığı ifade edilmiştir.'
        ],
        decisionHints: [
          'Başarı düzeyinin korunması ve artırılmasına yönelik ek çalışma programlarının düzenlenmesi kararlaştırılmıştır.',
          'Performans dalgalanması gösteren öğrencilerin bireysel olarak izlenmesi uygun görülmüştür.',
          'Velilerle düzenli bilgilendirme toplantıları yapılarak iş birliğinin güçlendirilmesi önerilmiştir.',
          'Öğrencilerin güçlü oldukları alanlarda derinleşmelerine olanak tanıyan etkinlikler planlanmıştır.'
        ],
        speechModifiers: [
          'mevcut başarı düzeyinin istikrarlı biçimde sürdürülmesi',
          'bireysel performans farklılıklarının yakından takip edilmesi',
          'öğrencilerin akademik öz güvenlerinin pekiştirilmesi',
          'düzenli geri bildirim mekanizmalarının oluşturulması'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Öğrencilerin derslerdeki kavrama hızı ve bilgiyi uygulama becerileri tatmin edici seviyededir.',
          'Sınıf genelinde öğrenmeye yönelik olumlu bir tutum hâkimdir.',
          'Laboratuvar ve atölye çalışmalarında öğrenciler başarılı uygulamalar gerçekleştirmektedir.'
        ],
        commonIssues: [
          'Belirli konularda derinleşme ihtiyacının karşılanamaması durumunun önlenmesi gerektiği belirtilmiştir.',
          'Öğrencilerin bir kısmının zaman yönetimi konusunda desteğe ihtiyaç duyduğu ifade edilmiştir.',
          'Sınav dönemlerinde artan kaygı düzeyinin akademik performansı olumsuz etkileyebildiği değerlendirilmiştir.',
          'Bazı öğrencilerin grup çalışmalarında eşit katkı sağlayamadığı gözlemlenmiştir.'
        ],
        decisionHints: [
          'Zaman yönetimi ve verimli çalışma teknikleri konularında atölye çalışmalarının düzenlenmesi kararlaştırılmıştır.',
          'Sınav kaygısıyla başa çıkma stratejileri konusunda rehberlik desteğinin sağlanması önerilmiştir.',
          'Öğrencilerin güçlü ve zayıf yönlerini belirleyen bireysel değerlendirme raporlarının hazırlanması uygun görülmüştür.'
        ],
        speechModifiers: [
          'verimli çalışma alışkanlıklarının kazandırılması',
          'sınav kaygısını yönetme becerilerinin geliştirilmesi',
          'konularda derinleşmeyi sağlayacak ek materyallerin sunulması',
          'bireysel değerlendirme süreçlerinin etkinleştirilmesi'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Sınıfın akademik başarı grafiği dönem boyunca istikrarlı bir yükseliş göstermiştir.',
          'Öğrencilerin araştırma ve sunum becerilerinde belirgin bir gelişme kaydedilmiştir.',
          'Okul içi etkinliklere ve sosyal sorumluluk projelerine katılım oranları memnuniyet vericidir.',
          'Öğretmenlerin uyguladığı farklılaştırılmış öğretim yöntemleri olumlu sonuçlar vermektedir.'
        ],
        commonIssues: [
          'Dönem ortalarında gözlemlenen motivasyon düşüklüğünün önlenmesi için tedbirler alınması gerektiği belirtilmiştir.',
          'Bazı öğrencilerin ders dışı etkinliklere ayrılan zamanın akademik çalışmalarını olumsuz etkilediği ifade edilmiştir.',
          'Teknoloji kullanımındaki dengesizliğin öğrenme sürecine olan etkisi değerlendirilmiştir.'
        ],
        decisionHints: [
          'Dönem ortası motivasyon artırıcı etkinliklerin planlanması kararlaştırılmıştır.',
          'Ders dışı etkinlikler ile akademik çalışmalar arasındaki dengenin gözetilmesi konusunda öğrencilerin bilgilendirilmesi önerilmiştir.',
          'Teknolojinin eğitim amaçlı etkin kullanımına yönelik rehberlik çalışmalarının yürütülmesi uygun görülmüştür.',
          'Sunum ve araştırma becerilerini pekiştiren disiplinler arası projelerin sürdürülmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'dönemsel motivasyon kayıplarına karşı önleyici tedbirlerin alınması',
          'akademik ve sosyal faaliyetler arasında denge kurulması',
          'teknolojinin eğitimde yapıcı kullanımının sağlanması',
          'öğrenci başarı grafiğinin sürekli izlenmesi'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Sınıftaki öğrencilerin sorumluluk alma ve görev bilinci gelişmiş düzeydedir.',
          'Ders öğretmenlerinin öğrencilere yönelik geri bildirimleri genel itibarıyla olumlu niteliktedir.',
          'Öğrencilerin okuma ve okuduğunu anlama becerileri müfredat beklentilerinin üzerindedir.'
        ],
        commonIssues: [
          'Birkaç öğrencinin düzenli çalışma alışkanlığı edinmekte zorluk yaşadığı ifade edilmiştir.',
          'Yazılı anlatım becerilerinde sınıf genelinde iyileştirmeye açık alanların bulunduğu belirtilmiştir.',
          'Bazı derslerde öğrenci katılımının diğer derslere kıyasla düşük kaldığı gözlemlenmiştir.',
          'Velilerin bir kısmının okul süreçlerine yeterli düzeyde dahil olmadığı değerlendirilmiştir.'
        ],
        decisionHints: [
          'Yazılı anlatım becerilerini geliştirmeye yönelik düzenli yazma etkinliklerinin planlanması kararlaştırılmıştır.',
          'Çalışma alışkanlığı kazandırma konusunda rehberlik servisinin aktif rol üstlenmesi önerilmiştir.',
          'Veli katılımını artırmak amacıyla bireysel görüşme takviminin oluşturulması uygun görülmüştür.'
        ],
        speechModifiers: [
          'yazılı anlatım ve kompozisyon becerilerinin geliştirilmesi',
          'düzenli çalışma disiplininin yerleştirilmesi',
          'veli iş birliğinin güçlendirilerek öğrenci takibinin artırılması',
          'katılım düşüklüğü gözlemlenen derslerde aktif öğrenme yöntemlerinin uygulanması'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Sınıf genelinde yardımlaşma ve dayanışma kültürünün güçlü olduğu gözlemlenmiştir.',
          'Öğrencilerin eleştirel düşünme ve sorgulama becerilerinde olumlu bir gelişim süreci yaşanmaktadır.',
          'Öğretmenler tarafından uygulanan ölçme-değerlendirme yöntemlerinin öğrenci gelişimini etkin biçimde yansıttığı belirtilmiştir.',
          'Ders başarı oranları geçen döneme kıyasla artış göstermiştir.'
        ],
        commonIssues: [
          'Sınıfın kalabalık yapısının bireysel öğrenme ihtiyaçlarının karşılanmasını zorlaştırdığı ifade edilmiştir.',
          'Öğrencilerin bir bölümünün ders çalışma süresini verimli kullanamadığı belirtilmiştir.',
          'Bazı konularda ön bilgi eksikliklerinin ilerleyen ünitelerde sorun oluşturduğu gözlemlenmiştir.'
        ],
        decisionHints: [
          'Ön bilgi eksikliklerini gidermeye yönelik kısa süreli telafi çalışmalarının planlanması kararlaştırılmıştır.',
          'Bireysel öğrenme farklılıklarını dikkate alan esnek öğretim stratejilerinin uygulanması önerilmiştir.',
          'Öğrencilerin verimli ders çalışma yöntemlerini öğrenmelerine yönelik seminerler düzenlenmesi uygun görülmüştür.',
          'Kalabalık sınıf ortamında iş birlikçi öğrenme tekniklerinin daha sık kullanılması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'ön öğrenme eksikliklerinin giderilmesine yönelik telafi çalışmalarının düzenlenmesi',
          'bireysel farklılıkları gözeten öğretim yaklaşımlarının benimsenmesi',
          'verimli ders çalışma tekniklerinin öğrencilere kazandırılması',
          'iş birlikçi öğrenme modellerinin etkin biçimde uygulanması'
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 3. medium – Orta düzey başarıya sahip sınıf
  // ─────────────────────────────────────────────
  {
    id: 'medium',
    label: 'Orta Düzey',
    description: 'Orta düzey başarıya sahip sınıf',
    academicTone: 'Akademik başarı düzeyi orta seviyede seyreden bu sınıfta öğrencilerin potansiyellerini tam olarak yansıtabilmeleri için ek desteklere ihtiyaç duyulmaktadır.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Öğrencilerin önemli bir kısmı temel öğrenme kazanımlarını karşılamakta olup gelişim potansiyelleri yüksektir.',
          'Sınıf ortamında genel bir öğrenme isteğinin var olduğu gözlemlenmektedir.',
          'Uygulamalı çalışmalarda öğrencilerin katılım ve ilgi düzeylerinin arttığı görülmektedir.',
          'Bazı öğrencilerin belirli derslerde beklenenden daha iyi performans sergilediği tespit edilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin düzenli ve planlı çalışma alışkanlıklarının yeterince gelişmediği gözlemlenmiştir.',
          'Temel kavram ve becerilerde eksikliklerin bulunduğu ve bunların üst öğrenmeleri olumsuz etkilediği belirtilmiştir.',
          'Ders çalışma motivasyonunda dönemsel dalgalanmalar yaşandığı ifade edilmiştir.',
          'Öğrencilerin bir kısmının sınav hazırlık süreçlerini etkin yönetemediği değerlendirilmiştir.'
        ],
        decisionHints: [
          'Düzenli çalışma alışkanlığı kazandırmaya yönelik rehberlik çalışmalarının başlatılması kararlaştırılmıştır.',
          'Temel kavram eksikliklerini gidermek amacıyla takviye kurs programlarının düzenlenmesi önerilmiştir.',
          'Öğrencilerin güçlü yönlerinin tespit edilerek bu alanlarda teşvik edilmesi uygun görülmüştür.',
          'Veli bilgilendirme toplantılarının sıklaştırılarak ev ortamında destek sağlanması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'planlı ve düzenli çalışma alışkanlıklarının oluşturulması',
          'temel bilgi eksikliklerinin giderilerek sağlam bir altyapı oluşturulması',
          'öğrenci motivasyonunu artırıcı öğretim yöntemlerinin uygulanması',
          'velilerle iş birliği içinde öğrenci takibinin güçlendirilmesi'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Görsel ve uygulamalı öğretim yöntemlerinin kullanıldığı derslerde öğrencilerin başarısının belirgin biçimde arttığı gözlemlenmiştir.',
          'Öğrencilerin sosyal becerileri ve sınıf içi iletişimleri olumlu bir düzeydedir.',
          'Bazı öğrencilerin sanat, spor veya teknoloji gibi alanlarda öne çıkan yeteneklere sahip olduğu tespit edilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin okuduğunu anlama ve yorumlama becerilerinde genel bir iyileştirme ihtiyacı bulunmaktadır.',
          'Ödev tamamlama oranlarının beklenen düzeyin altında kaldığı değerlendirilmiştir.',
          'Sınıf içinde dikkat dağınıklığının öğrenme sürecini olumsuz etkilediği gözlemlenmiştir.',
          'Matematiksel işlem ve problem çözme becerilerinde yaygın güçlüklerin yaşandığı belirtilmiştir.'
        ],
        decisionHints: [
          'Okuma-anlama becerilerini geliştirmeye yönelik günlük okuma programlarının uygulanması kararlaştırılmıştır.',
          'Ödev takip sisteminin güçlendirilerek düzenli geri bildirim verilmesi önerilmiştir.',
          'Dikkat ve odaklanma becerilerini artırıcı sınıf içi stratejilerin uygulanması uygun görülmüştür.',
          'Problem çözme becerilerini geliştirmek amacıyla ek alıştırma çalışmalarının planlanması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'okuma-anlama becerilerinin sistematik olarak geliştirilmesi',
          'ödev takip ve değerlendirme mekanizmalarının güçlendirilmesi',
          'dikkat ve odaklanma sorunlarına yönelik sınıf stratejilerinin uygulanması',
          'somut ve görsel materyallerle desteklenmiş öğretim yöntemlerinin tercih edilmesi'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Sınıfta olumlu bir öğrenme ikliminin varlığı dikkat çekmekte olup öğrenciler yeni konulara açık bir tutum sergilemektedir.',
          'Öğretmenlerin uyguladığı destekleyici yaklaşımların öğrencilerin kendilerine olan güvenini artırdığı belirtilmiştir.',
          'Küçük grup çalışmalarında öğrencilerin iş birliği yapma becerileri gelişim göstermektedir.',
          'Dönem içinde bazı öğrencilerin not ortalamalarında kayda değer artışlar gözlemlenmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin önemli bir kısmının soyut düşünme ve genelleme yapma becerilerinde güçlük yaşadığı ifade edilmiştir.',
          'Ders çalışırken etkin not alma ve özetleme tekniklerinin yeterince kullanılmadığı belirtilmiştir.',
          'Sınıfta genel olarak yazılı sınavlarda sözlü sınavlara kıyasla daha düşük başarı gözlemlenmektedir.'
        ],
        decisionHints: [
          'Soyut kavramların somutlaştırılmasına yönelik materyal ve etkinliklerin hazırlanması kararlaştırılmıştır.',
          'Etkili not alma ve özetleme tekniklerinin öğretilmesine yönelik uygulamalı çalışmalar planlanmıştır.',
          'Yazılı anlatım becerilerini desteklemek amacıyla düzenli yazma alıştırmalarının yapılması önerilmiştir.',
          'Bireysel öğrenme planlarının oluşturularak her öğrencinin gelişim sürecinin izlenmesi uygun görülmüştür.'
        ],
        speechModifiers: [
          'soyut kavramların somut örneklerle pekiştirilmesi',
          'etkili çalışma ve not alma stratejilerinin kazandırılması',
          'yazılı ifade becerilerinin güçlendirilmesine yönelik çalışmalar yapılması',
          'bireysel öğrenme planlarının hazırlanarak düzenli takibinin sağlanması'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Öğrencilerin derslere düzenli katılım sağladığı ve genel devamsızlık oranının düşük olduğu belirtilmiştir.',
          'Sınıf içi etkinliklere yönelik öğrenci geri bildirimleri olumlu niteliktedir.',
          'Öğretmenlerin çeşitli öğretim materyalleri kullanarak dersleri zenginleştirme çabası takdir edilmektedir.'
        ],
        commonIssues: [
          'Öğrencilerin bireysel çalışma becerilerinin sınırlı olduğu ve dışsal yönlendirmeye ihtiyaç duyduğu gözlemlenmiştir.',
          'Bazı öğrencilerin ders dışında yeterli tekrar yapmadığı ve bu durumun kalıcı öğrenmeyi engellediği belirtilmiştir.',
          'İngilizce ve matematik derslerinde sınıf ortalamasının diğer derslere kıyasla düşük olduğu ifade edilmiştir.',
          'Öğrencilerin bir kısmının uzun vadeli hedef belirleme konusunda zorlandığı değerlendirilmiştir.'
        ],
        decisionHints: [
          'Öz düzenleme ve bağımsız çalışma becerilerini geliştirmeye yönelik etkinliklerin düzenlenmesi kararlaştırılmıştır.',
          'Kritik derslerde ek ders saatlerinin değerlendirilmesi önerilmiştir.',
          'Kısa vadeli ulaşılabilir hedefler belirlenerek öğrencilerin başarı duygusunu yaşamaları sağlanmalıdır.',
          'Düzenli tekrar ve pekiştirme çalışmalarının ders programına entegre edilmesi uygun görülmüştür.'
        ],
        speechModifiers: [
          'bağımsız çalışma ve öz düzenleme becerilerinin desteklenmesi',
          'kritik derslerde ek destek programlarının uygulanması',
          'ulaşılabilir hedeflerle öğrenci motivasyonunun artırılması',
          'düzenli tekrar alışkanlığının kazandırılması'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Uygun öğretim yöntemleri uygulandığında öğrencilerin kavrama düzeylerinin hızla yükseldiği gözlemlenmektedir.',
          'Sınıfta teknoloji destekli eğitim uygulamalarına karşı yüksek bir ilgi bulunmaktadır.',
          'Öğrencilerin çoğunluğu yönlendirme ve teşvik edildiğinde yeterli performans gösterebilmektedir.',
          'Sanat ve beden eğitimi gibi derslerde öğrencilerin kendilerini başarılı hissettikleri ve motivasyonlarının arttığı belirtilmiştir.'
        ],
        commonIssues: [
          'Ev ortamında akademik destek yetersizliğinin öğrenci başarısını olumsuz etkilediği değerlendirilmiştir.',
          'Öğrencilerin bir kısmının akademik başarısızlığı içselleştirerek öğrenilmiş çaresizlik geliştirme riski taşıdığı ifade edilmiştir.',
          'Sınıf genelinde sözel derslerdeki kelime dağarcığı yetersizliğinin öğrenmeyi sınırlandırdığı belirtilmiştir.'
        ],
        decisionHints: [
          'Teknoloji destekli öğretim materyallerinin daha yaygın biçimde kullanılması kararlaştırılmıştır.',
          'Kelime dağarcığını zenginleştirmeye yönelik okuma kampanyalarının başlatılması önerilmiştir.',
          'Öğrenilmiş çaresizlik riski taşıyan öğrencilerin rehberlik servisiyle düzenli görüşmelerinin sağlanması uygun görülmüştür.',
          'Ev ortamındaki destek yetersizliğini telafi etmek amacıyla okul bünyesinde etüt çalışmalarının düzenlenmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'teknoloji destekli öğretim araçlarının etkin kullanımının sağlanması',
          'kelime hazinesini geliştirmeye yönelik sistematik çalışmaların yürütülmesi',
          'öğrencilerin akademik öz yeterlilik algılarının güçlendirilmesi',
          'okul bünyesinde etüt ve destek programlarının hayata geçirilmesi'
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 4. needsSupport – Akademik desteğe ihtiyaç duyan sınıf
  // ─────────────────────────────────────────────
  {
    id: 'needsSupport',
    label: 'Desteğe İhtiyaç Duyan',
    description: 'Akademik desteğe ihtiyaç duyan sınıf',
    academicTone: 'Akademik başarı düzeyinin beklentilerin altında kaldığı bu sınıfta öğrencilerin bireysel olarak desteklenmesi ve yakından takip edilmesi gerekmektedir.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Bireysel ilgi gösterildiğinde öğrencilerin öğrenmeye karşı olumlu tepkiler verdiği gözlemlenmektedir.',
          'Sınıfta sosyal uyum ve arkadaşlık ilişkileri genel itibarıyla sağlıklı bir düzeydedir.',
          'Bazı öğrencilerin sanatsal ve sportif alanlarda öne çıkan becerilere sahip olduğu tespit edilmiştir.',
          'Destekleyici öğretim yöntemleri uygulandığında öğrencilerin özgüvenlerinde gözle görülür artış yaşandığı belirtilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin büyük çoğunluğunda temel akademik becerilerde ciddi eksiklikler bulunmaktadır.',
          'Ders çalışma alışkanlığının yerleşmemiş olması en temel sorunlardan biri olarak değerlendirilmiştir.',
          'Devamsızlık oranlarının yüksek olması öğrenme sürecinin kesintiye uğramasına neden olmaktadır.',
          'Öğrencilerin akademik öz güven düzeylerinin düşük olduğu ve bu durumun öğrenmeyi olumsuz etkilediği ifade edilmiştir.'
        ],
        decisionHints: [
          'Her öğrenci için bireysel akademik gelişim planlarının hazırlanması kararlaştırılmıştır.',
          'Devamsızlık sorununu çözmek amacıyla veli ziyaretlerinin planlanması önerilmiştir.',
          'Temel beceri eksikliklerini gidermeye yönelik yoğunlaştırılmış destek programlarının uygulanması uygun görülmüştür.',
          'Rehberlik servisiyle koordineli biçimde özgüven artırıcı çalışmaların yürütülmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'bireysel öğrenme planlarının oluşturularak uygulamaya konulması',
          'devamsızlık sorununun veli iş birliğiyle çözüme kavuşturulması',
          'temel beceri eksikliklerinin öncelikli olarak ele alınması',
          'öğrencilerin akademik öz güvenlerinin yeniden inşa edilmesi'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Öğrencilerin uygulamalı ve deneyimsel öğrenme etkinliklerine yoğun ilgi gösterdiği gözlemlenmiştir.',
          'Sınıfta saygı ve hoşgörüye dayalı bir iletişim ortamının varlığı dikkat çekmektedir.',
          'Küçük başarıların kutlanması ve olumlu pekiştireç uygulamalarının öğrenci motivasyonunu artırdığı belirtilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin önemli bir kısmında okuma ve yazma becerilerinin sınıf düzeyinin altında olduğu tespit edilmiştir.',
          'Aile yapısındaki sorunların öğrencilerin akademik performansını doğrudan etkilediği değerlendirilmiştir.',
          'Öğrencilerin dikkat sürelerinin kısa olması nedeniyle uzun süreli etkinliklerin verimsiz geçtiği ifade edilmiştir.',
          'Bazı öğrencilerin temel hijyen ve beslenme ihtiyaçlarının karşılanamamasının öğrenmeyi olumsuz etkilediği gözlemlenmiştir.'
        ],
        decisionHints: [
          'Okuma-yazma becerilerini geliştirmeye yönelik bireysel destek programlarının başlatılması kararlaştırılmıştır.',
          'Sosyal hizmet uzmanı ve rehberlik servisiyle iş birliği yapılarak aile kaynaklı sorunlara müdahale edilmesi önerilmiştir.',
          'Kısa süreli ve çeşitlendirilmiş etkinliklerle ders planlarının yeniden yapılandırılması uygun görülmüştür.',
          'İhtiyaç sahibi öğrencilere yönelik destek mekanizmalarının devreye sokulması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'okuma-yazma güçlüğü yaşayan öğrencilere yönelik bireysel destek sağlanması',
          'aile kaynaklı sorunların profesyonel destek mekanizmalarıyla ele alınması',
          'ders sürelerinin kısa ve etkileşimli bölümlere ayrılması',
          'temel ihtiyaçları karşılanamayan öğrencilere yönelik kurumsal destek oluşturulması'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Birebir öğretim uygulamalarında öğrencilerin kavrama düzeylerinin belirgin biçimde yükseldiği tespit edilmiştir.',
          'Öğrencilerin el becerisi ve yaratıcılık gerektiren çalışmalarda motivasyonlarının arttığı gözlemlenmektedir.',
          'Sınıf öğretmeninin sabırlı ve destekleyici tutumunun öğrenciler üzerinde olumlu etki yarattığı ifade edilmiştir.',
          'Bazı öğrencilerin dönem başına kıyasla belirgin bir ilerleme kaydettiği belirtilmiştir.'
        ],
        commonIssues: [
          'Müfredat kazanımlarının büyük bir kısmının sınıf genelinde yeterince karşılanamadığı değerlendirilmiştir.',
          'Öğrencilerin sınıf kurallarına uyum konusunda zaman zaman güçlük yaşadığı gözlemlenmiştir.',
          'Ev ortamında öğrenme desteğinin son derece sınırlı olduğu ifade edilmiştir.'
        ],
        decisionHints: [
          'Müfredat kazanımlarının öncelik sırasına göre yeniden düzenlenmesi ve temel hedeflere odaklanılması kararlaştırılmıştır.',
          'Sınıf kurallarının öğrencilerle birlikte yeniden belirlenmesi ve tutarlı biçimde uygulanması önerilmiştir.',
          'Okul bünyesinde oluşturulacak etüt merkezlerinde öğrencilere ek çalışma imkânı sağlanması uygun görülmüştür.',
          'Veli eğitim seminerleri düzenlenerek ailelerin öğrenme sürecine katkı sağlamaları teşvik edilmelidir.'
        ],
        speechModifiers: [
          'müfredat kazanımlarının temel düzeyde karşılanmasının öncelikli hedef olarak belirlenmesi',
          'sınıf yönetimi stratejilerinin gözden geçirilerek güncellenmesi',
          'okul bünyesinde ek çalışma ortamlarının oluşturulması',
          'veli eğitim programlarıyla aile desteğinin artırılması'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Oyunlaştırma ve etkileşimli öğrenme tekniklerinin uygulandığı derslerde öğrenci katılımında artış gözlemlenmektedir.',
          'Öğrencilerin akranlarıyla olumlu ilişkiler kurma ve sürdürme becerileri gelişmektedir.',
          'Belirli konularda uzmanlaşmış öğretmenlerin desteğiyle bazı öğrencilerin hızlı ilerleme kaydettiği belirtilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin akademik başarısızlık döngüsüne girmiş olması ve bundan çıkış için yoğun desteğe ihtiyaç duyması söz konusudur.',
          'Sınıfta farklı öğrenme hızlarına sahip öğrencilerin aynı anda yönetilmesinin öğretmen üzerinde yoğun baskı oluşturduğu ifade edilmiştir.',
          'Bazı öğrencilerin okula karşı olumsuz tutum geliştirdiği ve bu durumun sınıf ortamını etkilediği belirtilmiştir.',
          'Kaynak ve materyal yetersizliğinin etkili öğretim uygulamalarını sınırlandırdığı değerlendirilmiştir.'
        ],
        decisionHints: [
          'Başarısızlık döngüsünü kırmak amacıyla seviye belirleme testleri uygulanarak bireyselleştirilmiş öğretim planlarının hazırlanması kararlaştırılmıştır.',
          'Sınıfa ek öğretmen veya stajyer desteği sağlanması konusunda okul idaresiyle görüşülmesi önerilmiştir.',
          'Okula karşı olumsuz tutum geliştiren öğrencilerle rehberlik servisi tarafından düzenli görüşmeler yapılması uygun görülmüştür.'
        ],
        speechModifiers: [
          'seviye belirleme çalışmalarıyla bireysel ihtiyaçların tespit edilmesi',
          'sınıf içi destek kaynaklarının artırılması',
          'okula aidiyet duygusunu güçlendirmeye yönelik çalışmaların yapılması',
          'eğitim materyallerinin çeşitlendirilerek erişilebilirliğinin artırılması'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Öğrencilerin kendilerine yakın ilgi gösterildiğinde öğrenme isteğinde belirgin bir artış gözlemlenmektedir.',
          'Sınıfta yapılan takdir ve ödüllendirme uygulamalarının öğrencilerin çaba gösterme istekliliğini artırdığı ifade edilmiştir.',
          'Bazı öğrencilerin liderlik ve organizasyon becerilerinin akademik başarılarının ötesinde dikkat çekici olduğu belirtilmiştir.',
          'Proje tabanlı öğrenme uygulamalarında öğrencilerin yaratıcı çözümler üretebildiği gözlemlenmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin büyük çoğunluğunun bir önceki sınıf düzeyine ait kazanımları tamamlayamadan ilerlemiş olması endişe verici bulunmuştur.',
          'Sınıf genelinde dikkat eksikliği ve hiperaktivite belirtileri gösteren öğrenci sayısının fazla olduğu ifade edilmiştir.',
          'Akran zorbalığı ve dışlanma vakalarının öğrenme ortamını olumsuz etkilediği belirtilmiştir.'
        ],
        decisionHints: [
          'Geçmiş yıllara ait kazanım eksikliklerini tespit eden tanılama çalışmalarının yapılması kararlaştırılmıştır.',
          'Dikkat eksikliği belirtileri gösteren öğrencilerin Rehberlik Araştırma Merkezi\'ne yönlendirilmesi önerilmiştir.',
          'Akran zorbalığının önlenmesine yönelik sınıf içi farkındalık çalışmalarının yürütülmesi uygun görülmüştür.',
          'Proje tabanlı öğrenme etkinliklerinin artırılarak öğrencilerin farklı becerilerini sergilemelerine olanak tanınması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'geçmiş kazanım eksikliklerinin tanılanarak telafi edilmesi',
          'özel eğitim ihtiyacı olabilecek öğrencilerin uzman değerlendirmesine yönlendirilmesi',
          'güvenli ve kapsayıcı bir öğrenme ortamının oluşturulması',
          'proje tabanlı öğrenme yaklaşımlarının yaygınlaştırılması'
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 5. low – Başarı düzeyi düşük sınıf
  // ─────────────────────────────────────────────
  {
    id: 'low',
    label: 'Düşük Başarı',
    description: 'Başarı düzeyi düşük sınıf',
    academicTone: 'Akademik başarı düzeyinin düşük olduğu bu sınıfta acil müdahale gerektiren temel öğrenme eksiklikleri bulunmakta olup kapsamlı bir destek planının uygulanması zorunluluk arz etmektedir.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Bireysel ilgi ve yakın takip sağlandığında öğrencilerin öğrenme kapasitelerinin ortaya çıktığı gözlemlenmektedir.',
          'Sınıf içinde bazı öğrencilerin akranlarına karşı yardımsever ve destekleyici bir tutum sergilediği belirtilmiştir.',
          'Sportif ve kültürel etkinliklere katılımda öğrencilerin istekli olduğu görülmektedir.'
        ],
        commonIssues: [
          'Sınıf genelinde temel okuryazarlık ve sayısal becerilerde ciddi yetersizlikler bulunmaktadır.',
          'Devamsızlık oranı okul ortalamasının çok üzerinde seyretmekte olup bu durum öğrenme sürecini büyük ölçüde sekteye uğratmaktadır.',
          'Velilerin önemli bir kısmının öğrenci takibini yeterince yapmadığı ve okulla iletişiminin zayıf olduğu tespit edilmiştir.',
          'Sınıf içi disiplin sorunlarının öğrenme ortamını ciddi biçimde olumsuz etkilediği ifade edilmiştir.'
        ],
        decisionHints: [
          'Temel okuryazarlık ve hesaplama becerilerini kazandırmaya yönelik yoğun bir müdahale programının başlatılması kararlaştırılmıştır.',
          'Devamsızlık yapan öğrencilerin ailelerine ev ziyaretleri gerçekleştirilmesi ve gerekli durumlarda ilgili kurumlarla iletişime geçilmesi önerilmiştir.',
          'Sınıf içi disiplin sorunlarının çözümüne yönelik tutarlı bir davranış yönetim planının uygulanması uygun görülmüştür.',
          'Tüm öğrencilere yönelik haftalık bireysel görüşmelerin yapılarak gelişim durumlarının izlenmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'acil müdahale gerektiren temel beceri eksikliklerinin giderilmesi',
          'devamsızlığın önlenmesi amacıyla ailelerle yoğun iletişim kurulması',
          'sınıf ortamında disiplin ve düzenin sağlanması',
          'her öğrencinin bireysel olarak izlenmesi ve desteklenmesi'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Öğretmenin sabırlı ve anlayışlı tutumunun öğrencilerin okula devam motivasyonunu olumlu etkilediği belirtilmiştir.',
          'Oyun ve eğlence temelli öğretim etkinliklerinde öğrencilerin aktif katılım gösterdiği gözlemlenmektedir.',
          'Bazı öğrencilerin müzik, resim ve el sanatları gibi alanlarda keşfedilmeyi bekleyen yeteneklere sahip olduğu tespit edilmiştir.',
          'Sınıfta uygulanan ödül ve motivasyon sisteminin öğrenci davranışlarında olumlu değişimler sağladığı ifade edilmiştir.'
        ],
        commonIssues: [
          'Öğrencilerin büyük çoğunluğunun birden fazla sınıf düzeyinde akademik gerilik yaşadığı değerlendirilmiştir.',
          'Okul dışı olumsuz çevre koşullarının öğrencilerin gelişimini ciddi biçimde engellediği ifade edilmiştir.',
          'Sınıfta yaşanan davranış sorunlarının öğretmenin etkili öğretim yapmasını güçleştirdiği belirtilmiştir.'
        ],
        decisionHints: [
          'Öğrencilerin bulundukları seviyeden başlayarak kademeli olarak ilerlemelerini sağlayacak bireysel programların hazırlanması kararlaştırılmıştır.',
          'Okul çevresindeki olumsuz etkilerin azaltılmasına yönelik güvenli okul ortamı projelerinin geliştirilmesi önerilmiştir.',
          'Davranış sorunlarına yönelik pozitif disiplin yaklaşımlarının benimsenmesi ve öğretmenlere bu konuda hizmet içi eğitim verilmesi uygun görülmüştür.',
          'İlgili kamu kurumları ve sivil toplum kuruluşlarıyla iş birliği yapılarak öğrencilere bütüncül destek sağlanması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'her öğrencinin mevcut düzeyinden başlayan bireysel ilerleme planlarının hazırlanması',
          'güvenli ve destekleyici bir okul ortamının oluşturulması',
          'pozitif disiplin yaklaşımlarının benimsenmesi',
          'kurum dışı destek mekanizmalarının devreye sokulması'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Küçük gruplarla çalışıldığında öğrencilerin derse katılım düzeyinin belirgin biçimde arttığı gözlemlenmektedir.',
          'Öğrencilerin duygusal zekâ ve empati becerilerinin belirli alanlarda gelişmiş olduğu tespit edilmiştir.',
          'Teknoloji destekli öğretim araçlarına öğrencilerin büyük ilgi gösterdiği ve bu araçlarla öğrenme motivasyonlarının arttığı belirtilmiştir.'
        ],
        commonIssues: [
          'Sınıf genelinde öğrenme güçlüğü tanısı almış veya tanı sürecinde olan öğrenci sayısının yüksek olduğu ifade edilmiştir.',
          'Öğrencilerin pek çoğunun akademik başarıya ilişkin herhangi bir beklenti ya da hedef geliştirmemiş olması endişe verici bulunmuştur.',
          'Temel hijyen, beslenme ve uyku düzeni gibi fizyolojik ihtiyaçların karşılanamamasının öğrenme kapasitesini ciddi biçimde sınırladığı değerlendirilmiştir.',
          'Sınıf mevcudunun heterojen yapısı nedeniyle farklı ihtiyaçlara aynı anda cevap verilmesinin güç olduğu belirtilmiştir.'
        ],
        decisionHints: [
          'Öğrenme güçlüğü belirtileri gösteren öğrencilerin ivedilikle RAM\'a yönlendirilmesi kararlaştırılmıştır.',
          'Öğrencilerde hedef bilinci oluşturmaya yönelik kısa vadeli ve somut hedef belirleme çalışmalarının yapılması önerilmiştir.',
          'Temel ihtiyaçları karşılanamayan öğrencilere yönelik okul aile birliği ve sosyal yardım kuruluşlarıyla koordinasyon sağlanması uygun görülmüştür.'
        ],
        speechModifiers: [
          'öğrenme güçlüğü olan öğrencilerin uzman desteğine yönlendirilmesi',
          'somut ve ulaşılabilir hedeflerle öğrencilerde başarı bilincinin oluşturulması',
          'temel yaşam ihtiyaçlarının karşılanmasına yönelik sosyal destek ağlarının kurulması',
          'küçük grup çalışmalarıyla bireysel öğrenmenin desteklenmesi'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Sınıfta uygulanan mentorluk programının öğrencilerin okula aidiyet duygusunu güçlendirdiği gözlemlenmektedir.',
          'Öğrencilerin pratik yaşam becerileri ve günlük problem çözme yetileri kayda değer bir düzeydedir.',
          'Destekleyici bir ortam sağlandığında öğrencilerin kendilerini ifade etme becerilerinin geliştiği belirtilmiştir.',
          'Doğa ve çevre temelli etkinliklerde öğrencilerin merak ve keşfetme güdülerinin canlı olduğu gözlemlenmektedir.'
        ],
        commonIssues: [
          'Sık öğretmen değişikliklerinin öğrenci-öğretmen güven ilişkisini zedelediği ve öğrenme sürecini olumsuz etkilediği ifade edilmiştir.',
          'Müfredat hedeflerinin sınıfın mevcut düzeyiyle örtüşmemesi nedeniyle uyarlanmış programlara ihtiyaç duyulduğu belirtilmiştir.',
          'Öğrencilerin öz bakım becerilerinde eksiklikler bulunması, akademik gelişimin önünde bir engel teşkil etmektedir.'
        ],
        decisionHints: [
          'Sınıfta öğretmen sürekliliğinin sağlanması konusunda okul idaresiyle görüşülmesi kararlaştırılmıştır.',
          'Müfredatın sınıfın düzeyine uyarlanarak temel kazanımlara odaklanan bir öğretim planının hazırlanması önerilmiştir.',
          'Öz bakım ve yaşam becerileri eğitiminin müfredata entegre edilmesi uygun görülmüştür.',
          'Doğa temelli ve deneyimsel öğrenme etkinliklerinin artırılarak öğrenci motivasyonunun desteklenmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'öğretmen devamlılığının sağlanarak güven ortamının korunması',
          'müfredatın öğrencilerin hazır bulunuşluk düzeyine göre uyarlanması',
          'temel yaşam ve öz bakım becerilerinin kazandırılması',
          'deneyimsel öğrenme etkinlikleriyle öğrenci katılımının artırılması'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Sınıf dışı öğrenme ortamlarında (bahçe, atölye vb.) gerçekleştirilen etkinliklerde öğrencilerin daha yüksek katılım gösterdiği tespit edilmiştir.',
          'Öğrencilerin birbirleriyle dayanışma içinde olduğu ve zorlu koşullara rağmen okula devam etme çabası gösterdiği gözlemlenmektedir.',
          'Bireysel başarı hikâyelerinin sınıf genelinde motivasyon artırıcı etki yarattığı belirtilmiştir.'
        ],
        commonIssues: [
          'Sınıfın fiziksel koşullarının (ısınma, aydınlatma, materyal) yeterli düzeyde olmadığı ve bunun öğrenme ortamını olumsuz etkilediği değerlendirilmiştir.',
          'Öğrencilerin büyük çoğunluğunun gelecekle ilgili umutsuzluk ve karamsarlık duyguları taşıdığı ifade edilmiştir.',
          'Çevresel risk faktörlerinin (madde bağımlılığı, şiddet, ihmal) öğrencilerin gelişimini tehdit ettiği belirtilmiştir.',
          'Mevcut değerlendirme yöntemlerinin öğrencilerin gerçek potansiyelini yansıtmadığı değerlendirilmiştir.'
        ],
        decisionHints: [
          'Sınıfın fiziksel koşullarının iyileştirilmesi için okul idaresine raporun sunulması kararlaştırılmıştır.',
          'Risk altındaki öğrencilerin ilgili koruma kurumlarına bildirilmesi ve gerekli tedbirlerin alınması önerilmiştir.',
          'Alternatif değerlendirme yöntemlerinin (portfolyo, performans değerlendirme, sözlü değerlendirme) uygulanması uygun görülmüştür.',
          'Umut ve gelecek bilinci oluşturmaya yönelik rol model buluşmalarının ve kariyer tanıtım etkinliklerinin düzenlenmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'öğrenme ortamının fiziksel koşullarının iyileştirilmesi',
          'risk altındaki öğrencilerin koruma altına alınması için gerekli bildirimlerin yapılması',
          'alternatif ölçme-değerlendirme yöntemlerinin uygulamaya konulması',
          'öğrencilerde umut ve gelecek bilincinin oluşturulması'
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 6. mixed – Karma başarı düzeyine sahip sınıf
  // ─────────────────────────────────────────────
  {
    id: 'mixed',
    label: 'Karma Düzey',
    description: 'Karma başarı düzeyine sahip sınıf',
    academicTone: 'Akademik başarı düzeyleri arasında belirgin farklılıkların gözlemlendiği bu sınıfta farklılaştırılmış öğretim stratejilerinin uygulanması büyük önem taşımaktadır.',
    versions: [
      {
        versionId: 1,
        positiveEmphasis: [
          'Sınıfta farklı başarı düzeylerinden öğrencilerin bir arada bulunması zengin bir öğrenme ortamı oluşturmaktadır.',
          'Başarılı öğrencilerin akranlarına destek olma konusunda istekli olduğu gözlemlenmektedir.',
          'Farklı yeteneklere sahip öğrencilerin bir arada çalışması sosyal becerilerin gelişimine katkı sağlamaktadır.',
          'Öğretmenlerin farklılaştırılmış öğretim yöntemlerini uygulama konusunda farkındalık geliştirdiği belirtilmiştir.'
        ],
        commonIssues: [
          'Sınıf içinde başarı düzeyleri arasındaki uçurumun öğretim sürecinin planlanmasını zorlaştırdığı ifade edilmiştir.',
          'Düşük başarılı öğrencilerin yüksek başarılı öğrencilerle kıyaslandığında motivasyon kaybı yaşadığı gözlemlenmiştir.',
          'Tüm öğrencilerin ihtiyaçlarını aynı anda karşılayacak ders planı hazırlamanın güçlükleri dile getirilmiştir.',
          'Grup çalışmalarında başarı düzeyi yüksek öğrencilerin tüm yükü üstlenme eğiliminde olduğu belirtilmiştir.'
        ],
        decisionHints: [
          'Farklılaştırılmış öğretim stratejilerinin sistematik biçimde uygulanması kararlaştırılmıştır.',
          'Seviye gruplarına ayrılarak yürütülen çalışmaların belirli ders saatlerinde uygulanması önerilmiştir.',
          'Akran öğretimi programının yapılandırılarak başarılı öğrencilerin destek rolü üstlenmesi uygun görülmüştür.',
          'Her seviye grubuna uygun öğretim materyallerinin hazırlanması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'farklılaştırılmış öğretim yaklaşımlarının sistematik biçimde uygulanması',
          'seviye gruplarına yönelik ayrı çalışma planlarının hazırlanması',
          'akran öğretimi ve mentorluk programlarının yapılandırılması',
          'her öğrencinin kendi düzeyinde ilerleme kaydetmesinin sağlanması'
        ]
      },
      {
        versionId: 2,
        positiveEmphasis: [
          'Heterojen sınıf yapısının öğrencilere farklı bakış açıları kazandırdığı gözlemlenmiştir.',
          'Proje tabanlı çalışmalarda farklı becerilere sahip öğrencilerin birbirini tamamladığı ve verimli sonuçlar elde edildiği belirtilmiştir.',
          'Sınıfta hoşgörü ve farklılıklara saygı kültürünün olumlu bir şekilde geliştiği ifade edilmiştir.'
        ],
        commonIssues: [
          'Ders hızının ayarlanmasında yaşanan güçlüklerin hem ileri hem de geride kalan öğrencileri olumsuz etkilediği değerlendirilmiştir.',
          'Standart ölçme-değerlendirme araçlarının sınıfın heterojen yapısına uygun olmadığı belirtilmiştir.',
          'Yüksek başarılı öğrencilerin sınıfın genel temposundan sıkılarak motivasyon kaybı yaşadığı gözlemlenmiştir.',
          'Düşük başarılı öğrencilerin sınıf içi tartışmalarda geri planda kalma eğiliminde olduğu ifade edilmiştir.'
        ],
        decisionHints: [
          'Esnek tempolu öğretim planlarının oluşturularak her öğrencinin kendi hızında ilerlemesinin sağlanması kararlaştırılmıştır.',
          'Çoklu değerlendirme yöntemlerinin uygulanarak farklı düzeylerdeki öğrencilerin adil biçimde değerlendirilmesi önerilmiştir.',
          'Yüksek başarılı öğrencilere yönelik zenginleştirme etkinliklerinin planlanması uygun görülmüştür.',
          'Düşük başarılı öğrencilerin sınıf içi katılımını artırmaya yönelik stratejilerin geliştirilmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'esnek tempolu öğretim planlarının uygulanması',
          'çoklu değerlendirme yöntemlerinin benimsenmesi',
          'ileri düzey öğrencilere zenginleştirme fırsatlarının sunulması',
          'tüm öğrencilerin sınıf içi katılımının dengeli biçimde sağlanması'
        ]
      },
      {
        versionId: 3,
        positiveEmphasis: [
          'Farklı başarı düzeylerindeki öğrencilerin ortak projelerde birlikte çalışarak takım ruhunu geliştirdiği gözlemlenmiştir.',
          'Sınıf rehber öğretmeninin öğrencilerin bireysel ihtiyaçlarını yakından takip ettiği ve etkili yönlendirmeler yaptığı belirtilmiştir.',
          'Bazı öğrencilerin belirli ders alanlarında beklenmedik başarılar elde ederek potansiyellerini ortaya koyduğu ifade edilmiştir.',
          'İstasyon tekniği ve kademeli etkinliklerle yürütülen derslerde tüm öğrencilerin aktif katılım gösterdiği gözlemlenmiştir.'
        ],
        commonIssues: [
          'Sınıfta sosyal gruplaşmaların akademik başarı düzeylerine göre oluşması ve bunun olumsuz bir atmosfer yaratması endişe verici bulunmuştur.',
          'Öğretmenlerin farklılaştırılmış öğretim için yeterli zaman ve kaynağa sahip olmadığı ifade edilmiştir.',
          'Orta düzey öğrencilerin hem üst hem alt gruplara yönelik çalışmalarda göz ardı edilme riski taşıdığı belirtilmiştir.'
        ],
        decisionHints: [
          'Sosyal gruplaşmaları kırmaya yönelik karma grup çalışmalarının düzenli olarak yapılması kararlaştırılmıştır.',
          'Öğretmenlere farklılaştırılmış öğretim konusunda hizmet içi eğitim ve materyal desteği sağlanması önerilmiştir.',
          'Orta düzey öğrencilerin gelişiminin özel olarak izlenmesi ve desteklenmesi uygun görülmüştür.',
          'İstasyon tekniği ve kademeli etkinliklerin tüm derslerde yaygınlaştırılması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'karma grup çalışmalarıyla sosyal bütünleşmenin sağlanması',
          'öğretmenlerin farklılaştırılmış öğretim yetkinliklerinin geliştirilmesi',
          'orta düzey öğrencilerin ihmal edilmemesi için özel takip mekanizmalarının kurulması',
          'kademeli ve istasyon temelli etkinliklerin öğretim sürecine entegre edilmesi'
        ]
      },
      {
        versionId: 4,
        positiveEmphasis: [
          'Sınıfın çeşitli başarı düzeylerinden oluşması gerçek yaşam koşullarını yansıtmakta ve öğrencileri toplumsal hayata hazırlamaktadır.',
          'Farklı düzeylerdeki öğrencilerin birbirinden öğrenme fırsatı bulması bilgi paylaşımını güçlendirmektedir.',
          'Öğretmenlerin esneklik ve yaratıcılık gerektiren bu ortamda mesleki gelişimlerini hızlandırdığı belirtilmiştir.'
        ],
        commonIssues: [
          'Başarılı öğrencilerin sürekli olarak düşük başarılı arkadaşlarına yardım etme beklentisiyle karşılaşmasının motivasyonlarını düşürdüğü ifade edilmiştir.',
          'Sınıf yönetiminin heterojen yapı nedeniyle öğretmenler için tükenmişlik riski oluşturduğu değerlendirilmiştir.',
          'Velilerin sınıfın karma yapısından memnuniyetsizlik duyduğuna ilişkin geri bildirimler alındığı belirtilmiştir.',
          'Ders kitaplarının tek bir seviyeye göre hazırlanmış olmasının farklılaştırılmış öğretimi zorlaştırdığı ifade edilmiştir.'
        ],
        decisionHints: [
          'Başarılı öğrencilerin sürekli yardımcı rolüne sıkışmaması için dengeli görev dağılımının yapılması kararlaştırılmıştır.',
          'Öğretmen tükenmişliğinin önlenmesi amacıyla destek ve danışmanlık mekanizmalarının oluşturulması önerilmiştir.',
          'Velilere sınıfın heterojen yapısının avantajlarının anlatılacağı bilgilendirme toplantılarının düzenlenmesi uygun görülmüştür.',
          'Farklı seviyelere uygun ek öğretim materyallerinin oluşturulması ve dijital kaynaklardan yararlanılması kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'öğrenci rollerinin dengeli biçimde dağıtılması',
          'öğretmen destek ve danışmanlık mekanizmalarının güçlendirilmesi',
          'velilerin heterojen sınıf yapısı hakkında bilinçlendirilmesi',
          'farklı seviyelere uygun dijital ve basılı materyallerin hazırlanması'
        ]
      },
      {
        versionId: 5,
        positiveEmphasis: [
          'Sınıfta uygulanan kapsayıcı eğitim yaklaşımlarının tüm öğrencilerin gelişimine katkı sağladığı gözlemlenmektedir.',
          'Farklı akademik düzeylerdeki öğrencilerin ortak hedefler doğrultusunda çalışabildiği ve bu sürecin sınıf bağlılığını güçlendirdiği belirtilmiştir.',
          'Teknoloji destekli bireyselleştirilmiş öğrenme platformlarının sınıfta etkili biçimde kullanıldığı ifade edilmiştir.',
          'Öğrencilerin farklı alanlardaki başarılarının takdir edilerek çok yönlü değerlendirildiği bir ortam oluşturulmuştur.'
        ],
        commonIssues: [
          'Bireyselleştirilmiş öğretimin gerektirdiği planlama ve hazırlık süresinin mevcut çalışma koşullarında yetersiz kaldığı ifade edilmiştir.',
          'Başarı düzeyi düşük öğrencilerin kendilerini sınıfın geri kalanından dışlanmış hissetme riski bulunmaktadır.',
          'Ölçme-değerlendirme süreçlerinde adaleti sağlamanın heterojen yapıda özel dikkat gerektirdiği belirtilmiştir.'
        ],
        decisionHints: [
          'Bireyselleştirilmiş öğretim planlaması için öğretmenlere ek hazırlık süresi tanınması kararlaştırılmıştır.',
          'Tüm öğrencilerin kendini değerli hissetmesini sağlayacak kapsayıcı sınıf kültürü çalışmalarının yürütülmesi önerilmiştir.',
          'Adil ve kapsayıcı değerlendirme rubriklerinin geliştirilmesi uygun görülmüştür.',
          'Bireyselleştirilmiş öğrenme platformlarının daha etkin kullanılması için teknik altyapının güçlendirilmesi kararlaştırılmıştır.'
        ],
        speechModifiers: [
          'kapsayıcı sınıf kültürünün oluşturulması ve sürdürülmesi',
          'bireyselleştirilmiş öğretim için yeterli planlama süresinin sağlanması',
          'adil ve çok boyutlu değerlendirme uygulamalarının geliştirilmesi',
          'teknoloji destekli bireysel öğrenme platformlarının etkin kullanılması'
        ]
      }
    ]
  }
];

export const getAchievementLevel = (id: AchievementLevelId): AchievementLevel => {
  return achievementLevels.find(a => a.id === id) || achievementLevels[2];
};
