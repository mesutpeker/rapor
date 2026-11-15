import { describe, expect, it } from 'vitest';
import {
  capitalizeSentenceStartTr,
  formatDateTr,
  lowercaseSentenceStartTr,
  toCourseNameInSentenceTr,
  toSentenceCaseTr,
  toSignatureNameTr,
  toTitleCaseTr
} from './textFormat';

describe('Türkçe metin biçimlendirme', () => {
  it('ad ve soyadı Türkçe başlık düzenine getirir', () => {
    expect(toTitleCaseTr('  ışıl   özışık ')).toBe('Işıl Özışık');
    expect(toTitleCaseTr('ayşe nur ÖZTÜRK-KAYA')).toBe('Ayşe Nur Öztürk-Kaya');
  });

  it('imza alanlarında soyadını büyük harfle yazar', () => {
    expect(toSignatureNameTr('ışıl ince')).toBe('Işıl İNCE');
    expect(toSignatureNameTr('AHMET ALİ yılmaz')).toBe('Ahmet Ali YILMAZ');
    expect(toSignatureNameTr('')).toBe('');
  });

  it('karışık yazılmış başlıklardaki özel adları ve kısaltmaları bozmaz', () => {
    expect(toSentenceCaseTr('29 Ekim Cumhuriyet Bayramı hazırlıkları'))
      .toBe('29 Ekim Cumhuriyet Bayramı hazırlıkları');
    expect(toSentenceCaseTr('TÜBİTAK 2204 projeleri')).toBe('TÜBİTAK 2204 projeleri');
    expect(toSentenceCaseTr('e-Okul kayıtlarının incelenmesi'))
      .toBe('e-Okul kayıtlarının incelenmesi');
    expect(toSentenceCaseTr('MEB genelgesinin okunması')).toBe('MEB genelgesinin okunması');
  });

  it('tümü büyük veya küçük yazılmış başlıklarda özel adları geri yükler', () => {
    expect(toSentenceCaseTr('29 EKİM CUMHURİYET BAYRAMI HAZIRLIKLARI'))
      .toBe('29 Ekim Cumhuriyet Bayramı hazırlıkları');
    expect(toSentenceCaseTr('türkiye geneli sınavlar ve tübitak projeleri'))
      .toBe('Türkiye geneli sınavlar ve TÜBİTAK projeleri');
    expect(toSentenceCaseTr('ÇİNCE VE OSMANLI TÜRKÇESİ KURSLARI'))
      .toBe('Çince ve Osmanlı Türkçesi kursları');
  });

  it('Türkçe harfle başlayan veya biten ders adlarını cümle içinde doğru yazar', () => {
    expect(toCourseNameInSentenceTr('Osmanlı Türkçesi')).toBe('Osmanlı Türkçesi');
    expect(toCourseNameInSentenceTr('Çince')).toBe('Çince');
    expect(toCourseNameInSentenceTr('Seçmeli Geometri')).toBe('seçmeli geometri');
  });

  it('gündem başlığını cümle düzenine getirir', () => {
    expect(toSentenceCaseTr('DEVAMSIZLIK DURUMU')).toBe('Devamsızlık durumu');
    expect(toSentenceCaseTr('YKS HAZIRLIĞI VE TÜRK DİLİ ÇALIŞMALARI'))
      .toBe('YKS hazırlığı ve Türk dili çalışmaları');
    expect(toSentenceCaseTr('T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK'))
      .toBe('T.C. inkılap tarihi ve Atatürkçülük');
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
    expect(lowercaseSentenceStartTr('İngilizce dersindeki gelişimi değerlendirdi.'))
      .toBe('İngilizce dersindeki gelişimi değerlendirdi.');
    expect(lowercaseSentenceStartTr('Türk dili ve edebiyatı sonuçlarını paylaştı.'))
      .toBe('Türk dili ve edebiyatı sonuçlarını paylaştı.');
    expect(lowercaseSentenceStartTr('Cumhuriyet değerlerinin benimsenmesi sürecini ele aldı.'))
      .toBe('Cumhuriyet değerlerinin benimsenmesi sürecini ele aldı.');
    expect(lowercaseSentenceStartTr('Millî Mücadele konularını ele aldı.'))
      .toBe('Millî Mücadele konularını ele aldı.');
  });

  it('ISO tarihini Türkçe belge biçiminde gösterir', () => {
    expect(formatDateTr('2026-07-20')).toBe('20.07.2026');
    expect(formatDateTr('20 Temmuz 2026')).toBe('20 Temmuz 2026');
  });
});
