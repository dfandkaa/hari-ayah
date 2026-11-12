/* ===== GANTI NAMA DI SINI ===== */
const NAMA_AYAH = "Ayah";          // Ganti jadi panggilan ayahmu, misal: "Ayah" atau "Bapak"
const NAMA_ANAK = "Anak-anakmu";   // Bisa juga diisi nama kalian semua, misal: "Abang, Dafa, & Adik"

/* ===== GANTI FOTO & KETERANGAN DI SINI ===== */
const FOTO = [
  { src: "fotodipelaruga.jpeg", cap: "Seru-seruan berendam di jernihnya air sungai Pelaruga bareng keluarga" },
  { src: "fotodipelaruga2.jpeg", cap: "Pose di atas bebatuan aliran sungai Pelaruga sambil dijagain Ayah dari belakang" },
  { src: "fotokeluargabesar.jpeg", cap: "Kompak berbaju putih di momen kumpul hangat keluarga besar" },
  { src: "fotokeluargapariban.jpeg", cap: "Liburan keluarga besar ke Pariban dengan latar pegunungan berkabut" },
  { src: "fotomamaayah.jpeg", cap: "Momen manis Ayah dan Mama berpose hati di jalanan berlatar bukit hijau" },
  { src: "fotosilalahi.jpeg", cap: "Formasi lengkap Ayah, Mama, dan kami bertiga di perbukitan Silalahi" },
  { src: "fotoultahmama.jpeg", cap: "Kejutan ulang tahun Mama di rumah bareng Ayah, lengkap dengan nasi tumpeng" }
];

const ALASAN = [
  ["mountain", "Tenang di Tengah Badai", "Seberat apa pun masalah yang datang, Ayah tidak pernah panik di depan kami. Ketenangan Ayah yang bikin seisi rumah merasa aman."],
  ["hammer", "Bekerja Tanpa Banyak Cerita", "Ayah jarang sekali mengeluh capek. Dari punggung Ayah kami belajar bahwa tanggung jawab itu dikerjakan, bukan dipamerkan."],
  ["heart", "Sayang Lewat Tindakan", "Ayah memang jarang bilang sayang, tapi perhatian Ayah selalu kelihatan dari hal-hal kecil yang sering luput dari mata orang lain."],
  ["shield", "Garda Paling Depan", "Ayah selalu memastikan kami semua baik-baik saja lebih dulu, bahkan di saat Ayah sendiri sebenarnya sedang butuh sandaran."],
  ["lightbulb", "Jujur & Apa Adanya", "Ayah mengajarkan kami cara berdiri di atas kaki sendiri, menghargai orang lain, dan tidak mudah menyerah saat keadaan sulit."],
  ["sun", "Sandaran Saat Ragu", "Satu anggukan atau kalimat singkat dari Ayah sering kali sudah cukup untuk menenangkan kepala kami yang sedang penuh."]
];

const DOA = [
  "Semoga Ayah selalu sehat dan panjang umur.",
  "Semoga rezeki Ayah mengalir lancar dan berkah.",
  "Semoga lelah Ayah dibalas surga dan senyum keluarga.",
  "Semoga Allah menjaga Ayah di setiap langkah.",
  "Semoga Ayah selalu bahagia melihat kami tumbuh."
];

document.querySelectorAll('.NAMA_AYAH').forEach(e => {
  if (NAMA_AYAH !== "Ayah" || e.tagName === 'B') e.textContent = NAMA_AYAH;
});
document.querySelectorAll('.NAMA_ANAK').forEach(e => e.textContent = NAMA_ANAK);

lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);
const $ = s => document.querySelector(s);

/* ===== Awan & Partikel Latar ===== */
function mkCloud(w, h) {
  const c = document.createElement('div');
  c.className = 'cloud';
  c.style.cssText = `width:${w}px;height:${h}px`;
  [[0, .35, .45, .65], [.2, 0, .5, 1], [.5, .2, .5, .8]].forEach(a => {
    const i = document.createElement('i');
    i.style.cssText = `left:${a[0] * w}px;top:${a[1] * h}px;width:${a[2] * w}px;height:${a[3] * h}px`;
    c.appendChild(i);
  });
  return c;
}

const sky = $('#sky');
['senja', 'malam'].forEach(m => {
  const l = document.createElement('div');
  l.className = 'mood';
  l.id = 'mood-' + m;
  if (m === 'malam') {
    l.innerHTML = '<div class="aur" style="top:8%"></div><div class="aur" style="top:30%;animation-delay:-4s"></div>';
  }
  sky.prepend(l);
});

const L = [0, 1, 2].map(() => {
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;inset:0';
  sky.appendChild(d);
  return d;
});

for (let k = 0; k < 9; k++) {
  const d = k % 3, w = 110 + d * 90 + Math.random() * 90, c = mkCloud(w, w * .42);
  c.style.top = (Math.random() * 85) + '%';
  c.style.left = '-400px';
  c.style.opacity = .4 + d * .22;
  c.style.filter = `blur(${3 - d}px)`;
  L[d].appendChild(c);
  gsap.fromTo(c, { x: -400 }, { x: innerWidth + 400, duration: 150 - d * 35 + Math.random() * 40, ease: 'none', repeat: -1, delay: -Math.random() * 120 });
  gsap.to(L[d], { y: (d + 1) * -90, scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 } });
}

addEventListener('pointermove', e => L.forEach((l, d) => gsap.to(l, { x: (e.clientX / innerWidth - .5) * -(d + 1) * 24, duration: 1.2, overwrite: 'auto', ease: 'power2.out' })));

// Burung, balon, pesawat kertas
for (let k = 0; k < 5; k++) {
  const b = document.createElement('div');
  b.style.cssText = `position:absolute;top:${10 + k * 4 + Math.random() * 6}%;left:-40px`;
  b.innerHTML = '<svg width="22" height="10" viewBox="0 0 22 10"><path d="M1 8Q6 0 11 8Q16 0 21 8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';
  sky.appendChild(b);
  gsap.fromTo(b, { x: -40 }, { x: innerWidth + 60, duration: 50 + k * 6, ease: 'none', repeat: -1, delay: -k * 9 });
  gsap.to(b, { y: '+=14', scaleY: .7, duration: .8 + k * .1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}

['#FBCFE8', '#BAE6FD'].forEach((c, k) => {
  const b = document.createElement('div');
  b.style.cssText = `position:absolute;left:${15 + k * 55}%;top:0;width:34px;height:42px;border-radius:50% 50% 46% 46%;background:radial-gradient(circle at 35% 30%,#fff,${c});box-shadow:0 6px 16px rgba(30,58,138,.15)`;
  b.innerHTML = '<i style="position:absolute;left:16px;top:42px;width:1px;height:26px;background:#fff"></i><i style="position:absolute;left:11px;top:66px;width:12px;height:9px;background:#F59E0B;border-radius:2px"></i>';
  sky.appendChild(b);
  gsap.fromTo(b, { y: innerHeight + 80 }, { y: -140, duration: 80 + k * 20, ease: 'none', repeat: -1, delay: -k * 30 });
  gsap.to(b, { x: 30, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
});

const pl = document.createElement('div');
pl.style.cssText = 'position:absolute;top:30%;left:0;display:flex;align-items:center';
pl.innerHTML = '<i style="width:150px;border-top:2px dashed rgba(255,255,255,.95)"></i><svg width="26" height="20" viewBox="0 0 26 20"><path d="M1 9L25 1 17 19 12 11z" fill="#fff" stroke="#7DD3FC"/></svg>';
sky.appendChild(pl);
gsap.fromTo(pl, { x: -220 }, { x: innerWidth + 60, duration: 14, ease: 'none', repeat: -1, repeatDelay: 7 });
gsap.to(pl, { y: 90, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

// Canvas: debu emas, bintang, kunang-kunang, jejak kilau
const fx = $('#fx'), cx = fx.getContext('2d'), tr = $('#trail'), tx = tr.getContext('2d');
let W, H, mood = 'pagi', dust = [], trail = [], shoot = null;

function rs() {
  W = fx.width = tr.width = innerWidth;
  H = fx.height = tr.height = innerHeight;
}
rs();
addEventListener('resize', rs);

for (let i = 0; i < 120; i++) {
  dust.push({ x: Math.random() * W, y: Math.random() * H, r: .8 + Math.random() * 2.4, vy: .1 + Math.random() * .35, ph: Math.random() * 6, t: i % 4 });
}

function spark(x, y) {
  for (let i = 0; i < 3; i++) {
    trail.push({ x: x + (Math.random() - .5) * 10, y: y + (Math.random() - .5) * 10, vx: (Math.random() - .5) * 1.2, vy: Math.random() * 1.2, l: 1, c: i % 2 ? '#FBBF24' : '#fff' });
  }
}

addEventListener('pointermove', e => { if (e.pointerType === 'mouse') spark(e.clientX, e.clientY); });
addEventListener('touchmove', e => spark(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

function star(c, x, y, r) {
  c.beginPath();
  c.moveTo(x, y - r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.quadraticCurveTo(x, y, x, y + r);
  c.quadraticCurveTo(x, y, x - r, y);
  c.quadraticCurveTo(x, y, x, y - r);
  c.fill();
}

(function loop(t) {
  cx.clearRect(0, 0, W, H);
  dust.forEach(p => {
    p.y -= p.vy;
    p.x += Math.sin(t / 1500 + p.ph) * .25;
    if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
    const tw = .5 + .5 * Math.sin(t / 500 + p.ph);
    cx.globalAlpha = .25 + tw * .65;
    if (p.t === 2) {
      cx.fillStyle = mood === 'malam' ? '#fff' : '#FDE68A';
      star(cx, p.x, p.y, p.r * (mood === 'malam' ? 3.5 : 2.5));
    } else if (p.t === 3 && mood === 'malam') {
      cx.fillStyle = '#FEF08A';
      cx.shadowColor = '#FDE047';
      cx.shadowBlur = 14;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r * 1.4, 0, 7);
      cx.fill();
      cx.shadowBlur = 0;
    } else {
      cx.fillStyle = p.t === 1 ? '#fff' : '#FBBF24';
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, 7);
      cx.fill();
    }
  });

  if (mood === 'malam' && !shoot && Math.random() < .006) {
    shoot = { x: Math.random() * W, y: Math.random() * H * .4, l: 0 };
  }
  if (shoot) {
    cx.globalAlpha = 1 - shoot.l / 60;
    cx.strokeStyle = '#fff';
    cx.lineWidth = 2;
    cx.beginPath();
    cx.moveTo(shoot.x, shoot.y);
    cx.lineTo(shoot.x - 60, shoot.y - 30);
    cx.stroke();
    shoot.x += 14;
    shoot.y += 7;
    if (++shoot.l > 60) shoot = null;
  }

  tx.clearRect(0, 0, W, H);
  trail = trail.filter(q => q.l > 0);
  trail.forEach(q => {
    q.x += q.vx;
    q.y += q.vy;
    q.l -= .03;
    tx.globalAlpha = q.l;
    tx.fillStyle = q.c;
    star(tx, q.x, q.y, 6 * q.l);
  });
  requestAnimationFrame(loop);
})(0);

function setMood(m) {
  mood = m;
  document.body.classList.remove('m-senja', 'm-malam');
  if (m !== 'pagi') document.body.classList.add('m-' + m);
  gsap.to('#mood-senja', { opacity: m === 'senja' ? 1 : 0, duration: 2 });
  gsap.to('#mood-malam', { opacity: m === 'malam' ? 1 : 0, duration: 2 });
  const sun = $('#sun');
  gsap.to(sun, {
    opacity: 0,
    duration: .6,
    onComplete: () => {
      sun.style.background = {
        pagi: 'radial-gradient(circle,rgba(253,230,138,.9),rgba(251,191,36,.35) 40%,transparent 70%)',
        senja: 'radial-gradient(circle,rgba(254,215,170,.95),rgba(251,146,60,.4) 40%,transparent 70%)',
        malam: 'radial-gradient(circle,rgba(255,255,255,.95),rgba(186,230,253,.4) 35%,transparent 65%)'
      }[m];
      gsap.to(sun, { opacity: 1, duration: 1 });
    }
  });
  document.querySelectorAll('[data-mood]').forEach(b => b.classList.toggle('on', b.dataset.mood === m));
  toast({ pagi: 'Pagi Cerah Pastel', senja: 'Senja Keemasan', malam: 'Malam Aurora Pastel' }[m]);
}

document.querySelectorAll('[data-mood]').forEach(b => b.onclick = () => setMood(b.dataset.mood));

function toast(t) {
  const e = $('#toast');
  e.textContent = t;
  gsap.fromTo(e, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4, yoyo: true, repeat: 1, repeatDelay: 1.6 });
}

document.addEventListener('click', e => { if (e.target.closest('.btn,.ib')) chime(); });

// Tilt amplop
function tilt(x, y) {
  const r = $('#env').getBoundingClientRect();
  gsap.to('#envT', { rotationY: (x - (r.left + r.width / 2)) / innerWidth * 40, rotationX: -(y - (r.top + r.height / 2)) / innerHeight * 40, duration: .5 });
}
$('#envScene').addEventListener('pointermove', e => tilt(e.clientX, e.clientY));
$('#envScene').addEventListener('touchmove', e => tilt(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

/* ===== Loader ===== */
const lines = ["Menyiapkan sebuah persembahan spesial...", "untuk pahlawan terhebat dalam hidupku."];
const lt = gsap.timeline({ onComplete: showEnv });
const pr = { v: 0 };
lt.to(pr, {
  v: 100,
  duration: 4,
  ease: 'power1.inOut',
  onUpdate: () => {
    $('#pct').textContent = Math.round(pr.v) + '%';
    $('#lbar').style.width = pr.v + '%';
  }
});
lt.add(() => { $('#ltxt').textContent = lines[0]; }, 0.2)
  .add(() => { $('#ltxt').textContent = lines[0] + ' ' + lines[1]; }, 2.2);

function showEnv() {
  gsap.to('#loader', { opacity: 0, duration: .8, onComplete: () => { $('#loader').remove(); } });
  gsap.set('#envScene', { visibility: 'visible', opacity: 0 });
  gsap.to('#envScene', { opacity: 1, duration: 1 });
  gsap.from('#env', { scale: .6, y: 60, duration: 1.2, ease: 'back.out(1.6)' });
}

/* ===== Buka Amplop ===== */
let opened = false;
$('#openBtn').addEventListener('click', () => {
  if (opened) return;
  opened = true;
  startMusic();
  $('#seal').style.animation = 'none';
  const tl = gsap.timeline();
  tl.to('#openBtn', { opacity: 0, y: 20, duration: .4 })
    .to('#seal', { scale: 1.5, boxShadow: '0 0 60px 20px rgba(251,191,36,.95)', duration: .5, yoyo: true, repeat: 1 })
    .to('#seal', { opacity: 0, scale: .3, duration: .4 })
    .to(['#rb1', '#rb2'], { opacity: 0, duration: .5 }, '<')
    .to('#flap', { rotationX: -180, duration: .9, ease: 'power2.inOut', zIndex: 0 }, '-=.1')
    .to('#paper', { y: -120, scale: 1.15, duration: .9, ease: 'power2.out', zIndex: 9 }, '-=.3')
    .set(['#cloudL', '#cloudR'], { visibility: 'visible' })
    .fromTo('#cloudL', { xPercent: -100 }, { xPercent: 0, duration: .8, ease: 'power2.in' })
    .fromTo('#cloudR', { xPercent: 100 }, { xPercent: 0, duration: .8, ease: 'power2.in' }, '<')
    .add(() => {
      $('#envScene').style.display = 'none';
      document.body.classList.remove('lock');
      gsap.set('#main', { visibility: 'visible', scale: 1.25, transformOrigin: '50% 30%' });
      $('#pill').style.display = 'flex';
      $('#dock').style.display = 'flex';
      $('#pill').classList.add('playing');
    })
    .to('#cloudL', { xPercent: -120, duration: 1.6, ease: 'power3.inOut' })
    .to('#cloudR', { xPercent: 120, duration: 1.6, ease: 'power3.inOut' }, '<')
    .to('#main', { scale: 1, duration: 1.8, ease: 'power3.out' }, '<')
    .add(() => {
      boom();
      heroIn();
      $('#cloudL').remove();
      $('#cloudR').remove();
    }, '-=1.2');
});

function boom() {
  const c = ['#BAE6FD', '#FFFFFF', '#FBBF24', '#7DD3FC'];
  confetti({ particleCount: 140, spread: 90, origin: { y: .6 }, colors: c });
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: .7 }, colors: c });
    confetti({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: .7 }, colors: c });
  }, 350);
}

function heroIn() {
  const t = $('#heroTitle');
  t.innerHTML = t.textContent.split(' ').map(w => `<span style="display:inline-block;white-space:nowrap">${[...w].map(c => `<span class="w" style="display:inline-block">${c}</span>`).join('')}</span>`).join(' ');
  gsap.from('.w', { opacity: 0, y: 70, rotationX: -80, stagger: .05, duration: 1.1, ease: 'back.out(1.7)' });
  gsap.from('#heroSub,#hero p:last-of-type,#hero a', { opacity: 0, y: 20, stagger: .2, delay: .6, duration: .9 });
  setCounters();
  initScratch();
  ScrollTrigger.refresh();
}

/* ===== Scroll Reveal ===== */
document.querySelectorAll('.para').forEach(p => gsap.to(p, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 88%' } }));
gsap.from('.ttl', { opacity: 0, y: 30, duration: 1, scrollTrigger: { trigger: '#galeri', start: 'top 80%' } });

/* ===== Galeri ===== */
const tilts = [-4, 3, -2, 4, -3, 2];
function addPhoto(f, i) {
  const d = document.createElement('div');
  d.className = 'pol';
  d.style.transform = `rotate(${tilts[i % 6]}deg)`;
  d.innerHTML = `<div class="ph"><!-- GANTI FOTO AYAH DI SINI --><img src="${f.src}" alt="${f.cap}" loading="lazy"></div><p>${f.cap}</p>`;
  d.onclick = () => openLb(FOTO.indexOf(f));
  $('#grid').appendChild(d);
  gsap.from(d, { opacity: 0, y: 60, duration: .9, delay: (i % 3) * .12, scrollTrigger: { trigger: d, start: 'top 92%' } });
}
FOTO.forEach(addPhoto);

const closeLb = () => gsap.to('#lb', { opacity: 0, duration: .25, onComplete: () => $('#lb').style.display = 'none' });
$('#lbX').onclick = closeLb;
$('#lb').onclick = e => { if (e.target.id === 'lb') closeLb(); };
addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ===== Kartu Flip ===== */
ALASAN.forEach((a, i) => {
  const d = document.createElement('div');
  d.className = 'flip';
  d.tabIndex = 0;
  d.innerHTML = `<div class="fi"><div class="fa glass"><i data-lucide="${a[0]}" class="w-12 h-12 text-amber-500 mb-3"></i><h3 class="serif font-extrabold text-2xl text-blue-900">${a[1]}</h3></div><div class="fb">${a[2]}</div></div>`;
  d.addEventListener('pointermove', e => {
    const r = d.getBoundingClientRect();
    d.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  });
  const tg = () => { d.classList.toggle('on'); chime(); };
  d.onclick = tg;
  d.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tg(); } };
  $('#cards').appendChild(d);
  gsap.from(d, { opacity: 0, scale: .85, y: 40, duration: .8, delay: (i % 3) * .1, scrollTrigger: { trigger: d, start: 'top 92%' } });
});
lucide.createIcons();

/* ===== Piala ===== */
$('#claim').onclick = () => {
  const c = $('#cert');
  c.style.display = 'block';
  gsap.fromTo(c, { opacity: 0, scale: .7, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: .9, ease: 'back.out(1.6)' });
  gsap.fromTo('#trophy', { scale: 1 }, { scale: 1.2, yoyo: true, repeat: 1, duration: .4 });
  const end = Date.now() + 1800;
  (function f() {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: .5 }, colors: ['#FBBF24', '#7DD3FC', '#fff'] });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: .5 }, colors: ['#FBBF24', '#7DD3FC', '#fff'] });
    if (Date.now() < end) requestAnimationFrame(f);
  })();
  setTimeout(() => c.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
};

/* ===== Pelukan & Doa ===== */
const em = ['💙', '⭐', '☁️', '💛', '🤍', '✨', '🤗'];
const THANKS = [
  "Terima kasih sudah jadi tempat pulang paling tenang buat kami, Yah.",
  "Sehat terus ya, Yah. Masih banyak hal baik yang ingin kami tunjukkan ke Ayah.",
  "Maaf kalau kami jarang bilang, tapi kami bangga sekali punya Ayah seperti Ayah.",
  "Peluk hangat dari anak-anakmu yang selalu mendoakan Ayah diam-diam."
];

$('#hug').onclick = e => {
  const r = e.currentTarget.getBoundingClientRect(), x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.className = 'fly';
    s.textContent = em[i % em.length];
    s.style.left = x0 + 'px';
    s.style.top = y0 + 'px';
    document.body.appendChild(s);
    gsap.to(s, {
      x: (Math.random() - .5) * innerWidth * .9,
      y: -(120 + Math.random() * innerHeight * .6),
      rotate: (Math.random() - .5) * 120,
      scale: .8 + Math.random(),
      opacity: 0,
      duration: 1.6 + Math.random(),
      ease: 'power2.out',
      onComplete: () => s.remove()
    });
  }
  confetti({ particleCount: 40, spread: 70, origin: { x: x0 / innerWidth, y: y0 / innerHeight }, colors: ['#FBBF24', '#BAE6FD', '#fff'], shapes: ['star'], scalar: 1.2 });
  fireworks(3);
  const d = $('#doa');
  d.textContent = THANKS[Math.floor(Math.random() * THANKS.length)];
  gsap.fromTo(d, { opacity: 0, scale: .7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'elastic.out(1,.5)' });
};

/* ===== Musik: MP3 Lokal & Fallback Web Audio ===== */
const au = $('#bg-music');
let ctx = null, gen = null, usingGen = false, muted = false, playing = false, master = null;

function startMusic() {
  au.volume = 0;
  au.play().then(() => {
    if (au.error) throw 0;
    playing = true;
    gsap.to(au, { volume: .7, duration: 3 });
  }).catch(() => startGen());
  au.addEventListener('error', () => { if (!usingGen) startGen(); }, { once: true });
}

let ARR = 0, sfx = null, rev = null, bar = 0, an = null;
const ARRS = [
  { n: 'Harmoni Pagi Cerah', b: 4, w: 'sawtooth', v: .018, ch: [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 392]], bs: [130.81, 110, 87.31, 98] },
  { n: 'Simfoni Rindu Ayah', b: 6, w: 'triangle', v: .03, ch: [[220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66], [164.81, 207.65, 246.94]], bs: [110, 87.31, 98, 82.41] }
];

function note(f, t, d, type, v) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(v, t + (type === 'sawtooth' ? d * .4 : .02));
  g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g);
  g.connect(master);
  g.connect(rev);
  o.start(t);
  o.stop(t + d + .1);
}

function sched() {
  if (!ctx) return;
  const A = ARRS[ARR], t = ctx.currentTime + .05, ch = A.ch[bar % 4];
  ch.forEach(f => {
    note(f, t, A.b, A.w, A.v);
    note(f * 2, t, A.b, 'triangle', .02);
  });
  note(A.bs[bar % 4], t, A.b, 'sine', .12);
  for (let i = 0; i < 8; i++) {
    const f = ch[i % 3] * (i >= 3 ? 2 : 1) * (i >= 6 ? 2 : 1);
    note(f, t + i * A.b / 8, 1.6, 'triangle', .07);
  }
  bar++;
}

function restartGen() {
  clearInterval(gen);
  sched();
  gen = setInterval(sched, ARRS[ARR].b * 1000);
}

function startGen() {
  if (usingGen) return;
  usingGen = true;
  playing = true;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = 0;
  an = ctx.createAnalyser();
  an.fftSize = 64;
  master.connect(an);
  an.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(muted ? 0 : .5, ctx.currentTime + 3);
  rev = ctx.createDelay();
  rev.delayTime.value = .28;
  const fb = ctx.createGain();
  fb.gain.value = .4;
  rev.connect(fb);
  fb.connect(rev);
  rev.connect(master);
  restartGen();
}

function chime() {
  if (muted) return;
  try {
    sfx = sfx || new (window.AudioContext || window.webkitAudioContext)();
    const t = sfx.currentTime;
    [1318.5, 1760].forEach((f, i) => {
      const o = sfx.createOscillator(), g = sfx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const s = t + i * .09;
      g.gain.setValueAtTime(0, s);
      g.gain.linearRampToValueAtTime(.05, s + .01);
      g.gain.exponentialRampToValueAtTime(.0001, s + .7);
      o.connect(g);
      g.connect(sfx.destination);
      o.start(s);
      o.stop(s + .8);
    });
  } catch (e) {}
}

$('#arr').onclick = () => {
  ARR = (ARR + 1) % 2;
  if (!usingGen) {
    au.pause();
    startGen();
  } else {
    restartGen();
  }
  playing = true;
  $('#pill').classList.add('playing');
  toast(ARRS[ARR].n);
};

const vg = $('#viz').getContext('2d');
(function vl(t) {
  vg.clearRect(0, 0, 90, 26);
  const d = an ? new Uint8Array(an.frequencyBinCount) : null;
  if (d) an.getByteFrequencyData(d);
  for (let i = 0; i < 12; i++) {
    let h = d ? d[i * 2 + 1] / 255 * 26 : (playing ? (.35 + .35 * Math.sin(t / 200 + i * .7)) * 24 : 3);
    h = Math.max(3, h);
    vg.fillStyle = i % 2 ? '#F59E0B' : '#3B82F6';
    vg.fillRect(i * 7.5, 26 - h, 5, h);
  }
  requestAnimationFrame(vl);
})(0);

function setPlay(on) {
  playing = on;
  $('#pill').classList.toggle('playing', on);
  const ic = $('#pp');
  ic.innerHTML = `<i data-lucide="${on ? 'pause' : 'play'}" class="w-4 h-4"></i>`;
  lucide.createIcons();
  if (usingGen) {
    on ? ctx.resume() : ctx.suspend();
  } else {
    on ? au.play() : au.pause();
  }
}

$('#pp').onclick = () => setPlay(!playing);
$('#mt').onclick = () => {
  muted = !muted;
  if (usingGen) master.gain.value = muted ? 0 : .5;
  else au.muted = muted;
  $('#mt').innerHTML = `<i data-lucide="${muted ? 'volume-x' : 'volume-2'}" class="w-4 h-4"></i>`;
  lucide.createIcons();
};

/* ===== Counter ===== */
const cnt = { d: 0, p: 0 };
function setCounters() {
  const y = +$('#yr').value || 2005, d = Math.max(1, Math.floor((Date.now() - new Date(y, 0, 1)) / 864e5));
  gsap.to(cnt, {
    d: d,
    p: d * 5,
    duration: 2.4,
    ease: 'power2.out',
    onUpdate: () => {
      $('#c1').textContent = Math.round(cnt.d).toLocaleString('id-ID');
      $('#c2').textContent = Math.round(cnt.p).toLocaleString('id-ID');
    }
  });
}
$('#yrBtn').onclick = setCounters;
setInterval(() => {
  if (!gsap.isTweening(cnt)) {
    cnt.p++;
    $('#c2').textContent = Math.round(cnt.p).toLocaleString('id-ID');
  }
}, 1500);

/* ===== Mode Baca Dramatis + Tanda Tangan ===== */
function drawSig() {
  const p = $('#sigp'), l = p.getTotalLength();
  gsap.fromTo(p, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 3, ease: 'power1.inOut' });
}
ScrollTrigger.create({ trigger: '#sig', start: 'top 85%', once: true, onEnter: drawSig });

let reading = false;
$('#readBtn').onclick = async () => {
  if (reading) return;
  reading = true;
  for (const p of document.querySelectorAll('#surat .para')) {
    gsap.set(p, { opacity: 1, y: 0 });
    p.classList.add('hl');
    p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await new Promise(r => setTimeout(r, 2600));
    p.classList.remove('hl');
  }
  drawSig();
  reading = false;
};

/* ===== Linimasa ===== */
gsap.fromTo('.tl .fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 70%', scrub: true } });
document.querySelectorAll('.tli').forEach((e, i) => gsap.from(e, { opacity: 0, x: i % 2 ? 70 : -70, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: e, start: 'top 88%' } }));

/* ===== Lightbox Navigasi & Unggah Foto ===== */
let li = 0;
function openLb(i) {
  li = (i + FOTO.length) % FOTO.length;
  $('#lbImg').src = FOTO[li].src;
  $('#lbCap').textContent = FOTO[li].cap;
  const lb = $('#lb');
  lb.style.display = 'flex';
  gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: .3 });
  gsap.fromTo('#lb .box', { scale: .7, rotate: -5 }, { scale: 1, rotate: 0, duration: .6, ease: 'back.out(1.5)' });
}
$('#lbP').onclick = () => openLb(li - 1);
$('#lbN').onclick = () => openLb(li + 1);
$('#up').onchange = e => [...e.target.files].forEach(f => {
  const r = new FileReader();
  r.onload = () => {
    FOTO.push({ src: r.result, cap: 'Kenangan baru' });
    addPhoto(FOTO[FOTO.length - 1], FOTO.length - 1);
    ScrollTrigger.refresh();
  };
  r.readAsDataURL(f);
});

/* ===== Kartu Gosok ===== */
const SCR = [
  ["Tentang Lelah yang Ayah Simpan", "Kami tahu, di balik wajah tenang Ayah, ada banyak capek yang sengaja Ayah telan sendiri supaya kami tidak ikut kepikiran."],
  ["Kebanggaan Terbesar Kami", "Mungkin kami jarang sekali mengucapkannya langsung, tapi terlahir dan dibesarkan oleh Ayah adalah hal paling membanggakan dalam hidup kami."],
  ["Janji Kecil dari Anak-Anakmu", "Sehat dan panjang umur terus ya, Yah. Biar kami punya cukup waktu untuk membalas peluh Ayah dan melihat Ayah menikmati masa tua dengan tenang."]
];

SCR.forEach(([t, m]) => {
  const d = document.createElement('div');
  d.className = 'relative rounded-2xl overflow-hidden glass';
  d.style.height = '170px';
  d.innerHTML = `<div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"><h3 class="serif font-extrabold text-blue-900">${t}</h3><p class="text-sm mt-1">${m}</p></div><canvas style="position:absolute;inset:0;width:100%;height:100%;touch-action:none"></canvas>`;
  $('#scr').appendChild(d);
});

function initScratch() {
  document.querySelectorAll('#scr canvas').forEach(c => {
    const w = c.width = c.offsetWidth, h = c.height = c.offsetHeight, g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#FDE68A');
    gr.addColorStop(.35, '#E5E7EB');
    gr.addColorStop(.65, '#FBBF24');
    gr.addColorStop(1, '#F3F4F6');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#B45309';
    g.font = '700 20px "Plus Jakarta Sans"';
    g.textAlign = 'center';
    g.fillText('✦ Gosok di sini ✦', w / 2, h / 2 + 6);

    let down = false, n = 0, done = false;
    const er = e => {
      const r = c.getBoundingClientRect();
      g.globalCompositeOperation = 'destination-out';
      g.beginPath();
      g.arc(e.clientX - r.left, e.clientY - r.top, 24, 0, 7);
      g.fill();
      if (++n % 6 === 0 && !done) {
        const d = g.getImageData(0, 0, w, h).data;
        let z = 0;
        for (let i = 3; i < d.length; i += 64) if (!d[i]) z++;
        if (z / (d.length / 64) > .5) {
          done = true;
          gsap.to(c, { opacity: 0, duration: .6 });
          confetti({ particleCount: 70, spread: 70, origin: { y: .7 }, colors: ['#FBBF24', '#7DD3FC', '#fff'] });
          chime();
        }
      }
    };
    c.onpointerdown = e => { down = true; c.setPointerCapture(e.pointerId); er(e); };
    c.onpointermove = e => { if (down) er(e); };
    c.onpointerup = () => down = false;
  });
}

/* ===== Toples Bintang ===== */
const WISH = [
  "Semoga Ayah selalu diberi kesehatan, badan yang bugar, dan tidur yang nyenyak setiap malam.",
  "Semoga setiap langkah Ayah mencari rezeki selalu dimudahkan dan dijauhkan dari segala marabahaya.",
  "Semoga lelah dan keringat Ayah selama ini dibalas Allah dengan ketenangan hati dan kebahagiaan.",
  "Semoga Ayah panjang umur, supaya bisa terus melihat dan menemani setiap pencapaian kami ke depan.",
  "Semoga hal-hal baik yang dulu pernah Ayah relakan demi keluarga, kini kembali ke Ayah dalam bentuk kebahagiaan.",
  "Semoga senyum Ayah tidak pernah hilang, dan hati Ayah selalu lapang menghadapi apa pun."
];

let stars = [];
function addStar(drop) {
  const s = document.createElement('span');
  s.textContent = '✦';
  s.style.cssText = `position:absolute;left:${10 + Math.random() * 72}%;top:${35 + Math.random() * 50}%;font-size:${14 + Math.random() * 16}px;color:${['#FBBF24', '#F59E0B', '#FDE68A', '#7DD3FC'][stars.length % 4]};text-shadow:0 0 10px currentColor`;
  $('#jarIn').appendChild(s);
  stars.push(s);
  gsap.fromTo(s, { y: drop ? -220 : 0, opacity: 0 }, { y: 0, opacity: 1, duration: drop ? 1.2 : .6, ease: 'bounce.out' });
  gsap.to(s, { x: '+=14', rotate: 40, duration: 2 + Math.random() * 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.2 });
}
for (let i = 0; i < 22; i++) addStar(false);

function showWish(t) {
  const c = $('#wishCard');
  c.textContent = t;
  gsap.fromTo(c, { opacity: 0, scale: .5, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: .9, ease: 'elastic.out(1,.5)' });
  confetti({ particleCount: 30, spread: 60, origin: { y: .6 }, colors: ['#FBBF24', '#fff'], shapes: ['star'] });
}

function takeStar() {
  if (!stars.length) return;
  const s = stars.splice(Math.floor(Math.random() * stars.length), 1)[0];
  gsap.killTweensOf(s);
  const r = s.getBoundingClientRect(), f = s.cloneNode(true);
  f.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;font-size:22px;color:#FBBF24;z-index:90;text-shadow:0 0 14px #FBBF24;pointer-events:none`;
  document.body.appendChild(f);
  s.remove();
  const t = $('#wishCard').getBoundingClientRect();
  gsap.to(f, {
    left: t.left + t.width / 2,
    top: t.top + 20,
    scale: 3,
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      f.remove();
      showWish(WISH[Math.floor(Math.random() * WISH.length)]);
    }
  });
  setTimeout(() => addStar(true), 1800);
}
$('#takeBtn').onclick = takeStar;
$('#jarBox').onclick = takeStar;

$('#wishBtn').onclick = () => {
  const v = $('#wishIn').value.trim();
  if (!v) return;
  WISH.push(v);
  $('#wishIn').value = '';
  addStar(true);
  showWish(v);
};

/* ===== Piala 3D, Kembang Api & Sertifikat PNG ===== */
const tro = $('#trophy');
tro.addEventListener('pointerdown', () => {
  tro.style.animation = 'none';
  gsap.fromTo(tro, { rotationZ: -8 }, { rotationZ: 0, duration: 1, ease: 'elastic.out(1,.3)' });
  confetti({ particleCount: 25, spread: 50, origin: { y: .5 }, colors: ['#FBBF24', '#fff'], shapes: ['star'] });
});

tro.addEventListener('pointermove', e => {
  if (e.buttons || e.pointerType === 'mouse') {
    tro.style.animation = 'none';
    const r = tro.getBoundingClientRect();
    gsap.to(tro, { rotationY: (e.clientX - r.left - r.width / 2) / r.width * 70, duration: .4 });
  }
});

function fireworks(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const x = .15 + Math.random() * .7, y = .15 + Math.random() * .35, r = document.createElement('div');
      r.style.cssText = `position:fixed;z-index:90;left:${x * 100}%;top:100%;width:4px;height:18px;border-radius:4px;background:linear-gradient(#fff,#FBBF24);pointer-events:none`;
      document.body.appendChild(r);
      gsap.to(r, {
        top: y * 100 + '%',
        duration: .9,
        ease: 'power2.out',
        onComplete: () => {
          r.remove();
          confetti({
            particleCount: 90,
            spread: 360,
            startVelocity: 32,
            gravity: .7,
            ticks: 90,
            origin: { x, y },
            colors: [['#FBBF24', '#fff'], ['#7DD3FC', '#E0E7FF'], ['#F472B6', '#FDE68A']][i % 3],
            scalar: .9
          });
          chime();
        }
      });
    }, i * 450);
  }
}

$('#claim').addEventListener('click', () => fireworks(4));

$('#dlCert').onclick = async () => {
  await Promise.all([
    document.fonts.load('800 80px "Playfair Display"'),
    document.fonts.load('600 50px Caveat'),
    document.fonts.load('400 30px "Plus Jakarta Sans"')
  ]);
  const c = document.createElement('canvas');
  c.width = 1600;
  c.height = 1130;
  const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 1130);
  gr.addColorStop(0, '#E0F2FE');
  gr.addColorStop(.6, '#BAE6FD');
  gr.addColorStop(1, '#E0E7FF');
  g.fillStyle = gr;
  g.fillRect(0, 0, 1600, 1130);

  g.strokeStyle = '#F59E0B';
  g.lineWidth = 14;
  g.strokeRect(40, 40, 1520, 1050);
  g.lineWidth = 3;
  g.strokeRect(75, 75, 1450, 980);
  g.textAlign = 'center';

  g.fillStyle = '#F59E0B';
  g.font = '600 56px Caveat';
  g.fillText('Sertifikat Penghargaan', 800, 220);

  g.fillStyle = '#1E3A8A';
  g.font = '800 88px "Playfair Display"';
  g.fillText('Ayah Terhebat', 800, 350);
  g.fillText('Sepanjang Masa', 800, 450);

  g.fillStyle = '#0F172A';
  g.font = '400 36px "Plus Jakarta Sans"';
  g.fillText('Dengan bangga dianugerahkan kepada', 800, 560);

  g.fillStyle = '#B45309';
  g.font = '800 110px "Playfair Display"';
  g.fillText(NAMA_AYAH, 800, 700);

  g.fillStyle = '#0F172A';
  g.font = '400 34px "Plus Jakarta Sans"';
  g.fillText('atas kerja keras, ketulusan, dan cinta yang tak pernah berhenti.', 800, 790);

  g.fillStyle = '#FBBF24';
  star(g, 800, 880, 40);

  g.fillStyle = '#1E3A8A';
  g.font = '600 58px Caveat';
  g.fillText('— ' + NAMA_ANAK + ' · 12 November 2026', 800, 990);

  const a = document.createElement('a');
  a.download = 'Sertifikat-Ayah-Terhebat.png';
  a.href = c.toDataURL('image/png');
  a.click();
};

lucide.createIcons();