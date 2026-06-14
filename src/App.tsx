import React, { useState } from 'react';
import type { MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes } from './types';
import { defaultAgendaItems } from './data/agendaItems';
import { generateMinutes } from './utils/generateMinutes';

import { exportToDocx } from './utils/exportDocx';
import { MeetingInfoForm } from './components/MeetingInfoForm';
import { TeachersPanel } from './components/TeachersPanel';
import { AgendaPanel } from './components/AgendaPanel';
import { MinutesPreview } from './components/MinutesPreview';

const App: React.FC = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    schoolName: 'Atatürk Lisesi',
    academicYear: '2025-2026',
    term: '1. Dönem',
    date: new Date().toLocaleDateString('tr-TR'),
    time: '15:30',
    location: 'Öğretmenler Odası',
    className: '9/A',
    gradeLevel: 9,
    classAchievementLevel: 'medium',
    chairpersonId: '',
    clerkId: ''
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>(defaultAgendaItems);
  const [minutes, setMinutes] = useState<GeneratedMinutes | null>(null);

  const [settings] = useState<GenerationSettings>({
    variationMode: 'random',
    variationId: 1,
    tone: 'balanced',
    speechLength: 'medium'
  });

  const handleGenerate = () => {
    const generated = generateMinutes(meetingInfo, teachers, agenda, settings);
    setMinutes(generated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Şube Öğretmenler Kurulu Tutanak Oluşturucu</h1>
          <p className="text-gray-600 mt-2">Lise düzeyi için otomatik tutanak hazırlama aracı</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-[calc(100vh-150px)] overflow-y-auto pr-4 custom-scrollbar">
            <MeetingInfoForm info={meetingInfo} onChange={setMeetingInfo} />
            <TeachersPanel teachers={teachers} setTeachers={setTeachers} />
            <AgendaPanel agenda={agenda} setAgenda={setAgenda} />

            <div className="glass-card p-6 mb-6">
              <button onClick={handleGenerate} className="btn-primary w-full justify-center text-lg py-3">
                Tutanak Oluştur
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="glass-card p-4 mb-4 flex gap-2 no-print justify-end bg-white">
              <button 
                onClick={() => { if(minutes) exportToDocx(minutes, `SOK_${meetingInfo.className}`); }} 
                className="btn-primary w-full justify-center text-lg py-3"
                disabled={!minutes}
              >
                Word İndir
              </button>
            </div>
            
            <MinutesPreview minutes={minutes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
