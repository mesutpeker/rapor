import React, { useMemo, useState } from 'react';
import type {
  MeetingInfo,
  Teacher,
  AgendaItem,
  GenerationSettings,
  GeneratedMinutes,
  GradeLevel
} from './types';
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
  { shortLabel: 'Bilgiler', title: 'Toplantı Bilgileri', description: 'Okul, sınıf, başkan ve onay bilgileri' },
  { shortLabel: 'Kadrolar', title: 'Öğretmenler', description: 'Katılımcılar ve branş bilgileri' },
  { shortLabel: 'İçerik', title: 'Gündem ve Ayarlar', description: 'Metin biçimi ve gündem maddeleri' },
  { shortLabel: 'Tutanak', title: 'Önizleme', description: 'Son kontrol ve Word çıktısı' }
] as const;

const PREVIEW_STEP = wizardSteps.length - 1;

// "10/A", "9-B", "11 FEN" gibi şube adlarının başındaki sınıf düzeyini okur.
const parseGradeLevel = (className: string): GradeLevel | null => {
  const match = /^\s*(9|10|11|12)(?!\d)/.exec(className);
  return match ? (Number(match[1]) as GradeLevel) : null;
};

interface ExportStatus {
  type: 'success' | 'error';
  text: string;
}

const App: React.FC = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    schoolName: 'Atatürk Lisesi',
    academicYear: getDefaultAcademicYear(),
    period: 'kasim',
    term: '1. Dönem',
    date: getDefaultDate(),
    time: '15:30',
    location: 'Öğretmenler Odası',
    className: '9/A',
    gradeLevel: 9,
    classAchievementLevel: 'medium',
    chairpersonName: '',
    principalName: ''
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>(() => getDefaultAgendaForPeriod('kasim'));
  // Kullanıcı gündemi elle değiştirdiyse dönem değişiminde onay istenir.
  const [agendaEdited, setAgendaEdited] = useState(false);
  const [minutes, setMinutes] = useState<GeneratedMinutes | null>(null);
  // Tutanağın hangi girdilerle üretildiğinin izi: girdiler değişmedikçe
  // önizlemeye dönüldüğünde metin yeniden rastgele üretilmez.
  const [generatedKey, setGeneratedKey] = useState('');
  const [settings, setSettings] = useState<GenerationSettings>({
    variationMode: 'random',
    variationId: 1,
    tone: 'balanced',
    speechLength: 'medium'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<ExportStatus | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const inputsKey = useMemo(
    () => JSON.stringify({ meetingInfo, teachers, agenda, settings }),
    [meetingInfo, teachers, agenda, settings]
  );

  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (!meetingInfo.schoolName.trim()) errors.push('Okul adını girin (1. adım).');
    if (!meetingInfo.className.trim()) errors.push('Sınıf/şube bilgisini girin (1. adım).');
    if (!meetingInfo.date) errors.push('Toplantı tarihini seçin (1. adım).');
    if (teachers.length < 2) errors.push('En az iki öğretmen ekleyin (2. adım).');
    if (!agenda.some(item => item.enabled && item.title.trim())) {
      errors.push('En az bir gündem maddesini etkinleştirin (3. adım).');
    }
    if (agenda.some(item => item.enabled && !item.title.trim())) {
      errors.push('Başlığı boş olan gündem maddelerini doldurun veya kapatın (3. adım).');
    }
    return errors;
  }, [meetingInfo, teachers, agenda]);

  const handleMeetingInfoChange = (next: MeetingInfo) => {
    let updated = next;

    // Şube adı "10/A" biçiminde yazıldıysa sınıf düzeyi de buna göre ayarlanır.
    if (updated.className !== meetingInfo.className) {
      const parsedGrade = parseGradeLevel(updated.className);
      if (parsedGrade) updated = { ...updated, gradeLevel: parsedGrade };
    }

    if (updated.period !== meetingInfo.period) {
      if (
        agendaEdited
        && !window.confirm(
          'Toplantı dönemi değiştiğinde gündem, yeni dönemin varsayılan maddeleriyle değiştirilir ve yaptığınız gündem düzenlemeleri silinir. Devam edilsin mi?'
        )
      ) {
        return;
      }
      const profile = getPeriodProfile(updated.period);
      setAgenda(getDefaultAgendaForPeriod(updated.period));
      setAgendaEdited(false);
      updated = { ...updated, term: profile.termLabel };
    }

    // Varyasyon odakları sınıf düzeyine özgüdür; düzey değişince elle seçilmiş
    // odak başka bir anlama kaymasın diye rastgele seçime dönülür.
    if (updated.gradeLevel !== meetingInfo.gradeLevel && settings.variationMode === 'manual') {
      setSettings(previous => ({ ...previous, variationMode: 'random' }));
    }

    setMeetingInfo(updated);
  };

  const handleAgendaChange: React.Dispatch<React.SetStateAction<AgendaItem[]>> = updater => {
    setAgendaEdited(true);
    setAgenda(updater);
  };

  const handleAgendaReset = () => {
    setAgenda(getDefaultAgendaForPeriod(meetingInfo.period));
    setAgendaEdited(false);
  };

  const handleGenerate = () => {
    setMinutes(generateMinutes(meetingInfo, teachers, agenda, settings));
    setGeneratedKey(inputsKey);
    setExportStatus(null);
  };

  const goToStep = (step: number) => {
    if (step === currentStep || step < 0 || step >= wizardSteps.length) return;
    if (step === PREVIEW_STEP) {
      if (validationErrors.length > 0) {
        setShowValidation(true);
        return;
      }
      if (!minutes || generatedKey !== inputsKey) handleGenerate();
    }
    setShowValidation(false);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextStep = () => {
    goToStep(currentStep + 1);
  };

  const handleExportDocx = async () => {
    if (!minutes || isExporting) return;

    setIsExporting(true);
    setExportStatus(null);
    try {
      const { exportToDocx } = await import('./utils/exportDocx');
      await exportToDocx(minutes, `SOK_${minutes.meetingInfo.className}`);
      setExportStatus({ type: 'success', text: 'Word belgesi indirildi.' });
    } catch (error) {
      console.error('Word belgesi oluşturulamadı:', error);
      setExportStatus({ type: 'error', text: 'Word belgesi oluşturulamadı. Lütfen tekrar deneyin.' });
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
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Ortaöğretim (9–12) için Kasım / Nisan takvimine uygun taslak tutanak hazırlayın.
          </p>
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
              <MeetingInfoForm
                info={meetingInfo}
                onChange={handleMeetingInfoChange}
              />
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
                  setAgenda={handleAgendaChange}
                  onReset={handleAgendaReset}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                {exportStatus && (
                  <p
                    className={`mb-4 text-sm text-center ${exportStatus.type === 'error' ? 'text-red-600' : 'text-green-700'}`}
                    role="status"
                    aria-live="polite"
                  >
                    {exportStatus.text}
                  </p>
                )}
                <MinutesPreview minutes={minutes} />
              </>
            )}
          </section>

          {showValidation && validationErrors.length > 0 && (
            <div
              className="mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg px-4 py-3 no-print"
              role="alert"
            >
              <p className="font-semibold mb-1">Tutanak oluşturulmadan önce şu eksikleri tamamlayın:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                {validationErrors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

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
              <>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="btn-secondary justify-center"
                  disabled={isExporting}
                  title="Aynı bilgilerle konuşma ve karar metinlerini yeniden üretir"
                >
                  Metni Yeniden Üret
                </button>
                <button
                  type="button"
                  onClick={handleExportDocx}
                  className="btn-primary justify-center"
                  disabled={!minutes || isExporting}
                >
                  {isExporting ? 'Word hazırlanıyor…' : 'Word İndir'}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
