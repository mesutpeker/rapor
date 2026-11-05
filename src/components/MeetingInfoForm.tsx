import React from 'react';
import type { ChairpersonTitle, MeetingInfo } from '../types';
import { meetingPeriods, getPeriodProfile } from '../data/meetingPeriods';

interface Props {
  info: MeetingInfo;
  onChange: (info: MeetingInfo) => void;
  clerkOptions: { id: string; label: string }[];
}

export const MeetingInfoForm: React.FC<Props> = ({ info, onChange, clerkOptions }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...info,
      [name]: name === 'gradeLevel' ? parseInt(value) : value
    });
  };

  const handleDateTimeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    onChange({ ...info, [name]: value });
  };

  const activePeriod = getPeriodProfile(info.period);

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="section-title">Okul ve Toplantı Bilgileri</h2>

      <p className="text-xs text-gray-500 mb-4">
        Bu sürüm ortaöğretim (9–12) ŞÖK tutanakları içindir. Düzenli toplantı ayları
        Yönerge Madde 10’a göre Kasım ve Nisan’dır; yıl sonu/ihtiyaç toplantısı ayrıca seçilebilir.
      </p>

      <div className="mb-4">
        <span className="label" id="meeting-period-label">Toplantı Dönemi</span>
        <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100/80 rounded-xl">
          {meetingPeriods.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange({ ...info, period: p.id })}
              aria-pressed={info.period === p.id}
              aria-describedby="meeting-period-label"
              className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${
                info.period === p.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1.5">{activePeriod.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="schoolName">Okul Adı</label>
          <input id="schoolName" type="text" name="schoolName" value={info.schoolName} onChange={handleChange} className="input-field" placeholder="Örn: Atatürk Lisesi" />
        </div>
        <div>
          <label className="label" htmlFor="academicYear">Eğitim Öğretim Yılı</label>
          <input id="academicYear" type="text" name="academicYear" value={info.academicYear} onChange={handleChange} className="input-field" placeholder="Örn: 2026-2027" inputMode="numeric" />
        </div>
        <div>
          <label className="label" htmlFor="className">Sınıf/Şube</label>
          <input id="className" type="text" name="className" value={info.className} onChange={handleChange} className="input-field" placeholder="Örn: 10/A" />
        </div>
        <div>
          <label className="label" htmlFor="gradeLevel">Sınıf Düzeyi</label>
          <select id="gradeLevel" name="gradeLevel" value={info.gradeLevel} onChange={handleChange} className="select-field">
            <option value={9}>9. Sınıf</option>
            <option value={10}>10. Sınıf</option>
            <option value={11}>11. Sınıf</option>
            <option value={12}>12. Sınıf</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="classAchievementLevel">Başarı Düzeyi</label>
          <select id="classAchievementLevel" name="classAchievementLevel" value={info.classAchievementLevel} onChange={handleChange} className="select-field">
            <option value="veryHigh">Çok Başarılı</option>
            <option value="high">Başarılı</option>
            <option value="medium">Orta Düzey</option>
            <option value="needsSupport">Desteğe İhtiyaç Duyan</option>
            <option value="low">Başarı Düzeyi Düşük</option>
            <option value="mixed">Karma</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="date">Toplantı Tarihi</label>
          <input id="date" type="date" name="date" value={info.date} onChange={handleChange} onInput={handleDateTimeInput} className="input-field" />
        </div>
        <div>
          <label className="label" htmlFor="time">Toplantı Saati</label>
          <input id="time" type="time" name="time" value={info.time} onChange={handleChange} onInput={handleDateTimeInput} className="input-field" />
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="location">Toplantı Yeri</label>
          <input id="location" type="text" name="location" value={info.location} onChange={handleChange} className="input-field" placeholder="Örn: Öğretmenler Odası" />
        </div>

        <div>
          <label className="label" htmlFor="chairpersonName">Kurul Başkanı</label>
          <input
            id="chairpersonName"
            type="text"
            name="chairpersonName"
            value={info.chairpersonName}
            onChange={handleChange}
            className="input-field"
            placeholder="Ad Soyad"
          />
        </div>
        <div>
          <label className="label" htmlFor="chairpersonTitle">Başkanlık Unvanı</label>
          <select
            id="chairpersonTitle"
            name="chairpersonTitle"
            value={info.chairpersonTitle}
            onChange={e => onChange({ ...info, chairpersonTitle: e.target.value as ChairpersonTitle })}
            className="select-field"
          >
            <option value="Okul Müdürü">Okul Müdürü</option>
            <option value="Müdür Yardımcısı">Müdür Yardımcısı</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="clerkId">Yazman</label>
          <select
            id="clerkId"
            name="clerkId"
            value={info.clerkId}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Öğretmen listesinden seçin</option>
            {clerkOptions.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
          {clerkOptions.length === 0 && (
            <p className="text-xs text-amber-700 mt-1">Yazman seçmek için önce öğretmen ekleyin.</p>
          )}
        </div>
        <div>
          <label className="label" htmlFor="principalName">Onaylayan Okul Müdürü</label>
          <input
            id="principalName"
            type="text"
            name="principalName"
            value={info.principalName}
            onChange={handleChange}
            className="input-field"
            placeholder="Ad Soyad"
          />
        </div>
      </div>
    </div>
  );
};
