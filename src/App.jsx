import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'

const BRAND = 'Cellis' // placeholder name: change to your startup's name
const VIDEO_SRC = '' // e.g. '/skin-cells.mp4' (file in /public) to use your video in the hero instead of the canvas

const ENDPOINT = '' // paste your Formspree (or similar) URL here to receive partner requests; empty = demo mode

const P_LISTS = {
  types: [['pharmacy', 'Pharmacy', 'Farmacia'], ['research_lab', 'Research lab', 'Laboratorio di ricerca'], ['aesthetic_clinic', 'Aesthetician / dermatology clinic', 'Centro estetico / clinica dermatologica'], ['university', 'University', 'Università'], ['beauty_brand', 'Beauty producer / brand', 'Produttore / marchio di bellezza'], ['retailer', 'Retailer / e-commerce', 'Retail / e-commerce'], ['other', 'Other', 'Altro']],
  sizes: [['1-10', '1–10 employees', '1–10 dipendenti'], ['11-50', '11–50 employees', '11–50 dipendenti'], ['51-250', '51–250 employees', '51–250 dipendenti'], ['251-1000', '251–1,000 employees', '251–1.000 dipendenti'], ['1000+', '1,000+ employees', 'Oltre 1.000 dipendenti']],
  regions: [['italy', 'Italy', 'Italia'], ['europe', 'Europe (outside Italy)', 'Europa (esclusa Italia)'], ['north_america', 'North America', 'Nord America'], ['latam', 'Latin America', 'America Latina'], ['mena', 'Middle East & Africa', 'Medio Oriente e Africa'], ['asia', 'Asia-Pacific', 'Asia-Pacifico'], ['global', 'Global', 'Globale']],
  ints: [['recommendations', 'Product recommendations for customers', 'Raccomandazioni di prodotto per i clienti'], ['analysis', 'Skin analysis in our store or clinic', 'Analisi della pelle nel nostro punto vendita o centro'], ['research', 'Research collaboration', 'Collaborazione di ricerca'], ['whitelabel', 'White-label / API integration', 'White-label / integrazione API']],
  customs: [['yes', 'Yes', 'Sì'], ['maybe', "Maybe, let's talk", 'Forse, parliamone'], ['no', 'No, the standard one is fine', 'No, va bene quello standard']],
  times: [['now', 'Immediately', 'Subito'], ['3m', 'Within 3 months', 'Entro 3 mesi'], ['6m', 'Within 6 months', 'Entro 6 mesi'], ['explore', 'Just exploring', 'Sto solo esplorando']],
}

const T = {
  en: {
    nav: ['Analysis', 'Progress', 'Report', 'Partners', 'FAQ'], pcta: 'Partner with us',
    eyebrow: 'AI skin analysis · Machine vision',
    h1: 'Stop guessing. Know what your skin actually needs.',
    sub: 'Regular skin scans, analysed by computer vision, tell you which products suit you and which ingredients to avoid, and track how your skin responds over time.',
    cta2: 'How it works', week: 'Week', hyd: 'Hydration',
    probTitle: 'The wrong product costs more than money.',
    probs: [['Hours of trial and error', 'Endless reviews and conflicting advice. You buy, test for weeks, and start over.'], ['Irritation and breakouts', "Ingredients that don't suit your skin can leave it irritated, dry or congested."], ['No proof it works', "Without objective tracking, it's hard to tell whether a product helps or hurts."]],
    howTitle: 'How it works',
    steps: [['Scan', 'A quick photo scan captures your skin in consistent conditions.'], ['Analyse', 'Computer vision measures hydration, texture, redness and blemishes.'], ['Recommend', 'Get ingredients to avoid, labels to look for and products that fit.'], ['Track', 'Rescan regularly to see how your skin responds to each product.']],
    anTitle: 'What the AI reads in your skin',
    anSub: 'Our model detects five skin signs and measures the characteristics around them.',
    detLabel: 'Detected signs', moreLabel: 'Also measured',
    det: [['Wrinkles', 'Fine lines and deeper wrinkles, mapped across the face.'], ['Inflammatory acne', 'Red, inflamed blemishes such as papules and pustules.'], ['Comedonal acne', 'Blackheads and whiteheads: clogged pores without inflammation.'], ['Red spots', 'Red marks and areas of irritation on the skin.'], ['Brown spots', 'Pigmentation: dark spots and uneven patches.']],
    more: ['Skin colour and tone', 'Undertone', 'Texture', 'Hydration', 'Skin type'],
    incEyebrow: 'Our values', incTitle: 'Built for every skin tone.',
    incText: 'Inclusivity is one of our core values. Skin analysis and product advice should work for everyone, so we are committed to building and testing our models across the full range of skin tones, and to matching makeup and skincare to your own tone and undertone.',
    prTitle: 'See what each product really does',
    prSub: 'Every scan becomes a data point. Over weeks, you see whether a product improves your skin or not.',
    series: ['Inflammatory acne', 'Red spots', 'Brown spots'], note: 'Illustrative data · fewer signs is better',
    repTitle: 'A report that tells you what to buy, and what to skip',
    avoid: 'Avoid', look: 'Look for', sample: 'Sample report',
    avoidL: ['Denatured alcohol', 'Synthetic fragrance', 'Harsh physical scrubs'],
    lookL: ['Fragrance-free labels', 'Non-comedogenic formulas', 'Ceramides and humectants'],
    faqTitle: 'Questions',
    faq: [['Is this a medical tool?', "No. It's for beauty and wellness: skincare and makeup, not medication. It doesn't replace a dermatologist."], ['How often should I scan?', 'Regularly, for example weekly, so changes are visible and comparable.'], ['Which products does it cover?', 'Skincare and makeup: cleansers, moisturisers, serums, sunscreen, foundation and more.']],
    waitTitle: 'For individuals: be among the first to try it', waitSub: 'Join the early access list.',
    email: 'Your email', join: 'Join', thanks: "Thank you, we'll be in touch.",
    disc: 'Not a medical device. For skin diagnoses, consult a dermatologist.',
    p: {
      ...P_LISTS,
      eyebrow: 'For businesses',
      title: 'Build the next generation of skin-aware products with us.',
      sub: 'We partner with pharmacies, clinics, labs, universities and beauty brands to bring objective, AI-based skin analysis to their customers and research.',
      perks: [['Recommendations for your customers', 'Integrate scan-based product and ingredient guidance into your store, clinic or app.'], ['Custom databases', 'We can tailor the analysis to your own product catalogue or research data.'], ['Research collaboration', 'Joint studies on how products perform on skin over time.']],
      steps: ['Organisation', 'Needs', 'Contact'],
      company: 'Organisation name', type: 'Type of organisation', size: 'Company size', region: 'Main region of operation', markets: 'Main countries or markets (optional)', pick: 'Select…',
      intLabel: 'What are you interested in?',
      customQ: 'Would you like us to build a custom database or model for you?',
      customNote: 'Tell us briefly about your data or product catalogue (optional)',
      timeline: 'Expected start',
      name: 'Full name', role: 'Role', email: 'Work email', phone: 'Phone (optional)', message: 'Anything else we should know? (optional)',
      consent: 'I agree to be contacted about a partnership.',
      next: 'Continue', back: 'Back', send: 'Send request', sending: 'Sending…',
      thanks: "Thank you. We've received your request and will be in touch.", error: 'Something went wrong. Please try again.',
    },
  },
  it: {
    nav: ['Analisi', 'Progressi', 'Report', 'Partner', 'FAQ'], pcta: 'Diventa partner',
    eyebrow: 'Analisi della pelle con AI · Visione artificiale',
    h1: 'Smetti di tirare a indovinare. Scopri di cosa ha davvero bisogno la tua pelle.',
    sub: 'Scansioni regolari della pelle, analizzate con la visione artificiale, ti dicono quali prodotti ti convengono e quali ingredienti evitare, e monitorano come reagisce la tua pelle nel tempo.',
    cta2: 'Come funziona', week: 'Settimana', hyd: 'Idratazione',
    probTitle: 'Il prodotto sbagliato costa più dei soldi.',
    probs: [['Ore di tentativi ed errori', 'Recensioni infinite e consigli contrastanti. Compri, provi per settimane e ricominci da capo.'], ['Irritazione e imperfezioni', 'Ingredienti non adatti alla tua pelle possono lasciarla irritata, secca o congestionata.'], ['Nessuna prova che funzioni', 'Senza un monitoraggio oggettivo è difficile capire se un prodotto aiuta o peggiora la situazione.']],
    howTitle: 'Come funziona',
    steps: [['Scansiona', 'Una rapida scansione fotografica cattura la tua pelle in condizioni costanti.'], ['Analizza', 'La visione artificiale misura idratazione, texture, rossore e imperfezioni.'], ['Consiglia', 'Ricevi gli ingredienti da evitare, le etichette da cercare e i prodotti adatti.'], ['Monitora', 'Ripeti la scansione per vedere come la pelle reagisce a ogni prodotto.']],
    anTitle: "Cosa legge l'AI nella tua pelle",
    anSub: 'Il nostro modello rileva cinque segni della pelle e misura le caratteristiche che li circondano.',
    detLabel: 'Segni rilevati', moreLabel: 'Misurato anche',
    det: [['Rughe', 'Linee sottili e rughe profonde, mappate sul viso.'], ['Acne infiammatoria', 'Imperfezioni rosse e infiammate, come papule e pustole.'], ['Acne comedonica', 'Punti neri e punti bianchi: pori ostruiti senza infiammazione.'], ['Macchie rosse', 'Segni rossi e zone di irritazione sulla pelle.'], ['Macchie brune', 'Pigmentazione: macchie scure e discromie.']],
    more: ['Colore e tono della pelle', 'Sottotono', 'Texture', 'Idratazione', 'Tipo di pelle'],
    incEyebrow: 'I nostri valori', incTitle: 'Pensato per ogni tonalità di pelle.',
    incText: 'L’inclusività è uno dei nostri valori fondamentali. L’analisi della pelle e i consigli sui prodotti devono funzionare per tutti: ci impegniamo a sviluppare e testare i nostri modelli su tutta la gamma di tonalità e ad abbinare makeup e skincare al tuo tono e sottotono.',
    prTitle: 'Guarda cosa fa davvero ogni prodotto',
    prSub: 'Ogni scansione diventa un dato. Nel giro di settimane vedi se un prodotto migliora la tua pelle oppure no.',
    series: ['Acne infiammatoria', 'Macchie rosse', 'Macchie brune'], note: 'Dati illustrativi · meno segni è meglio',
    repTitle: 'Un report che ti dice cosa comprare e cosa evitare',
    avoid: 'Evita', look: 'Cerca', sample: 'Report di esempio',
    avoidL: ['Alcol denaturato', 'Profumo sintetico', 'Scrub fisici aggressivi'],
    lookL: ['Etichette senza profumo', 'Formule non comedogeniche', 'Ceramidi e umettanti'],
    faqTitle: 'Domande',
    faq: [['È uno strumento medico?', 'No. È pensato per bellezza e benessere: skincare e makeup, non farmaci. Non sostituisce il dermatologo.'], ['Ogni quanto devo scansionare?', 'Regolarmente, per esempio ogni settimana, così i cambiamenti sono visibili e confrontabili.'], ['Quali prodotti copre?', 'Skincare e makeup: detergenti, idratanti, sieri, solari, fondotinta e altro.']],
    waitTitle: 'Per i privati: sii tra i primi a provarlo', waitSub: "Iscriviti alla lista d'accesso anticipato.",
    email: 'La tua email', join: 'Iscriviti', thanks: 'Grazie, ti contatteremo.',
    disc: 'Non è un dispositivo medico. Per diagnosi cutanee consulta un dermatologo.',
    p: {
      ...P_LISTS,
      eyebrow: 'Per le aziende',
      title: 'Costruisci con noi la prossima generazione di prodotti attenti alla pelle.',
      sub: 'Collaboriamo con farmacie, centri, laboratori, università e marchi di bellezza per portare ai loro clienti e alla loro ricerca un’analisi della pelle oggettiva, basata su AI.',
      perks: [['Raccomandazioni per i tuoi clienti', 'Integra nel tuo negozio, centro o app consigli su prodotti e ingredienti basati sulla scansione.'], ['Database personalizzati', 'Possiamo adattare l’analisi al tuo catalogo prodotti o ai tuoi dati di ricerca.'], ['Collaborazione di ricerca', 'Studi congiunti su come i prodotti funzionano sulla pelle nel tempo.']],
      steps: ['Organizzazione', 'Esigenze', 'Contatto'],
      company: 'Nome dell’organizzazione', type: 'Tipo di organizzazione', size: 'Dimensione aziendale', region: 'Area principale di attività', markets: 'Paesi o mercati principali (facoltativo)', pick: 'Seleziona…',
      intLabel: 'Cosa ti interessa?',
      customQ: 'Vorresti che creassimo un database o un modello personalizzato per te?',
      customNote: 'Raccontaci brevemente i tuoi dati o il tuo catalogo prodotti (facoltativo)',
      timeline: 'Avvio previsto',
      name: 'Nome e cognome', role: 'Ruolo', email: 'Email di lavoro', phone: 'Telefono (facoltativo)', message: 'Altro che dovremmo sapere? (facoltativo)',
      consent: 'Acconsento a essere contattato per una partnership.',
      next: 'Continua', back: 'Indietro', send: 'Invia richiesta', sending: 'Invio…',
      thanks: 'Grazie. Abbiamo ricevuto la tua richiesta e ti contatteremo.', error: 'Qualcosa è andato storto. Riprova.',
    },
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
  { pts: [62, 56, 48, 40, 34, 28, 24, 20], c: '#f8a39d' },
  { pts: [70, 64, 57, 49, 42, 36, 31, 27], c: '#3b2a26' },
  { pts: [48, 47, 45, 43, 41, 39, 38, 36], c: '#c9a56a' },
]
const TONES = ['#f7e0cb', '#efc9a5', '#e0ac82', '#c68a5e', '#a56a43', '#85502f', '#613824', '#3f2316']
const toPath = (pts) => pts.map((v, i) => `${i ? 'L' : 'M'}${40 + i * 74} ${200 - v * 1.8}`).join(' ')

const inp = 'w-full rounded-xl border border-cocoa/15 bg-[#fff8e8] px-4 py-3 text-sm outline-none focus:border-peach'
const Field = ({ label, children }) => (
  <label className="block"><span className="mb-1.5 block text-xs text-cocoa/65">{label}</span>{children}</label>
)
const Chip = ({ on, onClick, children }) => (
  <button type="button" aria-pressed={on} onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm transition ${on ? 'border-cocoa bg-cocoa text-cream' : 'border-cocoa/20 text-cocoa/75 hover:border-cocoa/50'}`}>{children}</button>
)

function PartnerForm({ t, lang }) {
  const p = t.p, li = lang === 'en' ? 1 : 2
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [d, setD] = useState({ company: '', type: '', size: '', region: '', markets: '', interests: [], custom: '', customNote: '', timeline: '', name: '', role: '', email: '', phone: '', message: '', consent: false })
  const set = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }))
  const put = (k, v) => setD((s) => ({ ...s, [k]: v }))
  const toggle = (k) => setD((s) => ({ ...s, interests: s.interests.includes(k) ? s.interests.filter((x) => x !== k) : [...s.interests, k] }))
  const valid = [d.company && d.type && d.size && d.region, d.custom && d.timeline, d.name && /\S+@\S+\.\S+/.test(d.email) && d.consent][step]

  const submit = async () => {
    setStatus('sending')
    try {
      if (ENDPOINT) {
        const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, language: lang, submitted_at: new Date().toISOString() }) })
        if (!r.ok) throw new Error('bad response')
      } else {
        console.log('Partner request (demo mode):', d)
        await new Promise((r) => setTimeout(r, 700))
      }
      setStatus('done')
    } catch { setStatus('error') }
  }

  const select = (k, list) => (
    <select className={inp} value={d[k]} onChange={set(k)}>
      <option value="">{p.pick}</option>
      {list.map((o) => <option key={o[0]} value={o[0]}>{o[li]}</option>)}
    </select>
  )

  if (status === 'done') return (
    <div className="rounded-2xl border border-cocoa/10 bg-cream p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-peach/30 text-lg">✓</div>
      <p className="text-cocoa/80">{p.thanks}</p>
    </div>
  )

  return (
    <div className="rounded-2xl border border-cocoa/10 bg-cream p-6 shadow-[0_20px_50px_-30px_rgba(59,42,38,0.35)] md:p-8">
      <div className="mb-7 flex gap-2">
        {p.steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1 rounded-full ${i <= step ? 'bg-peach' : 'bg-cocoa/10'}`} />
            <div className={`mt-2 text-xs ${i === step ? 'text-cocoa' : 'text-cocoa/45'}`}>{s}</div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label={p.company}><input className={inp} value={d.company} onChange={set('company')} /></Field></div>
          <Field label={p.type}>{select('type', p.types)}</Field>
          <Field label={p.size}>{select('size', p.sizes)}</Field>
          <Field label={p.region}>{select('region', p.regions)}</Field>
          <Field label={p.markets}><input className={inp} value={d.markets} onChange={set('markets')} /></Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-cocoa/65">{p.intLabel}</div>
            <div className="flex flex-wrap gap-2">{p.ints.map((o) => <Chip key={o[0]} on={d.interests.includes(o[0])} onClick={() => toggle(o[0])}>{o[li]}</Chip>)}</div>
          </div>
          <div>
            <div className="mb-2 text-xs text-cocoa/65">{p.customQ}</div>
            <div className="flex flex-wrap gap-2">{p.customs.map((o) => <Chip key={o[0]} on={d.custom === o[0]} onClick={() => put('custom', o[0])}>{o[li]}</Chip>)}</div>
          </div>
          {d.custom === 'yes' && <Field label={p.customNote}><textarea rows={3} className={inp} value={d.customNote} onChange={set('customNote')} /></Field>}
          <Field label={p.timeline}>{select('timeline', p.times)}</Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={p.name}><input className={inp} value={d.name} onChange={set('name')} /></Field>
          <Field label={p.role}><input className={inp} value={d.role} onChange={set('role')} /></Field>
          <Field label={p.email}><input type="email" className={inp} value={d.email} onChange={set('email')} /></Field>
          <Field label={p.phone}><input type="tel" className={inp} value={d.phone} onChange={set('phone')} /></Field>
          <div className="sm:col-span-2"><Field label={p.message}><textarea rows={3} className={inp} value={d.message} onChange={set('message')} /></Field></div>
          <label className="flex items-start gap-3 text-sm text-cocoa/75 sm:col-span-2">
            <input type="checkbox" checked={d.consent} onChange={(e) => put('consent', e.target.checked)} className="mt-0.5 accent-[#f8a39d]" />{p.consent}
          </label>
        </div>
      )}

      {status === 'error' && <p className="mt-4 text-sm text-[#b5594a]">{p.error}</p>}

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="text-sm text-cocoa/65 hover:text-cocoa">← {p.back}</button> : <span />}
        {step < 2
          ? <button type="button" disabled={!valid} onClick={() => setStep(step + 1)} className="rounded-full bg-cocoa px-6 py-3 text-sm font-medium text-cream disabled:opacity-35">{p.next}</button>
          : <button type="button" disabled={!valid || status === 'sending'} onClick={submit} className="rounded-full bg-peach px-6 py-3 text-sm font-medium text-cocoa disabled:opacity-40">{status === 'sending' ? p.sending : p.send}</button>}
      </div>
    </div>
  )
}

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
            {['analysis', 'progress', 'report', 'partners', 'faq'].map((id, i) => <a key={id} href={`#${id}`} className="hover:text-cocoa">{t.nav[i]}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-cocoa/20 text-xs">
              {['en', 'it'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 uppercase ${lang === l ? 'bg-cocoa text-cream' : 'text-cocoa/70'}`}>{l}</button>
              ))}
            </div>
            <a href="#partners" className="hidden rounded-full bg-peach px-4 py-2 text-sm font-medium text-cocoa sm:block">{t.pcta}</a>
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
            <a href="#partners" className="rounded-full bg-cocoa px-6 py-3 text-sm font-medium text-cream">{t.pcta}</a>
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
        <p className="-mt-6 mb-10 max-w-2xl text-cocoa/70">{t.anSub}</p>
        <div className="mb-3 text-xs uppercase tracking-[0.16em] text-cocoa/55">{t.detLabel}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {t.det.map(([h, d], i) => (
            <Reveal key={h} delay={i * 0.06} className={`rounded-2xl border border-cocoa/10 bg-cream p-6 ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="mb-3 h-2 w-2 rounded-full bg-peach" />
              <h3 className="mb-1.5 font-medium">{h}</h3>
              <p className="text-sm leading-relaxed text-cocoa/70">{d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mb-3 mt-10 text-xs uppercase tracking-[0.16em] text-cocoa/55">{t.moreLabel}</div>
        <div className="flex flex-wrap gap-2">
          {t.more.map((x) => <span key={x} className="rounded-full border border-cocoa/20 bg-cream px-4 py-2 text-sm">{x}</span>)}
        </div>
      </Section>

      <Section id="inclusive">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-cocoa/60">{t.incEyebrow}</p>
            <h2 className="text-3xl leading-tight md:text-4xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{t.incTitle}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cocoa/70">{t.incText}</p>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-3">
            {TONES.map((c) => <div key={c} aria-hidden="true" className="aspect-square rounded-2xl border border-cocoa/10" style={{ background: c }} />)}
          </Reveal>
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

      <Section id="partners">
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-cocoa/60">{t.p.eyebrow}</p>
            <h2 className="text-3xl leading-tight md:text-4xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{t.p.title}</h2>
            <p className="mt-5 leading-relaxed text-cocoa/70">{t.p.sub}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.p.types.slice(0, 6).map((o) => <span key={o[0]} className="rounded-full border border-cocoa/15 px-3 py-1 text-xs text-cocoa/70">{o[lang === 'en' ? 1 : 2]}</span>)}
            </div>
            <div className="mt-10 space-y-6">
              {t.p.perks.map(([h, d]) => (
                <div key={h} className="flex gap-4">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-peach" />
                  <div><h3 className="font-medium">{h}</h3><p className="mt-1 text-sm leading-relaxed text-cocoa/70">{d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3"><PartnerForm t={t} lang={lang} /></Reveal>
        </div>
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
