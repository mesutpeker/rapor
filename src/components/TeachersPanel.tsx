import React, { useState } from 'react';
import type { Teacher } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { allBranches } from '../data/branchSpeechStyles';

interface Props {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

export const TeachersPanel: React.FC<Props> = ({ teachers, setTeachers }) => {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');

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

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field flex-1"
          placeholder="Ad Soyad"
        />
        <input
          type="text"
          list="branch-list"
          value={branch}
          onChange={e => setBranch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field flex-1"
          placeholder="Branş"
        />
        <datalist id="branch-list">
          {allBranches.map(b => <option key={b} value={b} />)}
        </datalist>
        <button
          onClick={handleAdd}
          className="btn-primary justify-center w-full sm:w-auto"
        >
          + Ekle
        </button>
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
