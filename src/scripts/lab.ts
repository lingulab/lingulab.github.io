const lab = document.querySelector<HTMLElement>('[data-lab]');
if (lab) {
  const nodes = [...lab.querySelectorAll<HTMLButtonElement>('[data-node]')];
  const details = [...lab.querySelectorAll<HTMLElement>('[data-detail]')];
  const show = (index: number) => {
    nodes.forEach((n, i) => n.setAttribute('aria-pressed', String(i === index)));
    details.forEach((d, i) => { d.hidden = i !== index; });
  };
  nodes.forEach((n, i) => n.addEventListener('click', () => show(i)));
  show(0);
}
