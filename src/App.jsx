import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'

const BRAND = 'Cellis' // placeholder name: change to your startup's name
const VIDEO_SRC = '' // e.g. '/skin-cells.mp4' (file in /public) to use your video in the hero instead of the canvas

const T = {
  en: {
    nav: ['Analysis', 'Progress', 'Report', 'FAQ'], cta: 'Early access',
    eyebrow: 'AI skin analysis · Machine vision',
    h1: 'Stop guessing. Know what your skin actually needs.',
    sub: 'Regular skin scans, analysed by computer vision, tell you which products suit you and which ingredients to avoid, and track how your skin responds over time.',
    cta2: 'How it works', week: 'Week', hyd: 'Hydration',
    probTitle: 'The wrong product costs more than money.',
    probs: [['Hours of trial and error', 'Endless reviews and conflicting advice. You buy, test for weeks, and start over.'], ['Irritation and breakouts', "Ingredients that don't suit your skin can leave it irritated, dry or congested."], ['No proof it works', "Without objective tracking, it's hard to tell whether a product helps or hurts."]],
    howTitle: 'How it works',
    steps: [['Scan', 'A quick photo scan captures your skin in consistent conditions.'], ['Analyse', 'Computer vision measures hydration, texture, redness and blemishes.'], ['Recommend', 'Get ingredients to avoid, labels to look for and products that fit.'], ['Track', 'Rescan regularly to see how your skin responds to each product.']],
    anTitle: 'What the AI reads in your skin',
    an: [['Skin type', 'Oily, dry, combination or sensitive: measured, not guessed.'], ['Hydration', 'Surface moisture levels and how they change over time.'], ['Texture', 'Roughness, pores and surface smoothness.'], ['Redness', 'Areas of irritation mapped across the face.'], ['Blemishes', 'Detection and mapping of spots and congestion.'], ['Tone & undertone', 'The basis for makeup that suits you.']],
    prTitle: 'See what each product really does',
    prSub: 'Every scan becomes a data point. Over weeks, you see whether a product improves your skin or not.',
    series: ['Hydration', 'Redness', 'Texture'], note: 'Illustrative data',
    repTitle: 'A report that tells you what to buy, and what to skip',
    avoid: 'Avoid', look: 'Look for', sample: 'Sample report',
    avoidL: ['Denatured alcohol', 'Synthetic fragrance', 'Harsh physical scrubs'],
    lookL: ['Fragrance-free labels', 'Non-comedogenic formulas', 'Ceramides and humectants'],
    faqTitle: 'Questions',
    faq: [['Is this a medical tool?', "No. It's for beauty and wellness: skincare and makeup, not medication. It doesn't replace a dermatologist."], ['How often should I scan?', 'Regularly, for example weekly, so changes are visible and comparable.'], ['Which products does it cover?', 'Skincare and makeup: cleansers, moisturisers, serums, sunscreen, foundation and more.']],
    waitTitle: 'Be among the first to try it', waitSub: 'Join the early access list.',
    email: 'Your email', join: 'Join', thanks: "Thank you, we'll be in touch.",
    disc: 'Not a medical device. For skin diagnoses, consult a dermatologist.',
  },
  it: {
    nav: ['Analisi', 'Progressi', 'Report', 'FAQ'], cta: 'Accesso anticipato',
    eyebrow: 'Analisi della pelle con AI · Visione artificiale',
    h1: 'Smetti di tirare a indovinare. Scopri di cosa ha davvero bisogno la tua pelle.',
    sub: 'Scansioni regolari della pelle, analizzate con la visione artificiale, ti dicono quali prodotti ti convengono e quali ingredienti evitare, e monitorano come reagisce la tua pelle nel tempo.',
    cta2: 'Come funziona', week: 'Settimana', hyd: 'Idratazione',
    probTitle: 'Il prodotto sbagliato costa più dei soldi.',
    probs: [['Ore di tentativi ed errori', 'Recensioni infinite e consigli contrastanti. Compri, provi per settimane e ricominci da capo.'], ['Irritazione e imperfezioni', 'Ingredienti non adatti alla tua pelle possono lasciarla irritata, secca o congestionata.'], ['Nessuna prova che funzioni', 'Senza un monitoraggio oggettivo è difficile capire se un prodotto aiuta o peggiora la situazione.']],
    howTitle: 'Come funziona',
    steps: [['Scansiona', 'Una rapida scansione fotografica cattura la tua pelle in condizioni costanti.'], ['Analizza', 'La visione artificiale misura idratazione, texture, rossore e imperfezioni.'], ['Consiglia', 'Ricevi gli ingredienti da evitare, le etichette da cercare e i prodotti adatti.'], ['Monitora', 'Ripeti la scansione per vedere come la pelle reagisce a ogni prodotto.']],
    anTitle: "Cosa legge l'AI nella tua pelle",
    an: [['Tipo di pelle', 'Grassa, secca, mista o sensibile: misurato, non tirato a indovinare.'], ['Idratazione', 'Livelli di umidità superficiale e come cambiano nel tempo.'], ['Texture', 'Ruvidità, pori e levigatezza della superficie.'], ['Rossore', 'Le zone di irritazione mappate sul viso.'], ['Imperfezioni', 'Rilevamento e mappatura di macchie e congestione.'], ['Tono e sottotono', 'La base per un makeup adatto a te.']],
    prTitle: 'Guarda cosa fa davvero ogni prodotto',
    prSub: 'Ogni scansione diventa un dato. Nel giro di settimane vedi se un prodotto migliora la tua pelle oppure no.',
    series: ['Idratazione', 'Rossore', 'Texture'], note: 'Dati illustrativi',
    repTitle: 'Un report che ti dice cosa comprare e cosa evitare',
    avoid: 'Evita', look: 'Cerca', sample: 'Report di esempio',
    avoidL: ['Alcol denaturato', 'Profumo sintetico', 'Scrub fisici aggressivi'],
    lookL: ['Etichette senza profumo', 'Formule non comedogeniche', 'Ceramidi e umettanti'],
    faqTitle: 'Domande',
    faq: [['È uno strumento medico?', 'No. È pensato per bellezza e benessere: skincare e makeup, non farmaci. Non sostituisce il dermatologo.'], ['Ogni quanto devo scansionare?', 'Regolarmente, per esempio ogni settimana, così i cambiamenti sono visibili e confrontabili.'], ['Quali prodotti copre?', 'Skincare e makeup: detergenti, idratanti, sieri, solari, fondotinta e altro.']],
    waitTitle: 'Sii tra i primi a provarlo', waitSub: "Iscriviti alla lista d'accesso anticipato.",
    email: 'La tua email', join: 'Iscriviti', thanks: 'Grazie, ti contatteremo.',
    disc: 'Non è un dispositivo medico. Per diagnosi cutanee consulta un dermatologo.',
  },
}

const lerp = (a, b, t) => a + (b - a) * t

function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 2.5 28 9.5v13L16 29.5 4 22.5v-13z" stroke="#3b2a26" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="5" fill="#f8a39d" />
      <circle cx="16" cy="16" r="1.8" fill="#3b2a26" />
    </svg>
  )
}

function CellCanvas({ hy }) {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => { const r = c.getBoundingClientRect(); c.width = r.width * dpr; c.height = r.height * dpr }
    resize()
    window.addEventListener('resize', resize)
    const cells = []
    for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) {
      const gx = x - 4.5 + (y % 2 ? 0.5 : 0), gy = (y - 4.5) * 0.87
      if (Math.hypot(gx, gy) > 4.2) continue
      const ph = Math.random() * 6.28
      cells.push({ gx, gy, ph, cs: Math.cos(ph), sn: Math.sin(ph), jx: Math.random() - 0.5, jy: Math.random() - 0.5 })
    }
    let t = 0, raf = 0, visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(c)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      t += 0.016
      const h = hy.get(), dry = 1 - h, w = c.width, ht = c.height, u = Math.min(w, ht) / 9.4
      const rad = u * (0.34 + 0.22 * h), spread = 1.16 - 0.14 * h
      const col = [lerp(205, 248, h), lerp(178, 163, h), lerp(140, 157, h)].map(Math.round)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, w, ht)
      // one soft glow behind the cluster (cheap replacement for per-cell shadows)
      const glow = ctx.createRadialGradient(w / 2, ht / 2, 0, w / 2, ht / 2, u * 5)
      glow.addColorStop(0, `rgba(248,163,157,${0.3 * h})`)
      glow.addColorStop(1, 'rgba(248,163,157,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, ht)
      // one gradient per frame, reused for every cell
      const g = ctx.createRadialGradient(-rad * 0.3, -rad * 0.3, rad * 0.1, 0, 0, rad)
      g.addColorStop(0, `rgba(255,248,235,${0.55 + 0.3 * h})`)
      g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},${0.55 + 0.35 * h})`)
      ctx.lineWidth = 1.2 * dpr
      ctx.strokeStyle = `rgba(59,42,38,${0.18 + 0.1 * dry})`
      for (const k of cells) {
        const x = w / 2 + (k.gx * spread + k.jx * 0.3 * dry) * u + Math.sin(t * (0.5 + h * 0.5) + k.ph) * u * 0.05
        const y = ht / 2 + (k.gy * spread + k.jy * 0.3 * dry) * u + Math.cos(t * 0.5 + k.ph) * u * 0.04
        const r = 1 + Math.sin(t * 1.2 + k.ph) * 0.03 * h
        const sq = 0.2 * dry * k.sn
        ctx.setTransform(k.cs, k.sn, -k.sn, k.cs, x, y)
        ctx.beginPath()
        ctx.ellipse(0, 0, rad * r * (1 + sq), rad * r * (1 - sq), 0, 0, 6.283)
        ctx.fillStyle = g
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(rad * 0.08, rad * 0.05, rad * 0.2, 0, 6.283)
        ctx.fillStyle = `rgba(59,42,38,${0.28 - 0.1 * h})`
        ctx.fill()
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
    draw()
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize) }
  }, [hy])

  return <canvas ref={ref} className="h-full w-full" />
}

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
)

const Section = ({ id, children, tint }) => (
  <section id={id} className={tint ? 'bg-[#f8e8c8]/60' : ''}>
    <div className="mx-auto max-w-6xl px-6 py-24">{children}</div>
  </section>
)

const H2 = ({ children }) => (
  <h2 className="mb-12 max-w-2xl text-3xl leading-tight text-cocoa md:text-4xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{children}</h2>
)

const SERIES = [
  { pts: [30, 38, 47, 58, 67, 76, 83, 88], c: '#f8a39d' },
  { pts: [72, 66, 58, 48, 40, 33, 28, 24], c: '#3b2a26' },
  { pts: [40, 44, 52, 58, 66, 72, 77, 82], c: '#c9a56a' },
]
const toPath = (pts) => pts.map((v, i) => `${i ? 'L' : 'M'}${40 + i * 74} ${200 - v * 1.8}`).join(' ')

export default function App() {
  const [lang, setLang] = useState('en')
  const hy = useMotionValue(0.08)
  const pct = useTransform(hy, (v) => Math.round(20 + v * 72) + '%')
  const wk = useTransform(hy, (v) => String(Math.round(v * 8)))
  const slider = useRef(null)
  const [sent, setSent] = useState(false)
  const t = T[lang]
  const ctrl = useRef(null)

  useEffect(() => {
    ctrl.current = animate(hy, 0.95, { duration: 6, ease: 'easeInOut' })
    const off = hy.on('change', (v) => { if (slider.current) slider.current.value = v })
    return () => { ctrl.current?.stop(); off() }
  }, [hy])

  const onSlide = (e) => { ctrl.current?.stop(); hy.set(parseFloat(e.target.value)) }

  return (
    <div className="min-h-screen text-cocoa" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header className="sticky top-0 z-20 border-b border-cocoa/10 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5 text-lg" style={{ fontFamily: 'Fraunces, Georgia, serif' }}><Logo />{BRAND}</a>
          <nav className="hidden gap-8 text-sm text-cocoa/70 md:flex">
            {['analysis', 'progress', 'report', 'faq'].map((id, i) => <a key={id} href={`#${id}`} className="hover:text-cocoa">{t.nav[i]}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-cocoa/20 text-xs">
              {['en', 'it'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 uppercase ${lang === l ? 'bg-cocoa text-cream' : 'text-cocoa/70'}`}>{l}</button>
              ))}
            </div>
            <a href="#access" className="hidden rounded-full bg-peach px-4 py-2 text-sm font-medium text-cocoa sm:block">{t.cta}</a>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 text-xs uppercase tracking-[0.18em] text-cocoa/60">{t.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-4xl leading-[1.1] md:text-5xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{t.h1}</motion.h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cocoa/75">{t.sub}</p>
          <div className="mt-9 flex gap-4">
            <a href="#access" className="rounded-full bg-cocoa px-6 py-3 text-sm font-medium text-cream">{t.cta}</a>
            <a href="#how" className="rounded-full border border-cocoa/25 px-6 py-3 text-sm">{t.cta2}</a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-cocoa/10 bg-gradient-to-b from-[#fff8e8] to-[#f8e8c8]">
          {VIDEO_SRC ? <video src={VIDEO_SRC} autoPlay muted loop playsInline className="h-full w-full object-cover" /> : <CellCanvas hy={hy} />}
          <motion.div className="pointer-events-none absolute inset-0" animate={{ y: ['6%', '94%', '6%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}>
            <div className="h-px bg-peach/80 shadow-[0_0_10px_2px_rgba(248,163,157,0.5)]" />
          </motion.div>
          <div className="absolute left-4 top-4 rounded-lg bg-cream/90 px-3 py-2 text-xs">
            <div className="text-cocoa/55">{t.hyd}</div>
            <motion.div className="text-lg font-medium">{pct}</motion.div>
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-xl bg-cream/90 px-4 py-3">
            <div className="mb-1 flex justify-between text-xs text-cocoa/60"><span>{t.week} 0</span><span>{t.week} <motion.span>{wk}</motion.span></span><span>{t.week} 8</span></div>
            <input ref={slider} type="range" min="0.05" max="0.98" step="0.005" defaultValue="0.08" onChange={onSlide} className="w-full accent-[#f8a39d]" aria-label={t.hyd} />
          </div>
        </div>
      </section>

      <Section tint>
        <Reveal><H2>{t.probTitle}</H2></Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-cocoa/10 bg-cocoa/10 md:grid-cols-3">
          {t.probs.map(([h, d], i) => (
            <Reveal key={h} delay={i * 0.1} className="bg-cream p-8">
              <div className="mb-4 text-sm text-peach">0{i + 1}</div>
              <h3 className="mb-2 text-lg font-medium">{h}</h3>
              <p className="text-sm leading-relaxed text-cocoa/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="how">
        <Reveal><H2>{t.howTitle}</H2></Reveal>
        <div className="grid gap-8 md:grid-cols-4">
          {t.steps.map(([h, d], i) => (
            <Reveal key={h} delay={i * 0.08}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-sm">{i + 1}</div>
              <h3 className="mb-2 font-medium">{h}</h3>
              <p className="text-sm leading-relaxed text-cocoa/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="analysis" tint>
        <Reveal><H2>{t.anTitle}</H2></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.an.map(([h, d], i) => (
            <Reveal key={h} delay={i * 0.06} className="rounded-2xl border border-cocoa/10 bg-cream p-6">
              <div className="mb-3 h-2 w-2 rounded-full bg-peach" />
              <h3 className="mb-1.5 font-medium">{h}</h3>
              <p className="text-sm leading-relaxed text-cocoa/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="progress">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <H2>{t.prTitle}</H2>
            <p className="-mt-6 max-w-md text-cocoa/70">{t.prSub}</p>
          </Reveal>
          <Reveal className="rounded-2xl border border-cocoa/10 bg-[#fff8e8] p-5">
            <svg viewBox="0 0 600 220" className="w-full">
              {[0, 1, 2, 3].map((i) => <line key={i} x1="40" x2="580" y1={20 + i * 60} y2={20 + i * 60} stroke="#3b2a26" strokeOpacity="0.08" />)}
              {SERIES.map((s) => (
                <motion.path key={s.c} d={toPath(s.pts)} fill="none" stroke={s.c} strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} />
              ))}
            </svg>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-cocoa/65">
              {SERIES.map((s, i) => <span key={s.c} className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: s.c }} />{t.series[i]}</span>)}
              <span className="ml-auto italic">{t.note}</span>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="report" tint>
        <Reveal><H2>{t.repTitle}</H2></Reveal>
        <Reveal className="max-w-3xl overflow-hidden rounded-2xl border border-cocoa/10 bg-cream">
          <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-4 text-xs uppercase tracking-widest text-cocoa/55">
            <span className="flex items-center gap-2"><Logo size={18} />{BRAND}</span><span>{t.sample}</span>
          </div>
          <div className="grid md:grid-cols-2">
            {[[t.avoid, t.avoidL, '✕'], [t.look, t.lookL, '✓']].map(([title, list, mark], k) => (
              <div key={title} className={`p-6 ${k ? 'md:border-l md:border-cocoa/10' : ''}`}>
                <h3 className="mb-4 text-sm font-medium">{title}</h3>
                <ul className="space-y-3 text-sm text-cocoa/75">
                  {list.map((x) => <li key={x} className="flex gap-3"><span className={k ? 'text-[#c9806f]' : 'text-cocoa/45'}>{mark}</span>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="faq">
        <Reveal><H2>{t.faqTitle}</H2></Reveal>
        <div className="max-w-3xl divide-y divide-cocoa/10 border-y border-cocoa/10">
          {t.faq.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">{q}<span className="text-peach transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cocoa/70">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section id="access" className="bg-cocoa text-cream">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{t.waitTitle}</h2>
          <p className="mt-3 text-cream/70">{t.waitSub}</p>
          {sent ? <p className="mt-8 text-peach">{t.thanks}</p> : (
            <div className="mx-auto mt-8 flex max-w-md gap-2">
              <input type="email" placeholder={t.email} className="min-w-0 flex-1 rounded-full bg-cream/10 px-5 py-3 text-sm outline-none placeholder:text-cream/45" />
              <button onClick={() => setSent(true)} className="rounded-full bg-peach px-6 py-3 text-sm font-medium text-cocoa">{t.join}</button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-cocoa/10 px-6 py-8 text-center text-xs text-cocoa/55">
        <p>{t.disc}</p>
        <p className="mt-2">© 2026 {BRAND}</p>
      </footer>
    </div>
  )
}
