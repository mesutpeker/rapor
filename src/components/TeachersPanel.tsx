import React, { useState, useRef, useEffect } from 'react';
import type { Teacher } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { branchGroups } from '../data/branchSpeechStyles';

const OTHER = '__other__';

// Kategori sekmeleri: branş grupları + elle yazma
const segments = [
  ...branchGroups.map((g, i) => ({
    key: g.label,
    // Kısa etiket (mobilde sığması için)
    label: i === 0 ? 'Temel' : 'Seçmeli'
  })),
  { key: OTHER, label: 'Diğer' }
];

interface Props {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

export const TeachersPanel: React.FC<Props> = ({ teachers, setTeachers }) => {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [mode, setMode] = useState<string>(branchGroups[0].label);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOther = mode === OTHER;
  const currentGroup = branchGroups.find(g => g.label === mode);

  // Dersleri Türkçe harf sırasına göre sırala
  const sortedBranches = currentGroup
    ? [...currentGroup.branches].sort((a, b) => a.localeCompare(b, 'tr'))
    : [];

  // Liste dışına tıklayınca kapat
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const changeMode = (m: string) => {
    setMode(m);
    setBranch('');
    setOpen(false);
  };

  const selectBranch = (b: string) => {
    setBranch(b);
    setOpen(false);
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    if (!branch.trim()) return;
    const newTeacher: Teacher = {
      id: uuidv4(),
      fullName: name,
      branch: branch.trim(),
      isAttending: true,
      isClassTeacher: false
    };
    setTeachers([...teachers, newTeacher]);
    setName('');
    setBranch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  const toggleAttending = (id: string) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, isAttending: !t.isAttending } : t));
  };

  const removeTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const attendingCount = teachers.filter(t => t.isAttending).length;

  return (
    <div className="glass-card p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="section-title mb-0">Öğretmenler</h2>
        <span className="badge badge-info">
          {teachers.length} öğretmen · {attendingCount} katılıyor
        </span>
      </div>

      <div className="mb-4 space-y-2.5">
        {/* Kategori seçimi (segmented control): butona göre alttaki liste değişir */}
        <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl">
          {segments.map(s => (
            <button
              key={s.key}
              type="button"
              onClick={() => changeMode(s.key)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                mode === s.key
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Branş seçimi: tam genişlik, yukarı açılan geniş liste */}
        {isOther ? (
          <input
            type="text"
            value={branch}
            onChange={e => setBranch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-field w-full"
            placeholder="Branş adını yazın"
            autoFocus
          />
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="input-field w-full flex items-center justify-between text-left cursor-pointer"
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span className={branch ? 'text-gray-800 font-medium' : 'text-gray-400'}>
                {branch || 'Branş seçin…'}
              </span>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              >
                <path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <div
                role="listbox"
                className="absolute bottom-full left-0 right-0 mb-1.5 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl z-30 custom-scrollbar p-1"
              >
                {sortedBranches.map(b => (
                  <button
                    key={b}
                    type="button"
                    role="option"
                    aria-selected={b === branch}
                    onClick={() => selectBranch(b)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      b === branch ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ad Soyad + Ekle */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-field flex-1"
            placeholder="Ad Soyad"
          />
          <button
            onClick={handleAdd}
            className="btn-primary justify-center w-full sm:w-auto"
          >
            + Ekle
          </button>
        </div>
      </div>

      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
        {teachers.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            Henüz öğretmen eklenmedi.
          </p>
        )}
        {teachers.map(t => (
          <div
            key={t.id}
            className={`flex items-center justify-between gap-2 px-3 py-2 border rounded-lg transition-colors ${
              t.isAttending ? 'border-gray-200 bg-white/60' : 'border-gray-100 bg-gray-50/60 opacity-70'
            }`}
          >
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{t.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{t.branch}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={t.isAttending}
                  onChange={() => toggleAttending(t.id)}
                  className="w-4 h-4 accent-blue-600"
                />
                Katılıyor
              </label>
              <button
                onClick={() => removeTeacher(t.id)}
                className="text-red-500 text-xs hover:text-red-700"
                aria-label="Sil"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
