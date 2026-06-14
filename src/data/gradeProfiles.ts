import type { GradeProfile } from '../types';

export const gradeProfiles: GradeProfile[] = [
  {
    level: 9,
    label: '9. Sınıf',
    variations: [
      {
        id: 1,
        title: 'Okula uyum ve disiplin ağırlıklı',
        focus: 'liseye uyum, okul kültürünü tanıma, sınıf kuralları',
        keywords: ['uyum', 'kurallar', 'disiplin', 'okul kültürü'],
        agendaHints: {
          'acilis': ['liseye uyum süreci'],
          'davranis-disiplin': ['sınıf kurallarının benimsenmesi']
        },
        speechTemplates: {
          'genel': [
            'Öğrencilerimizin liseye uyum sürecinde oldukları gözlemlenmektedir.',
            'Sınıf kurallarının benimsenmesi konusunda çalışmalar yapılması gerekmektedir.'
          ]
        },
        decisionTemplates: [
          'Öğrencilerin okul kültürüne uyum sağlamaları için rehberlik servisiyle iş birliği yapılmasına karar verildi.'
        ]
      },
      {
        id: 2,
        title: 'Akademik alışkanlıklar ve ders takibi ağırlıklı',
        focus: 'temel ders çalışma alışkanlıkları, not tutma, ödev sorumluluğu',
        keywords: ['alışkanlık', 'not tutma', 'ödev'],
        agendaHints: {},
        speechTemplates: {
          'genel': [
            'Ders çalışma alışkanlıklarının henüz tam oturmadığı görülmektedir.',
            'Düzenli not tutma ve tekrar yapmanın önemi öğrencilere kavratılmalıdır.'
          ]
        },
        decisionTemplates: [
          'Öğrencilere düzenli ders çalışma ve not tutma alışkanlıklarının kazandırılması için yönlendirmeler yapılmasına karar verildi.'
        ]
      },
      {
         id: 3,
         title: 'Sosyal-duygusal gelişim ve rehberlik ağırlıklı',
         focus: 'akran ilişkileri, veli iletişimi, rehberlik ihtiyacı',
         keywords: ['akran', 'iletişim', 'rehberlik'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin akran ilişkilerinin güçlendirilmesi gerektiği ifade edilmiştir.']},
         decisionTemplates: ['Sosyal becerilerin geliştirilmesi için etkinlikler planlanmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Devamsızlık, veli iletişimi ve sorumluluk ağırlıklı',
         focus: 'devamsızlık takibi, sorumluluk, veli iletişimi',
         keywords: ['devamsızlık', 'sorumluluk'],
         agendaHints: {},
         speechTemplates: {'genel':['Devamsızlık alışkanlığı olan öğrencilerin yakından takip edilmesi gerektiği belirtilmiştir.']},
         decisionTemplates: ['Devamsızlık yapan öğrencilerin velileriyle iletişime geçilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Sınıf içi motivasyon, katılım ve akran ilişkileri ağırlıklı',
         focus: 'motivasyon, derse katılım',
         keywords: ['motivasyon', 'katılım'],
         agendaHints: {},
         speechTemplates: {'genel':['Sınıf içi motivasyonun artırılması için farklı yöntemler kullanılabileceği vurgulanmıştır.']},
         decisionTemplates: ['Derse katılımı artırıcı etkinliklere ağırlık verilmesine karar verildi.']
      }
    ]
  },
  {
    level: 10,
    label: '10. Sınıf',
    variations: [
      {
        id: 1,
        title: 'Sorumluluk bilinci ve akademik düzen ağırlıklı',
        focus: 'akademik düzenin sağlanması, sorumluluk bilinci',
        keywords: ['akademik düzen', 'sorumluluk'],
        agendaHints: {},
        speechTemplates: {
          'genel': [
            'Öğrencilerin 10. sınıfla birlikte sorumluluk bilinçlerinin artması beklenmektedir.'
          ]
        },
        decisionTemplates: [
          'Öğrencilerin akademik sorumluluklarını yerine getirmeleri için takiplerin sıklaştırılmasına karar verildi.'
        ]
      },
      {
        id: 2,
        title: 'Alan seçimine hazırlık ve ilgi-yetenek farkındalığı ağırlıklı',
        focus: 'alan seçimine hazırlık',
        keywords: ['alan seçimi', 'yetenek'],
        agendaHints: {},
        speechTemplates: {'genel':['Öğrencilerin alan seçimi sürecinde doğru yönlendirilmelerinin önemli olduğu belirtilmiştir.']},
        decisionTemplates: ['Alan seçimi konusunda rehberlik servisiyle ortak çalışmalar yapılmasına karar verildi.']
      },
      {
         id: 3,
         title: 'Ders başarısının dengelenmesi ve ödev takibi ağırlıklı',
         focus: 'başarının dengelenmesi',
         keywords: ['denge', 'ödev'],
         agendaHints: {},
         speechTemplates: {'genel':['Ders başarılarında görülen dalgalanmaların önüne geçilmesi gerektiği ifade edilmiştir.']},
         decisionTemplates: ['Ödev takibinin daha sistemli yapılmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Disiplin, motivasyon ve sınıf içi tutum ağırlıklı',
         focus: 'disiplin, sınıf içi tutum',
         keywords: ['disiplin', 'tutum'],
         agendaHints: {},
         speechTemplates: {'genel':['Sınıf içi disiplinin sağlanmasının akademik başarıyı olumlu etkileyeceği vurgulanmıştır.']},
         decisionTemplates: ['Sınıf kurallarına uyumun yakından takip edilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Veli iletişimi ve bireysel gelişim takibi ağırlıklı',
         focus: 'bireysel farkındalık, veli takibi',
         keywords: ['veli', 'gelişim'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin bireysel gelişimlerinin takibinde veli iş birliğinin şart olduğu belirtilmiştir.']},
         decisionTemplates: ['Veli toplantılarının haricinde bireysel veli görüşmelerine ağırlık verilmesine karar verildi.']
      }
    ]
  },
  {
    level: 11,
    label: '11. Sınıf',
    variations: [
      {
        id: 1,
        title: 'Alan dersleri ve akademik hedef belirleme ağırlıklı',
        focus: 'alan dersleri, akademik hedef belirleme',
        keywords: ['alan', 'hedef'],
        agendaHints: {},
        speechTemplates: {
          'genel': [
            'Alan derslerindeki başarının, öğrencilerin üniversite hedefleri için belirleyici olduğu vurgulanmıştır.'
          ]
        },
        decisionTemplates: [
          'Öğrencilerin akademik hedeflerini netleştirmeleri için çalışmalar yapılmasına karar verildi.'
        ]
      },
      {
        id: 2,
        title: 'Sınav hazırlığına başlangıç ve deneme analizi ağırlıklı',
        focus: 'sınav hazırlık sürecine başlangıç',
        keywords: ['sınav', 'deneme'],
        agendaHints: {},
        speechTemplates: {'genel':['Üniversite sınavı hazırlıklarına yavaş yavaş başlanması gerektiği ifade edilmiştir.']},
        decisionTemplates: ['Deneme sınavı analizlerinin daha detaylı yapılarak öğrencilere geri bildirim verilmesine karar verildi.']
      },
      {
         id: 3,
         title: 'Mesleki yönelim ve rehberlik çalışmaları ağırlıklı',
         focus: 'mesleki yönelim',
         keywords: ['meslek', 'yönelim'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin mesleki yönelimleri konusunda desteklenmeleri gerektiği belirtilmiştir.']},
         decisionTemplates: ['Meslek tanıtım etkinliklerinin planlanmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Performans takibi, devamsızlık ve ders yoğunluğu ağırlıklı',
         focus: 'performans takibi, ders yoğunluğu',
         keywords: ['performans', 'yoğunluk'],
         agendaHints: {},
         speechTemplates: {'genel':['Artan ders yoğunluğuyla birlikte öğrencilerin performanslarının yakından takip edilmesi gerektiği vurgulanmıştır.']},
         decisionTemplates: ['Öğrencilerin ders yoğunluğuyla başa çıkabilmeleri için zaman yönetimi seminerleri düzenlenmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Bireysel çalışma planı ve farklılaştırılmış destek ağırlıklı',
         focus: 'bireysel takip',
         keywords: ['bireysel plan', 'destek'],
         agendaHints: {},
         speechTemplates: {'genel':['Her öğrencinin ihtiyacına uygun bireysel çalışma planlarının oluşturulmasının yararlı olacağı ifade edilmiştir.']},
         decisionTemplates: ['Rehberlik servisiyle iş birliği içinde bireysel çalışma planları hazırlanmasına karar verildi.']
      }
    ]
  },
  {
    level: 12,
    label: '12. Sınıf',
    variations: [
      {
        id: 1,
        title: 'YKS hazırlığı ve hedef odaklı çalışma ağırlıklı',
        focus: 'YKS hazırlığı, hedef odaklı çalışma',
        keywords: ['YKS', 'hedef', 'çalışma'],
        agendaHints: {},
        speechTemplates: {
          'genel': [
            '12. sınıf öğrencilerimizin YKS hazırlıklarına odaklanmaları gerektiği belirtilmiştir.'
          ]
        },
        decisionTemplates: [
          'YKS hazırlık sürecinin titizlikle takip edilmesine karar verildi.'
        ]
      },
      {
        id: 2,
        title: 'Deneme sınavı analizi ve konu eksiği takibi ağırlıklı',
        focus: 'deneme sınavı analizleri',
        keywords: ['deneme', 'analiz', 'eksik'],
        agendaHints: {},
        speechTemplates: {'genel':['Deneme sınavı sonuçlarının sadece not olarak değil, konu eksikliklerini görme aracı olarak değerlendirilmesi gerektiği ifade edilmiştir.']},
        decisionTemplates: ['Eksik kazanımların belirlenerek tamamlayıcı çalışmalar yapılmasına karar verildi.']
      },
      {
         id: 3,
         title: 'Sınav kaygısı, motivasyon ve rehberlik ağırlıklı',
         focus: 'sınav kaygısı, motivasyon',
         keywords: ['kaygı', 'motivasyon'],
         agendaHints: {},
         speechTemplates: {'genel':['Yaklaşan sınavla birlikte artan kaygı düzeyinin öğrencilerin performansını olumsuz etkileyebileceği vurgulanmıştır.']},
         decisionTemplates: ['Sınav kaygısıyla başa çıkma konusunda seminerler düzenlenmesine karar verildi.']
      },
      {
         id: 4,
         title: 'Devamsızlık, mezuniyet süreci ve veli iletişimi ağırlıklı',
         focus: 'devamsızlık, mezuniyet',
         keywords: ['devamsızlık', 'mezuniyet'],
         agendaHints: {},
         speechTemplates: {'genel':['12. sınıflarda sıkça karşılaşılan devamsızlık probleminin önüne geçilmesi gerektiği belirtilmiştir.']},
         decisionTemplates: ['Devamsızlık sınırına yaklaşan öğrencilerin velilerinin okula davet edilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Bireysel takip, kaynak kullanımı ve tercih süreci ağırlıklı',
         focus: 'kaynak kullanımı',
         keywords: ['kaynak', 'tercih'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin doğru kaynaklara yönlendirilmesinin ve bireysel takiplerinin yapılmasının önemi vurgulanmıştır.']},
         decisionTemplates: ['Öğrencilerin seviyelerine uygun kaynak kullanımı konusunda rehberlik edilmesine karar verildi.']
      }
    ]
  }
];

export const getGradeProfile = (level: number): GradeProfile => {
  return gradeProfiles.find(p => p.level === level) || gradeProfiles[0];
};
