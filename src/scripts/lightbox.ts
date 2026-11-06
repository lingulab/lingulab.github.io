const box = document.querySelector<HTMLDialogElement>('#lightbox');
if (box) {
  const view = box.querySelector('img')!;
  const label = box.dataset.zoomLabel ?? '';
  let opener: HTMLElement | null = null;
  document.querySelectorAll<HTMLImageElement>('.cap img, .pic img').forEach((img) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'zoom';
    button.setAttribute('aria-label', `${label}: ${img.alt}`);
    img.replaceWith(button);
    button.append(img);
    button.addEventListener('click', () => {
      opener = button;
      view.src = img.currentSrc || img.src;
      view.alt = img.alt;
      box.classList.toggle('tall', img.naturalHeight > img.naturalWidth);
      box.showModal();
    });
  });
  box.querySelector('.lb-close')?.addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('close', () => opener?.focus());
}
