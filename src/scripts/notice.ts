const dialog = document.querySelector<HTMLDialogElement>('#app-notice');
if (dialog) {
  let opener: HTMLElement | null = null;
  document.querySelectorAll<HTMLButtonElement>('[data-app]').forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
}
