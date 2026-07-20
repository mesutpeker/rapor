import { describe, expect, it } from 'vitest';
import {
  capitalizeSentenceStartTr,
  formatDateTr,
  lowercaseSentenceStartTr,
  toSentenceCaseTr,
  toTitleCaseTr
} from './textFormat';

describe('Türkçe metin biçimlendirme', () => {
  it('ad ve soyadı Türkçe başlık düzenine getirir', () => {
    expect(toTitleCaseTr('  ışıl   özışık ')).toBe('Işıl Özışık');
  });

  it('gündem başlığını cümle düzenine getirir', () => {
    expect(toSentenceCaseTr('DEVAMSIZLIK DURUMU')).toBe('Devamsızlık durumu');
  });

  it('cümle başlangıcını Türkçe kurallarına göre büyütür', () => {
    expect(capitalizeSentenceStartTr('  işletme süreçleri hakkında'))
      .toBe('İşletme süreçleri hakkında');
    expect(capitalizeSentenceStartTr('')).toBe('');
  });

  it('öğretmen öznesinden sonraki metni küçültürken kısaltmaları korur', () => {
    expect(lowercaseSentenceStartTr('İkinci dönem hedeflerini değerlendirdi.'))
      .toBe('ikinci dönem hedeflerini değerlendirdi.');
    expect(lowercaseSentenceStartTr('YKS hazırlık sürecini değerlendirdi.'))
      .toBe('YKS hazırlık sürecini değerlendirdi.');
    expect(lowercaseSentenceStartTr('T.C. İnkılap Tarihi dersini değerlendirdi.'))
      .toBe('T.C. İnkılap Tarihi dersini değerlendirdi.');
  });

  it('ISO tarihini Türkçe belge biçiminde gösterir', () => {
    expect(formatDateTr('2026-07-20')).toBe('20.07.2026');
    expect(formatDateTr('20 Temmuz 2026')).toBe('20 Temmuz 2026');
  });
});
