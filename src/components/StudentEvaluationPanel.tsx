import React, { useState } from 'react';
import type { StudentEvaluation } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  students: StudentEvaluation[];
  setStudents: React.Dispatch<React.SetStateAction<StudentEvaluation[]>>;
}

export const StudentEvaluationPanel: React.FC<Props> = ({ students, setStudents }) => {
  const [label, setLabel] = useState('');
  const [observation, setObservation] = useState('');
  const [measure, setMeasure] = useState('');

  const addStudent = () => {
    if (!label.trim()) return;
    setStudents(prev => [
      ...prev,
      {
        id: uuidv4(),
        studentLabel: label.trim(),
        observation: observation.trim(),
        measure: measure.trim()
      }
    ]);
    setLabel('');
    setObservation('');
    setMeasure('');
  };

  const remove = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));

  return (
    <div className="glass-card p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="section-title mb-0">Öğrenci Değerlendirmesi</h2>
        <span className="badge badge-info">{students.length} kayıt</span>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        İsteğe bağlıdır. Tam kimlik, T.C., sağlık veya aile ayrıntısı yazmayın.
        Gözlenebilir eğitimsel durum ve alınacak tedbiri kısaca belirtin (ör. “A.Y. — matematik kazanım eksikleri”).
      </p>

      <div className="space-y-2 mb-3">
        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="input-field w-full"
          placeholder="Öğrenci etiketi (ör. A.Y. veya yalnızca ad)"
        />
        <input
          type="text"
          value={observation}
          onChange={e => setObservation(e.target.value)}
          className="input-field w-full"
          placeholder="Gözlem / eğitimsel ihtiyaç"
        />
        <input
          type="text"
          value={measure}
          onChange={e => setMeasure(e.target.value)}
          className="input-field w-full"
          placeholder="Alınacak tedbir"
        />
        <button type="button" onClick={addStudent} className="btn-primary justify-center w-full sm:w-auto">
          + Öğrenci Ekle
        </button>
      </div>

      <div className="space-y-1.5">
        {students.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-3">Henüz öğrenci kaydı yok.</p>
        )}
        {students.map(student => (
          <div
            key={student.id}
            className="flex items-start justify-between gap-2 px-3 py-2 border border-gray-200 bg-white/60 rounded-lg"
          >
            <div className="min-w-0 text-sm">
              <p className="font-medium">{student.studentLabel}</p>
              {student.observation && (
                <p className="text-xs text-gray-600 mt-0.5">Gözlem: {student.observation}</p>
              )}
              {student.measure && (
                <p className="text-xs text-gray-600">Tedbir: {student.measure}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(student.id)}
              className="text-red-500 text-xs hover:text-red-700 shrink-0"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
