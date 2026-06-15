import type { MeetingPeriod } from '../types';

// Döneme ÖZGÜ konuşma ve karar içeriği.
//
// categorySpeechContent.ts konunun genel (dönemden bağımsız) içeriğini taşır;
// bu dosya ise aynı konuya dönemin bakış açısını katar:
//  - sene-basi   : ileriye dönük — tanıma, hedef belirleme, planlama (gelecek
//                  zaman / "planlanmasına" kipi)
//  - ikinci-donem: birinci dönemi değerlendirme + ikinci döneme planlama
//                  ("birinci dönemde ... görüldü", "ikinci dönemde ...")
//  - sene-sonu   : yıl genelini değerlendirme + gelecek yıla öneri
//                  ("yıl boyunca ... gözlemlendi", "gelecek yıl ...")
//
// generateMinutes bu havuzları konunun genel havuzlarıyla harmanlar; böylece
// üretilen tutanak hem konuya hem de döneme uygun olur.

export interface PeriodCategoryContent {
  // Konuya özgü giriş cümlesi (akademik olmayan maddelerde kullanılır).
  intros?: string[];
  // Tam cümle gözlemler (doğrudan eklenir).
  observations?: string[];
  // Öneri ad öbekleri ("Ayrıca <suggestion> gerektiğini vurguladı." kalıbı).
  suggestions?: string[];
  // "...karar verildi." biçiminde tam karar cümleleri.
  decisions?: string[];
}

type CategoryMap = Record<string, PeriodCategoryContent>;

// ════════════════════════════════════════════════════════════════
// SENE BAŞI
// ════════════════════════════════════════════════════════════════
const seneBasi: CategoryMap = {
  'akademik-basari': {
    intros: [
      'Yeni eğitim öğretim yılının başında öğrencilerin hazırbulunuşluk düzeyleri hakkında',
      'Bir önceki yıldan gelen başarı durumu ve bu yılki hedefler bakımından',
      'Dönem başında öğrencilerin akademik düzeylerinin tanınması bakımından'
    ],
    observations: [
      'Yeni eğitim öğretim yılının başında öğrencilerin hazırbulunuşluk düzeylerinin belirlenmesinin yıl planlaması açısından önemli olduğu belirtildi.',
      'Bir önceki yıldan gelen kazanım eksikliklerinin dönem başında tespit edilerek giderilmesi gerektiği ifade edildi.',
      'Sınıfın bu yıla ait akademik hedeflerinin gerçekçi biçimde belirlenmesinin yararlı olacağı vurgulandı.',
      'Öğrencilerin güçlü ve gelişime açık yönlerinin dönem başında tanınmasının çalışma planlarına yön vereceği gözlemlendi.'
    ],
    suggestions: [
      'dönem başında öğrencilerin hazırbulunuşluk düzeylerini ölçmeye yönelik çalışmalar yapılması',
      'sınıfın yıllık akademik hedeflerinin belirlenmesi',
      'önceki yıldan gelen eksik kazanımların tamamlanmasına yönelik plan oluşturulması',
      'öğrencilerin akademik gelişiminin yıl boyunca izleneceği bir takip sisteminin kurulması'
    ],
    decisions: [
      'Dönem başında öğrencilerin hazırbulunuşluk düzeylerinin belirlenerek eksik kazanımların tamamlanmasına yönelik çalışma planı oluşturulmasına karar verildi.',
      'Sınıfın bu eğitim öğretim yılına ait akademik hedeflerinin belirlenerek yıl boyunca izlenmesine karar verildi.'
    ]
  },
  'devamsizlik': {
    intros: [
      'Dönem başında devamsızlığın önlenmesine yönelik tedbirlerle ilgili olarak',
      'Yeni yılda devam takibinin sağlıklı yürütülmesi açısından'
    ],
    observations: [
      'Yeni eğitim öğretim yılının başında devamsızlığın önlenmesine yönelik tedbirlerin baştan planlanmasının önemli olduğu belirtildi.',
      'Devam takibinin yıl başından itibaren düzenli ve kayıt altına alınarak yürütülmesi gerektiği ifade edildi.',
      'Geçen yıl sık devamsızlık yapan öğrencilerin bu yıl yakından izlenmesinin yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'devam takibinin yıl başından itibaren düzenli olarak yapılması',
      'devamsızlığın önlenmesi konusunda öğrenci ve velilerin dönem başında bilgilendirilmesi',
      'geçen yıl devamsızlık eğilimi gösteren öğrenciler için erken takip planı oluşturulması'
    ],
    decisions: [
      'Devam takibinin yıl başından itibaren düzenli olarak yapılmasına ve öğrenci ile velilerin devamsızlık konusunda baştan bilgilendirilmesine karar verildi.',
      'Geçen yıl sık devamsızlık yapan öğrencilerin dönem başından itibaren yakından takibe alınmasına karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Dönem başında sınıf kurallarının belirlenmesi ve uyum süreci konusunda',
      'Yeni sınıf ortamına uyum ve davranış kültürünün oluşturulması bakımından'
    ],
    observations: [
      'Dönem başında sınıf kurallarının öğrencilerle birlikte belirlenmesinin olumlu bir öğrenme ortamı oluşturacağı belirtildi.',
      'Öğrencilerin yeni sınıf düzenine ve okul kültürüne uyum sağlamaları için dönem başında çalışma yapılmasının önemli olduğu ifade edildi.',
      'Olumlu davranış kültürünün yıl başından itibaren oluşturulmasının disiplin sorunlarını azaltacağı vurgulandı.'
    ],
    suggestions: [
      'sınıf kurallarının dönem başında öğrencilerle birlikte belirlenmesi',
      'öğrencilerin sınıf düzenine ve okul kültürüne uyumlarının desteklenmesi',
      'olumlu davranışların yıl başından itibaren pekiştirilmesine yönelik bir yaklaşım benimsenmesi'
    ],
    decisions: [
      'Sınıf kurallarının dönem başında öğrencilerle birlikte belirlenerek tutarlı biçimde uygulanmasına karar verildi.',
      'Öğrencilerin sınıf düzenine ve okul kültürüne uyumlarını destekleyici çalışmalar yapılmasına karar verildi.'
    ]
  },
  'motivasyon-katilim': {
    intros: [
      'Dönem başında derse katılım ve motivasyonun artırılması konusunda',
      'Yeni yılda öğrencilerin öğrenmeye istekli başlamaları bakımından'
    ],
    observations: [
      'Yeni eğitim öğretim yılına öğrencilerin istekli ve motive biçimde başlamalarının yıl boyunca sürdürülecek bir temel oluşturacağı belirtildi.',
      'Dönem başında öğrencilerin ilgi alanlarının tanınmasının derse katılımı planlamada yol gösterici olacağı ifade edildi.',
      'Sınıf içi katılımı artıracak yöntemlerin baştan planlanmasının yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'öğrencilerin ilgi alanlarının dönem başında belirlenerek derslerle ilişkilendirilmesi',
      'derse katılımı artıracak yöntemlerin yıl başında planlanması',
      'öğrencilerde başarı duygusunu yaşatacak küçük hedeflerin belirlenmesi'
    ],
    decisions: [
      'Öğrencilerin ilgi alanlarının dönem başında belirlenerek derse katılımı artıracak yöntemlerin planlanmasına karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    intros: [
      'Dönem başında öğrencilerin sosyal ve duygusal ihtiyaçlarının tanınması bakımından',
      'Yeni sınıf ortamında akran ilişkilerinin oluşturulması açısından'
    ],
    observations: [
      'Dönem başında öğrencilerin sosyal-duygusal durumlarının ve rehberlik ihtiyaçlarının tanınmasının önemli olduğu belirtildi.',
      'Yeni oluşan sınıf ortamında akran ilişkilerinin sağlıklı biçimde kurulması için dönem başında çalışma yapılmasının yararlı olacağı ifade edildi.',
      'Özel durumu olan öğrencilerin dönem başında belirlenerek rehberlik servisiyle iş birliği içinde takip edilmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'öğrencilerin sosyal-duygusal ihtiyaçlarının dönem başında rehberlik servisiyle birlikte belirlenmesi',
      'yeni sınıf ortamında akran ilişkilerini güçlendirici kaynaştırma etkinlikleri düzenlenmesi',
      'özel durumu olan öğrencilerin baştan tespit edilerek izlenmesi'
    ],
    decisions: [
      'Öğrencilerin sosyal-duygusal ihtiyaçlarının ve rehberlik gereksinimlerinin dönem başında belirlenerek izlenmesine karar verildi.',
      'Yeni sınıf ortamında akran ilişkilerini güçlendirici kaynaştırma etkinlikleri planlanmasına karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    intros: [
      'Dönem başında ölçme ve değerlendirme çalışmalarının planlanması konusunda',
      'Ortak sınav takvimi ve değerlendirme yaklaşımının belirlenmesi bakımından'
    ],
    observations: [
      'Dönem başında ölçme ve değerlendirme çalışmalarının ve ortak sınav takviminin planlanmasının önemli olduğu belirtildi.',
      'Değerlendirmelerin yalnızca not için değil, öğrenme eksikliklerini erken görmek için kullanılmasının yararlı olacağı ifade edildi.',
      'Süreç odaklı ve çeşitlendirilmiş değerlendirme yöntemlerinin yıl başında belirlenmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'ortak sınav takviminin ve değerlendirme ölçütlerinin dönem başında belirlenmesi',
      'öğrenme eksikliklerini erken belirleyecek kazanım kontrollerinin planlanması',
      'süreç odaklı ve çeşitlendirilmiş değerlendirme yöntemlerinin baştan kararlaştırılması'
    ],
    decisions: [
      'Ortak sınav takviminin ve değerlendirme ölçütlerinin dönem başında belirlenerek uygulanmasına karar verildi.'
    ]
  },
  'veli-iletisim': {
    intros: [
      'Dönem başında veli iletişimi ve okul-aile iş birliği planı konusunda',
      'Ailelerin öğrenme sürecine baştan dahil edilmesi bakımından'
    ],
    observations: [
      'Dönem başında veli iletişimi ve okul-aile iş birliği planının oluşturulmasının yıl boyunca etkili bir iş birliği sağlayacağı belirtildi.',
      'Velilerin yıl başında okulun beklentileri ve çalışma düzeni hakkında bilgilendirilmesinin yararlı olacağı ifade edildi.',
      'İletişim kanallarının dönem başından itibaren netleştirilmesinin gerektiği vurgulandı.'
    ],
    suggestions: [
      'veli bilgilendirme toplantısının dönem başında yapılması',
      'iletişim kanallarının ve görüşme düzeninin yıl başında belirlenmesi',
      'velilerin öğrenme sürecine baştan dahil edilmesine yönelik plan oluşturulması'
    ],
    decisions: [
      'Dönem başında veli bilgilendirme toplantısı yapılarak okul-aile iş birliği planının oluşturulmasına karar verildi.'
    ]
  },
  'destekleme': {
    intros: [
      'Dönem başında destekleme, yetiştirme ve bireysel takip çalışmalarının planlanması konusunda',
      'Desteğe ihtiyaç duyan öğrencilerin baştan belirlenmesi bakımından'
    ],
    observations: [
      'Dönem başında desteğe ihtiyaç duyan öğrencilerin belirlenerek bireysel takip planları oluşturulmasının önemli olduğu belirtildi.',
      'Destekleme ve yetiştirme çalışmalarının öğrenci ihtiyaçlarına göre yıl başında planlanmasının yararlı olacağı ifade edildi.',
      'Önceki yıldan gelen eksiklerin dönem başında telafi çalışmalarıyla giderilmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'desteğe ihtiyaç duyan öğrencilerin dönem başında belirlenmesi',
      'bireysel çalışma planlarının yıl başında oluşturulması',
      'destekleme ve yetiştirme kurslarının öğrenci ihtiyaçlarına göre planlanması'
    ],
    decisions: [
      'Desteğe ihtiyaç duyan öğrencilerin dönem başında belirlenerek bireysel takip ve çalışma planlarının oluşturulmasına karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Konuyla ilgili dönem başında bir planlama yapılmasının ve hedeflerin belirlenmesinin yararlı olacağı belirtildi.',
      'Yeni eğitim öğretim yılının başında atılacak adımların yıl boyunca izleneceği vurgulandı.'
    ],
    suggestions: [
      'konuyla ilgili dönem başında bir yol haritası belirlenmesi',
      'hedeflerin yıl başında netleştirilerek düzenli takip edilmesi'
    ],
    decisions: [
      'Konuyla ilgili dönem başında bir planlama yapılarak hedeflerin belirlenmesine ve yıl boyunca izlenmesine karar verildi.'
    ]
  }
};

// ════════════════════════════════════════════════════════════════
// 2. DÖNEM
// ════════════════════════════════════════════════════════════════
const ikinciDonem: CategoryMap = {
  'akademik-basari': {
    intros: [
      'Birinci dönem genel akademik başarı durumu hakkında',
      'Karne sonuçları ve birinci dönem performansı bakımından',
      'Birinci dönemden ikinci döneme taşınan eksikler açısından'
    ],
    observations: [
      'Birinci dönem genel başarı durumunun ve karne sonuçlarının değerlendirildiği, sınıfın genel ortalamasının ele alındığı belirtildi.',
      'Birinci dönemde başarısı düşen öğrencilerin ikinci dönemde yakından takip edilmesi gerektiği ifade edildi.',
      'Birinci dönemde tespit edilen kazanım eksikliklerinin ikinci dönemde giderilmesinin önemli olduğu vurgulandı.',
      'Birinci dönemde alınan kararların başarıya etkisinin değerlendirildiği ve ikinci dönem hedeflerinin güncellendiği belirtildi.'
    ],
    suggestions: [
      'birinci dönemde başarısı düşen öğrenciler için ikinci dönemde bireysel takip yapılması',
      'birinci dönem kazanım eksikliklerinin ikinci dönemde tamamlanması',
      'ikinci dönem akademik hedeflerinin birinci dönem sonuçlarına göre güncellenmesi'
    ],
    decisions: [
      'Birinci dönemde başarısı düşen öğrenciler için ikinci dönemde bireysel takip ve tamamlayıcı çalışmalar yapılmasına karar verildi.',
      'Birinci dönemde tespit edilen kazanım eksikliklerinin ikinci dönemde giderilmesine karar verildi.'
    ]
  },
  'devamsizlik': {
    intros: [
      'Birinci dönem devamsızlık durumları hakkında',
      'İkinci dönemde devamsızlığın önlenmesi bakımından'
    ],
    observations: [
      'Birinci dönem devamsızlık durumlarının değerlendirildiği ve sınır düzeyine yaklaşan öğrencilerin belirlendiği belirtildi.',
      'Birinci dönemde sık devamsızlık yapan öğrencilerin ders takibinde geri kaldığı ve ikinci dönemde telafiye ihtiyaç duyduğu ifade edildi.',
      'Devamsızlığın ikinci dönemde artmaması için velilerle iş birliğinin önemli olduğu vurgulandı.'
    ],
    suggestions: [
      'devamsızlık sınırına yaklaşan öğrencilerin velileriyle ivedilikle görüşülmesi',
      'birinci dönemde devamsızlık yapan öğrenciler için ikinci dönemde telafi çalışmaları planlanması',
      'devam durumunun ikinci dönemde daha sıkı izlenmesi'
    ],
    decisions: [
      'Devamsızlık sınırına yaklaşan öğrencilerin velileriyle ivedilikle görüşülmesine karar verildi.',
      'Birinci dönemde devamsızlık nedeniyle eksiği oluşan öğrenciler için ikinci dönemde telafi çalışmaları yapılmasına karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Birinci dönem davranış ve disiplin durumu hakkında',
      'Birinci dönemde sınıf kurallarına uyum bakımından'
    ],
    observations: [
      'Birinci dönemde sınıfın davranış ve disiplin açısından genel durumunun değerlendirildiği belirtildi.',
      'Birinci dönemde belirlenen sınıf kurallarının uygulanma düzeyinin gözden geçirildiği ifade edildi.',
      'Davranış açısından dikkat gerektiren öğrencilerin ikinci dönemde daha yakından izlenmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'birinci dönemde belirlenen sınıf kurallarının ikinci dönemde gözden geçirilerek sürdürülmesi',
      'davranış açısından desteğe ihtiyaç duyan öğrencilerle ikinci dönemde bireysel görüşmeler yapılması',
      'olumlu davranışların pekiştirilmesine ikinci dönemde de devam edilmesi'
    ],
    decisions: [
      'Birinci dönemde belirlenen sınıf kurallarının gözden geçirilerek ikinci dönemde de tutarlı biçimde uygulanmasına karar verildi.'
    ]
  },
  'motivasyon-katilim': {
    intros: [
      'Birinci dönem motivasyon ve derse katılım durumu hakkında',
      'İkinci dönemde katılımın artırılması bakımından'
    ],
    observations: [
      'Birinci dönemde öğrencilerin derse katılım ve motivasyon düzeylerinin değerlendirildiği belirtildi.',
      'Birinci dönem sonunda bazı öğrencilerde motivasyon düşüşü gözlemlendiği ve ikinci dönemde desteklenmesi gerektiği ifade edildi.',
      'İkinci dönemde katılımı artıracak yöntemlerin çeşitlendirilmesinin yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'birinci dönemde katılımı düşük öğrencilerin ikinci dönemde daha aktif kılınması',
      'ikinci dönemde derse katılımı artıracak yöntemlerin çeşitlendirilmesi',
      'öğrencilerin ikinci dönem hedeflerine yönelik motive edilmesi'
    ],
    decisions: [
      'İkinci dönemde derse katılımı artırmak amacıyla farklı öğretim yöntemleri kullanılmasına ve katılımı düşük öğrencilerin desteklenmesine karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    intros: [
      'Öğrencilerin birinci dönemdeki sosyal-duygusal gelişimi hakkında',
      'İkinci dönem rehberlik ihtiyaçları bakımından'
    ],
    observations: [
      'Birinci dönemde öğrencilerin sosyal-duygusal gelişimlerinin ve akran ilişkilerinin değerlendirildiği belirtildi.',
      'Birinci dönemde rehberlik desteği alan öğrencilerdeki gelişmelerin gözden geçirildiği ifade edildi.',
      'Kaygı düzeyi yüksek öğrencilerin ikinci dönemde rehberlik servisiyle düzenli görüşmelerinin sürdürülmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'birinci dönemde rehberlik desteği alan öğrencilerin ikinci dönemde izlenmeye devam edilmesi',
      'sosyal-duygusal gelişimi destekleyen etkinliklerin ikinci dönemde sürdürülmesi',
      'kaygı düzeyi yüksek öğrencilerle rehberlik görüşmelerinin ikinci dönemde de yürütülmesi'
    ],
    decisions: [
      'Rehberlik servisiyle iş birliği içinde öğrencilerin sosyal-duygusal gelişimlerinin ikinci dönemde de izlenmesine karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    intros: [
      'Birinci dönem ölçme ve değerlendirme sonuçları hakkında',
      'Birinci dönem sınav ve deneme sonuçları bakımından'
    ],
    observations: [
      'Birinci dönem sınav ve değerlendirme sonuçlarının analiz edildiği ve konu eksikliklerinin belirlendiği belirtildi.',
      'Birinci dönem sonuçlarına göre ikinci dönemde değerlendirme yaklaşımının gözden geçirilmesi gerektiği ifade edildi.',
      'Birinci dönemde sınav kaygısı yaşayan öğrencilerin ikinci dönemde desteklenmesinin önemli olduğu vurgulandı.'
    ],
    suggestions: [
      'birinci dönem sınav sonuçlarının analiz edilerek ikinci dönem çalışmalarına yön verilmesi',
      'birinci dönemde belirlenen konu eksikliklerine yönelik ikinci dönemde kazanım kontrolleri yapılması',
      'sınav kaygısını azaltmaya yönelik çalışmaların ikinci dönemde sürdürülmesi'
    ],
    decisions: [
      'Birinci dönem sınav sonuçlarının analiz edilerek konu eksikliklerine yönelik ikinci dönemde tamamlayıcı çalışmalar yapılmasına karar verildi.'
    ]
  },
  'veli-iletisim': {
    intros: [
      'Birinci dönem veli iletişimi ve okul-aile iş birliği hakkında',
      'İkinci dönemde veli iş birliğinin güçlendirilmesi bakımından'
    ],
    observations: [
      'Birinci dönemde yürütülen veli iletişiminin ve okul-aile iş birliğinin değerlendirildiği belirtildi.',
      'Birinci dönemde iletişim kurulamayan velilere ikinci dönemde ulaşılması gerektiği ifade edildi.',
      'Birinci dönem karne sonuçları hakkında velilerle bireysel görüşmeler yapılmasının yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'birinci dönemde iletişim kurulamayan velilere ikinci dönemde farklı kanallarla ulaşılması',
      'birinci dönem sonuçları hakkında velilerle bireysel görüşmeler yapılması',
      'ikinci dönemde veli bilgilendirme toplantısının yenilenmesi'
    ],
    decisions: [
      'Birinci dönemde iletişim kurulamayan velilere ulaşılmasına ve ihtiyaç duyulan öğrencilerin velileriyle ikinci dönemde bireysel görüşmeler yapılmasına karar verildi.'
    ]
  },
  'destekleme': {
    intros: [
      'İkinci dönem destekleme ve yetiştirme çalışmalarıyla ilgili olarak',
      'Birinci dönem destek çalışmalarının sonuçları bakımından'
    ],
    observations: [
      'Birinci dönemde yürütülen destekleme ve yetiştirme çalışmalarının değerlendirildiği belirtildi.',
      'Birinci dönemde gelişim gösteren öğrencilerin ikinci dönemde de takibe devam edilmesi gerektiği ifade edildi.',
      'İkinci dönemde destek çalışmalarının birinci dönem sonuçlarına göre güncellenmesinin yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'birinci dönem destek çalışmalarının sonuçlarına göre ikinci dönem planının güncellenmesi',
      'birinci dönemde ilerleme gösteren öğrencilerin ikinci dönemde izlenmeye devam edilmesi',
      'ikinci dönemde destekleme ve yetiştirme kurslarının öğrenci ihtiyaçlarına göre yeniden düzenlenmesi'
    ],
    decisions: [
      'Destekleme ve yetiştirme çalışmalarının birinci dönem sonuçlarına göre güncellenerek ikinci dönemde sürdürülmesine karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Birinci dönemde alınan kararların uygulanma durumunun gözden geçirildiği ve ikinci dönem hedeflerinin belirlendiği belirtildi.',
      'Birinci dönemde elde edilen sonuçların ikinci dönem planlamasına esas alındığı vurgulandı.'
    ],
    suggestions: [
      'birinci dönemde alınan kararların uygulanma durumunun değerlendirilmesi',
      'ikinci dönem hedeflerinin birinci dönem sonuçlarına göre belirlenmesi'
    ],
    decisions: [
      'Birinci dönemde alınan kararların gözden geçirilerek uygulanmaya devam edilmesine ve ikinci dönem hedeflerinin belirlenmesine karar verildi.'
    ]
  }
};

// ════════════════════════════════════════════════════════════════
// SENE SONU
// ════════════════════════════════════════════════════════════════
const seneSonu: CategoryMap = {
  'akademik-basari': {
    intros: [
      'Eğitim öğretim yılı sonunda sınıfın genel akademik başarı durumu hakkında',
      'Yıl boyunca elde edilen akademik gelişim bakımından',
      'Yıl sonu başarı tablosu ve sınıfın yıllık performansı açısından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca sınıfın genel akademik başarı durumunun değerlendirildiği ve yıllık gelişimin gözden geçirildiği belirtildi.',
      'Yıl içinde alınan kararların ve yürütülen çalışmaların başarıya olumlu yansıdığı ifade edildi.',
      'Yıl boyunca gelişim gösteren öğrencilerin yanı sıra desteğe ihtiyaç duymaya devam eden öğrencilerin de belirlendiği vurgulandı.',
      'Yıl sonu sonuçlarının gelecek yıl çalışmalarına ışık tutacağı belirtildi.'
    ],
    suggestions: [
      'yıl sonu başarı sonuçlarının gelecek yıl planlamasında değerlendirilmesi',
      'yıl boyunca desteğe ihtiyaç duyan öğrencilerin gelecek yıl için not edilmesi',
      'başarılı uygulamaların gelecek yıl da sürdürülmesi'
    ],
    decisions: [
      'Yıl sonu akademik başarı sonuçlarının değerlendirilerek gelecek eğitim öğretim yılı planlamasına esas alınmasına karar verildi.',
      'Yıl boyunca desteğe ihtiyaç duyan öğrencilerin durumlarının gelecek yıl ilgili öğretmenlerle paylaşılmasına karar verildi.'
    ]
  },
  'devamsizlik': {
    intros: [
      'Yıl sonu devamsızlık durumları hakkında',
      'Eğitim öğretim yılı boyunca devam durumu bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca öğrencilerin devam durumlarının değerlendirildiği ve devamsızlığın başarıya etkisinin gözden geçirildiği belirtildi.',
      'Yıl içinde devamsızlık nedeniyle sınıf tekrarı durumuna gelen öğrenci bulunup bulunmadığının değerlendirildiği ifade edildi.',
      'Yıl boyunca alınan devamsızlık tedbirlerinin sonuçlarının gözden geçirildiği vurgulandı.'
    ],
    suggestions: [
      'yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının değerlendirilmesi',
      'devamsızlık eğilimi süren öğrencilerin gelecek yıl için not edilmesi',
      'devamsızlığın azaltılmasında etkili olan uygulamaların gelecek yıl sürdürülmesi'
    ],
    decisions: [
      'Yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının değerlendirilerek etkili uygulamaların gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Öğrencilerin yıl sonu davranış ve sosyal gelişimleri hakkında',
      'Eğitim öğretim yılı boyunca davranış ve disiplin durumu bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca öğrencilerin davranış ve sosyal gelişimlerinin değerlendirildiği ve genel tablonun gözden geçirildiği belirtildi.',
      'Yıl başında belirlenen sınıf kurallarının yıl boyunca uygulanma düzeyinin değerlendirildiği ifade edildi.',
      'Yıl içinde olumlu davranış gelişimi gösteren öğrencilerin belirlendiği vurgulandı.'
    ],
    suggestions: [
      'yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilmesi',
      'davranış açısından gelişime ihtiyaç duyan öğrencilerin gelecek yıl için not edilmesi',
      'olumlu sonuç veren uygulamaların gelecek yıl sürdürülmesi'
    ],
    decisions: [
      'Yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilerek olumlu uygulamaların gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'motivasyon-katilim': {
    intros: [
      'Öğrencilerin yıl boyunca derse katılım ve motivasyon durumu hakkında',
      'Yıl sonu itibarıyla sınıf içi katılım bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca öğrencilerin derse katılım ve motivasyon düzeylerindeki gelişimin değerlendirildiği belirtildi.',
      'Yıl içinde uygulanan katılım artırıcı yöntemlerin sonuçlarının gözden geçirildiği ifade edildi.'
    ],
    suggestions: [
      'yıl boyunca katılımı artırmada etkili olan yöntemlerin gelecek yıl sürdürülmesi',
      'motivasyon açısından desteğe ihtiyaç duyan öğrencilerin gelecek yıl için not edilmesi'
    ],
    decisions: [
      'Yıl boyunca derse katılımı artırmada etkili olan yöntemlerin değerlendirilerek gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    intros: [
      'Öğrencilerin yıl boyunca sosyal-duygusal gelişimi ve rehberlik süreci hakkında',
      'Yıl sonu itibarıyla rehberlik çalışmalarının sonuçları bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca öğrencilerin sosyal-duygusal gelişimlerinin ve rehberlik sürecinin değerlendirildiği belirtildi.',
      'Yıl içinde rehberlik desteği alan öğrencilerdeki gelişmelerin gözden geçirildiği ifade edildi.',
      'Gelecek yıl da desteğe ihtiyaç duyabilecek öğrencilerin belirlendiği vurgulandı.'
    ],
    suggestions: [
      'yıl boyunca yürütülen rehberlik çalışmalarının sonuçlarının değerlendirilmesi',
      'gelecek yıl desteğe ihtiyaç duyabilecek öğrencilerin rehberlik servisine not edilmesi',
      'sosyal-duygusal gelişimi destekleyen etkili çalışmaların gelecek yıl sürdürülmesi'
    ],
    decisions: [
      'Yıl boyunca yürütülen rehberlik çalışmalarının değerlendirilerek desteğe ihtiyaç duyan öğrencilerin durumunun gelecek yıl için rehberlik servisiyle paylaşılmasına karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    intros: [
      'Yıl sonu ölçme-değerlendirme sonuçları ve sınıf geçme durumları hakkında',
      'Eğitim öğretim yılı boyunca değerlendirme sonuçları bakımından'
    ],
    observations: [
      'Yıl sonu değerlendirme sonuçlarının ve öğrencilerin sınıf geçme durumlarının gözden geçirildiği belirtildi.',
      'Yıl boyunca uygulanan ölçme-değerlendirme yaklaşımının öğrenmeyi yansıtma düzeyinin değerlendirildiği ifade edildi.',
      'Yıl sonu sonuçlarının gelecek yıl değerlendirme planlamasına katkı sağlayacağı vurgulandı.'
    ],
    suggestions: [
      'yıl sonu sonuçlarının ve sınıf geçme durumlarının değerlendirilmesi',
      'yıl boyunca etkili olan değerlendirme yöntemlerinin gelecek yıl sürdürülmesi',
      'başarı ortalaması düşük derslerin gelecek yıl için not edilmesi'
    ],
    decisions: [
      'Yıl sonu değerlendirme sonuçlarının ve sınıf geçme durumlarının gözden geçirilerek etkili değerlendirme yöntemlerinin gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'veli-iletisim': {
    intros: [
      'Yıl boyunca veli iletişimi ve okul-aile iş birliği hakkında',
      'Eğitim öğretim yılı sonunda okul-aile iş birliğinin sonuçları bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca yürütülen veli iletişiminin ve okul-aile iş birliğinin değerlendirildiği belirtildi.',
      'Yıl içinde veli iş birliğinin öğrenci gelişimine katkısının gözden geçirildiği ifade edildi.',
      'İletişimde güçlük yaşanan velilerle gelecek yıl için farklı yöntemler denenmesi gerektiği vurgulandı.'
    ],
    suggestions: [
      'yıl boyunca yürütülen veli iş birliğinin sonuçlarının değerlendirilmesi',
      'etkili olan iletişim yöntemlerinin gelecek yıl sürdürülmesi',
      'iletişimde güçlük yaşanan velilere yönelik gelecek yıl için yeni yaklaşımlar belirlenmesi'
    ],
    decisions: [
      'Yıl boyunca yürütülen veli iş birliğinin değerlendirilerek etkili iletişim yöntemlerinin gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'destekleme': {
    intros: [
      'Destekleme ve yetiştirme çalışmalarının yıl sonu sonuçları hakkında',
      'Yıl boyunca yürütülen bireysel takip çalışmaları bakımından'
    ],
    observations: [
      'Eğitim öğretim yılı boyunca yürütülen destekleme, yetiştirme ve bireysel takip çalışmalarının sonuçlarının değerlendirildiği belirtildi.',
      'Destek çalışmalarından yararlanan öğrencilerdeki gelişimin gözden geçirildiği ifade edildi.',
      'Gelecek yıl da desteğe ihtiyaç duyacak öğrencilerin belirlendiği vurgulandı.'
    ],
    suggestions: [
      'yıl boyunca yürütülen destek çalışmalarının sonuçlarının değerlendirilmesi',
      'etkili olan destek uygulamalarının gelecek yıl sürdürülmesi',
      'gelecek yıl desteğe ihtiyaç duyacak öğrencilerin not edilmesi'
    ],
    decisions: [
      'Yıl boyunca yürütülen destekleme ve yetiştirme çalışmalarının değerlendirilerek etkili uygulamaların ve desteğe ihtiyaç duyan öğrenci bilgisinin gelecek yıla aktarılmasına karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Yıl içinde alınan kararların sonuçlarının değerlendirildiği ve gelecek eğitim öğretim yılına yönelik önerilerin ele alındığı belirtildi.',
      'Eğitim öğretim yılı genelinin gözden geçirilerek gelecek yıl için yol haritası oluşturulmasının yararlı olacağı vurgulandı.'
    ],
    suggestions: [
      'yıl içinde alınan kararların sonuçlarının değerlendirilmesi',
      'gelecek eğitim öğretim yılına yönelik önerilerin belirlenmesi'
    ],
    decisions: [
      'Yıl içinde alınan kararların sonuçlarının değerlendirilerek gelecek eğitim öğretim yılına yönelik önerilerin bir sonraki şube öğretmenler kuruluna aktarılmasına karar verildi.'
    ]
  }
};

const periodContent: Record<MeetingPeriod, CategoryMap> = {
  'sene-basi': seneBasi,
  'ikinci-donem': ikinciDonem,
  'sene-sonu': seneSonu
};

// Belirli bir dönem ve kategori için döneme özgü içeriği döndürür. Kategori
// bulunamazsa 'genel' havuzuna düşer; o da yoksa boş içerik döner.
export const getPeriodContent = (
  period: MeetingPeriod,
  category: string
): PeriodCategoryContent => {
  const map = periodContent[period] ?? seneBasi;
  return map[category] ?? map['genel'] ?? {};
};
