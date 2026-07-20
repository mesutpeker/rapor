import React from 'react';
import type { GenerationSettings, GradeLevel, SpeechLengthType, ToneType } from '../types';
import { getGradeProfile } from '../data/gradeProfiles';

interface Props {
  settings: GenerationSettings;
  gradeLevel: GradeLevel;
  onChange: React.Dispatch<React.SetStateAction<GenerationSettings>>;
}

const toneOptions: { value: ToneType; label: string }[] = [
  { value: 'official', label: 'Resmî' },
  { value: 'balanced', label: 'Dengeli' },
  { value: 'detailed', label: 'Ayrıntılı' }
];

const lengthOptions: { value: SpeechLengthType; label: string }[] = [
  { value: 'short', label: 'Kısa' },
  { value: 'medium', label: 'Orta' },
  { value: 'long', label: 'Uzun' }
];

export const GenerationSettingsPanel: React.FC<Props> = ({
  settings,
  gradeLevel,
  onChange
}) => {
  const variations = getGradeProfile(gradeLevel).variations;
  const variationValue = settings.variationMode === 'random'
    ? 'random'
    : `variation-${settings.variationId}`;

  const update = <K extends keyof GenerationSettings>(
    key: K,
    value: GenerationSettings[K]
  ) => {
    onChange(previous => ({ ...previous, [key]: value }));
  };

  const updateVariation = (value: string) => {
    if (value === 'random') {
      onChange(previous => ({ ...previous, variationMode: 'random' }));
      return;
    }

    onChange(previous => ({
      ...previous,
      variationMode: 'manual',
      variationId: Number(value.replace('variation-', ''))
    }));
  };

  return (
    <div className="glass-card p-4 sm:p-5 mb-6">
      <h2 className="section-title">Metin Üretim Ayarları</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="tone">Anlatım Biçimi</label>
          <select
            id="tone"
            className="select-field"
            value={settings.tone}
            onChange={event => update('tone', event.target.value as ToneType)}
          >
            {toneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="speechLength">Konuşma Uzunluğu</label>
          <select
            id="speechLength"
            className="select-field"
            value={settings.speechLength}
            onChange={event => update('speechLength', event.target.value as SpeechLengthType)}
          >
            {lengthOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="variationFocus">Varyasyon Odağı</label>
          <select
            id="variationFocus"
            className="select-field"
            value={variationValue}
            onChange={event => updateVariation(event.target.value)}
          >
            <option value="random">Her üretimde rastgele odak seç</option>
            {variations.map(variation => (
              <option key={variation.id} value={`variation-${variation.id}`}>
                {variation.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Rastgele seçimi kullanabilir veya sınıf düzeyine uygun bir odağı doğrudan sabitleyebilirsiniz.
      </p>
    </div>
  );
};
