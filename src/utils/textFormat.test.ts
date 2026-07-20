import { describe, expect, it } from 'vitest';
import { formatDateTr, toSentenceCaseTr, toTitleCaseTr } from './textFormat';

describe('Türkçe metin biçimlendirme', () => {
  it('ad ve soyadı Türkçe başlık düzenine getirir', () => {
    expect(toTitleCaseTr('  ışıl   özışık ')).toBe('Işıl Özışık');
  });

  it('gündem başlığını cümle düzenine getirir', () => {
    expect(toSentenceCaseTr('DEVAMSIZLIK DURUMU')).toBe('Devamsızlık durumu');
  });

  it('ISO tarihini Türkçe belge biçiminde gösterir', () => {
    expect(formatDateTr('2026-07-20')).toBe('20.07.2026');
    expect(formatDateTr('20 Temmuz 2026')).toBe('20 Temmuz 2026');
  });
});
