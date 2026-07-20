import React, { useState } from 'react';
import type { MeetingInfo, Teacher, AgendaItem, GenerationSettings, GeneratedMinutes } from './types';
import { getDefaultAgendaForPeriod } from './data/periodAgendas';
import { getPeriodProfile } from './data/meetingPeriods';
import { generateMinutes } from './utils/generateMinutes';

import { MeetingInfoForm } from './components/MeetingInfoForm';
import { TeachersPanel } from './components/TeachersPanel';
import { AgendaPanel } from './components/AgendaPanel';
import { MinutesPreview } from './components/MinutesPreview';
import { GenerationSettingsPanel } from './components/GenerationSettingsPanel';

const getDefaultAcademicYear = (): string => {
  const now = new Date();
  const startYear = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return `${startYear}-${startYear + 1}`;
};

const getDefaultDate = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

const wizardSteps = [
  { shortLabel: 'Bilgiler', title: 'Toplantı Bilgileri', description: 'Okul, sınıf ve toplantı ayrıntıları' },
  { shortLabel: 'Kadrolar', title: 'Öğretmenler', description: 'Katılımcılar ve branş bilgileri' },
  { shortLabel: 'İçerik', title: 'Gündem ve Ayarlar', description: 'Metin biçimi ve gündem maddeleri' },
  { shortLabel: 'Tutanak', title: 'Önizleme', description: 'Son kontrol ve Word çıktısı' }
] as const;

const App: React.FC = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    schoolName: 'Atatürk Lisesi',
    academicYear: getDefaultAcademicYear(),
    period: 'sene-basi',
    term: '1. Dönem',
    date: getDefaultDate(),
    time: '15:30',
    location: 'Öğretmenler Odası',
    className: '9/A',
    gradeLevel: 9,
    classAchievementLevel: 'medium',
    chairpersonId: '',
    clerkId: ''
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>(() => getDefaultAgendaForPeriod('sene-basi'));
  const [minutes, setMinutes] = useState<GeneratedMinutes | null>(null);

  // Toplantı bilgisi değişimini yakalar. Dönem değiştiğinde gündem maddelerini
  // o döneme ait varsayılana sıfırlar ve "Dönem:" etiketini günceller.
  const handleMeetingInfoChange = (next: MeetingInfo) => {
    if (next.period !== meetingInfo.period) {
      const profile = getPeriodProfile(next.period);
      setAgenda(getDefaultAgendaForPeriod(next.period));
      setMeetingInfo({ ...next, term: profile.termLabel });
      return;
    }
    setMeetingInfo(next);
  };

  const [settings, setSettings] = useState<GenerationSettings>({
    variationMode: 'random',
    variationId: 1,
    tone: 'balanced',
    speechLength: 'medium'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleGenerate = () => {
    const generated = generateMinutes(meetingInfo, teachers, agenda, settings);
    setMinutes(generated);
    setExportMessage('');
  };

  const goToStep = (step: number) => {
    if (step === currentStep || step < 0 || step >= wizardSteps.length) return;
    if (step === wizardSteps.length - 1) handleGenerate();
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextStep = () => {
    goToStep(currentStep + 1);
  };

  const handleExportDocx = async () => {
    if (!minutes || isExporting) return;

    setIsExporting(true);
    setExportMessage('');
    try {
      const { exportToDocx } = await import('./utils/exportDocx');
      await exportToDocx(minutes, `SOK_${minutes.meetingInfo.className}`);
      setExportMessage('Word belgesi indirildi.');
    } catch (error) {
      console.error('Word belgesi oluşturulamadı:', error);
      setExportMessage('Word belgesi oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-5 sm:mb-7 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 mb-2">
            Adım adım tutanak hazırlama
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Şube Öğretmenler Kurulu Tutanak Oluşturucu</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Bilgileri sırayla tamamlayın, tutanağınızı son adımda kontrol edin.</p>
        </header>

        <nav className="glass-card wizard-nav p-3 sm:p-5 mb-5 sm:mb-7 no-print" aria-label="Tutanak hazırlama adımları">
          <ol className="grid grid-cols-4">
            {wizardSteps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              return (
                <li
                  key={step.title}
                  className={`wizard-step ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                >
                  <button
                    type="button"
                    className="wizard-step-button"
                    onClick={() => goToStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`${index + 1}. adım: ${step.title}`}
                  >
                    <span className="wizard-step-number" aria-hidden="true">
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    <span className="wizard-step-label">{step.shortLabel}</span>
                    <span className="wizard-step-description">{step.description}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <main>
          <div className="mb-4 sm:mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                Adım {currentStep + 1} / {wizardSteps.length}
              </p>
              <h2 id="current-step-title" className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {wizardSteps[currentStep].title}
              </h2>
            </div>
            {currentStep === 1 && (
              <span className="badge badge-info shrink-0">{teachers.length} öğretmen</span>
            )}
            {currentStep === 2 && (
              <span className="badge badge-info shrink-0">{agenda.filter(item => item.enabled).length} aktif madde</span>
            )}
          </div>

          <section className="wizard-content" aria-labelledby="current-step-title">
            {currentStep === 0 && (
              <MeetingInfoForm info={meetingInfo} onChange={handleMeetingInfoChange} />
            )}

            {currentStep === 1 && (
              <TeachersPanel teachers={teachers} setTeachers={setTeachers} />
            )}

            {currentStep === 2 && (
              <>
                <GenerationSettingsPanel
                  settings={settings}
                  gradeLevel={meetingInfo.gradeLevel}
                  onChange={setSettings}
                />
                <AgendaPanel
                  agenda={agenda}
                  setAgenda={setAgenda}
                  onReset={() => setAgenda(getDefaultAgendaForPeriod(meetingInfo.period))}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                {exportMessage && (
                  <p
                    className={`mb-4 text-sm text-center ${exportMessage.includes('oluşturulamadı') ? 'text-red-600' : 'text-green-700'}`}
                    role="status"
                    aria-live="polite"
                  >
                    {exportMessage}
                  </p>
                )}
                <MinutesPreview minutes={minutes} />
              </>
            )}
          </section>

          <div className="glass-card wizard-actions no-print">
            <button
              type="button"
              onClick={() => goToStep(currentStep - 1)}
              className="btn-secondary justify-center"
              disabled={currentStep === 0}
            >
              ← Geri
            </button>

            {currentStep < 2 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="btn-primary justify-center"
              >
                {currentStep === 0 ? 'Öğretmenlere Geç' : 'Gündem ve Ayarlara Geç'} →
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="btn-primary justify-center"
              >
                Tutanağı Oluştur →
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                onClick={handleExportDocx}
                className="btn-primary justify-center"
                disabled={!minutes || isExporting}
              >
                {isExporting ? 'Word hazırlanıyor…' : 'Word İndir'}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
