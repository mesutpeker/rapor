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
            'Öğrencilerin liseye uyum süreçlerinin yakından izlenmesi ve okul kültürünü benimsemelerinin desteklenmesi gerektiğini belirtti.',
            'Sınıf kurallarının benimsenmesine yönelik çalışmaların sürdürülmesi gerektiğini ifade etti.'
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
            'Öğrencilerin düzenli ders çalışma, not tutma ve tekrar yapma alışkanlıklarının geliştirilmesi gerektiğini belirtti.',
            'Ödev sorumluluğunun düzenli takip ve geri bildirimle desteklenmesi gerektiğini ifade etti.'
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
         speechTemplates: {'genel':['Öğrencilerin akran ilişkilerinin güçlendirilmesi ve rehberlik ihtiyaçlarının yakından izlenmesi gerektiğini ifade etti.']},
         decisionTemplates: ['Sosyal becerilerin geliştirilmesi için etkinlikler planlanmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Devamsızlık, veli iletişimi ve sorumluluk ağırlıklı',
         focus: 'devamsızlık takibi, sorumluluk, veli iletişimi',
         keywords: ['devamsızlık', 'sorumluluk'],
         agendaHints: {},
         speechTemplates: {'genel':['Devamsızlık eğilimi gösteren öğrencilerin sorumluluk ve veli iş birliği yönünden yakından izlenmesi gerektiğini belirtti.']},
         decisionTemplates: ['Devamsızlık yapan öğrencilerin velileriyle iletişime geçilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Sınıf içi motivasyon, katılım ve akran ilişkileri ağırlıklı',
         focus: 'motivasyon, derse katılım',
         keywords: ['motivasyon', 'katılım'],
         agendaHints: {},
         speechTemplates: {'genel':['Sınıf içi motivasyonu ve derse katılımı artıran yöntemlerin çeşitlendirilmesi gerektiğini vurguladı.']},
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
            'Öğrencilerin akademik düzen ve sorumluluk bilinci bakımından yakından izlenmesi gerektiğini belirtti.'
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
        speechTemplates: {'genel':['Öğrencilerin alan seçimi sürecinde ilgi ve yetenekleri doğrultusunda yönlendirilmeleri gerektiğini belirtti.']},
        decisionTemplates: ['Alan seçimi konusunda rehberlik servisiyle ortak çalışmalar yapılmasına karar verildi.']
      },
      {
         id: 3,
         title: 'Ders başarısının dengelenmesi ve ödev takibi ağırlıklı',
         focus: 'başarının dengelenmesi',
         keywords: ['denge', 'ödev'],
         agendaHints: {},
         speechTemplates: {'genel':['Ders başarılarındaki dalgalanmaların düzenli takip ve ödev çalışmalarıyla azaltılması gerektiğini ifade etti.']},
         decisionTemplates: ['Ödev takibinin daha sistemli yapılmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Disiplin, motivasyon ve sınıf içi tutum ağırlıklı',
         focus: 'disiplin, sınıf içi tutum',
         keywords: ['disiplin', 'tutum'],
         agendaHints: {},
         speechTemplates: {'genel':['Sınıf içi tutumların ve kurallara uyumun akademik gelişimi destekleyecek biçimde izlenmesi gerektiğini vurguladı.']},
         decisionTemplates: ['Sınıf kurallarına uyumun yakından takip edilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Veli iletişimi ve bireysel gelişim takibi ağırlıklı',
         focus: 'bireysel farkındalık, veli takibi',
         keywords: ['veli', 'gelişim'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin bireysel gelişimlerinin düzenli veli iletişimiyle birlikte izlenmesi gerektiğini belirtti.']},
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
            'Alan derslerindeki gelişimin öğrencilerin akademik hedefleriyle ilişkilendirilerek izlenmesi gerektiğini vurguladı.'
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
        speechTemplates: {'genel':['Üniversite sınavına hazırlık sürecinin dengeli ve sürdürülebilir bir çalışma planıyla başlatılması gerektiğini ifade etti.']},
        decisionTemplates: ['Deneme sınavı analizlerinin daha detaylı yapılarak öğrencilere geri bildirim verilmesine karar verildi.']
      },
      {
         id: 3,
         title: 'Mesleki yönelim ve rehberlik çalışmaları ağırlıklı',
         focus: 'mesleki yönelim',
         keywords: ['meslek', 'yönelim'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin mesleki yönelimlerini tanımalarına yardımcı olacak rehberlik çalışmalarının artırılması gerektiğini belirtti.']},
         decisionTemplates: ['Meslek tanıtım etkinliklerinin planlanmasına karar verildi.']
      },
      {
         id: 4,
         title: 'Performans takibi, devamsızlık ve ders yoğunluğu ağırlıklı',
         focus: 'performans takibi, ders yoğunluğu',
         keywords: ['performans', 'yoğunluk'],
         agendaHints: {},
         speechTemplates: {'genel':['Artan ders yoğunluğu karşısında öğrencilerin performans ve devam durumlarının birlikte izlenmesi gerektiğini vurguladı.']},
         decisionTemplates: ['Öğrencilerin ders yoğunluğuyla başa çıkabilmeleri için zaman yönetimi seminerleri düzenlenmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Bireysel çalışma planı ve farklılaştırılmış destek ağırlıklı',
         focus: 'bireysel takip',
         keywords: ['bireysel plan', 'destek'],
         agendaHints: {},
         speechTemplates: {'genel':['Her öğrencinin ihtiyacına uygun bireysel çalışma ve destek planlarının hazırlanması gerektiğini ifade etti.']},
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
            'Öğrencilerin YKS hazırlıklarını gerçekçi hedefler ve düzenli çalışma planlarıyla sürdürmeleri gerektiğini belirtti.'
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
        speechTemplates: {'genel':['Deneme sınavı sonuçlarının konu eksiklerini belirlemek ve çalışma planını güncellemek amacıyla değerlendirilmesi gerektiğini ifade etti.']},
        decisionTemplates: ['Eksik kazanımların belirlenerek tamamlayıcı çalışmalar yapılmasına karar verildi.']
      },
      {
         id: 3,
         title: 'Sınav kaygısı, motivasyon ve rehberlik ağırlıklı',
         focus: 'sınav kaygısı, motivasyon',
         keywords: ['kaygı', 'motivasyon'],
         agendaHints: {},
         speechTemplates: {'genel':['Sınav kaygısının öğrencilerin performansını olumsuz etkilememesi için motivasyon ve rehberlik desteğinin sürdürülmesi gerektiğini vurguladı.']},
         decisionTemplates: ['Sınav kaygısıyla başa çıkma konusunda seminerler düzenlenmesine karar verildi.']
      },
      {
         id: 4,
         title: 'Devamsızlık, mezuniyet süreci ve veli iletişimi ağırlıklı',
         focus: 'devamsızlık, mezuniyet',
         keywords: ['devamsızlık', 'mezuniyet'],
         agendaHints: {},
         speechTemplates: {'genel':['Mezuniyet sürecindeki öğrencilerin devam durumlarının velilerle iş birliği içinde yakından izlenmesi gerektiğini belirtti.']},
         decisionTemplates: ['Devamsızlık sınırına yaklaşan öğrencilerin velilerinin okula davet edilmesine karar verildi.']
      },
      {
         id: 5,
         title: 'Bireysel takip, kaynak kullanımı ve tercih süreci ağırlıklı',
         focus: 'kaynak kullanımı',
         keywords: ['kaynak', 'tercih'],
         agendaHints: {},
         speechTemplates: {'genel':['Öğrencilerin düzeylerine uygun kaynaklara yönlendirilmesi ve tercih sürecine kadar bireysel olarak izlenmesi gerektiğini vurguladı.']},
         decisionTemplates: ['Öğrencilerin seviyelerine uygun kaynak kullanımı konusunda rehberlik edilmesine karar verildi.']
      }
    ]
  }
];

export const getGradeProfile = (level: number): GradeProfile => {
  return gradeProfiles.find(p => p.level === level) || gradeProfiles[0];
};
