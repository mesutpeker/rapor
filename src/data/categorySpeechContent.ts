// Gündem maddesinin KONUSUNA özgü konuşma ve karar içeriği.
//
// Branş üslubu (branchSpeechStyles) öğretmenin kimliğini taşır; bu dosya ise
// konuşmanın o gündem maddesinin konusuna gerçekten değinmesini sağlar.
//
// - intros:        Konuya özgü giriş cümlesi (akademik olmayan maddelerde branş
//                  giriş cümlesinin yerine kullanılır). "<intro> <fiil>." kalıbı.
// - observations:  Konuya özgü, tam cümle gözlemler (doğrudan eklenir).
// - suggestions:   Konuya özgü öneri ad öbekleri. "Ayrıca <suggestion> gerektiğini
//                  vurguladı." kalıbına oturur.
// - decisions:     Konuya özgü, "...karar verildi." biçiminde tam karar cümleleri.

export interface CategoryContent {
  intros: string[];
  observations: string[];
  suggestions: string[];
  decisions: string[];
}

export const categorySpeechContent: Record<string, CategoryContent> = {
  // ─────────────────────────────────────────────
  'akademik-basari': {
    intros: [
      'Sınıfın genel akademik başarı durumu değerlendirildiğinde',
      'Öğrencilerin ders başarıları ve not ortalamaları açısından',
      'Akademik gelişim ve öğrenme düzeyleri bakımından',
      'Sınıfın geneline ait başarı tablosu ele alındığında'
    ],
    observations: [
      'Sınıfın genel başarı düzeyinin dönem içinde belirli bir seyir izlediği gözlemlendi.',
      'Öğrenciler arasında ders başarısı bakımından belirgin farklılıklar bulunduğu ifade edildi.',
      'Bazı öğrencilerin güçlü oldukları derslerde öne çıktığı, bazı derslerde ise desteğe ihtiyaç duyduğu belirtildi.',
      'Akademik başarının korunması ve artırılmasının ortak bir çaba gerektirdiği vurgulandı.',
      'Öğrencilerin öğrenme kazanımlarındaki eksikliklerin erken dönemde tespit edilmesinin önemi dile getirildi.'
    ],
    suggestions: [
      'akademik açıdan desteğe ihtiyaç duyan öğrenciler için bireysel takip yapılması',
      'başarılı öğrencilerin ileri düzey çalışmalarla teşvik edilmesi',
      'eksik kazanımların belirlenerek tamamlayıcı çalışmalar yürütülmesi',
      'öğrencilerin güçlü ve gelişime açık yönlerine göre çalışma planları oluşturulması',
      'ders başarılarının düzenli aralıklarla izlenmesi'
    ],
    decisions: [
      'Akademik yönden desteğe ihtiyaç duyan öğrenciler için bireysel takip ve tamamlayıcı çalışmalar yapılmasına karar verildi.',
      'Başarılı öğrencilerin ileri düzey kaynak ve proje çalışmalarıyla desteklenmesine karar verildi.',
      'Eksik kazanımların ilgili ders öğretmenlerince belirlenerek giderilmesine karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'devamsizlik': {
    intros: [
      'Öğrencilerin derse devam durumları değerlendirildiğinde',
      'Sınıftaki devamsızlık durumları ele alındığında',
      'Devamsızlığın öğrenme sürecine etkisi bakımından',
      'Öğrencilerin okula düzenli devamları açısından'
    ],
    observations: [
      'Sınıf genelinde devamsızlık oranının yakından takip edilmesi gereken bir düzeyde olduğu belirtildi.',
      'Bazı öğrencilerin tekrar eden devamsızlıklarının ders takibini ve başarısını olumsuz etkilediği gözlemlendi.',
      'Devamsızlık yapan öğrencilerin konularda geri kaldığı ve telafi çalışmasına ihtiyaç duyduğu ifade edildi.',
      'Özürsüz devamsızlıkların önlenmesinde veli iş birliğinin belirleyici olduğu vurgulandı.',
      'Devamsızlığın çoğunlukla belirli öğrencilerde yoğunlaştığı ve bireysel olarak ele alınması gerektiği belirtildi.'
    ],
    suggestions: [
      'devamsızlık yapan öğrencilerin velileriyle erken dönemde iletişime geçilmesi',
      'devam durumunun düzenli olarak izlenip kayıt altına alınması',
      'devamsızlık nedenlerinin rehberlik servisiyle birlikte araştırılması',
      'sık devamsızlık yapan öğrenciler için telafi ve destek çalışmaları planlanması',
      'okula devamın önemi konusunda öğrencilerin bilinçlendirilmesi'
    ],
    decisions: [
      'Devamsızlık yapan öğrencilerin velileriyle düzenli iletişime geçilmesine karar verildi.',
      'Devam durumlarının düzenli olarak izlenmesine ve sık devamsızlık yapan öğrencilerin bireysel takibe alınmasına karar verildi.',
      'Devamsızlık nedeniyle konu eksikliği oluşan öğrenciler için telafi çalışmaları yapılmasına karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'davranis-disiplin': {
    intros: [
      'Öğrencilerin sınıf içi davranış ve tutumları değerlendirildiğinde',
      'Sınıfın disiplin ve kurallara uyum durumu açısından',
      'Öğrenciler arasındaki iletişim ve davranış kültürü bakımından',
      'Sınıf düzeni ve öğrenme ortamının korunması açısından'
    ],
    observations: [
      'Sınıf genelinde davranış ve disiplin açısından genel tablonun olumlu olduğu, ancak az sayıda öğrencide dikkat gerektiren durumlar bulunduğu belirtildi.',
      'Sınıf kurallarının tutarlı biçimde uygulanmasının öğrenme ortamına olumlu yansıdığı gözlemlendi.',
      'Öğrenciler arasındaki saygı ve iletişim kültürünün geliştirilmeye açık olduğu ifade edildi.',
      'Bazı öğrencilerin ders akışını bölen tutumlarının sınıf düzenini etkilediği vurgulandı.',
      'Olumlu davranışların pekiştirilmesinin disiplin sorunlarını azaltmada etkili olduğu belirtildi.'
    ],
    suggestions: [
      'sınıf kurallarının öğrencilerle birlikte belirlenip tutarlı biçimde uygulanması',
      'olumlu davranışların takdir edilerek pekiştirilmesi',
      'davranış sorunu gözlemlenen öğrencilerle bireysel görüşmeler yapılması',
      'rehberlik servisiyle iş birliği içinde davranış takibi yürütülmesi',
      'sınıf içi saygı ve iletişim kültürünü güçlendirici çalışmalar planlanması'
    ],
    decisions: [
      'Sınıf kurallarının öğrencilerle birlikte gözden geçirilerek tutarlı biçimde uygulanmasına karar verildi.',
      'Davranış açısından desteğe ihtiyaç duyan öğrencilerle rehberlik servisi iş birliğinde bireysel görüşmeler yapılmasına karar verildi.',
      'Olumlu davranışların pekiştirilmesine yönelik sınıf içi uygulamaların sürdürülmesine karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'motivasyon-katilim': {
    intros: [
      'Öğrencilerin derse katılım ve motivasyon düzeyleri değerlendirildiğinde',
      'Sınıf içi ilgi ve istek durumu açısından',
      'Öğrencilerin öğrenmeye yönelik tutumları bakımından',
      'Derse aktif katılımın sağlanması açısından'
    ],
    observations: [
      'Sınıfta derse katılımın genel olarak yeterli olduğu, ancak bazı öğrencilerin daha pasif kaldığı gözlemlendi.',
      'Öğrencilerin motivasyon düzeylerinde dönemsel dalgalanmalar yaşandığı ifade edildi.',
      'Etkileşimli ve uygulamalı etkinliklerde öğrenci katılımının belirgin biçimde arttığı belirtildi.',
      'Bazı öğrencilerin derse karşı ilgilerinin düşük olduğu ve bireysel teşvike ihtiyaç duyduğu vurgulandı.',
      'Öğrencilerin ilgi alanlarıyla ilişkilendirilen konularda daha istekli olduğu gözlemlendi.'
    ],
    suggestions: [
      'derse katılımı artırmak amacıyla farklı öğretim yöntem ve tekniklerinin kullanılması',
      'öğrencilerin ilgi alanlarına yönelik etkinliklerle motivasyonun desteklenmesi',
      'katılımı düşük öğrencilerin söz alma fırsatlarının artırılması',
      'olumlu geri bildirimlerle öğrencilerin öz güveninin pekiştirilmesi',
      'küçük hedefler belirlenerek öğrencilerde başarı duygusunun yaşatılması'
    ],
    decisions: [
      'Sınıf içi derse katılımı artırmak amacıyla farklı öğretim yöntemleri kullanılmasına karar verildi.',
      'Öğrenci motivasyonunun rehberlik servisiyle iş birliği içinde takip edilmesine karar verildi.',
      'Katılımı düşük öğrencilerin derse aktif katılımını sağlayacak etkinlikler planlanmasına karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'sosyal-duygusal': {
    intros: [
      'Öğrencilerin sosyal ve duygusal gelişimleri değerlendirildiğinde',
      'Sınıfın rehberlik ihtiyaçları açısından',
      'Öğrenciler arasındaki akran ilişkileri bakımından',
      'Öğrencilerin duygusal iyi oluşları açısından'
    ],
    observations: [
      'Sınıf genelinde akran ilişkilerinin sağlıklı bir düzeyde seyrettiği, ancak kimi öğrencilerin sosyal uyumda desteğe ihtiyaç duyduğu gözlemlendi.',
      'Bazı öğrencilerin sınav ve gelecek kaygısı yaşadığı ve rehberlik desteğine ihtiyaç duyduğu ifade edildi.',
      'Öğrencilerin duygularını ifade etme ve iletişim kurma becerilerinin geliştirilmeye açık olduğu belirtildi.',
      'Sınıf içinde dayanışma ve yardımlaşma kültürünün desteklenmesinin önemi vurgulandı.',
      'Bireysel ilgi gösterilen öğrencilerin uyum ve katılımında olumlu gelişmeler gözlemlendi.'
    ],
    suggestions: [
      'rehberlik servisiyle iş birliği içinde bireysel görüşmeler yapılması',
      'sosyal becerileri ve akran ilişkilerini güçlendirici etkinlikler düzenlenmesi',
      'sınav ve gelecek kaygısı yaşayan öğrencilere yönelik destek çalışmaları yürütülmesi',
      'öğrencilerin duygularını ifade edebilecekleri güvenli bir sınıf ortamı oluşturulması',
      'sosyal-duygusal gelişimi destekleyen grup çalışmaları planlanması'
    ],
    decisions: [
      'Rehberlik servisiyle iş birliği içinde öğrencilerin sosyal-duygusal gelişimlerinin takip edilmesine karar verildi.',
      'Sosyal becerilerin geliştirilmesine yönelik sınıf içi etkinlikler planlanmasına karar verildi.',
      'Kaygı düzeyi yüksek öğrencilerin rehberlik servisiyle düzenli görüşmelerinin sağlanmasına karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'olcme-degerlendirme': {
    intros: [
      'Sınıfta yürütülen ölçme ve değerlendirme çalışmaları ele alındığında',
      'Öğrencilerin sınav ve değerlendirme sonuçları açısından',
      'Ölçme araçlarının öğrenmeyi yansıtması bakımından',
      'Değerlendirme sonuçlarının öğrenci gelişimine katkısı açısından'
    ],
    observations: [
      'Yapılan sınav ve değerlendirmelerin öğrencilerin öğrenme düzeyini genel olarak yansıttığı belirtildi.',
      'Deneme ve yazılı sonuçlarının yalnızca not olarak değil, konu eksikliklerini görme aracı olarak da değerlendirilmesi gerektiği ifade edildi.',
      'Bazı öğrencilerin sınav kaygısı nedeniyle gerçek performanslarını yansıtamadığı gözlemlendi.',
      'Süreç odaklı ve çeşitlendirilmiş değerlendirme yöntemlerinin öğrenci gelişimini daha iyi gösterdiği vurgulandı.',
      'Değerlendirme sonuçlarına dayalı bireysel geri bildirimin öğrenmeyi olumlu etkilediği belirtildi.'
    ],
    suggestions: [
      'deneme ve sınav sonuçlarının düzenli olarak analiz edilmesi',
      'öğrencilere değerlendirme sonrası bireysel geri bildirim verilmesi',
      'konu eksikliklerini tespit eden kısa kazanım kontrollerinin yapılması',
      'sınav kaygısını azaltmaya yönelik çalışmalar yürütülmesi',
      'süreç odaklı ve çeşitlendirilmiş değerlendirme yöntemlerinin kullanılması'
    ],
    decisions: [
      'Deneme ve sınav sonuçlarının düzenli analiz edilerek öğrencilerle bireysel geri bildirim görüşmeleri yapılmasına karar verildi.',
      'Konu eksikliklerini tespit etmeye yönelik kısa kazanım kontrollerinin uygulanmasına karar verildi.',
      'Sınav kaygısını azaltmaya yönelik rehberlik destekli çalışmalar yürütülmesine karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'veli-iletisim': {
    intros: [
      'Veli iletişimi ve okul-aile iş birliği değerlendirildiğinde',
      'Ailelerin öğrenme sürecine katılımı açısından',
      'Okul ile veli arasındaki iletişim bakımından',
      'Öğrenci gelişiminde aile desteğinin rolü açısından'
    ],
    observations: [
      'Velilerin önemli bir kısmının okul süreçlerine ilgili olduğu, ancak bir bölümünün iletişimde daha az aktif kaldığı gözlemlendi.',
      'Öğrencinin gelişiminin takibinde düzenli veli iş birliğinin belirleyici olduğu vurgulandı.',
      'Bireysel veli görüşmelerinin öğrenci sorunlarının erken çözümünde etkili olduğu ifade edildi.',
      'Bazı velilerle iletişim kurmakta güçlük yaşandığı ve farklı iletişim kanallarına ihtiyaç duyulduğu belirtildi.',
      'Düzenli bilgilendirmenin veli-okul güven ilişkisini güçlendirdiği gözlemlendi.'
    ],
    suggestions: [
      'ihtiyaç duyulan öğrencilerin velileriyle bireysel görüşmeler yapılması',
      'veli bilgilendirme toplantılarının düzenli aralıklarla sürdürülmesi',
      'iletişimde güçlük yaşanan velilere farklı kanallarla ulaşılması',
      'velilerin öğrenme sürecine katılımını artırıcı çalışmalar yapılması',
      'olumlu gelişmelerin de velilerle düzenli olarak paylaşılması'
    ],
    decisions: [
      'Veli iletişiminin güçlendirilmesine ve ihtiyaç duyulan öğrencilerin velileriyle bireysel görüşmeler yapılmasına karar verildi.',
      'Velilerle düzenli bilgilendirme toplantıları yapılarak okul-aile iş birliğinin sürdürülmesine karar verildi.',
      'İletişimde güçlük yaşanan velilere ulaşmak için farklı iletişim kanallarının kullanılmasına karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  'destekleme': {
    intros: [
      'Destekleme, yetiştirme ve bireysel takip çalışmaları ele alındığında',
      'Öğrencilere yönelik bireysel destek çalışmaları açısından',
      'Eksik kazanımların giderilmesi bakımından',
      'Öğrencilerin bireysel gelişim takibi açısından'
    ],
    observations: [
      'Destekleme ve yetiştirme çalışmalarının öğrencilerin eksiklerini gidermede yararlı olduğu belirtildi.',
      'Bireysel takip yapılan öğrencilerde gözle görülür ilerlemeler kaydedildiği gözlemlendi.',
      'Bazı öğrencilerin belirli derslerde yoğunlaştırılmış desteğe ihtiyaç duyduğu ifade edildi.',
      'Destek çalışmalarının öğrencinin düzeyine ve ihtiyacına göre planlanmasının önemi vurgulandı.',
      'Düzenli tekrar ve pekiştirme çalışmalarının kalıcı öğrenmeyi desteklediği belirtildi.'
    ],
    suggestions: [
      'desteğe ihtiyaç duyan öğrenciler için bireysel çalışma planları oluşturulması',
      'destekleme ve yetiştirme kurslarının öğrenci ihtiyaçlarına göre düzenlenmesi',
      'eksik kazanımların tespit edilerek hedefli telafi çalışmaları yapılması',
      'öğrencilerin gelişiminin küçük hedeflerle düzenli takip edilmesi',
      'okul bünyesinde etüt ve destek çalışmalarının yaygınlaştırılması'
    ],
    decisions: [
      'Akademik yönden desteğe ihtiyaç duyan öğrenciler için bireysel takip ve çalışma planları oluşturulmasına karar verildi.',
      'Eksik kazanımların belirlenerek hedefli telafi çalışmaları yapılmasına karar verildi.',
      'Destekleme ve yetiştirme çalışmalarının öğrenci ihtiyaçlarına göre sürdürülmesine karar verildi.'
    ]
  },

  // ─────────────────────────────────────────────
  // Tanınmayan / kullanıcı tarafından eklenen maddeler için yedek havuz.
  'genel': {
    intros: [
      'Gündeme alınan konu değerlendirildiğinde',
      'Söz konusu madde ele alındığında',
      'Bu konudaki genel durum açısından',
      'Öğrencilerin genel durumu bakımından'
    ],
    observations: [
      'Konuyla ilgili sınıfın genel durumunun değerlendirildiği ve görüş alışverişinde bulunulduğu belirtildi.',
      'Öğrencilerin bu konudaki ihtiyaçlarının dikkate alınması gerektiği ifade edildi.',
      'Konunun öğrenci gelişimi açısından önem taşıdığı vurgulandı.',
      'Sınıf genelinde bu konuda atılabilecek adımların değerlendirildiği belirtildi.'
    ],
    suggestions: [
      'konuyla ilgili öğrenci ihtiyaçlarının düzenli olarak takip edilmesi',
      'öğretmenler arasında iş birliği içinde ortak yaklaşım belirlenmesi',
      'gerekli durumlarda rehberlik servisiyle iş birliği yapılması',
      'öğrencilerin bireysel farklılıklarının göz önünde bulundurulması',
      'konuya ilişkin gelişmelerin düzenli olarak değerlendirilmesi'
    ],
    decisions: [
      'Konuyla ilgili öğrenci ihtiyaçlarının takip edilmesine ve gerekli çalışmaların yürütülmesine karar verildi.',
      'Öğretmenler arasında iş birliği içinde ortak bir yaklaşım benimsenmesine karar verildi.',
      'Konuya ilişkin gelişmelerin sonraki toplantıda yeniden değerlendirilmesine karar verildi.'
    ]
  }
};

export const getCategoryContent = (category: string): CategoryContent =>
  categorySpeechContent[category] ?? categorySpeechContent['genel'];

// Konuşmanın gövdesinde branş odağının da korunacağı (branş içeriğinin yerinde
// olduğu) kategoriler. Diğer kategorilerde içerik tamamen konuya döner.
export const academicCategories = new Set<string>([
  'akademik-basari',
  'olcme-degerlendirme',
  'destekleme'
]);
