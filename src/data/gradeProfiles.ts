import type { GradeProfile } from '../types';

// Sınıf düzeyine özgü içerik odakları. Akademik başarı maddesinde bir odak
// (rastgele veya ayarlardan seçilerek) konuşmaya eklenir.
export const gradeProfiles: GradeProfile[] = [
  {
    level: 9,
    label: '9. Sınıf',
    variations: [
      { id: 1, title: 'Okula uyum ve disiplin ağırlıklı', focus: 'liseye uyum, okul kültürünü tanıma, sınıf kuralları' },
      { id: 2, title: 'Akademik alışkanlıklar ve ders takibi ağırlıklı', focus: 'temel ders çalışma alışkanlıkları, not tutma, ödev sorumluluğu' },
      { id: 3, title: 'Sosyal-duygusal gelişim ve rehberlik ağırlıklı', focus: 'akran ilişkileri, veli iletişimi, rehberlik ihtiyacı' },
      { id: 4, title: 'Devamsızlık, veli iletişimi ve sorumluluk ağırlıklı', focus: 'devamsızlık takibi, sorumluluk, veli iletişimi' },
      { id: 5, title: 'Sınıf içi motivasyon, katılım ve akran ilişkileri ağırlıklı', focus: 'motivasyon, derse katılım' }
    ]
  },
  {
    level: 10,
    label: '10. Sınıf',
    variations: [
      { id: 1, title: 'Sorumluluk bilinci ve akademik düzen ağırlıklı', focus: 'akademik düzenin sağlanması, sorumluluk bilinci' },
      { id: 2, title: 'Alan seçimine hazırlık ve ilgi-yetenek farkındalığı ağırlıklı', focus: 'alan seçimine hazırlık' },
      { id: 3, title: 'Ders başarısının dengelenmesi ve ödev takibi ağırlıklı', focus: 'başarının dengelenmesi' },
      { id: 4, title: 'Disiplin, motivasyon ve sınıf içi tutum ağırlıklı', focus: 'disiplin, sınıf içi tutum' },
      { id: 5, title: 'Veli iletişimi ve bireysel gelişim takibi ağırlıklı', focus: 'bireysel farkındalık, veli takibi' }
    ]
  },
  {
    level: 11,
    label: '11. Sınıf',
    variations: [
      { id: 1, title: 'Alan dersleri ve akademik hedef belirleme ağırlıklı', focus: 'alan dersleri, akademik hedef belirleme' },
      { id: 2, title: 'Sınav hazırlığına başlangıç ve deneme analizi ağırlıklı', focus: 'sınav hazırlık sürecine başlangıç' },
      { id: 3, title: 'Mesleki yönelim ve rehberlik çalışmaları ağırlıklı', focus: 'mesleki yönelim' },
      { id: 4, title: 'Performans takibi, devamsızlık ve ders yoğunluğu ağırlıklı', focus: 'performans takibi, ders yoğunluğu' },
      { id: 5, title: 'Bireysel çalışma planı ve farklılaştırılmış destek ağırlıklı', focus: 'bireysel takip' }
    ]
  },
  {
    level: 12,
    label: '12. Sınıf',
    variations: [
      { id: 1, title: 'YKS hazırlığı ve hedef odaklı çalışma ağırlıklı', focus: 'YKS hazırlığı, hedef odaklı çalışma' },
      { id: 2, title: 'Deneme sınavı analizi ve konu eksiği takibi ağırlıklı', focus: 'deneme sınavı analizleri' },
      { id: 3, title: 'Sınav kaygısı, motivasyon ve rehberlik ağırlıklı', focus: 'sınav kaygısı, motivasyon' },
      { id: 4, title: 'Devamsızlık, mezuniyet süreci ve veli iletişimi ağırlıklı', focus: 'devamsızlık, mezuniyet' },
      { id: 5, title: 'Bireysel takip, kaynak kullanımı ve tercih süreci ağırlıklı', focus: 'kaynak kullanımı' }
    ]
  }
];

export const getGradeProfile = (level: number): GradeProfile =>
  gradeProfiles.find(p => p.level === level) || gradeProfiles[0];
