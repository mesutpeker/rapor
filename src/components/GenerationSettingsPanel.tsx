import React from 'react';
import type { GenerationSettings, GradeLevel, SpeechLengthType, ToneType } from '../types';
import { getGradeProfile } from '../data/gradeProfiles';

interface Props {
  settings: GenerationSettings;
  gradeLevel: GradeLevel;
  onChange: React.Dispatch<React.SetStateAction<GenerationSettings>>;
}

// Her seçeneğin altında, seçimin tutanağı nasıl değiştirdiği kısaca anlatılır.
const toneOptions: { value: ToneType; label: string; hint: string }[] = [
  {
    value: 'official',
    label: 'Resmî',
    hint: 'Konuşmalar “görüşlerini kurula sundu” gibi resmî yazışma diline yakın ifadelerle başlar.'
  },
  {
    value: 'balanced',
    label: 'Sade',
    hint: 'Konuşmalar “gözlemlerini paylaştı” gibi sade ve akıcı ifadelerle başlar.'
  },
  {
    value: 'detailed',
    label: 'Ayrıntılı',
    hint: 'Her konuşmaya önerinin nedenini açıklayan bir cümle eklenir; konuşmalar uzar.'
  }
];

const lengthOptions: { value: SpeechLengthType; label: string; hint: string }[] = [
  { value: 'short', label: 'Kısa', hint: 'Her öğretmen için yaklaşık 2–3 cümle.' },
  { value: 'medium', label: 'Orta', hint: 'Her öğretmen için yaklaşık 3–5 cümle.' },
  { value: 'long', label: 'Uzun', hint: 'Her öğretmen için yaklaşık 5–7 cümle.' }
];

interface SegmentedProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: { value: T; label: string; hint: string }[];
  onSelect: (value: T) => void;
}

const Segmented = <T extends string>({ id, label, value, options, onSelect }: SegmentedProps<T>) => {
  const active = options.find(option => option.value === value) ?? options[0];
  return (
    <div>
      <span className="label" id={`${id}-label`}>{label}</span>
      <div
        className="grid grid-cols-3 gap-1 p-1 bg-gray-100/80 rounded-xl"
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint`}
      >
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={value === option.value}
            className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
              value === option.value
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1.5">{active.hint}</p>
    </div>
  );
};

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
      <h2 className="section-title">Metin Ayarları</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Segmented
          id="tone"
          label="Anlatım Biçimi"
          value={settings.tone}
          options={toneOptions}
          onSelect={tone => update('tone', tone)}
        />
        <Segmented
          id="speechLength"
          label="Konuşma Uzunluğu"
          value={settings.speechLength}
          options={lengthOptions}
          onSelect={speechLength => update('speechLength', speechLength)}
        />
      </div>

      <details className="mt-4 group">
        <summary className="text-sm font-medium text-gray-600 cursor-pointer select-none hover:text-blue-700">
          Gelişmiş ayar: {gradeLevel}. sınıf vurgusu
        </summary>
        <div className="mt-3">
          <label className="label" htmlFor="variationFocus">Sınıf Düzeyi Vurgusu</label>
          <select
            id="variationFocus"
            className="select-field"
            value={variationValue}
            onChange={event => updateVariation(event.target.value)}
            aria-describedby="variationFocus-hint"
          >
            <option value="random">Her üretimde farklı bir vurgu seç</option>
            {variations.map(variation => (
              <option key={variation.id} value={`variation-${variation.id}`}>
                {variation.title}
              </option>
            ))}
          </select>
          <p id="variationFocus-hint" className="text-xs text-gray-500 mt-1.5">
            Yalnızca “başarı durumu” maddesindeki konuşmayı etkiler: sınıf düzeyine özgü hangi
            konunun öne çıkarılacağını belirler (ör. 9. sınıfta liseye uyum, 12. sınıfta YKS hazırlığı).
            Değiştirmeniz gerekmez.
          </p>
        </div>
      </details>
    </div>
  );
};
