export const exportToPdf = (elementId: string, filename: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // html2pdf.js oklch renk fonksiyonlarını parse edemiyor.
  // Bu yüzden elementi klonlayıp tüm computed stilleri inline olarak uyguluyoruz,
  // oklch renkleri hex'e çeviriyoruz.
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Klonu geçici olarak DOM'a ekle (offscreen)
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.width = element.offsetWidth + 'px';
  clone.style.background = '#ffffff';
  document.body.appendChild(clone);

  // Tüm elementlerin computed stillerini inline olarak uygula
  const applyComputedStyles = (original: Element, cloned: Element) => {
    if (!(original instanceof HTMLElement) || !(cloned instanceof HTMLElement)) return;
    
    const computed = window.getComputedStyle(original);
    
    // Kritik stilleri inline olarak uygula
    const importantProps = [
      'color', 'background-color', 'background', 'font-family', 'font-size', 
      'font-weight', 'line-height', 'text-align', 'text-indent', 'margin', 
      'padding', 'border', 'border-collapse', 'display', 'width', 'height',
      'min-height', 'text-justify', 'letter-spacing', 'word-spacing',
      'border-top', 'border-bottom', 'border-left', 'border-right',
      'border-top-width', 'border-bottom-width', 'border-left-width', 'border-right-width',
      'border-top-style', 'border-bottom-style', 'border-left-style', 'border-right-style',
      'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color',
    ];

    for (const prop of importantProps) {
      try {
        const value = computed.getPropertyValue(prop);
        if (value && !value.includes('oklch')) {
          (cloned as HTMLElement).style.setProperty(prop, value);
        } else if (value && value.includes('oklch')) {
          // oklch renkleri güvenli bir şekilde dönüştür
          if (prop === 'color') {
            (cloned as HTMLElement).style.setProperty(prop, '#1a1a1a');
          } else if (prop.includes('background')) {
            (cloned as HTMLElement).style.setProperty(prop, '#ffffff');
          } else if (prop.includes('border')) {
            (cloned as HTMLElement).style.setProperty(prop, value.replace(/oklch\([^)]*\)/g, '#333333'));
          }
        }
      } catch {
        // Bazı property'ler okunmayabilir, atla
      }
    }

    const originalChildren = original.children;
    const clonedChildren = cloned.children;
    for (let i = 0; i < originalChildren.length; i++) {
      if (clonedChildren[i]) {
        applyComputedStyles(originalChildren[i], clonedChildren[i]);
      }
    }
  };

  applyComputedStyles(element, clone);

  // Klondaki backdrop-filter ve diğer sorunlu stilleri temizle
  clone.style.backdropFilter = 'none';
  clone.style.setProperty('-webkit-backdrop-filter', 'none');
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';
  clone.style.borderRadius = '0';
  clone.style.background = '#ffffff';

  // html2pdf ile oluştur
  import('html2pdf.js').then((html2pdfModule) => {
    const html2pdf = html2pdfModule.default;
    
    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(clone).save().then(() => {
      document.body.removeChild(clone);
    }).catch(() => {
      document.body.removeChild(clone);
    });
  });
};
