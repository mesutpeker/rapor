import type { MeetingPeriod } from '../types';

// Döneme ÖZGÜ konuşma ve karar içeriği.
//
// categorySpeechContent.ts konunun genel (dönemden bağımsız) içeriğini taşır;
// bu dosya ise aynı konuya toplantının yapıldığı zamanın bakış açısını katar:
//  - kasim       : birinci dönemin ortası — dönem başından bu yana yapılan
//                  gözlemler ve ilk sınav sonuçları değerlendirilir, dönemin
//                  kalan bölümü planlanır.
//  - nisan       : ikinci dönemin ortası — birinci dönem sonuçları ile ikinci
//                  dönemin ilk sonuçları değerlendirilir, ders yılı sonuna
//                  kadar yapılacak çalışmalar belirlenir.
//  - sene-sonu   : yıl geneli değerlendirilir, sonraki yıla öneri aktarılır
//                  (12. sınıflarda mezuniyet bakış açısı kullanılır).
//
// Bir dönem için konuya özgü içerik tanımlı değilse generateMinutes konunun
// dönemden bağımsız havuzunu (categorySpeechContent.ts) kullanır.

export interface PeriodCategoryContent {
  // Konuya özgü giriş cümlesi (akademik olmayan maddelerde kullanılır).
  intros?: string[];
  // Öğretmenin özne olduğu tam cümleler (doğrudan eklenir).
  observations?: string[];
  // Öneri ad öbekleri ("<öneri>sını önerdi." gibi kalıplara oturur; -ması/-mesi
  // ile bitmelidir).
  suggestions?: string[];
  // "...karar verildi." biçiminde tam karar cümleleri.
  decisions?: string[];
}

type CategoryMap = Record<string, PeriodCategoryContent>;

// ════════════════════════════════════════════════════════════════
// KASIM — birinci dönemin ortası
// ════════════════════════════════════════════════════════════════
const kasim: CategoryMap = {
  'akademik-basari': {
    intros: [
      'Dönem başından bu yana yapılan gözlemler ve ilk sınav sonuçları hakkında',
      'Öğrencilerin birinci dönemdeki akademik durumu bakımından',
      'İlk ölçme sonuçlarının ortaya koyduğu başarı durumu açısından'
    ],
    observations: [
      'Dönem başından bu yana yapılan gözlemleri ve ilk sınav sonuçlarını birlikte değerlendirdi.',
      'İlk sınav sonuçlarında öne çıkan kazanım eksikliklerinin dönem bitmeden giderilmesine öncelik verilmesini önerdi.',
      'Sınıfın birinci dönem akademik hedeflerinin ilk sonuçlara göre gözden geçirilmesini yararlı buldu.',
      'Öğrencilerin güçlü ve gelişime açık yönlerinin ders bazında izlenmesinin çalışma planlarına yön vereceğini belirtti.'
    ],
    suggestions: [
      'ilk sınav sonuçlarına göre desteğe ihtiyaç duyan öğrencilerin belirlenmesi',
      'kazanım eksikliklerinin dönem sonuna kadar tamamlanmasına yönelik plan oluşturulması',
      'sınıfın birinci dönem akademik hedeflerinin ilk sonuçlara göre güncellenmesi',
      'öğrencilerin akademik gelişiminin dönem sonuna kadar düzenli aralıklarla izlenmesi'
    ],
    decisions: [
      'İlk sınav sonuçlarına göre belirlenen kazanım eksikliklerinin dönem sonuna kadar giderilmesine yönelik çalışma planı oluşturulmasına karar verildi.',
      'Desteğe ihtiyaç duyan öğrencilerin ders öğretmenlerince belirlenerek dönem sonuna kadar düzenli olarak izlenmesine karar verildi.'
    ]
  },
  'devamsizlik': {
    intros: [
      'Dönem başından bu yana tutulan devam kayıtları hakkında',
      'Devamsızlığın önlenmesine yönelik tedbirler bakımından'
    ],
    observations: [
      'Dönem başından bu yana tutulan devam kayıtlarını değerlendirerek devamsızlığı artma eğilimi gösteren öğrencilerin yakından izlenmesini önerdi.',
      'Devam takibinin düzenli ve kayıtlı biçimde sürdürülmesini önemli buldu.',
      'Devamsızlık yapan öğrencilerin kaçırdıkları konuların dönem içinde telafi edilmesini yararlı buldu.'
    ],
    suggestions: [
      'devamsızlığı artan öğrencilerin velileriyle gecikmeden görüşülmesi',
      'devam durumunun dönem sonuna kadar düzenli olarak izlenmesi',
      'devamsızlık nedeniyle oluşan konu eksikleri için telafi çalışmaları planlanması'
    ],
    decisions: [
      'Devamsızlığı artan öğrencilerin velileriyle gecikmeden görüşülmesine ve devam durumunun düzenli olarak izlenmesine karar verildi.',
      'Devamsızlık nedeniyle konu eksiği oluşan öğrenciler için dönem içinde telafi çalışmaları yapılmasına karar verildi.'
    ]
  },
  'davranis-disiplin': {
    intros: [
      'Öğrencilerin dönem başından bu yana gözlenen davranış ve tutumları hakkında',
      'Sınıf kurallarına uyum ve sınıf düzeni bakımından'
    ],
    observations: [
      'Dönem başında belirlenen sınıf kurallarının uygulanma düzeyini gözden geçirdi.',
      'Kuralların bütün derslerde tutarlı biçimde uygulanmasının olumlu bir öğrenme ortamını destekleyeceğini belirtti.',
      'Olumlu davranışların zamanında fark edilip takdir edilmesinin disiplin sorunlarını azaltacağını ifade etti.'
    ],
    suggestions: [
      'sınıf kurallarının öğrencilerle birlikte gözden geçirilerek tutarlı biçimde uygulanması',
      'davranış açısından desteğe ihtiyaç duyan öğrencilerle bireysel görüşmeler yapılması',
      'olumlu davranışların pekiştirilmesine yönelik ortak bir yaklaşım benimsenmesi'
    ],
    decisions: [
      'Sınıf kurallarının öğrencilerle birlikte gözden geçirilerek bütün derslerde tutarlı biçimde uygulanmasına karar verildi.',
      'Davranış açısından desteğe ihtiyaç duyan öğrencilerle rehberlik servisi iş birliğinde bireysel görüşmeler yapılmasına karar verildi.'
    ]
  },
  'motivasyon-katilim': {
    intros: [
      'Öğrencilerin dönem başından bu yana gözlenen derse katılım ve motivasyon düzeyleri hakkında',
      'Derse katılımın artırılması bakımından'
    ],
    observations: [
      'Öğrencilerin dönem başından bu yana gözlenen derse katılım düzeylerini değerlendirdi.',
      'Öğrencilerin ilgi alanlarıyla ilişkilendirilen etkinliklerin katılımı artıracağını belirtti.',
      'Derse katılımı düşük öğrencilerin erken fark edilerek desteklenmesini önemli buldu.'
    ],
    suggestions: [
      'derse katılımı düşük öğrencilerin belirlenerek bireysel olarak desteklenmesi',
      'derse katılımı artıracak yöntemlerin çeşitlendirilmesi',
      'öğrencilerde başarı duygusunu yaşatacak küçük hedeflerin belirlenmesi'
    ],
    decisions: [
      'Derse katılımı düşük öğrencilerin belirlenerek katılımı artıracak yöntemlerin uygulanmasına karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    intros: [
      'Öğrencilerin sosyal ve duygusal ihtiyaçları hakkında',
      'Sınıftaki akran ilişkileri ve rehberlik ihtiyaçları bakımından'
    ],
    observations: [
      'Öğrencilerin sosyal-duygusal durumlarına ve rehberlik ihtiyaçlarına ilişkin gözlemlerini paylaştı.',
      'Sınıfta sağlıklı akran ilişkilerini destekleyecek çalışmaların sürdürülmesini yararlı buldu.',
      'Bireysel destek gereksinimlerinin somut gözlemler ve rehberlik kayıtları doğrultusunda değerlendirilmesini önerdi.'
    ],
    suggestions: [
      'rehberlik ihtiyacı gözlenen öğrencilerin rehberlik servisiyle birlikte izlenmesi',
      'sınıf içinde akran ilişkilerini güçlendirici etkinlikler düzenlenmesi',
      'öğrencilerin bireysel destek gereksinimlerinin somut gözlem ve kayıtlar doğrultusunda değerlendirilmesi'
    ],
    decisions: [
      'Rehberlik ihtiyacı gözlenen öğrencilerin rehberlik servisiyle iş birliği içinde izlenmesine karar verildi.',
      'Sınıf içinde akran ilişkilerini güçlendirici etkinlikler planlanmasına karar verildi.'
    ]
  },
  'olcme-degerlendirme': {
    intros: [
      'Dönem içinde yapılan ilk sınavlar ve değerlendirme çalışmaları hakkında',
      'Sınav takvimi ve değerlendirme yaklaşımı bakımından'
    ],
    observations: [
      'İlk sınav sonuçlarını analiz ederek belirlenen konu eksiklerini paylaştı.',
      'Değerlendirmelerin yalnızca not vermek için değil, öğrenme eksiklerini erken belirlemek için de kullanılmasını önerdi.',
      'Dönemin kalan bölümündeki sınav ve değerlendirme çalışmalarının ortak ölçütlerle planlanmasını önemli buldu.'
    ],
    suggestions: [
      'ilk sınav sonuçlarının kazanım bazında analiz edilmesi',
      'öğrenme eksikliklerini erken belirleyecek kısa kazanım kontrollerinin yapılması',
      'dönemin kalan bölümündeki sınav ve değerlendirme çalışmalarının ortak ölçütlerle planlanması'
    ],
    decisions: [
      'İlk sınav sonuçlarının kazanım bazında analiz edilerek belirlenen eksikliklere yönelik tamamlayıcı çalışmalar yapılmasına karar verildi.'
    ]
  },
  'veli-iletisim': {
    intros: [
      'Dönem başından bu yana yürütülen veli iletişimi hakkında',
      'Okul-aile iş birliğinin güçlendirilmesi bakımından'
    ],
    observations: [
      'Dönem başından bu yana yürütülen veli görüşmelerini ve okul-aile iş birliğini değerlendirdi.',
      'İlk sınav sonuçları hakkında velilerin zamanında bilgilendirilmesini yararlı buldu.',
      'İletişim kurulamayan velilere farklı kanallarla ulaşılmasını önerdi.'
    ],
    suggestions: [
      'ilk sınav sonuçları hakkında velilerin bilgilendirilmesi',
      'gerekli görülen durumlarda velilerle bireysel görüşmeler yapılması',
      'iletişim kurulamayan velilere farklı kanallarla ulaşılması'
    ],
    decisions: [
      'İlk sınav sonuçları hakkında velilerin bilgilendirilmesine ve gerekli görülen durumlarda bireysel veli görüşmeleri yapılmasına karar verildi.'
    ]
  },
  'destekleme': {
    intros: [
      'Destekleme, yetiştirme ve bireysel takip çalışmaları hakkında',
      'Desteğe ihtiyaç duyan öğrencilerin belirlenmesi bakımından'
    ],
    observations: [
      'İlk sınav sonuçlarına göre desteğe ihtiyaç duyan öğrencilerin belirlenerek bireysel takip planlarının hazırlanmasını önemli buldu.',
      'Destekleme ve yetiştirme çalışmalarının öğrenci ihtiyaçlarına göre düzenlenmesini yararlı buldu.',
      'Kazanım eksiklerinin dönem içindeki destek çalışmalarında öncelikle ele alınmasını önerdi.'
    ],
    suggestions: [
      'desteğe ihtiyaç duyan öğrencilerin ilk sınav sonuçlarına göre belirlenmesi',
      'bireysel çalışma planlarının öğrenci ihtiyaçlarına göre hazırlanması',
      'destekleme ve yetiştirme kurslarına katılımın düzenli olarak izlenmesi'
    ],
    decisions: [
      'Desteğe ihtiyaç duyan öğrencilerin ilk sınav sonuçlarına göre belirlenerek bireysel takip ve çalışma planlarının oluşturulmasına karar verildi.'
    ]
  },
  // 10-12. sınıflarda bir önceki kurul, geçen eğitim öğretim yılının son
  // toplantısıdır; 9. sınıflarda bu madde varsayılan olarak kapalıdır.
  'onceki-kararlar': {
    intros: [
      'Bir önceki şube öğretmenler kurulunda alınan kararlar hakkında',
      'Geçen eğitim öğretim yılında alınan kararların bu döneme yansıması bakımından'
    ],
    observations: [
      'Bir önceki toplantıda alınan kararlardan geçerliliğini koruyanları değerlendirdi.',
      'Geçen eğitim öğretim yılında alınan kararlardan uygulanması süren çalışmaları gözden geçirdi.',
      'Önceki kararların sınıfın bu dönemki durumu dikkate alınarak güncellenmesini önerdi.',
      'Önceki toplantıda kararlaştırılan çalışmalardan sonuç alınanların bu dönemde de sürdürülmesini yararlı buldu.',
      'Uygulanamayan kararların nedenlerinin belirlenerek dönem planlamasında dikkate alınmasını önemli buldu.'
    ],
    suggestions: [
      'önceki toplantıda alınan kararlardan geçerliliğini koruyanların bu dönemde de uygulanması',
      'uygulanamayan kararların nedenleriyle birlikte yeniden ele alınması',
      'önceki kararların sınıfın bu dönemki ihtiyaçlarına göre güncellenmesi',
      'önceki toplantıdan devreden kararlar için sorumluların belirlenmesi'
    ],
    decisions: [
      'Bir önceki toplantıda alınan kararlardan geçerliliğini koruyanların bu dönemde de uygulanmasına karar verildi.',
      'Uygulanamayan kararların nedenleri belirlenerek dönem içinde yeniden ele alınmasına karar verildi.',
      'Önceki toplantıdan devreden çalışmaların sonuçlarının nisan ayındaki toplantıda değerlendirilmesine karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Gündem maddesine ilişkin mevcut durumu ve dönem başından bu yana yapılan çalışmaları değerlendirdi.',
      'Belirlenecek adımların dönem sonuna kadar düzenli aralıklarla izlenmesini önerdi.',
      'Gündem maddesine ilişkin sorumlulukların ve uygulama takviminin netleştirilmesini önemli buldu.',
      'Planlanan çalışmaların öğrenci yararı ve uygulanabilirlik bakımından birlikte ele alınmasını önerdi.',
      'Konuya ilişkin ortak bir yaklaşım benimsenmesinin uygulamada birlik sağlayacağını belirtti.',
      'Yapılacak çalışmaların sonuçlarının nisan ayındaki toplantıda yeniden ele alınmasını yararlı buldu.'
    ],
    suggestions: [
      'konuya ilişkin hedeflerin açık biçimde belirlenmesi',
      'belirlenen hedeflerin dönem sonuna kadar düzenli olarak izlenmesi',
      'sorumlulukların ve uygulama takviminin açık biçimde belirlenmesi',
      'planlanan çalışmaların belirli aralıklarla kurul üyelerince gözden geçirilmesi',
      'konuya ilişkin ortak bir yaklaşım benimsenmesi',
      'çalışma sonuçlarının nisan ayındaki toplantıda değerlendirilmesi'
    ],
    decisions: [
      'Konuya ilişkin hedeflerin belirlenmesine ve dönem sonuna kadar düzenli olarak izlenmesine karar verildi.',
      'Gündem maddesine ilişkin sorumlulukların ve uygulama takviminin açık biçimde belirlenmesine karar verildi.',
      'Konuya ilişkin çalışmaların sonuçlarının nisan ayındaki toplantıda değerlendirilmesine karar verildi.',
      'Konuya ilişkin ortak bir yaklaşımın bütün derslerde uygulanmasına karar verildi.'
    ]
  }
};

// ════════════════════════════════════════════════════════════════
// NİSAN — ikinci dönemin ortası
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
      'Birinci dönemde alınan kararların başarıya etkisini değerlendirerek ikinci dönem hedeflerinin güncellenmesini önerdi.',
      'Birinci dönem sonuçları ile ikinci dönemin ilk sınav sonuçlarını karşılaştırarak öğrencilerin gelişimini değerlendirdi.'
    ],
    suggestions: [
      'birinci dönemde başarısı düşen öğrenciler için ikinci dönemde bireysel takip yapılması',
      'birinci dönem kazanım eksikliklerinin ikinci dönemde tamamlanması',
      'ikinci dönem akademik hedeflerinin birinci dönem sonuçlarına göre güncellenmesi',
      'yıl sonu başarısı için ek desteğe ihtiyaç duyan öğrencilerin belirlenerek yakından izlenmesi'
    ],
    decisions: [
      'Birinci dönemde başarısı düşen öğrenciler için ikinci dönemde bireysel takip ve tamamlayıcı çalışmalar yapılmasına karar verildi.',
      'Birinci dönemde tespit edilen kazanım eksikliklerinin ikinci dönemde giderilmesine karar verildi.',
      'Yıl sonu başarısı için ek desteğe ihtiyaç duyan öğrencilerin belirlenerek ders yılı sonuna kadar yakından izlenmesine karar verildi.'
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
  'onceki-kararlar': {
    intros: [
      'Kasım ayı toplantısında alınan kararların uygulama sonuçları hakkında',
      'Birinci dönemde alınan kararların sınıfa yansımaları bakımından'
    ],
    observations: [
      'Kasım ayı toplantısında alınan kararların uygulanma durumunu gözden geçirerek ikinci dönem hedeflerini değerlendirdi.',
      'Birinci dönemde alınan kararlardan elde edilen sonuçların ikinci dönem planlamasına temel oluşturmasını önerdi.',
      'Uygulanması süren kararların sorumluluk ve zamanlama bakımından netleştirilmesini önemli buldu.',
      'Kararların uygulanmasında birinci dönemde edinilen deneyimlerden yararlanılmasını önerdi.',
      'Önceki toplantıda alınan kararların uygulama sonuçlarını gözden geçirdi.',
      'Sonuç alınamayan kararların nedenlerinin kurulda birlikte ele alınmasını yararlı buldu.'
    ],
    suggestions: [
      'birinci dönemde alınan kararların uygulanma durumunun değerlendirilmesi',
      'ikinci dönem hedeflerinin önceki kararların sonuçlarına göre belirlenmesi',
      'uygulanması süren kararlara ilişkin sorumluluk ve zamanlamanın netleştirilmesi',
      'kararların uygulama sonuçlarının dönem içinde belirli aralıklarla gözden geçirilmesi',
      'önceki toplantıda alınan kararlardan sonuç alınamayanların yeniden ele alınması'
    ],
    decisions: [
      'Birinci dönemde alınan kararların gözden geçirilerek uygulanmaya devam edilmesine ve ikinci dönem hedeflerinin belirlenmesine karar verildi.',
      'Uygulanması süren kararlara ilişkin sorumluluk ve zamanlamanın açık biçimde belirlenmesine karar verildi.',
      'Önceki toplantıda alınan kararlardan uygulanması süren çalışmaların ders yılı sonuna kadar izlenmesine karar verildi.',
      'Sonuç alınamayan kararların nedenleri belirlenerek ders yılı sonuna kadar yeniden ele alınmasına karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Gündem maddesine ilişkin mevcut durumu ve ikinci dönemde yürütülen çalışmaları değerlendirdi.',
      'Belirlenecek adımların ders yılı sonuna kadar düzenli aralıklarla izlenmesini önerdi.',
      'Gündem maddesine ilişkin sorumlulukların ve uygulama takviminin netleştirilmesini önemli buldu.',
      'Planlanan çalışmaların öğrenci yararı ve uygulanabilirlik bakımından birlikte ele alınmasını önerdi.',
      'Konuya ilişkin ortak bir yaklaşım benimsenmesinin uygulamada birlik sağlayacağını belirtti.',
      'Birinci dönem deneyimlerinin konuya ilişkin çalışmalarda dikkate alınmasını yararlı buldu.'
    ],
    suggestions: [
      'konuya ilişkin hedeflerin ders yılı sonuna kadar açık biçimde belirlenmesi',
      'belirlenen adımların ders yılı sonuna kadar düzenli olarak izlenmesi',
      'sorumlulukların ve uygulama takviminin açık biçimde belirlenmesi',
      'planlanan çalışmaların belirli aralıklarla kurul üyelerince gözden geçirilmesi',
      'konuya ilişkin ortak bir yaklaşım benimsenmesi'
    ],
    decisions: [
      'Konuya ilişkin hedeflerin belirlenmesine ve ders yılı sonuna kadar düzenli olarak izlenmesine karar verildi.',
      'Gündem maddesine ilişkin sorumlulukların ve uygulama takviminin açık biçimde belirlenmesine karar verildi.',
      'Konuya ilişkin ortak bir yaklaşımın bütün derslerde uygulanmasına karar verildi.',
      'Konuya ilişkin çalışmaların sonuçlarının yıl sonunda değerlendirilmesine karar verildi.'
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
      'Eğitim öğretim yılı boyunca tutulan devam kayıtları bakımından'
    ],
    observations: [
      'Öğrencilerin yıl boyunca tutulan devam kayıtlarını ve devamsızlığın öğrenme sürecine etkisini değerlendirdi.',
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
      'Eğitim öğretim yılı boyunca gözlenen davranış ve disiplin durumu bakımından'
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
      'Öğrencilerin yıl boyunca gösterdiği derse katılım ve motivasyon düzeyi hakkında',
      'Yıl sonu itibarıyla sınıf içi katılım bakımından'
    ],
    observations: [
      'Öğrencilerin yıl boyunca derse katılım ve motivasyon düzeylerinde gösterdiği gelişimi değerlendirdi.',
      'Yıl içinde uygulanan katılım artırıcı yöntemlerin sonuçlarını gözden geçirdi.',
      'Yıl içinde derse katılımı artan öğrencilerin gelişimini ele aldı.'
    ],
    suggestions: [
      'yıl boyunca katılımı artırmada etkili olan yöntemlerin gelecek yıl sürdürülmesi',
      'motivasyon açısından desteğe ihtiyaç duyan öğrencilerin destek gereksinimlerinin gelecek yıl için kayıt altına alınması',
      'öğrencilerin ilgi gösterdiği etkinlik türlerinin gelecek yıl planlamasında dikkate alınması'
    ],
    decisions: [
      'Yıl boyunca derse katılımı artırmada etkili olan yöntemlerin değerlendirilerek gelecek yıl sürdürülmesine karar verildi.'
    ]
  },
  'sosyal-duygusal': {
    intros: [
      'Öğrencilerin yıl boyunca gösterdiği sosyal-duygusal gelişim ve rehberlik süreci hakkında',
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
      'Eğitim öğretim yılı boyunca elde edilen değerlendirme sonuçları bakımından'
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
      'Yıl boyunca yürütülen veli iletişimi ve okul-aile iş birliği hakkında',
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
  'ogretim-programi': {
    intros: [
      'Derslerin öğretim programlarına uygun yürütülmesine ilişkin yıl sonu durumu hakkında',
      'Yıl boyunca işlenen kazanımların tamamlanma durumu bakımından'
    ],
    observations: [
      'Öğretim programında öngörülen kazanımların yıl boyunca işlenme durumunu değerlendirdi.',
      'Tamamlanamayan veya pekiştirilmesi gereken kazanımların ders bazında belirlenmesini önerdi.',
      'Program uygulamasında yıl içinde karşılaşılan güçlükleri ve çözüm yollarını ele aldı.',
      'Branşlar arasında yıl boyunca sağlanan program uyumunu gözden geçirdi.'
    ],
    suggestions: [
      'tamamlanamayan kazanımların ders bazında belirlenerek kayda geçirilmesi',
      'program uygulamasında karşılaşılan güçlüklerin zümrelerle paylaşılması',
      'yıl sonu değerlendirmesinin sonraki yılın ders planlarında dikkate alınması',
      'pekiştirilmesi gereken kazanımların sonraki planlamalarda öncelikle ele alınması'
    ],
    decisions: [
      'Tamamlanamayan veya pekiştirilmesi gereken kazanımların ders bazında belirlenerek zümrelerle paylaşılmasına karar verildi.',
      'Yıl sonu program değerlendirmesinin sonraki yılın ders planlarında dikkate alınmasına karar verildi.'
    ]
  },
  kaynastirma: {
    intros: [
      'Kaynaştırma/bütünleştirme yoluyla eğitim alan öğrencilere yönelik yıl boyunca yürütülen çalışmalar hakkında',
      'Bireyselleştirilmiş eğitim programlarının yıl sonu sonuçları bakımından'
    ],
    observations: [
      'Bireyselleştirilmiş eğitim programlarında belirlenen hedeflere ulaşılma düzeyini değerlendirdi.',
      'Yıl boyunca yapılan sınıf içi uyarlamaların öğrencilerin derse katılımına etkisini gözden geçirdi.',
      'Rehberlik servisi ile ders öğretmenleri arasında yıl boyunca yürütülen iş birliğini ele aldı.',
      'Sürdürülmesi gereken destek hizmetlerinin rehberlik servisiyle birlikte belirlenmesini önerdi.'
    ],
    suggestions: [
      'bireyselleştirilmiş eğitim programlarındaki hedeflere ulaşılma düzeyinin kayda geçirilmesi',
      'etkili bulunan sınıf içi uyarlamaların ders öğretmenleriyle paylaşılması',
      'sürdürülmesi gereken destek hizmetlerinin ilgili birimlere bildirilmesi',
      'yıl sonu değerlendirmesinin velilerle paylaşılması'
    ],
    decisions: [
      'Bireyselleştirilmiş eğitim programlarındaki hedeflere ulaşılma düzeyinin değerlendirilerek kayda geçirilmesine karar verildi.',
      'Sürdürülmesi gereken destek hizmetlerinin rehberlik servisiyle birlikte belirlenmesine karar verildi.'
    ]
  },
  'etkinlik-sosyal': {
    intros: [
      'Yıl boyunca gerçekleştirilen etkinlik, kulüp ve sosyal sorumluluk çalışmaları hakkında',
      'Etkinliklere öğrenci katılımının yıl sonu durumu bakımından'
    ],
    observations: [
      'Yıl boyunca gerçekleştirilen etkinlik, kulüp ve sosyal sorumluluk çalışmalarını değerlendirdi.',
      'Etkinliklere öğrenci katılımının yıl içindeki seyrini gözden geçirdi.',
      'Etkinliklerin öğrencilerin sosyal gelişimine katkısını ele aldı.',
      'Tamamlanamayan etkinliklerin nedenleriyle birlikte kayda geçirilmesini yararlı buldu.'
    ],
    suggestions: [
      'gerçekleştirilen etkinliklerin kısa bir değerlendirmesinin kayda geçirilmesi',
      'öğrencilerin ilgi gösterdiği etkinlik türlerinin sonraki planlamalarda dikkate alınması',
      'sosyal sorumluluk çalışmalarına ilişkin kayıtların tamamlanması',
      'tamamlanamayan etkinliklerin nedenleriyle birlikte belirlenmesi'
    ],
    decisions: [
      'Yıl boyunca gerçekleştirilen etkinlik, kulüp ve sosyal sorumluluk çalışmalarının değerlendirilerek kayda geçirilmesine karar verildi.',
      'Sosyal sorumluluk çalışmalarına ilişkin kayıtların tamamlanmasına karar verildi.'
    ]
  },
  'degerler-egitimi': {
    intros: [
      'Yıl boyunca yürütülen değerler eğitimi çalışmaları hakkında',
      'Değerler eğitimi çalışmalarının yıl sonu sonuçları bakımından'
    ],
    observations: [
      'Yıl boyunca yürütülen değerler eğitimi çalışmalarını değerlendirdi.',
      'Değerler eğitiminin derslerle ve etkinliklerle ilişkilendirilme düzeyini gözden geçirdi.',
      'Değerler eğitimi çalışmalarının sınıf iklimine yansımalarını ele aldı.',
      'Değerler eğitiminde etkili bulunan uygulamaların sonraki planlamalarda sürdürülmesini önerdi.'
    ],
    suggestions: [
      'yıl boyunca yürütülen değerler eğitimi çalışmalarının kayda geçirilmesi',
      'değerler eğitiminin derslerle ilişkilendirilmesine ilişkin örneklerin paylaşılması',
      'değerler eğitimi çalışmalarına öğrenci katılımının değerlendirilmesi',
      'değerler eğitiminde etkili bulunan uygulamaların okul yönetimiyle paylaşılması'
    ],
    decisions: [
      'Yıl boyunca yürütülen değerler eğitimi çalışmalarının değerlendirilerek kayda geçirilmesine karar verildi.',
      'Etkili bulunan değerler eğitimi uygulamalarının sonraki planlamalarda sürdürülmesine karar verildi.'
    ]
  },
  'okul-sagligi-isg': {
    intros: [
      'Yıl boyunca uygulanan okul sağlığı ile iş sağlığı ve güvenliği tedbirleri hakkında',
      'Sağlık ve güvenlik tedbirlerinin yıl sonu değerlendirmesi bakımından'
    ],
    observations: [
      'Yıl boyunca uygulanan sağlık ve güvenlik tedbirlerini değerlendirdi.',
      'Atölye, laboratuvar ve ortak alanlarda güvenlik kurallarına uyulma düzeyini gözden geçirdi.',
      'Yıl içinde bildirilen riskli durumları ve alınan önlemleri ele aldı.',
      'Tedbirlerde görülen eksikliklerin okul yönetimine bildirilmesini önerdi.'
    ],
    suggestions: [
      'yıl boyunca uygulanan sağlık ve güvenlik tedbirlerinin kayda geçirilmesi',
      'riskli durumlara ilişkin kayıtların gözden geçirilmesi',
      'sağlık ve güvenlik konusunda etkili bulunan bilgilendirme çalışmalarının sürdürülmesi',
      'güvenlik kurallarına ilişkin bilgilendirmenin yinelenmesi'
    ],
    decisions: [
      'Yıl boyunca uygulanan sağlık ve güvenlik tedbirlerinin değerlendirilerek görülen eksikliklerin okul yönetimine bildirilmesine karar verildi.',
      'Sağlık ve güvenlik konusunda etkili bulunan bilgilendirme çalışmalarının sonraki planlamalarda sürdürülmesine karar verildi.'
    ]
  },
  'onceki-kararlar': {
    intros: [
      'Eğitim öğretim yılı boyunca alınan kararlar hakkında',
      'Kurul kararlarının yıl içindeki uygulama sonuçları bakımından'
    ],
    observations: [
      'Kasım ve nisan toplantılarında alınan kararların uygulama sonuçlarını değerlendirdi.',
      'Yıl boyunca uygulanan kararlardan etkili olanlar ile geliştirilmesi gereken alanları birlikte gözden geçirdi.',
      'Yıl içinde alınan kararların sonuçlarını değerlendirerek gelecek eğitim öğretim yılına yönelik önerileri ele aldı.',
      'Uygulanması süren kararların gelecek yıl hangi sırayla ele alınacağının belirlenmesini önerdi.',
      'Kararların uygulanmasında karşılaşılan güçlüklerin nedenleriyle birlikte kayda geçirilmesini yararlı buldu.'
    ],
    suggestions: [
      'yıl içinde alınan kararların sonuçlarının değerlendirilmesi',
      'uygulanması süren kararların gelecek yıl için önceliklendirilmesi',
      'sonuç alınamayan kararların nedenlerinin belirlenmesi',
      'kararların uygulanmasında karşılaşılan güçlüklerin kayda geçirilmesi'
    ],
    decisions: [
      'Yıl içinde alınan kararların sonuçlarının değerlendirilerek gelecek eğitim öğretim yılına yönelik önerilerin bir sonraki şube öğretmenler kuruluna aktarılmasına karar verildi.',
      'Uygulanması süren kararların gelecek eğitim öğretim yılında öncelikli olarak ele alınmasına karar verildi.',
      'Sonuç alınamayan kararların nedenlerinin kurul kayıtlarına alınmasına karar verildi.'
    ]
  },
  'genel': {
    observations: [
      'Eğitim öğretim yılı genelinden çıkarılan sonuçlarla gelecek yıl için bir yol haritası oluşturulmasını yararlı buldu.',
      'Kurul deneyimlerinin sonraki planlama çalışmalarına somut önerilerle aktarılmasını önemli buldu.',
      'Yıl boyunca yürütülen çalışmalardan elde edilen sonuçları gündem maddesi bakımından özetledi.',
      'Geliştirilmesi gereken alanlar için gelecek yıl uygulanabilecek önerileri ele aldı.'
    ],
    suggestions: [
      'gelecek eğitim öğretim yılına yönelik önerilerin belirlenmesi',
      'etkili bulunan uygulamaların sonraki planlama çalışmalarında dikkate alınması',
      'geliştirilmesi gereken alanlara ilişkin somut önerilerin kurul kayıtlarına alınması',
      'yıl sonu değerlendirmesinin okul yönetimiyle paylaşılması'
    ],
    decisions: [
      'Etkili bulunan uygulamalar ile geliştirilmesi gereken alanların kurul kayıtlarına alınmasına karar verildi.',
      'Yıl sonu değerlendirme sonuçlarının okul yönetimiyle paylaşılmasına karar verildi.',
      'Gelecek eğitim öğretim yılına yönelik önerilerin okul yönetimine sunulmasına karar verildi.'
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
      'Öğrencilerin yıl boyunca tutulan devam kayıtlarını ve devamsızlığın öğrenme sürecine etkisini değerlendirdi.',
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
      'davranış konusunda olumlu sonuç veren uygulamaların sonraki kurul çalışmalarında paylaşılması'
    ],
    decisions: [
      'Yıl boyunca uygulanan davranış yönetimi yaklaşımının sonuçlarının değerlendirilmesine karar verildi.',
      'Davranış konusunda olumlu sonuç veren uygulamaların sonraki kurul çalışmalarında paylaşılmasına karar verildi.'
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
      'Mezuniyet sürecine ilişkin veli bilgilendirmesinin açık ve zamanında yürütülmesini önemli buldu.'
    ],
    suggestions: [
      'yıl boyunca yürütülen veli iş birliğinin sonuçlarının değerlendirilmesi',
      'mezuniyet sürecine ilişkin gerekli bilgilendirmenin velilerle açık biçimde paylaşılması',
      'velilerle iletişimde etkili bulunan yöntemlerin kurul kayıtlarına alınması'
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
  'onceki-kararlar': {
    observations: [
      'Yıl içinde alınan kararların sonuçlarını ve kurul çalışmalarına katkısını değerlendirdi.',
      'Kasım ve nisan toplantılarında alınan kararların mezuniyet sürecine yansımalarını gözden geçirdi.',
      'Kararların uygulanmasında karşılaşılan güçlüklerin nedenleriyle birlikte kayda geçirilmesini yararlı buldu.'
    ],
    suggestions: [
      'yıl içinde alınan kararların sonuçlarının değerlendirilmesi',
      'sonuç alınamayan kararların nedenlerinin kayda geçirilmesi',
      'kararların uygulanmasında karşılaşılan güçlüklerin kayda geçirilmesi'
    ],
    decisions: [
      'Yıl içinde alınan kararların sonuçlarının kurul kayıtlarına alınmasına karar verildi.',
      'Sonuç alınamayan kararların nedenlerinin kurul kayıtlarına alınmasına karar verildi.'
    ]
  },
  genel: {
    observations: [
      'Eğitim öğretim yılı genelinden çıkarılan sonuçların sonraki kurul çalışmalarına aktarılmasını yararlı buldu.',
      'Mezuniyet sürecine ilişkin tamamlanması gereken ortak çalışmaları gözden geçirdi.',
      'Yıl boyunca yürütülen çalışmalardan elde edilen sonuçları gündem maddesi bakımından özetledi.',
      'Etkili bulunan uygulamaların sonraki yılların son sınıfları için örnek oluşturabileceğini belirtti.'
    ],
    suggestions: [
      'kurul deneyimlerinin sonraki sınıf ve toplantı planlamalarında kullanılması',
      'mezuniyet sürecine ilişkin ortak çalışmaların tamamlanması',
      'etkili bulunan uygulamaların sonraki yılların son sınıfları için kayda geçirilmesi',
      'yıl sonu değerlendirmesinin okul yönetimiyle paylaşılması'
    ],
    decisions: [
      'Kurul çalışmalarından edinilen deneyimlerin sonraki sınıf ve toplantı planlamalarında değerlendirilmesine karar verildi.',
      'Mezuniyet sürecine ilişkin ortak çalışmaların zamanında tamamlanmasına karar verildi.',
      'Yıl sonu değerlendirme sonuçlarının okul yönetimiyle paylaşılmasına karar verildi.'
    ]
  }
};

const periodContent: Record<MeetingPeriod, CategoryMap> = {
  'kasim': kasim,
  'nisan': ikinciDonem,
  'sene-sonu': seneSonu
};

const dilekTemennileri: Record<MeetingPeriod, PeriodCategoryContent> = {
  'kasim': {
    intros: [
      'Eğitim öğretim yılına ilişkin dilek ve temenniler kapsamında',
      'Yıl boyunca sürdürülecek ortak çalışmalar hakkında'
    ],
    observations: [
      'Eğitim öğretim yılının sağlık, başarı ve iş birliği içinde geçmesini diledi.',
      'Öğretmenler arasındaki düzenli iletişimin öğrenci gelişimine katkı sağlayacağını belirtti.',
      'Kurul üyelerinin ortak hedefler doğrultusunda verimli çalışmalar yürütmesine ilişkin temennilerini paylaştı.'
    ],
    suggestions: [
      'yıl boyunca öğretmenler arası dayanışmanın sürdürülmesi',
      'belirlenen ortak hedeflerin iş birliği içinde izlenmesi',
      'kurul üyeleri arasındaki düzenli bilgi paylaşımının sürdürülmesi'
    ],
    decisions: []
  },
  'nisan': {
    intros: [
      'Ders yılının kalan bölümüne ilişkin dilek ve temenniler kapsamında',
      'Birinci dönemden edinilen deneyimlerin ardından'
    ],
    observations: [
      'Ders yılının kalan bölümünün öğrenciler ve okul toplumu için sağlık, başarı ve verimlilik içinde geçmesini diledi.',
      'Yıl boyunca kurulan iş birliğinin ders yılı sonuna kadar güçlendirilerek sürdürülmesini yararlı buldu.',
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

// Belirli bir dönem ve kategori için döneme özgü içeriği döndürür. Dönem için
// konuya özgü içerik tanımlı değilse boş içerik döner; bu durumda çağıran taraf
// konunun dönemden bağımsız havuzunu (categorySpeechContent.ts) kullanır.
// Eskiden burada 'genel' havuzuna düşülüyordu; bu, öğretim programı veya
// kaynaştırma gibi konuların kendi içeriğinin hiç kullanılmamasına yol açıyordu.
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
  const map = periodContent[period] ?? kasim;
  const base = map[category] ?? {};
  if (period === 'sene-sonu' && gradeLevel === 12) {
    return { ...base, ...(mezuniyetSeneSonu[category] ?? {}) };
  }
  return base;
};
