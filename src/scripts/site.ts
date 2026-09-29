// Runs once per full load; ClientRouter keeps it alive across page swaps.
const SOUND_KEY = 'nw-sound';
let ac: AudioContext | undefined;

const soundOn = () => localStorage.getItem(SOUND_KEY) !== 'off';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function beep(freq = 1200, dur = 0.04, vol = 0.05) {
  if (!soundOn()) return;
  try {
    ac ??= new AudioContext();
    const o = ac.createOscillator();
    const g = ac.createGain();
    const t = ac.currentTime;
    o.type = 'square';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + dur + 0.01);
  } catch {}
}

function syncSound() {
  const b = document.getElementById('sound-toggle');
  if (!b) return;
  const on = soundOn();
  b.setAttribute('aria-pressed', String(on));
  b.querySelector('.sound-label')!.textContent = on ? 'Sound on' : 'Sound off';
}

// UI sounds (browsers only allow audio after the first user gesture, which these are)
document.addEventListener('click', (e) => {
  const t = e.target as Element;
  if (t.closest('#sound-toggle')) {
    localStorage.setItem(SOUND_KEY, soundOn() ? 'off' : 'on');
    syncSound();
    beep(900, 0.06);
    return;
  }
  if (t.closest('a, button')) beep(520, 0.12, 0.06);
});
document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse') return;
  const el = (e.target as Element).closest('[data-sfx="hover"]');
  if (el && !el.contains(e.relatedTarget as Node)) beep(1600, 0.025, 0.03);
});

// Cursor readout
document.addEventListener('pointermove', (e) => {
  const stage = document.querySelector('.stage');
  const out = document.getElementById('coords');
  if (!stage || !out) return;
  const r = stage.getBoundingClientRect();
  const f = (n: number) => String(Math.max(0, Math.round(n))).padStart(3, '0');
  out.textContent = `X:${f(e.clientX - r.left)} Y:${f(e.clientY - r.top)}`;
});

// Clock
function tick() {
  const c = document.getElementById('clock');
  if (c) c.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(tick, 1000);

// Preloader — first visit per session only
function runPreloader() {
  const root = document.documentElement;
  if (!root.hasAttribute('data-preload')) return;
  const pct = document.getElementById('pre-pct')!;
  const fill = document.getElementById('pre-fill')!;
  const kb = document.getElementById('pre-kb')!;
  let p = 0;
  let timer: number;
  const done = () => {
    clearInterval(timer);
    sessionStorage.setItem('nw-loaded', '1');
    root.removeAttribute('data-preload');
  };
  document.getElementById('pre-skip')!.addEventListener('click', done, { once: true });
  if (reduced()) return done();
  timer = window.setInterval(() => {
    p = Math.min(100, p + Math.ceil(Math.random() * 6));
    pct.textContent = String(p).padStart(2, '0');
    fill.style.width = p + '%';
    kb.textContent = String(Math.round((214 * p) / 100));
    if (p >= 100) {
      clearInterval(timer);
      setTimeout(done, 450);
    }
  }, 55);
}
runPreloader();

// Contact form (progressive enhancement: works as a plain POST without JS)
function initForm() {
  const form = document.querySelector<HTMLFormElement>('form[data-transmit]');
  if (!form) return;
  const win = form.closest('.window')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    } catch {}
    win.classList.add('is-sent');
    beep(880, 0.25, 0.06);
  });
  win.querySelector('[data-reset]')?.addEventListener('click', () => {
    form.reset();
    win.classList.remove('is-sent');
  });
}

document.addEventListener('astro:page-load', () => {
  syncSound();
  tick();
  initForm();
});
