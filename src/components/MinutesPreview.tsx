import React from 'react';
import type { GeneratedMinutes, Teacher } from '../types';
import {
  formatDateTr,
  lowercaseSentenceStartTr,
  toSignatureNameTr
} from '../utils/textFormat';
import { buildSignatureSheet } from '../utils/signatureSheet';

interface Props {
  minutes: GeneratedMinutes | null;
}

const cellBorder = '1px solid #333';

const branchLabel = (teacher: Teacher): string =>
  teacher.isClassTeacher ? `${teacher.branch} (Sınıf Rehber Öğretmeni)` : teacher.branch;

export const MinutesPreview: React.FC<Props> = ({ minutes }) => {
  if (!minutes) return <div className="text-center text-gray-500 py-10">Henüz tutanak oluşturulmadı.</div>;

  const { meetingInfo } = minutes;
  const chairpersonName = toSignatureNameTr(meetingInfo.chairpersonName);
  const sheet = buildSignatureSheet(minutes);

  return (
    <div className="glass-card p-8 minutes-preview bg-white" id="minutes-preview">
      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 no-print">
        Bu belge bir taslaktır. Gerçek toplantı içeriğiyle doğrulanmadan imzalanmamalı ve resmî dosyaya
        konulmamalıdır.
      </p>

      <h1>{minutes.title}</h1>

      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 border-b border-gray-200 pb-6 print:grid-cols-2 print:border-gray-400 print:mb-8">
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Okul Adı:</strong> {meetingInfo.schoolName}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Eğitim Yılı:</strong> {meetingInfo.academicYear}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Dönem:</strong> {meetingInfo.term}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Tarih / Saat:</strong> {formatDateTr(meetingInfo.date)} - {meetingInfo.time}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Yer:</strong> {meetingInfo.location}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}><strong>Sınıf:</strong> {meetingInfo.className}</p>
        <p className="info-row" style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>Kurul Başkanı:</strong> {chairpersonName || '—'}
        </p>
      </div>

      <div className="mb-10 print:mb-12">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-4 pb-2 text-blue-900 print:text-black">Toplantıya Katılan Öğretmenler</h2>
        <table className="teachers-attendance-table w-full border-collapse" style={{ marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th scope="col" style={{ border: cellBorder, padding: '14px 16px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '90px' }}>Sıra No</th>
              <th scope="col" style={{ border: cellBorder, padding: '14px 18px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Adı Soyadı</th>
              <th scope="col" style={{ border: cellBorder, padding: '14px 18px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Branşı</th>
            </tr>
          </thead>
          <tbody>
            {minutes.teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td style={{ border: cellBorder, padding: '12px 16px', textAlign: 'center', fontSize: '14px' }}>{index + 1}</td>
                <td style={{ border: cellBorder, padding: '12px 18px', fontSize: '14px', fontWeight: 500 }}>{toSignatureNameTr(teacher.fullName)}</td>
                <td style={{ border: cellBorder, padding: '12px 18px', fontSize: '14px' }}>{branchLabel(teacher)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-4 pb-2 text-blue-900 print:text-black">Gündem Maddeleri</h2>
        <ol className="list-decimal pl-5 space-y-1">
          {minutes.agendaSummary.map((title, index) => (
            <li key={`${index}-${title}`} className="text-[14px] leading-relaxed">{title}</li>
          ))}
        </ol>
      </div>

      <div className="agenda-section">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-4 pb-2 print:text-black" style={{ pageBreakBefore: 'always', breakBefore: 'page' }}>Gündem Maddeleri ve Görüşmeler</h2>
        {minutes.agendaMinutes.map(agenda => (
          <div key={agenda.agendaId} className="mb-6">
            <h3 className="font-bold text-[15px] border-b border-gray-100 pb-1 mb-2">{agenda.agendaNumber}. {agenda.agendaTitle}</h3>
            {agenda.bodyText && (
              <p className="mt-3 text-justify leading-relaxed text-[14px]">{agenda.bodyText}</p>
            )}
            {agenda.speeches.map(speech => (
              <p key={speech.teacherId} className="mt-3 text-justify leading-relaxed text-[14px]">
                <strong>{speech.branch} Öğretmeni {speech.teacherName}</strong>
                {`, ${lowercaseSentenceStartTr(speech.content)}`}
              </p>
            ))}
            {agenda.decisions.length > 0 && (
              <div className="mt-3 bg-gray-50 p-3 rounded border border-gray-100 print:bg-white print:border-none print:p-0">
                <strong>Alınan Kararlar:</strong>
                <ul className="pl-5 mt-2 space-y-2">
                  {agenda.decisions.map(decision => (
                    <li key={decision.number} className="text-[14px] leading-relaxed">
                      <strong>Karar {decision.number}:</strong> {decision.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="print-break" style={{ pageBreakBefore: 'always', breakBefore: 'page' }}>
        <div className="text-center font-bold text-[15px] leading-snug mb-6">
          {sheet.headingLines.map(line => <p key={line}>{line}</p>)}
        </div>
        <table className="signature-table mt-4 w-full border-collapse" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th scope="col" style={{ border: cellBorder, padding: '12px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>AD SOYAD</th>
              <th scope="col" style={{ border: cellBorder, padding: '12px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>BRANŞ</th>
              <th scope="col" style={{ border: cellBorder, padding: '12px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '150px' }}>İMZA</th>
            </tr>
          </thead>
          <tbody>
            {minutes.teachers.map(teacher => (
              <tr key={teacher.id}>
                <td style={{ border: cellBorder, padding: '10px 14px', fontSize: '14px' }}>{toSignatureNameTr(teacher.fullName)}</td>
                <td style={{ border: cellBorder, padding: '10px 14px', fontSize: '14px' }}>{branchLabel(teacher)}</td>
                <td style={{ border: cellBorder, padding: '10px 14px', height: '44px' }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="signature-blocks mt-10 text-center text-sm">
          <div>
            <p>{sheet.classTeacher.name}</p>
            <p className="font-bold">{sheet.classTeacher.title}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p>{sheet.chairperson.name}</p>
              <p className="font-bold">{sheet.chairperson.title}</p>
            </div>
            <div>
              <p>{sheet.principal.date}</p>
              <p>{sheet.principal.name}</p>
              <p className="font-bold">{sheet.principal.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
