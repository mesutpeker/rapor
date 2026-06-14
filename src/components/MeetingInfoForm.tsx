import React from 'react';
import type { MeetingInfo } from '../types';

interface Props {
  info: MeetingInfo;
  onChange: (info: MeetingInfo) => void;
}

export const MeetingInfoForm: React.FC<Props> = ({ info, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...info,
      [name]: name === 'gradeLevel' ? parseInt(value) : value
    });
  };

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="section-title">Okul ve Toplantı Bilgileri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Okul Adı</label>
          <input type="text" name="schoolName" value={info.schoolName} onChange={handleChange} className="input-field" placeholder="Örn: Atatürk Lisesi" />
        </div>
        <div>
          <label className="label">Sınıf/Şube</label>
          <input type="text" name="className" value={info.className} onChange={handleChange} className="input-field" placeholder="Örn: 10/A" />
        </div>
        <div>
          <label className="label">Sınıf Düzeyi</label>
          <select name="gradeLevel" value={info.gradeLevel} onChange={handleChange} className="select-field">
            <option value={9}>9. Sınıf</option>
            <option value={10}>10. Sınıf</option>
            <option value={11}>11. Sınıf</option>
            <option value={12}>12. Sınıf</option>
          </select>
        </div>
        <div>
          <label className="label">Başarı Düzeyi</label>
          <select name="classAchievementLevel" value={info.classAchievementLevel} onChange={handleChange} className="select-field">
            <option value="veryHigh">Çok Başarılı</option>
            <option value="high">Başarılı</option>
            <option value="medium">Orta Düzey</option>
            <option value="needsSupport">Desteğe İhtiyaç Duyan</option>
            <option value="low">Başarı Düzeyi Düşük</option>
            <option value="mixed">Karma</option>
          </select>
        </div>
      </div>
    </div>
  );
};
