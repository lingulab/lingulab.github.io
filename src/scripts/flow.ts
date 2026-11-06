if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const flow = document.querySelector<HTMLElement>('.flow');
  const river = document.querySelector<SVGElement>('.river');
  const glow = document.querySelector<HTMLElement>('.glow');
  const line = river?.querySelector('path');
  if (flow && river && glow && line) {
    const length = line.getTotalLength();
    const samples = Array.from({ length: 500 }, (_, i) => line.getPointAtLength((length * i) / 499));
    const atDepth = (y: number) => samples.find((p) => p.y >= y) || samples[samples.length - 1];
    const items = [...document.querySelectorAll<HTMLElement>('.flow .steps>li')].map((li, i) => {
      const el = (li.classList.contains('wide') ? li.querySelector('.caps') : li.lastElementChild) as HTMLElement;
      el.classList.add('orbit');
      return { el, wide: li.classList.contains('wide'), side: i % 2 ? -1 : 1 };
    });
    let queued = false;
    const update = () => {
      queued = false;
      const vh = innerHeight;
      const box = flow.getBoundingClientRect();
      const done = Math.min(1, Math.max(0, (vh * 0.62 - box.top) / box.height));
      river.style.clipPath = `inset(0 0 ${(1 - done) * 100}% 0)`;
      const on = innerWidth > 820;
      glow.classList.toggle('on', on && done > 0);
      if (on) {
        const tip = atDepth(done * 1000);
        glow.style.transform = `translate(${(tip.x / 100) * box.width}px,${(tip.y / 1000) * box.height}px)`;
      }
      for (const it of items) {
        const r = it.el.getBoundingClientRect();
        const d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        const away = Math.abs(d);
        if (!on) {
          it.el.style.transform = '';
          it.el.style.opacity = String(1 - away * 0.25);
          continue;
        }
        if (it.wide) {
          it.el.style.opacity = String(1 - away * 0.3);
          continue;
        }
        it.el.style.transform = `translateX(${it.side * away * away * 150}px) translateZ(${-away * 240}px) rotateY(${-it.side * d * 22}deg)`;
        it.el.style.opacity = String(1 - away * 0.55);
      }
    };
    const ask = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener('scroll', ask, { passive: true });
    addEventListener('resize', ask);
    update();
  }
}
