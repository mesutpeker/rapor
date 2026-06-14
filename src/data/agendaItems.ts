import type { AgendaItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultAgendaItems: AgendaItem[] = [
  {
    id: uuidv4(),
    title: 'Açılış ve yoklama',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin genel akademik başarı durumlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'four'
  },
  {
    id: uuidv4(),
    title: 'Devamsızlık durumlarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Ölçme ve değerlendirme çalışmalarının görüşülmesi',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Veli iletişimi ve okul-aile iş birliği',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Destekleme, yetiştirme ve bireysel takip çalışmaları',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Dilek ve temenniler',
    enabled: true,
    speakerCountMode: 'three'
  },
  {
    id: uuidv4(),
    title: 'Kapanış',
    enabled: true,
    speakerCountMode: 'three'
  }
];

export const agendaCategoryMap: Record<string, string> = {
  'Açılış ve yoklama': 'acilis',
  'Öğrencilerin genel akademik başarı durumlarının değerlendirilmesi': 'akademik-basari',
  'Devamsızlık durumlarının görüşülmesi': 'devamsizlik',
  'Öğrencilerin davranış, disiplin ve sınıf içi tutumlarının değerlendirilmesi': 'davranis-disiplin',
  'Sınıf içi motivasyon ve derse katılım durumlarının görüşülmesi': 'motivasyon-katilim',
  'Öğrencilerin sosyal, duygusal ve rehberlik ihtiyaçlarının değerlendirilmesi': 'sosyal-duygusal',
  'Ölçme ve değerlendirme çalışmalarının görüşülmesi': 'olcme-degerlendirme',
  'Veli iletişimi ve okul-aile iş birliği': 'veli-iletisim',
  'Destekleme, yetiştirme ve bireysel takip çalışmaları': 'destekleme',
  'Dilek ve temenniler': 'dilek-temenniler',
  'Kapanış': 'kapanis'
};

export const getAgendaCategory = (title: string): string => {
  for (const [key, value] of Object.entries(agendaCategoryMap)) {
    if (title.toLowerCase().includes(key.toLowerCase().substring(0, 15))) {
      return value;
    }
  }
  return 'genel';
};
