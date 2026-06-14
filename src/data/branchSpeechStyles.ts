import type { BranchSpeechStyle } from '../types';

export const branchSpeechStyles: Record<string, BranchSpeechStyle> = {
  'Türk Dili ve Edebiyatı': {
    branch: 'Türk Dili ve Edebiyatı',
    focusAreas: ['okuma-anlama', 'yazılı anlatım', 'kendini ifade etme', 'kitap okuma alışkanlığı', 'yorumlama becerisi', 'metin çözümleme'],
    sentenceStarters: [
      'Öğrencilerin okuma-anlama becerilerinin geliştirilmesi açısından',
      'Yazılı anlatım çalışmalarında öğrencilerin',
      'Derse katılım ve kendini ifade etme becerisi bakımından',
      'Metin çözümleme ve yorumlama etkinliklerinde',
      'Kitap okuma alışkanlığı kazanma sürecinde'
    ],
    suggestions: [
      'sınıf içinde kısa metin çalışmalarının yapılması',
      'öğrencilerin kendilerini sözlü olarak ifade etmelerine fırsat verilmesi',
      'okuma-anlama becerilerini geliştirici etkinlikler düzenlenmesi',
      'yazılı anlatım çalışmalarının artırılması',
      'kitap okuma alışkanlığının teşvik edilmesi',
      'kelime hazinesinin zenginleştirilmesine yönelik çalışmalar yapılması'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 6,
      'olcme-degerlendirme': 8,
      'veli-iletisim': 5,
      'destekleme': 8
    }
  },
  'Matematik': {
    branch: 'Matematik',
    focusAreas: ['temel işlem becerileri', 'problem çözme', 'düzenli tekrar', 'konu eksiği', 'sınav performansı', 'analitik düşünme'],
    sentenceStarters: [
      'Matematik dersinde öğrencilerin problem çözme becerileri açısından',
      'Temel işlem becerileri ve analitik düşünme konusunda',
      'Düzenli tekrar ve konu takibi bakımından',
      'Sınav performansları değerlendirildiğinde',
      'Matematiksel düşünme ve akıl yürütme becerilerinde'
    ],
    suggestions: [
      'düzenli problem çözme çalışmalarının yapılması',
      'temel kazanımların pekiştirilmesi',
      'bireysel konu eksiklerinin tespit edilerek giderilmesi',
      'analitik düşünme becerilerinin geliştirilmesi',
      'sınav analizlerinin düzenli yapılması',
      'kısa kazanım kontrolleriyle öğrenme düzeyinin takip edilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 10,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 9,
      'veli-iletisim': 5,
      'destekleme': 9
    }
  },
  'Fizik': {
    branch: 'Fizik',
    focusAreas: ['kavram temelli öğrenme', 'formül-mantık ilişkisi', 'deney ve gözlem', 'problem çözme', 'günlük hayatla ilişkilendirme'],
    sentenceStarters: [
      'Fizik dersinde kavramsal öğrenme açısından',
      'Deney ve gözlem çalışmalarında öğrencilerin',
      'Problem çözme ve formül kullanımı konusunda',
      'Fiziksel olayları günlük hayatla ilişkilendirme bakımından',
      'Kavram temelli öğrenme sürecinde'
    ],
    suggestions: [
      'kavramsal öğrenmenin ön plana çıkarılması',
      'formül ezberlemek yerine mantık kurma becerisinin geliştirilmesi',
      'deney ve gözlem çalışmalarının artırılması',
      'günlük hayattan örneklerle konuların somutlaştırılması',
      'düzenli problem çözme çalışmalarının yapılması'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 8,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Kimya': {
    branch: 'Kimya',
    focusAreas: ['kavram ilişkileri', 'semboller ve formüller', 'laboratuvar güvenliği', 'düzenli tekrar', 'konu bütünlüğü'],
    sentenceStarters: [
      'Kimya dersinde kavram ilişkileri ve konu bütünlüğü açısından',
      'Semboller ve formüllerin öğrenilmesi konusunda',
      'Laboratuvar çalışmalarında öğrencilerin',
      'Kimya konularının düzenli tekrarı bakımından',
      'Kavramlar arası ilişkilerin kurulması sürecinde'
    ],
    suggestions: [
      'kavramlar arası ilişkilerin güçlendirilmesi',
      'düzenli tekrar çalışmalarının yapılması',
      'laboratuvar etkinliklerinin artırılması',
      'sembol ve formüllerin anlamlı öğrenme yoluyla pekiştirilmesi',
      'konu bütünlüğünün sağlanmasına yönelik çalışmalar yapılması'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 8,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Biyoloji': {
    branch: 'Biyoloji',
    focusAreas: ['canlılık kavramları', 'sistemler', 'kavram haritaları', 'görsel materyaller', 'gözlem ve yorumlama'],
    sentenceStarters: [
      'Biyoloji dersinde öğrencilerin kavram haritaları ve görsel materyaller kullanımı açısından',
      'Canlılık ve sistemler konularında',
      'Gözlem ve yorumlama becerileri bakımından',
      'Biyoloji konularının düzenli tekrarı konusunda',
      'Görsel materyallerle destekli öğrenme sürecinde'
    ],
    suggestions: [
      'kavram haritaları ve görsel materyallerin etkin kullanılması',
      'düzenli tekrar çalışmalarının yapılması',
      'gözlem ve yorumlama becerilerinin geliştirilmesi',
      'konuların günlük hayatla ilişkilendirilmesi',
      'görsel ve işitsel materyallerle derslerin zenginleştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 8,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 4,
      'olcme-degerlendirme': 8,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Tarih': {
    branch: 'Tarih',
    focusAreas: ['neden-sonuç ilişkisi', 'kronoloji', 'yorumlama', 'tarihsel olayları bağlantılandırma'],
    sentenceStarters: [
      'Tarih dersinde öğrencilerin neden-sonuç ilişkisi kurma becerileri açısından',
      'Kronolojik düşünme ve tarihsel yorumlama konusunda',
      'Tarihsel olayları günümüzle ilişkilendirme bakımından',
      'Tarih dersine katılım ve konu takibi sürecinde',
      'Olaylar arasında bağlantı kurma becerisi bakımından'
    ],
    suggestions: [
      'neden-sonuç ilişkilerinin vurgulanması',
      'kronolojik düşünme becerisinin geliştirilmesi',
      'tarihsel olayların günümüzle ilişkilendirilmesi',
      'görsel ve belgesel materyallerle derslerin desteklenmesi',
      'tartışma ve yorum etkinliklerinin artırılması'
    ],
    agendaRelevance: {
      'akademik-basari': 8,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 7
    }
  },
  'Coğrafya': {
    branch: 'Coğrafya',
    focusAreas: ['harita okuma', 'çevre bilinci', 'grafik yorumlama', 'mekânsal düşünme'],
    sentenceStarters: [
      'Coğrafya dersinde öğrencilerin harita okuma ve yorumlama becerileri açısından',
      'Çevre bilinci ve mekânsal düşünme konusunda',
      'Grafik yorumlama ve veri analizi bakımından',
      'Coğrafi kavramların günlük hayatla ilişkilendirilmesinde',
      'Mekânsal düşünme ve çevre farkındalığı konusunda'
    ],
    suggestions: [
      'harita okuma ve yorumlama çalışmalarının artırılması',
      'çevre bilinci etkinliklerinin düzenlenmesi',
      'grafik ve tablo yorumlama becerilerinin geliştirilmesi',
      'coğrafi kavramların günlük hayatla ilişkilendirilmesi',
      'görsel materyallerle derslerin desteklenmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 7
    }
  },
  'İngilizce': {
    branch: 'İngilizce',
    focusAreas: ['kelime bilgisi', 'dinleme', 'konuşma', 'okuma-anlama', 'dil pratiği', 'özgüven'],
    sentenceStarters: [
      'İngilizce dersinde öğrencilerin kelime bilgisi ve dil becerileri açısından',
      'Dinleme ve konuşma pratiği konusunda',
      'Okuma-anlama çalışmalarında öğrencilerin',
      'Yabancı dil öğrenme motivasyonu ve özgüven bakımından',
      'Dil pratiği ve iletişim becerilerinin geliştirilmesinde'
    ],
    suggestions: [
      'kelime bilgisinin zenginleştirilmesine yönelik çalışmalar yapılması',
      'dinleme ve konuşma pratiklerinin artırılması',
      'okuma-anlama etkinliklerinin çeşitlendirilmesi',
      'yabancı dil öğrenme motivasyonunun artırılması',
      'günlük hayatta İngilizce kullanım fırsatlarının yaratılması'
    ],
    agendaRelevance: {
      'akademik-basari': 8,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 5,
      'destekleme': 8
    }
  },
  'Rehberlik': {
    branch: 'Rehberlik',
    focusAreas: ['motivasyon', 'sınav kaygısı', 'bireysel takip', 'hedef belirleme', 'veli görüşmesi', 'sosyal-duygusal gelişim'],
    sentenceStarters: [
      'Rehberlik çalışmaları kapsamında öğrencilerin sosyal-duygusal gelişimleri açısından',
      'Bireysel takip ve hedef belirleme sürecinde',
      'Öğrencilerin motivasyon düzeyleri ve kaygı yönetimi konusunda',
      'Veli görüşmeleri ve aile iş birliği bakımından',
      'Öğrencilerin bireysel gelişim süreçlerinde'
    ],
    suggestions: [
      'bireysel görüşmelerin düzenli yapılması',
      'hedef belirleme çalışmalarının sürdürülmesi',
      'sınav kaygısı yönetimi konusunda grup çalışmaları yapılması',
      'veli görüşmelerinin artırılması',
      'sosyal-duygusal gelişim programlarının uygulanması',
      'motivasyon artırıcı etkinliklerin planlanması'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 7,
      'motivasyon-katilim': 9,
      'sosyal-duygusal': 10,
      'olcme-degerlendirme': 5,
      'veli-iletisim': 9,
      'destekleme': 9
    }
  },
  'Beden Eğitimi': {
    branch: 'Beden Eğitimi',
    focusAreas: ['sınıf içi enerji', 'takım çalışması', 'sorumluluk', 'disiplin', 'sosyal uyum'],
    sentenceStarters: [
      'Beden eğitimi derslerinde öğrencilerin takım çalışması ve sosyal uyum becerileri açısından',
      'Sınıf içi enerji yönetimi ve disiplin konusunda',
      'Öğrencilerin sorumluluk bilinci ve kurallara uyum bakımından',
      'Sportif etkinliklerde öğrencilerin katılımı ve motivasyonu konusunda',
      'Takım çalışması ve iş birliği becerilerinin gelişimi açısından'
    ],
    suggestions: [
      'takım çalışması etkinliklerinin artırılması',
      'sınıf içi enerji yönetiminin düzenlenmesi',
      'sportif etkinliklerle motivasyonun artırılması',
      'sorumluluk ve disiplin bilincinin güçlendirilmesi',
      'sosyal uyum becerilerinin geliştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 3,
      'davranis-disiplin': 8,
      'motivasyon-katilim': 8,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 3,
      'veli-iletisim': 4,
      'destekleme': 5
    }
  },
  'Görsel Sanatlar': {
    branch: 'Görsel Sanatlar',
    focusAreas: ['yaratıcılık', 'estetik algı', 'kendini ifade etme', 'görsel düşünme', 'proje çalışmaları'],
    sentenceStarters: [
      'Görsel sanatlar dersinde öğrencilerin yaratıcılık ve kendini ifade etme becerileri açısından',
      'Estetik algı ve görsel düşünme konusunda',
      'Proje çalışmalarında öğrencilerin katılımı bakımından',
      'Sanatsal etkinliklerde öğrencilerin motivasyonu ve ilgisi konusunda',
      'Kendini ifade etme ve yaratıcılık sürecinde'
    ],
    suggestions: [
      'yaratıcılığı destekleyici etkinliklerin çeşitlendirilmesi',
      'proje çalışmalarının artırılması',
      'öğrencilerin kendilerini sanatsal yollarla ifade etmelerine fırsat verilmesi',
      'estetik algıyı geliştirici çalışmalar yapılması'
    ],
    agendaRelevance: {
      'akademik-basari': 3,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 8,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 3,
      'veli-iletisim': 3,
      'destekleme': 5
    }
  },
  'Müzik': {
    branch: 'Müzik',
    focusAreas: ['müzikal ifade', 'ritim', 'grup uyumu', 'performans', 'kültürel farkındalık'],
    sentenceStarters: [
      'Müzik dersinde öğrencilerin müzikal ifade ve grup uyumu becerileri açısından',
      'Performans çalışmalarında öğrencilerin katılımı konusunda',
      'Kültürel farkındalık ve sanatsal gelişim bakımından',
      'Müzik dersine katılım ve motivasyon düzeyleri konusunda',
      'Grup çalışmalarında uyum ve iş birliği açısından'
    ],
    suggestions: [
      'grup performans çalışmalarının düzenlenmesi',
      'müzikal etkinliklerle motivasyonun artırılması',
      'kültürel farkındalık çalışmalarının yapılması',
      'öğrencilerin sanatsal yeteneklerinin desteklenmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 2,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 8,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 3,
      'veli-iletisim': 3,
      'destekleme': 4
    }
  },
  'Bilişim Teknolojileri': {
    branch: 'Bilişim Teknolojileri',
    focusAreas: ['dijital beceriler', 'teknoloji kullanımı', 'ödev takibi', 'dijital kaynaklar', 'sorumlu internet kullanımı'],
    sentenceStarters: [
      'Bilişim teknolojileri dersinde öğrencilerin dijital becerileri açısından',
      'Teknoloji kullanımı ve dijital okuryazarlık konusunda',
      'Dijital kaynakların etkin kullanımı bakımından',
      'Sorumlu internet kullanımı ve dijital vatandaşlık konusunda',
      'Dijital ortamda ödev ve proje takibi sürecinde'
    ],
    suggestions: [
      'dijital becerilerin geliştirilmesine yönelik çalışmalar yapılması',
      'sorumlu internet kullanımı konusunda bilinçlendirme yapılması',
      'dijital kaynakların etkin kullanılması',
      'teknoloji destekli öğrenme ortamlarının yaygınlaştırılması'
    ],
    agendaRelevance: {
      'akademik-basari': 5,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 4,
      'olcme-degerlendirme': 5,
      'veli-iletisim': 4,
      'destekleme': 6
    }
  },
  'Felsefe': {
    branch: 'Felsefe',
    focusAreas: ['eleştirel düşünme', 'sorgulama', 'kavram analizi', 'tartışma', 'etik değerler'],
    sentenceStarters: [
      'Felsefe dersinde öğrencilerin eleştirel düşünme ve sorgulama becerileri açısından',
      'Kavram analizi ve felsefi tartışma etkinliklerinde',
      'Etik değerler ve toplumsal sorumluluk konusunda',
      'Felsefi düşünme ve akıl yürütme becerilerinde',
      'Sorgulama ve argüman oluşturma becerisi bakımından'
    ],
    suggestions: [
      'eleştirel düşünme becerilerinin geliştirilmesi',
      'tartışma ve sorgulama etkinliklerinin artırılması',
      'kavramsal analiz çalışmalarının yapılması',
      'etik değerler konusunda farkındalık oluşturulması'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 6,
      'olcme-degerlendirme': 6,
      'veli-iletisim': 4,
      'destekleme': 6
    }
  },
  'Din Kültürü ve Ahlak Bilgisi': {
    branch: 'Din Kültürü ve Ahlak Bilgisi',
    focusAreas: ['değerler eğitimi', 'ahlaki gelişim', 'saygı', 'hoşgörü', 'kültürel farkındalık'],
    sentenceStarters: [
      'Din kültürü ve ahlak bilgisi dersinde öğrencilerin değerler eğitimi açısından',
      'Ahlaki gelişim ve toplumsal sorumluluk konusunda',
      'Saygı, hoşgörü ve kültürel farkındalık bakımından',
      'Değerler eğitimi çalışmalarında öğrencilerin katılımı konusunda',
      'Ahlaki değerlerin davranışa yansıması sürecinde'
    ],
    suggestions: [
      'değerler eğitiminin ders dışı etkinliklerle desteklenmesi',
      'saygı ve hoşgörü konularında farkındalık çalışmaları yapılması',
      'kültürel çeşitlilik konusunda bilinçlendirme yapılması',
      'ahlaki gelişimi destekleyici projeler düzenlenmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 4,
      'davranis-disiplin': 7,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 5,
      'veli-iletisim': 5,
      'destekleme': 5
    }
  },
  'Almanca': {
    branch: 'Almanca',
    focusAreas: ['kelime bilgisi', 'dil bilgisi yapıları', 'dinleme becerisi', 'konuşma pratiği', 'okuma-anlama'],
    sentenceStarters: [
      'Almanca dersinde öğrencilerin kelime bilgisi ve dil becerileri açısından',
      'Yabancı dil öğrenme motivasyonu ve derse katılım konusunda',
      'Dinleme ve konuşma pratikleri bakımından',
      'Almanca dil bilgisi yapılarının kavranması sürecinde',
      'Öğrencilerin yabancı dile karşı tutumları açısından'
    ],
    suggestions: [
      'kelime bilgisinin düzenli tekrarlarla pekiştirilmesi',
      'dinleme ve konuşma pratiklerinin artırılması',
      'dil bilgisi yapılarının örneklerle pekiştirilmesi',
      'yabancı dil öğrenme motivasyonunun artırılması',
      'interaktif dil etkinliklerinin düzenlenmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 7
    }
  },
  'Fransızca': {
    branch: 'Fransızca',
    focusAreas: ['telaffuz', 'kelime hazinesi', 'dil bilgisi', 'okuma-anlama', 'yazılı anlatım'],
    sentenceStarters: [
      'Fransızca dersinde öğrencilerin dil becerilerinin geliştirilmesi açısından',
      'Telaffuz ve konuşma pratikleri konusunda',
      'Okuma-anlama ve yazılı anlatım çalışmalarında',
      'Yabancı dil öğrenme sürecinde öğrencilerin motivasyonu bakımından',
      'Fransızca kelime hazinesi ve dil bilgisi yapıları açısından'
    ],
    suggestions: [
      'telaffuz çalışmalarının düzenli yapılması',
      'kelime hazinesinin zenginleştirilmesi',
      'okuma-anlama etkinliklerinin çeşitlendirilmesi',
      'konuşma pratiklerinin artırılması',
      'dil bilgisi yapılarının pekiştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 7
    }
  },
  'İspanyolca': {
    branch: 'İspanyolca',
    focusAreas: ['kelime öğrenimi', 'konuşma becerisi', 'dinleme', 'kültürel farkındalık', 'dil bilgisi'],
    sentenceStarters: [
      'İspanyolca dersinde öğrencilerin dil öğrenme süreçleri açısından',
      'Konuşma ve dinleme becerileri konusunda',
      'Kelime öğrenimi ve dil bilgisi yapıları bakımından',
      'Kültürel farkındalık ve dil pratiği konusunda',
      'Öğrencilerin İspanyolca dersine katılımları açısından'
    ],
    suggestions: [
      'konuşma pratiklerinin artırılması',
      'dinleme etkinliklerinin çeşitlendirilmesi',
      'kelime öğreniminin oyunlaştırma yöntemiyle desteklenmesi',
      'kültürel farkındalık çalışmalarının yapılması',
      'dil bilgisi yapılarının bağlam içinde öğretilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 7
    }
  },
  'Mantık': {
    branch: 'Mantık',
    focusAreas: ['akıl yürütme', 'çıkarım yapma', 'argüman analizi', 'tutarlılık', 'mantıksal düşünme'],
    sentenceStarters: [
      'Mantık dersinde öğrencilerin akıl yürütme becerileri açısından',
      'Çıkarım yapma ve argüman analizi konusunda',
      'Mantıksal düşünme ve tutarlılık bakımından',
      'Öğrencilerin sorgulama ve analiz becerileri konusunda',
      'Mantık dersine katılım ve kavrama düzeyleri açısından'
    ],
    suggestions: [
      'akıl yürütme alıştırmalarının artırılması',
      'argüman analizi çalışmalarının yapılması',
      'mantıksal düşünme becerilerinin günlük hayat örnekleriyle pekiştirilmesi',
      'çıkarım ve tutarlılık alıştırmalarının çeşitlendirilmesi',
      'tartışma etkinliklerinin mantıksal çerçevede yürütülmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 6
    }
  },
  'Psikoloji': {
    branch: 'Psikoloji',
    focusAreas: ['insan davranışı', 'gelişim dönemleri', 'öğrenme süreçleri', 'sosyal psikoloji', 'farkındalık'],
    sentenceStarters: [
      'Psikoloji dersinde öğrencilerin insan davranışını anlama becerileri açısından',
      'Gelişim dönemleri ve öğrenme süreçleri konusunda',
      'Sosyal psikoloji ve bireysel farkındalık bakımından',
      'Öğrencilerin kendini tanıma ve empati becerileri konusunda',
      'Psikoloji konularının günlük hayatla ilişkilendirilmesi açısından'
    ],
    suggestions: [
      'insan davranışı ve gelişim konularının somut örneklerle anlatılması',
      'öğrencilerin kendini tanıma becerilerinin geliştirilmesi',
      'empati ve sosyal farkındalık çalışmalarının yapılması',
      'günlük hayattan psikoloji örneklerinin kullanılması',
      'tartışma ve vaka analizi etkinliklerinin artırılması'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 6,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 8,
      'olcme-degerlendirme': 6,
      'veli-iletisim': 5,
      'destekleme': 7
    }
  },
  'Sosyoloji': {
    branch: 'Sosyoloji',
    focusAreas: ['toplumsal yapı', 'kültür', 'sosyal değişme', 'toplumsal normlar', 'eleştirel bakış'],
    sentenceStarters: [
      'Sosyoloji dersinde öğrencilerin toplumsal olayları anlama becerileri açısından',
      'Kültür ve toplumsal değişme konularında',
      'Toplumsal normlar ve sosyal yapı bakımından',
      'Öğrencilerin eleştirel bakış açısı geliştirmeleri konusunda',
      'Sosyoloji konularının günlük hayatla ilişkilendirilmesi açısından'
    ],
    suggestions: [
      'toplumsal olayların tartışma yöntemiyle incelenmesi',
      'kültürel farkındalık etkinliklerinin düzenlenmesi',
      'eleştirel bakış açısının geliştirilmesi',
      'güncel toplumsal konuların derse entegre edilmesi',
      'araştırma ve proje çalışmalarının artırılması'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 6,
      'veli-iletisim': 5,
      'destekleme': 6
    }
  },
  'Sağlık Bilgisi': {
    branch: 'Sağlık Bilgisi',
    focusAreas: ['sağlıklı yaşam', 'beslenme', 'hijyen', 'ilk yardım', 'bağımlılıkla mücadele'],
    sentenceStarters: [
      'Sağlık bilgisi dersinde öğrencilerin sağlıklı yaşam bilinci açısından',
      'Beslenme ve hijyen konularında öğrencilerin farkındalığı bakımından',
      'İlk yardım bilgisi ve uygulamaları konusunda',
      'Bağımlılıkla mücadele ve bilinçli yaşam konularında',
      'Öğrencilerin sağlık okuryazarlığı açısından'
    ],
    suggestions: [
      'sağlıklı yaşam alışkanlıklarının teşvik edilmesi',
      'beslenme ve hijyen konularında bilinçlendirme yapılması',
      'ilk yardım uygulamalarının pratiklerle desteklenmesi',
      'bağımlılıkla mücadele konusunda farkındalık oluşturulması',
      'sağlık okuryazarlığı çalışmalarının artırılması'
    ],
    agendaRelevance: {
      'akademik-basari': 5,
      'davranis-disiplin': 6,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 5,
      'veli-iletisim': 5,
      'destekleme': 6
    }
  },
  'T.C. İnkılap Tarihi ve Atatürkçülük': {
    branch: 'T.C. İnkılap Tarihi ve Atatürkçülük',
    focusAreas: ['Atatürk ilkeleri', 'inkılaplar', 'milli mücadele', 'cumhuriyet değerleri', 'tarihsel bilinç'],
    sentenceStarters: [
      'T.C. İnkılap Tarihi ve Atatürkçülük dersinde öğrencilerin tarihsel bilinç düzeyi açısından',
      'Atatürk ilkeleri ve inkılapların kavranması konusunda',
      'Milli mücadele ve cumhuriyet değerleri bakımından',
      'Öğrencilerin tarihsel olayları yorumlama becerileri konusunda',
      'Cumhuriyet değerlerinin benimsenmesi sürecinde'
    ],
    suggestions: [
      'tarihsel olayların belgesel ve görsel materyallerle desteklenmesi',
      'Atatürk ilkelerinin günümüzle ilişkilendirilmesi',
      'inkılapların neden-sonuç ilişkisiyle anlatılması',
      'cumhuriyet değerlerinin tartışma yöntemiyle pekiştirilmesi',
      'milli bilinç ve vatandaşlık duyarlılığının güçlendirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 6,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 6
    }
  },
  'Çağdaş Türk ve Dünya Tarihi': {
    branch: 'Çağdaş Türk ve Dünya Tarihi',
    focusAreas: ['çağdaş olaylar', 'küresel gelişmeler', 'soğuk savaş', 'uluslararası ilişkiler', 'güncel bağlantılar'],
    sentenceStarters: [
      'Çağdaş Türk ve Dünya Tarihi dersinde öğrencilerin küresel olayları kavrama becerileri açısından',
      'Uluslararası ilişkiler ve çağdaş gelişmeler konusunda',
      'Tarihsel olayların günümüzle ilişkilendirilmesi bakımından',
      'Öğrencilerin çağdaş tarihi yorumlama becerileri konusunda',
      'Küresel düşünme ve tarihsel perspektif geliştirme açısından'
    ],
    suggestions: [
      'çağdaş olayların belgesel ve medya materyalleriyle desteklenmesi',
      'güncel gelişmelerle tarihsel bağlantılar kurulması',
      'tartışma ve münazara etkinliklerinin düzenlenmesi',
      'uluslararası ilişkilerin harita ve grafiklerle anlatılması',
      'araştırma ödevleriyle derinlemesine öğrenmenin sağlanması'
    ],
    agendaRelevance: {
      'akademik-basari': 7,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 7,
      'veli-iletisim': 4,
      'destekleme': 6
    }
  },
  'Seçmeli Matematik': {
    branch: 'Seçmeli Matematik',
    focusAreas: ['ileri düzey problem çözme', 'YKS hazırlığı', 'sınav stratejisi', 'konu derinleştirme', 'analitik beceriler'],
    sentenceStarters: [
      'Seçmeli matematik dersinde öğrencilerin ileri düzey problem çözme becerileri açısından',
      'YKS hazırlık sürecinde öğrencilerin performansı konusunda',
      'Analitik düşünme ve sınav stratejisi bakımından',
      'Konu derinleştirme çalışmalarında öğrencilerin durumu açısından',
      'İleri düzey matematik konularının kavranması sürecinde'
    ],
    suggestions: [
      'ileri düzey problem çözme çalışmalarının artırılması',
      'YKS formatında deneme sınavlarının düzenlenmesi',
      'konu eksiklerinin tespit edilerek giderilmesi',
      'sınav stratejisi ve zaman yönetimi çalışmalarının yapılması',
      'bireysel düzeye göre çalışma programlarının oluşturulması'
    ],
    agendaRelevance: {
      'akademik-basari': 10,
      'davranis-disiplin': 3,
      'motivasyon-katilim': 7,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 9,
      'veli-iletisim': 5,
      'destekleme': 9
    }
  },
  'Seçmeli Fizik': {
    branch: 'Seçmeli Fizik',
    focusAreas: ['ileri kavramlar', 'problem çözme stratejileri', 'YKS hazırlığı', 'deney tasarımı', 'matematiksel modelleme'],
    sentenceStarters: [
      'Seçmeli fizik dersinde öğrencilerin ileri düzey kavramları anlama becerileri açısından',
      'Problem çözme stratejileri ve YKS hazırlığı konusunda',
      'Deney tasarımı ve matematiksel modelleme bakımından',
      'Öğrencilerin fizik problemlerine yaklaşımları konusunda',
      'İleri fizik konularının kavranması sürecinde'
    ],
    suggestions: [
      'ileri düzey problem çözme çalışmalarının artırılması',
      'YKS formatında çalışmaların yapılması',
      'deney ve gözlem etkinliklerinin artırılması',
      'kavram yanılgılarının tespit edilerek giderilmesi',
      'matematiksel modelleme becerilerinin geliştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 3,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 9,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Seçmeli Kimya': {
    branch: 'Seçmeli Kimya',
    focusAreas: ['ileri kimya konuları', 'problem çözme', 'YKS hazırlığı', 'laboratuvar çalışmaları', 'formül ve hesaplamalar'],
    sentenceStarters: [
      'Seçmeli kimya dersinde öğrencilerin ileri düzey konuları kavrama becerileri açısından',
      'Problem çözme ve YKS hazırlık süreci konusunda',
      'Laboratuvar çalışmaları ve formül kullanımı bakımından',
      'Kimyasal hesaplamalar ve kavram ilişkileri konusunda',
      'İleri kimya konularının öğrenilmesi sürecinde'
    ],
    suggestions: [
      'ileri düzey problem çözme çalışmalarının yapılması',
      'YKS formatında deneme çalışmalarının artırılması',
      'laboratuvar etkinliklerinin zenginleştirilmesi',
      'formül ve hesaplama becerilerinin pekiştirilmesi',
      'kavram ilişkilerinin şema ve görsellere aktarılması'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 3,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 9,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Seçmeli Biyoloji': {
    branch: 'Seçmeli Biyoloji',
    focusAreas: ['ileri biyoloji konuları', 'YKS hazırlığı', 'hücre biyolojisi', 'genetik', 'sistem biyolojisi'],
    sentenceStarters: [
      'Seçmeli biyoloji dersinde öğrencilerin ileri düzey konuları kavrama becerileri açısından',
      'YKS hazırlık sürecinde biyoloji performansı konusunda',
      'Hücre biyolojisi ve genetik konularının öğrenilmesinde',
      'Sistem biyolojisi konularının anlaşılması bakımından',
      'İleri biyoloji konularının kavranması sürecinde'
    ],
    suggestions: [
      'ileri düzey konu tekrarlarının artırılması',
      'YKS formatında deneme çalışmalarının yapılması',
      'kavram haritaları ve görsel materyallerin etkin kullanılması',
      'genetik ve hücre biyolojisi konularının pekiştirilmesi',
      'araştırma ve proje çalışmalarıyla konuların derinleştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 9,
      'davranis-disiplin': 3,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 3,
      'olcme-degerlendirme': 9,
      'veli-iletisim': 4,
      'destekleme': 8
    }
  },
  'Demokrasi ve İnsan Hakları': {
    branch: 'Demokrasi ve İnsan Hakları',
    focusAreas: ['demokratik değerler', 'insan hakları', 'vatandaşlık bilinci', 'hukuk devleti', 'toplumsal katılım'],
    sentenceStarters: [
      'Demokrasi ve İnsan Hakları dersinde öğrencilerin demokratik değerleri kavraması açısından',
      'İnsan hakları ve vatandaşlık bilinci konusunda',
      'Hukuk devleti ve toplumsal katılım bakımından',
      'Öğrencilerin demokratik tutum geliştirmeleri konusunda',
      'Vatandaşlık bilinci ve haklar konularının öğrenilmesi sürecinde'
    ],
    suggestions: [
      'demokratik değerlerin tartışma yöntemiyle pekiştirilmesi',
      'insan hakları konusunda farkındalık çalışmaları yapılması',
      'vatandaşlık bilincinin proje çalışmalarıyla güçlendirilmesi',
      'güncel olaylarla ders konularının ilişkilendirilmesi',
      'toplumsal katılım ve sorumluluk bilincinin geliştirilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 5,
      'davranis-disiplin': 7,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 7,
      'olcme-degerlendirme': 5,
      'veli-iletisim': 4,
      'destekleme': 5
    }
  },
  'Astronomi': {
    branch: 'Astronomi',
    focusAreas: ['gök cisimleri', 'evren modeli', 'gözlem teknikleri', 'bilimsel merak', 'uzay araştırmaları'],
    sentenceStarters: [
      'Astronomi dersinde öğrencilerin bilimsel merak ve gözlem becerileri açısından',
      'Gök cisimleri ve evren modeli konularında',
      'Uzay araştırmaları ve bilimsel düşünme bakımından',
      'Öğrencilerin astronomi konularına ilgi ve katılımı konusunda',
      'Gözlem teknikleri ve bilimsel araştırma becerilerinde'
    ],
    suggestions: [
      'gözlem etkinliklerinin artırılması',
      'bilimsel merakın desteklenmesi',
      'uzay araştırmaları konusunda güncel bilgilerin paylaşılması',
      'görsel ve simülasyon materyallerinin kullanılması',
      'araştırma projelerinin teşvik edilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 4,
      'motivasyon-katilim': 8,
      'sosyal-duygusal': 4,
      'olcme-degerlendirme': 6,
      'veli-iletisim': 3,
      'destekleme': 6
    }
  }
};

export const getBranchStyle = (branch: string): BranchSpeechStyle => {
  return branchSpeechStyles[branch] || {
    branch,
    focusAreas: [
      'ders takibi', 'öğrenci gelişimi', 'konu eksikliği', 'derse katılım',
      'bireysel farklılıklar', 'öğrenme motivasyonu', 'performans değerlendirme'
    ],
    sentenceStarters: [
      `${branch} dersinde öğrencilerin genel durumu ve akademik gelişimleri açısından`,
      `${branch} dersine katılım ve performans düzeyleri konusunda`,
      `Ders çalışma alışkanlıkları ve ${branch.toLowerCase()} konularındaki ilerleme bakımından`,
      `${branch} dersinde öğrencilerin öğrenme süreçleri açısından`,
      `Öğrencilerin ${branch.toLowerCase()} konularına ilgi ve motivasyonu konusunda`
    ],
    suggestions: [
      'düzenli takip çalışmalarının yapılması',
      'bireysel geri bildirim verilmesi',
      'konuların pekiştirilmesine yönelik çalışmalar yapılması',
      'öğrencilerin derse aktif katılımının sağlanması',
      'farklı öğretim yöntemleriyle konuların zenginleştirilmesi',
      'eksik kazanımların tespit edilerek giderilmesi'
    ],
    agendaRelevance: {
      'akademik-basari': 6,
      'davranis-disiplin': 5,
      'motivasyon-katilim': 6,
      'sosyal-duygusal': 5,
      'olcme-degerlendirme': 6,
      'veli-iletisim': 5,
      'destekleme': 6
    }
  };
};

export const allBranches = [
  'Türk Dili ve Edebiyatı',
  'Matematik',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Tarih',
  'Coğrafya',
  'İngilizce',
  'Almanca',
  'Fransızca',
  'İspanyolca',
  'Felsefe',
  'Mantık',
  'Psikoloji',
  'Sosyoloji',
  'Din Kültürü ve Ahlak Bilgisi',
  'T.C. İnkılap Tarihi ve Atatürkçülük',
  'Çağdaş Türk ve Dünya Tarihi',
  'Demokrasi ve İnsan Hakları',
  'Sağlık Bilgisi',
  'Astronomi',
  'Rehberlik',
  'Beden Eğitimi',
  'Görsel Sanatlar',
  'Müzik',
  'Bilişim Teknolojileri',
  'Seçmeli Matematik',
  'Seçmeli Fizik',
  'Seçmeli Kimya',
  'Seçmeli Biyoloji'
];
