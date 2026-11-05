import type { MeetingPeriod } from '../types';

// Döneme ÖZGÜ konuşma ve karar içeriği.
//
// categorySpeechContent.ts konunun genel (dönemden bağımsız) içeriğini taşır;
// bu dosya ise aynı konuya dönemin bakış açısını katar:
//  - kasim       : ileriye dönük — tanıma, hedef belirleme, planlama (gelecek
//                  zaman / "planlanmasına" kipi)
//  - nisan       : birinci dönemi değerlendirme + ikinci döneme planlama
//                  ("birinci dönemde ... görüldü", "ikinci dönemde ...")
//  - sene-sonu   : yıl genelini değerlendirme + gelecek yıla öneri
//                  ("yıl boyunca ... değerlendirildi", "gelecek yıl ...")
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
      'Yeni eğitim öğretim yılının başında hazırbulunuşluk düzeylerinin belirlenmesini yıl planlaması açısından önemli buldu.',
      'Bir önceki yıldan gelen kazanım eksikliklerinin dönem başında belirlenerek giderilmesine öncelik verilmesini önerdi.',
      'Sınıfın bu yıla ait akademik hedeflerinin gerçekçi ve ölçülebilir biçimde belirlenmesini yararlı buldu.',
      'Öğrencilerin güçlü ve gelişime açık yönlerinin dönem başında tanınmasının çalışma planlarına yön vereceğini belirtti.'
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
      'Yeni eğitim öğretim yılının başında devamsızlığı önleyici tedbirlerin baştan planlanmasını önemli buldu.',
      'Devam takibinin yıl başından itibaren düzenli ve kayıtlı biçimde yürütülmesini önerdi.',
      'Önceki yıla ait devam kayıtlarının incelenmesini ve gerekli görülen öğrenciler için erken izleme planı hazırlanmasını yararlı buldu.'
    ],
    suggestions: [
      'devam takibinin yıl başından itibaren düzenli olarak yapılması',
      'devamsızlığın önlenmesi konusunda öğrenci ve velilerin dönem başında bilgilendirilmesi',
      'önceki yılın devam kayıtlarına göre gerekli görülen öğrenciler için erken izleme planı oluşturulması'
    ],
    decisions: [
      'Devam takibinin yıl başından itibaren düzenli olarak yapılmasına ve öğrenci ile velilerin devamsızlık konusunda baştan bilgilendirilmesine karar verildi.',
      'Önceki yılın devam kayıtlarına göre gerekli görülen öğrencilerin dönem başından itibaren düzenli olarak izlenmesine karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Dönem başında sınıf kurallarının belirlenmesi ve uyum süreci konusunda',
      'Yeni sınıf ortamına uyum ve davranış kültürünün oluşturulması bakımından'
    ],
    observations: [
      'Sınıf kurallarının öğrencilerle birlikte belirlenmesinin olumlu bir öğrenme ortamı oluşturacağını belirtti.',
      'Öğrencilerin yeni sınıf düzenine ve okul kültürüne uyumunu destekleyecek başlangıç çalışmalarını önemli buldu.',
      'Olumlu davranış kültürünün yılın başından itibaren kurulmasının ileride yaşanabilecek disiplin sorunlarını azaltacağını ifade etti.'
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
      'Öğrencilerin yeni eğitim öğretim yılına istekli başlamasının yıl boyunca korunabilecek sağlam bir temel oluşturacağını belirtti.',
      'Öğrencilerin ilgi alanlarının dönem başında tanınmasının katılım çalışmalarına yön vereceğini ifade etti.',
      'Sınıf içi katılımı artıracak yöntemlerin yılın başında planlanmasını yararlı buldu.'
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
      'Öğrencilerin sosyal-duygusal durumlarının ve rehberlik ihtiyaçlarının dönem başında tanınmasını önemli buldu.',
      'Yeni oluşan sınıf ortamında sağlıklı akran ilişkilerini destekleyecek tanışma ve uyum çalışmalarını yararlı buldu.',
      'Bireysel destek gereksinimlerinin somut bilgiler ve rehberlik kayıtları doğrultusunda değerlendirilmesini önerdi.'
    ],
    suggestions: [
      'öğrencilerin sosyal-duygusal ihtiyaçlarının dönem başında rehberlik servisiyle birlikte belirlenmesi',
      'yeni sınıf ortamında akran ilişkilerini güçlendirici kaynaştırma etkinlikleri düzenlenmesi',
      'öğrencilerin bireysel destek gereksinimlerinin somut gözlem ve kayıtlar doğrultusunda değerlendirilmesi'
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
      'Ölçme ve değerlendirme çalışmalarının ve ortak sınav takviminin dönem başında planlanmasını önemli buldu.',
      'Değerlendirmelerin yalnızca not vermek için değil, öğrenme eksiklerini erken belirlemek için de kullanılmasını önerdi.',
      'Süreç odaklı ve çeşitlendirilmiş değerlendirme yöntemlerinin yılın başında belirlenmesini öncelikli gördü.'
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
      'Veli iletişimi ve okul-aile iş birliği planının dönem başında oluşturulmasının yıl boyunca etkili bir iletişim sağlayacağını belirtti.',
      'Velilerin okulun beklentileri ve çalışma düzeni hakkında yılın başında bilgilendirilmesini yararlı buldu.',
      'İletişim kanallarının ve görüşme düzeninin dönem başında netleştirilmesini önerdi.'
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
      'Desteğe ihtiyaç duyan öğrencilerin dönem başında belirlenerek bireysel takip planlarının hazırlanmasını önemli buldu.',
      'Destekleme ve yetiştirme çalışmalarının öğrenci ihtiyaçlarına göre yılın başında planlanmasını yararlı buldu.',
      'Önceki yıldan gelen eksiklerin başlangıç çalışmalarında ele alınmasını önerdi.'
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
      'Konuyla ilgili bir başlangıç planı hazırlanmasını ve hedeflerin açık biçimde belirlenmesini yararlı buldu.',
      'Yeni eğitim öğretim yılı için belirlenecek adımların düzenli aralıklarla izlenmesini önerdi.',
      'Gündem başlığına ilişkin sorumlulukların ve uygulama takviminin baştan netleştirilmesini önemli buldu.',
      'Planlanan çalışmaların öğrenci yararı ve uygulanabilirlik bakımından birlikte ele alınmasını önerdi.'
    ],
    suggestions: [
      'konuyla ilgili dönem başında bir yol haritası belirlenmesi',
      'hedeflerin yıl başında netleştirilerek düzenli takip edilmesi',
      'sorumlulukların ve uygulama takviminin açık biçimde belirlenmesi',
      'planlanan çalışmaların belirli aralıklarla kurul üyelerince gözden geçirilmesi'
    ],
    decisions: [
      'Konuyla ilgili dönem başında bir planlama yapılarak hedeflerin belirlenmesine ve yıl boyunca izlenmesine karar verildi.',
      'Gündem başlığına ilişkin sorumlulukların ve uygulama takviminin açık biçimde belirlenmesine karar verildi.'
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
      'Birinci dönem genel başarı durumunu, karne sonuçlarını ve sınıf ortalamasını birlikte değerlendirdi.',
      'Birinci dönemde başarısı düşen öğrencilerin ikinci dönemde yakından izlenmesini önerdi.',
      'Birinci dönemde belirlenen kazanım eksikliklerinin ikinci dönemde giderilmesini önemli buldu.',
      'Birinci dönemde alınan kararların başarıya etkisini değerlendirerek ikinci dönem hedeflerinin güncellenmesini önerdi.'
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
      'Birinci dönem devam kayıtlarını değerlendirerek devamsızlık sınırına yaklaşan öğrencilerin yakından izlenmesini önerdi.',
      'Sık devamsızlık yapan öğrencilerin ders takibinde geri kalabildiğini ve ikinci dönemde telafiye ihtiyaç duyabileceğini belirtti.',
      'Devamsızlığın ikinci dönemde artmaması için velilerle kurulacak iş birliğini önemli buldu.'
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
      'Sınıfın birinci dönemdeki davranış ve disiplin durumunu genel olarak değerlendirdi.',
      'Birinci dönemde belirlenen sınıf kurallarının uygulanma düzeyini gözden geçirdi.',
      'Davranış açısından desteğe ihtiyaç duyan öğrencilerin ikinci dönemde daha yakından izlenmesini önerdi.'
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
      'Öğrencilerin birinci dönemdeki derse katılım ve motivasyon düzeylerini değerlendirdi.',
      'Birinci dönem sonunda motivasyonu azalan öğrencilerin ikinci dönemde desteklenmesini önerdi.',
      'İkinci dönemde katılımı artıracak yöntemlerin çeşitlendirilmesini yararlı buldu.'
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
      'Öğrencilerin birinci dönemdeki sosyal-duygusal gelişimlerini ve akran ilişkilerini değerlendirdi.',
      'Birinci dönemde rehberlik desteği alan öğrencilerin gelişimini gözden geçirdi.',
      'Kaygı düzeyi yüksek öğrencilerle rehberlik görüşmelerinin ikinci dönemde düzenli biçimde sürdürülmesini önerdi.'
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
      'Birinci dönem sınav ve değerlendirme sonuçlarını analiz ederek belirlenen konu eksiklerini paylaştı.',
      'Birinci dönem sonuçları doğrultusunda ikinci dönem değerlendirme yaklaşımının gözden geçirilmesini önerdi.',
      'Birinci dönemde sınav kaygısı yaşayan öğrencilerin ikinci dönemde desteklenmesini önemli buldu.'
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
      'Birinci dönemde yürütülen veli iletişimini ve okul-aile iş birliğini değerlendirdi.',
      'Birinci dönemde iletişim kurulamayan velilere ikinci dönemde farklı kanallarla ulaşılmasını önerdi.',
      'Birinci dönem karne sonuçları hakkında velilerle bireysel görüşmeler yapılmasını yararlı buldu.'
    ],
    suggestions: [
      'birinci dönemde iletişim kurulamayan velilere ikinci dönemde farklı kanallarla ulaşılması',
      'birinci dönem sonuçları hakkında velilerle bireysel görüşmeler yapılması',
      'ikinci dönemde veli bilgilendirme toplantısının yenilenmesi'
    ],
    decisions: [
      'Birinci dönemde iletişim kurulamayan velilere ulaşılmasına ve öğrenci gelişimi açısından gerekli görülen durumlarda ikinci dönemde velilerle bireysel görüşmeler yapılmasına karar verildi.'
    ]
  },
  'destekleme': {
    intros: [
      'İkinci dönem destekleme ve yetiştirme çalışmalarıyla ilgili olarak',
      'Birinci dönem destek çalışmalarının sonuçları bakımından'
    ],
    observations: [
      'Birinci dönemde yürütülen destekleme ve yetiştirme çalışmalarının sonuçlarını değerlendirdi.',
      'Birinci dönemde gelişim gösteren öğrencilerin ikinci dönemde de izlenmesini önerdi.',
      'Destek çalışmalarının birinci dönem sonuçlarına göre güncellenmesini yararlı buldu.'
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
      'Birinci dönemde alınan kararların uygulanma durumunu gözden geçirerek ikinci dönem hedeflerini değerlendirdi.',
      'Birinci dönemde elde edilen sonuçların ikinci dönem planlamasına temel oluşturmasını önerdi.',
      'İkinci dönemde sürdürülecek çalışmaların sorumluluk ve zamanlama bakımından netleştirilmesini önemli buldu.',
      'Birinci dönem deneyimlerinden yararlanılarak uygulanabilir adımlara öncelik verilmesini önerdi.'
    ],
    suggestions: [
      'birinci dönemde alınan kararların uygulanma durumunun değerlendirilmesi',
      'ikinci dönem hedeflerinin birinci dönem sonuçlarına göre belirlenmesi',
      'ikinci dönem çalışmalarına ilişkin sorumluluk ve zamanlamanın netleştirilmesi',
      'uygulama sonuçlarının dönem içinde belirli aralıklarla gözden geçirilmesi'
    ],
    decisions: [
      'Birinci dönemde alınan kararların gözden geçirilerek uygulanmaya devam edilmesine ve ikinci dönem hedeflerinin belirlenmesine karar verildi.',
      'İkinci dönem çalışmalarına ilişkin sorumluluk ve zamanlamanın açık biçimde belirlenmesine karar verildi.'
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
      'Sınıfın eğitim öğretim yılı boyunca gösterdiği akademik gelişimi ve yıl sonu sonuçlarını birlikte değerlendirdi.',
      'Yıl içinde alınan kararların ve yürütülen çalışmaların akademik sonuçlara katkısını gözden geçirdi.',
      'Gelişim gösteren öğrencilerle desteğe ihtiyaç duymaya devam eden öğrencilerin durumlarını ayrı ayrı ele aldı.',
      'Yıl sonu sonuçlarının gelecek yıl yapılacak çalışmalara yön vereceğini belirtti.'
    ],
    suggestions: [
      'yıl sonu başarı sonuçlarının gelecek yıl planlamasında değerlendirilmesi',
      'yıl boyunca desteğe ihtiyaç duyan öğrencilerin destek gereksinimlerinin gelecek yıl için kayıt altına alınması',
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
      'Öğrencilerin yıl boyunca devam durumlarını ve devamsızlığın öğrenme sürecine etkisini değerlendirdi.',
      'Devamsızlık nedeniyle sınıf tekrarı riski oluşan öğrencilerin kayıtlar üzerinden belirlenmesini önerdi.',
      'Yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarını gözden geçirdi.'
    ],
    suggestions: [
      'yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının değerlendirilmesi',
      'devamsızlık eğilimi süren öğrencilerin devam durumlarının gelecek yıl için kayıt altına alınması',
      'devamsızlığın azaltılmasında etkili olan uygulamaların gelecek yıl sürdürülmesi'
    ],
    decisions: [
      'Yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının değerlendirilerek etkili uygulamaların gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Öğrencilerin yıl sonundaki davranışsal ve sosyal gelişimleri hakkında',
      'Eğitim öğretim yılı boyunca davranış ve disiplin durumu bakımından'
    ],
    observations: [
      'Öğrencilerin yıl boyunca gösterdiği davranışsal ve sosyal gelişimi genel olarak değerlendirdi.',
      'Yıl başında belirlenen sınıf kurallarının uygulanma düzeyini gözden geçirdi.',
      'Olumlu davranış gelişimi gösteren öğrencilerin ilerlemelerinin kayıt altına alınmasını yararlı buldu.'
    ],
    suggestions: [
      'yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilmesi',
      'davranış açısından gelişime ihtiyaç duyan öğrencilerin gelişim durumlarının gelecek yıl için kayıt altına alınması',
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
      'Öğrencilerin yıl boyunca derse katılım ve motivasyon düzeylerinde gösterdiği gelişimi değerlendirdi.',
      'Yıl içinde uygulanan katılım artırıcı yöntemlerin sonuçlarını gözden geçirdi.'
    ],
    suggestions: [
      'yıl boyunca katılımı artırmada etkili olan yöntemlerin gelecek yıl sürdürülmesi',
      'motivasyon açısından desteğe ihtiyaç duyan öğrencilerin destek gereksinimlerinin gelecek yıl için kayıt altına alınması'
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
      'Öğrencilerin yıl boyunca gösterdiği sosyal-duygusal gelişimi ve yürütülen rehberlik çalışmalarını değerlendirdi.',
      'Yıl içinde rehberlik desteği alan öğrencilerin gelişimini gözden geçirdi.',
      'Gelecek yıl desteğe ihtiyaç duyabilecek öğrenciler için bilgi aktarımının planlanmasını önerdi.'
    ],
    suggestions: [
      'yıl boyunca yürütülen rehberlik çalışmalarının sonuçlarının değerlendirilmesi',
      'gelecek yıl desteğe ihtiyaç duyabilecek öğrencilerin destek gereksinimlerinin rehberlik servisi kayıtlarına alınması',
      'sosyal-duygusal gelişimi destekleyen etkili çalışmaların gelecek yıl sürdürülmesi'
    ],
    decisions: [
      'Yıl boyunca yürütülen rehberlik çalışmalarının değerlendirilerek desteğe ihtiyaç duyan öğrencilerin durumunun gelecek yıl için rehberlik servisiyle paylaşılmasına karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    intros: [
      'Yıl sonu ölçme ve değerlendirme sonuçları ile sınıf geçme durumları hakkında',
      'Eğitim öğretim yılı boyunca değerlendirme sonuçları bakımından'
    ],
    observations: [
      'Yıl sonu değerlendirme sonuçlarını ve öğrencilerin sınıf geçme durumlarını gözden geçirdi.',
      'Yıl boyunca kullanılan ölçme ve değerlendirme yöntemlerinin öğrenme sürecini ne ölçüde yansıttığını değerlendirdi.',
      'Yıl sonu sonuçlarının gelecek yılın değerlendirme planına katkı sağlayacağını belirtti.'
    ],
    suggestions: [
      'yıl sonu sonuçlarının ve sınıf geçme durumlarının değerlendirilmesi',
      'yıl boyunca etkili olan değerlendirme yöntemlerinin gelecek yıl sürdürülmesi',
      'başarı ortalaması düşük derslere ilişkin sonuçların gelecek yıl için kayıt altına alınması'
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
      'Eğitim öğretim yılı boyunca yürütülen veli iletişimini ve okul-aile iş birliğini değerlendirdi.',
      'Veli iş birliğinin öğrenci gelişimine sağladığı katkıyı gözden geçirdi.',
      'İletişimde güçlük yaşanan veliler için gelecek yıl farklı yöntemler planlanmasını önerdi.'
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
      'Yıl boyunca yürütülen destekleme, yetiştirme ve bireysel takip çalışmalarının sonuçlarını değerlendirdi.',
      'Destek çalışmalarından yararlanan öğrencilerin gelişimini gözden geçirdi.',
      'Gelecek yıl desteğe ihtiyaç duyacak öğrenciler için bilgi aktarımı yapılmasını önerdi.'
    ],
    suggestions: [
      'yıl boyunca yürütülen destek çalışmalarının sonuçlarının değerlendirilmesi',
      'etkili olan destek uygulamalarının gelecek yıl sürdürülmesi',
      'gelecek yıl desteğe ihtiyaç duyacak öğrencilerin destek gereksinimlerinin kayıt altına alınması'
    ],
    decisions: [
      'Yıl boyunca yürütülen destekleme ve yetiştirme çalışmalarının değerlendirilerek etkili uygulamaların ve öğrencilerin destek gereksinimlerine ilişkin bilgilerin gelecek yıla aktarılmasına karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Yıl içinde alınan kararların sonuçlarını değerlendirerek gelecek eğitim öğretim yılına yönelik önerileri ele aldı.',
      'Eğitim öğretim yılı genelinden çıkarılan sonuçlarla gelecek yıl için bir yol haritası oluşturulmasını yararlı buldu.',
      'Yıl boyunca etkili olan uygulamalar ile geliştirilmesi gereken alanları birlikte gözden geçirdi.',
      'Kurul deneyimlerinin sonraki planlama çalışmalarına somut önerilerle aktarılmasını önemli buldu.'
    ],
    suggestions: [
      'yıl içinde alınan kararların sonuçlarının değerlendirilmesi',
      'gelecek eğitim öğretim yılına yönelik önerilerin belirlenmesi',
      'etkili bulunan uygulamaların sonraki planlama çalışmalarında dikkate alınması',
      'geliştirilmesi gereken alanlara ilişkin somut önerilerin kurul kayıtlarına alınması'
    ],
    decisions: [
      'Yıl içinde alınan kararların sonuçlarının değerlendirilerek gelecek eğitim öğretim yılına yönelik önerilerin bir sonraki şube öğretmenler kuruluna aktarılmasına karar verildi.',
      'Etkili bulunan uygulamalar ile geliştirilmesi gereken alanların kurul kayıtlarına alınmasına karar verildi.'
    ]
  }
};

// 12. sınıfların sene sonu toplantısında öğrenciler mezun olacağı için aynı
// şubenin "gelecek yıl" izleneceğini varsayan ifadeler bağlama aykırıdır.
// Aşağıdaki içerikler değerlendirmeyi mezuniyet sürecine ve okulun sonraki
// kurul çalışmalarına yöneltir; doğrulanmamış öğrenci durumları da üretmez.
const mezuniyetSeneSonu: CategoryMap = {
  'akademik-basari': {
    observations: [
      'Sınıfın eğitim öğretim yılı boyunca gösterdiği akademik gelişimi ve yıl sonu sonuçlarını birlikte değerlendirdi.',
      'Yıl içinde yürütülen çalışmaların akademik sonuçlara katkısını gözden geçirdi.',
      'Öğrencilerin ders bazındaki güçlü ve gelişime açık yönlerini yıl sonu verileri üzerinden ele aldı.',
      'Yıl sonu sonuçlarını öğrencilerin mezuniyet sonrası eğitim ve meslek planlarına geçişleri bakımından değerlendirdi.'
    ],
    suggestions: [
      'yıl sonu başarı sonuçlarının öğrencilerin mezuniyet durumlarıyla birlikte değerlendirilmesi',
      'öğrencilerin mezuniyet sonrası eğitim ve meslek planlarında yararlanabilecekleri kaynaklar konusunda bilgilendirilmesi',
      'yıl boyunca etkili olan öğretim uygulamalarının sonraki sınıfların planlanmasında dikkate alınması',
      'ders bazındaki sonuçların kurulun genel değerlendirmesine veri sağlaması'
    ],
    decisions: [
      'Yıl sonu akademik başarı sonuçlarının öğrencilerin mezuniyet durumlarıyla birlikte değerlendirilmesine karar verildi.',
      'Öğrencilerin mezuniyet sonrası eğitim ve meslek planlarında yararlanabilecekleri rehberlik kaynakları hakkında bilgilendirilmesine karar verildi.'
    ]
  },
  devamsizlik: {
    observations: [
      'Öğrencilerin yıl boyunca devam durumlarını ve devamsızlığın öğrenme sürecine etkisini değerlendirdi.',
      'Devam kayıtlarını öğrencilerin mezuniyet koşullarıyla birlikte gözden geçirdi.',
      'Yıl boyunca uygulanan devamsızlığı önleyici çalışmaların sonuçlarını ele aldı.'
    ],
    suggestions: [
      'yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının değerlendirilmesi',
      'devam kayıtları ile mezuniyet koşullarının birlikte gözden geçirilmesi',
      'etkili bulunan devamsızlık önleme uygulamalarının kurul kayıtlarına alınması'
    ],
    decisions: [
      'Öğrencilerin devam kayıtlarının mezuniyet koşullarıyla birlikte gözden geçirilmesine karar verildi.',
      'Yıl boyunca uygulanan devamsızlık tedbirlerinin sonuçlarının kurul değerlendirmesine alınmasına karar verildi.'
    ]
  },
  'davranis-disiplin': {
    observations: [
      'Öğrencilerin yıl boyunca gösterdiği davranışsal ve sosyal gelişimi genel olarak değerlendirdi.',
      'Yıl başında belirlenen sınıf kurallarının uygulanma düzeyini gözden geçirdi.',
      'Olumlu davranış gelişimi gösteren öğrencilerin yıl içindeki ilerlemelerini ele aldı.'
    ],
    suggestions: [
      'yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilmesi',
      'öğrencilerin mezuniyet sürecinde sorumluluk ve saygı ilkeleri konusunda desteklenmesi',
      'olumlu sonuç veren uygulamaların sonraki kurul çalışmalarında paylaşılması'
    ],
    decisions: [
      'Yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilmesine karar verildi.',
      'Olumlu sonuç veren uygulamaların sonraki kurul çalışmalarında paylaşılmasına karar verildi.'
    ]
  },
  'motivasyon-katilim': {
    observations: [
      'Öğrencilerin yıl boyunca derse katılım ve motivasyon düzeylerinde gösterdiği gelişimi değerlendirdi.',
      'Yıl içinde uygulanan katılım artırıcı yöntemlerin sonuçlarını gözden geçirdi.',
      'Mezuniyet ve sınav sürecindeki motivasyon ihtiyaçlarını genel çerçevede ele aldı.'
    ],
    suggestions: [
      'yıl boyunca katılımı artırmada etkili olan yöntemlerin değerlendirilmesi',
      'öğrencilerin mezuniyet ve sınav sürecinde yararlanabilecekleri destek kaynakları konusunda bilgilendirilmesi',
      'etkili katılım uygulamalarının sonraki sınıfların planlanmasında dikkate alınması'
    ],
    decisions: [
      'Yıl boyunca derse katılımı artırmada etkili olan yöntemlerin kurul değerlendirmesine alınmasına karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    observations: [
      'Öğrencilerin yıl boyunca gösterdiği sosyal-duygusal gelişimi ve yürütülen rehberlik çalışmalarını değerlendirdi.',
      'Yıl içinde sunulan rehberlik desteğinin genel sonuçlarını gözden geçirdi.',
      'Mezuniyet sonrası geçiş sürecinde öğrencilerin yararlanabileceği destek kaynaklarını ele aldı.'
    ],
    suggestions: [
      'yıl boyunca yürütülen rehberlik çalışmalarının sonuçlarının değerlendirilmesi',
      'öğrencilerin mezuniyet sonrası geçiş sürecinde yararlanabilecekleri destek kaynakları konusunda bilgilendirilmesi',
      'rehberlik çalışmalarından edinilen deneyimlerin kurul kayıtlarına alınması'
    ],
    decisions: [
      'Yıl boyunca yürütülen rehberlik çalışmalarının sonuçlarının değerlendirilmesine karar verildi.',
      'Öğrencilerin mezuniyet sonrası geçiş sürecinde yararlanabilecekleri destek kaynakları hakkında bilgilendirilmesine karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    observations: [
      'Yıl sonu değerlendirme sonuçlarını, öğrencilerin sınıf geçme ve mezuniyet durumlarıyla birlikte gözden geçirdi.',
      'Yıl boyunca kullanılan ölçme ve değerlendirme yöntemlerinin öğrenme sürecini ne ölçüde yansıttığını değerlendirdi.',
      'Ders bazındaki sonuçların ortak ölçütler doğrultusunda ele alınmasını önemli buldu.'
    ],
    suggestions: [
      'yıl sonu sonuçları ile sınıf geçme ve mezuniyet durumlarının birlikte değerlendirilmesi',
      'yıl boyunca kullanılan değerlendirme yöntemlerinin etkililiğinin gözden geçirilmesi',
      'ders bazındaki sonuçların ortak ölçütler doğrultusunda kurul kayıtlarına alınması'
    ],
    decisions: [
      'Yıl sonu sonuçlarının öğrencilerin sınıf geçme ve mezuniyet durumlarıyla birlikte gözden geçirilmesine karar verildi.',
      'Kullanılan ölçme ve değerlendirme yöntemlerinin etkililiğinin kurul tarafından değerlendirilmesine karar verildi.'
    ]
  },
  'veli-iletisim': {
    observations: [
      'Eğitim öğretim yılı boyunca yürütülen veli iletişimini ve okul-aile iş birliğini değerlendirdi.',
      'Veli iş birliğinin öğrenci gelişimine sağladığı katkıyı gözden geçirdi.',
      'Mezuniyet sürecine ilişkin bilgilendirmenin açık ve zamanında yürütülmesini önemli buldu.'
    ],
    suggestions: [
      'yıl boyunca yürütülen veli iş birliğinin sonuçlarının değerlendirilmesi',
      'mezuniyet sürecine ilişkin gerekli bilgilendirmenin velilerle açık biçimde paylaşılması',
      'etkili bulunan iletişim yöntemlerinin kurul kayıtlarına alınması'
    ],
    decisions: [
      'Mezuniyet sürecine ilişkin gerekli bilgilendirmenin velilerle açık ve zamanında paylaşılmasına karar verildi.',
      'Yıl boyunca yürütülen veli iş birliğinin sonuçlarının değerlendirilmesine karar verildi.'
    ]
  },
  destekleme: {
    observations: [
      'Yıl boyunca yürütülen destekleme, yetiştirme ve bireysel takip çalışmalarının sonuçlarını değerlendirdi.',
      'Destek çalışmalarından yararlanan öğrencilerin yıl içindeki gelişimini gözden geçirdi.',
      'Mezuniyet sonrası eğitim ve sınav sürecinde yararlanılabilecek destek kaynaklarını ele aldı.'
    ],
    suggestions: [
      'yıl boyunca yürütülen destek çalışmalarının sonuçlarının değerlendirilmesi',
      'öğrencilerin mezuniyet sonrası yararlanabilecekleri çalışma ve rehberlik kaynakları konusunda bilgilendirilmesi',
      'etkili bulunan destek uygulamalarının kurul kayıtlarına alınması'
    ],
    decisions: [
      'Yıl boyunca yürütülen destekleme ve yetiştirme çalışmalarının sonuçlarının değerlendirilmesine karar verildi.',
      'Öğrencilerin mezuniyet sonrası yararlanabilecekleri çalışma ve rehberlik kaynakları hakkında bilgilendirilmesine karar verildi.'
    ]
  },
  genel: {
    observations: [
      'Yıl içinde alınan kararların sonuçlarını ve kurul çalışmalarına katkısını değerlendirdi.',
      'Eğitim öğretim yılı genelinden çıkarılan sonuçların sonraki kurul çalışmalarına aktarılmasını yararlı buldu.',
      'Mezuniyet sürecine ilişkin tamamlanması gereken ortak çalışmaları gözden geçirdi.'
    ],
    suggestions: [
      'yıl içinde alınan kararların sonuçlarının değerlendirilmesi',
      'kurul deneyimlerinin sonraki sınıf ve toplantı planlamalarında kullanılması',
      'mezuniyet sürecine ilişkin ortak çalışmaların tamamlanması'
    ],
    decisions: [
      'Yıl içinde alınan kararların sonuçlarının kurul kayıtlarına alınmasına karar verildi.',
      'Kurul çalışmalarından edinilen deneyimlerin sonraki sınıf ve toplantı planlamalarında değerlendirilmesine karar verildi.',
      'Mezuniyet sürecine ilişkin ortak çalışmaların zamanında tamamlanmasına karar verildi.'
    ]
  }
};

const periodContent: Record<MeetingPeriod, CategoryMap> = {
  'kasim': seneBasi,
  'nisan': ikinciDonem,
  'sene-sonu': seneSonu
};

const dilekTemennileri: Record<MeetingPeriod, PeriodCategoryContent> = {
  'kasim': {
    intros: [
      'Yeni eğitim öğretim yılına ilişkin dilek ve temenniler kapsamında',
      'Yıl boyunca sürdürülecek ortak çalışmalar hakkında'
    ],
    observations: [
      'Yeni eğitim öğretim yılının sağlık, başarı ve verimli bir iş birliği içinde geçmesini diledi.',
      'Öğretmenler arasındaki düzenli iletişimin öğrenci gelişimine katkı sağlayacağını belirtti.',
      'Kurul üyelerinin ortak hedefler doğrultusunda verimli çalışmalar yürütmesine ilişkin temennilerini paylaştı.'
    ],
    suggestions: [
      'yeni eğitim öğretim yılında öğretmenler arası dayanışmanın sürdürülmesi',
      'yıl başında belirlenen ortak hedeflerin iş birliği içinde izlenmesi',
      'kurul üyeleri arasındaki düzenli bilgi paylaşımının sürdürülmesi'
    ],
    decisions: []
  },
  'nisan': {
    intros: [
      'İkinci döneme ilişkin dilek ve temenniler kapsamında',
      'Birinci dönemden edinilen deneyimlerin ardından'
    ],
    observations: [
      'İkinci dönemin öğrenciler ve okul toplumu için sağlık, başarı ve verimlilik içinde geçmesini diledi.',
      'Birinci dönemde kurulan iş birliğinin ikinci dönemde güçlendirilerek sürdürülmesini yararlı buldu.',
      'Kurul üyelerinin ikinci dönem hedefleri doğrultusunda verimli çalışmalar yürütmesine ilişkin temennilerini paylaştı.'
    ],
    suggestions: [
      'birinci dönemde alınan kararların ikinci dönemde iş birliği içinde uygulanması',
      'ikinci dönem boyunca öğretmenler arası iletişim ve dayanışmanın sürdürülmesi',
      'ikinci dönem hedeflerinin düzenli bilgi paylaşımıyla izlenmesi'
    ],
    decisions: []
  },
  'sene-sonu': {
    intros: [
      'Eğitim öğretim yılının tamamlanmasına ilişkin dilek ve temenniler kapsamında',
      'Yıl sonundaki ortak değerlendirmelerin ardından'
    ],
    observations: [
      'Yıl boyunca yürütülen çalışmalar için kurul üyelerine teşekkür ederek gelecek eğitim öğretim yılına ilişkin iyi dileklerini paylaştı.',
      'Öğrencilerin elde ettiği kazanımların gelecek yıl da iş birliği içinde desteklenmesini diledi.',
      'Kurul üyelerine katkıları için teşekkür ederek sağlıklı ve verimli bir tatil dönemi diledi.'
    ],
    suggestions: [
      'yıl boyunca edinilen deneyimlerin gelecek eğitim öğretim yılına aktarılması',
      'gelecek yıl da öğrenci yararını gözeten ortak çalışmaların sürdürülmesi',
      'kurul deneyimlerinin sonraki çalışmalarda paylaşılması'
    ],
    decisions: []
  }
};

const mezuniyetDilekTemennileri: PeriodCategoryContent = {
  intros: [
    'Mezuniyet dönemine ilişkin dilek ve temenniler kapsamında',
    'Yıl sonundaki ortak değerlendirmelerin ardından'
  ],
  observations: [
    'Yıl boyunca yürütülen çalışmalar için kurul üyelerine teşekkür ederek öğrencilere mezuniyet sonrası yaşamlarında başarı diledi.',
    'Öğrencilerin eğitim ve meslek yaşamlarına sağlıklı, güvenli ve umutlu bir başlangıç yapmalarını diledi.',
    'Kurul üyelerinin yıl boyunca sürdürdüğü iş birliğinin öğrencilerin gelişimine katkı sağladığını belirtti.'
  ],
  suggestions: [
    'öğrencilere mezuniyet sonrası yaşamlarında başarı dileklerinin iletilmesi',
    'yıl boyunca edinilen kurul deneyimlerinin sonraki çalışmalarda paylaşılması',
    'mezuniyet sürecindeki öğrencilere gerekli bilgilendirmenin yapılması'
  ],
  decisions: []
};

// Belirli bir dönem ve kategori için döneme özgü içeriği döndürür. Kategori
// bulunamazsa 'genel' havuzuna düşer; o da yoksa boş içerik döner.
export const getPeriodContent = (
  period: MeetingPeriod,
  category: string,
  gradeLevel?: number
): PeriodCategoryContent => {
  if (category === 'dilek-temenniler') {
    if (period === 'sene-sonu' && gradeLevel === 12) {
      return mezuniyetDilekTemennileri;
    }
    return dilekTemennileri[period] ?? dilekTemennileri['kasim'];
  }
  const map = periodContent[period] ?? seneBasi;
  const base = map[category] ?? map['genel'] ?? {};
  if (period === 'sene-sonu' && gradeLevel === 12) {
    return { ...base, ...(mezuniyetSeneSonu[category] ?? mezuniyetSeneSonu.genel) };
  }
  return base;
};
