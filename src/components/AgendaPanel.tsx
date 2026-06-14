import React, { useState } from 'react';
import type { AgendaItem, AgendaCategory, SpeakerCountMode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { defaultAgendaItems } from '../data/agendaItems';

interface Props {
  agenda: AgendaItem[];
  setAgenda: React.Dispatch<React.SetStateAction<AgendaItem[]>>;
}

const speakerOptions: { value: SpeakerCountMode; label: string }[] = [
  { value: 'two', label: '2 konuşmacı' },
  { value: 'three', label: '3 konuşmacı' },
  { value: 'four', label: '4 konuşmacı' },
  { value: 'random', label: 'Rastgele' }
];

// Konuşma içeriğinin hangi konuya göre üretileceğini belirler. 'auto' seçiliyken
// kategori başlıktan otomatik tahmin edilir.
const categoryOptions: { value: AgendaCategory; label: string }[] = [
  { value: 'auto', label: 'Konu: Otomatik' },
  { value: 'akademik-basari', label: 'Konu: Akademik başarı' },
  { value: 'devamsizlik', label: 'Konu: Devamsızlık' },
  { value: 'davranis-disiplin', label: 'Konu: Davranış ve disiplin' },
  { value: 'motivasyon-katilim', label: 'Konu: Motivasyon ve katılım' },
  { value: 'sosyal-duygusal', label: 'Konu: Sosyal-duygusal / rehberlik' },
  { value: 'olcme-degerlendirme', label: 'Konu: Ölçme ve değerlendirme' },
  { value: 'veli-iletisim', label: 'Konu: Veli iletişimi' },
  { value: 'destekleme', label: 'Konu: Destekleme ve takip' },
  { value: 'dilek-temenniler', label: 'Konu: Dilek ve temenniler' },
  { value: 'acilis', label: 'Konu: Açılış / yoklama' },
  { value: 'kapanis', label: 'Konu: Kapanış' }
];

export const AgendaPanel: React.FC<Props> = ({ agenda, setAgenda }) => {
  const [newTitle, setNewTitle] = useState('');

  const toggleEnabled = (id: string) =>
    setAgenda(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));

  const updateTitle = (id: string, title: string) =>
    setAgenda(prev => prev.map(a => a.id === id ? { ...a, title } : a));

  const updateSpeakerCount = (id: string, mode: SpeakerCountMode) =>
    setAgenda(prev => prev.map(a => a.id === id ? { ...a, speakerCountMode: mode } : a));

  const updateCategory = (id: string, category: AgendaCategory) =>
    setAgenda(prev => prev.map(a => a.id === id ? { ...a, category } : a));

  const remove = (id: string) =>
    setAgenda(prev => prev.filter(a => a.id !== id));

  const move = (id: string, dir: -1 | 1) =>
    setAgenda(prev => {
      const idx = prev.findIndex(a => a.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });

  const addItem = () => {
    if (!newTitle.trim()) return;
    setAgenda(prev => [...prev, {
      id: uuidv4(),
      title: newTitle.trim(),
      enabled: true,
      speakerCountMode: 'three'
    }]);
    setNewTitle('');
  };

  const resetDefaults = () =>
    setAgenda(defaultAgendaItems.map(a => ({ ...a, id: uuidv4() })));

  const activeCount = agenda.filter(a => a.enabled).length;

  return (
    <div className="glass-card p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="section-title mb-0">Gündem Maddeleri</h2>
        <span className="badge badge-info">
          {agenda.length} madde · {activeCount} aktif
        </span>
      </div>

      <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar mb-3">
        {agenda.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-wrap items-center gap-2 px-2.5 py-2 border rounded-lg transition-colors ${
              item.enabled ? 'border-gray-200 bg-white/60' : 'border-gray-100 bg-gray-50/60 opacity-60'
            }`}
          >
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => toggleEnabled(item.id)}
              className="w-4 h-4 accent-blue-600 shrink-0"
              title={item.enabled ? 'Tutanağa dahil' : 'Tutanağa dahil değil'}
            />
            <input
              type="text"
              value={item.title}
              onChange={e => updateTitle(item.id, e.target.value)}
              className="flex-1 min-w-[140px] text-sm bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-400 outline-none py-0.5"
            />
            <select
              value={item.category ?? 'auto'}
              onChange={e => updateCategory(item.id, e.target.value as AgendaCategory)}
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-600 cursor-pointer"
              title="Konuşma içeriğinin üretileceği konu türü"
            >
              {categoryOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <select
              value={item.speakerCountMode}
              onChange={e => updateSpeakerCount(item.id, e.target.value as SpeakerCountMode)}
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-600 cursor-pointer"
            >
              {speakerOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => move(item.id, -1)}
                disabled={idx === 0}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Yukarı taşı"
              >↑</button>
              <button
                type="button"
                onClick={() => move(item.id, 1)}
                disabled={idx === agenda.length - 1}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Aşağı taşı"
              >↓</button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-50"
                aria-label="Sil"
              >✕</button>
            </div>
          </div>
        ))}
        {agenda.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">Gündem maddesi yok.</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
          className="input-field flex-1"
          placeholder="Yeni gündem maddesi"
        />
        <button onClick={addItem} className="btn-primary justify-center w-full sm:w-auto">
          + Ekle
        </button>
      </div>

      <button
        type="button"
        onClick={resetDefaults}
        className="mt-2 text-xs text-gray-500 hover:text-blue-600 underline"
      >
        Varsayılan gündeme dön
      </button>
    </div>
  );
};
