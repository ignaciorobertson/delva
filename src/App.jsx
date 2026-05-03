import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Mail, MessageCircle, X, Menu, ZoomIn } from "lucide-react";
import imgChatbot  from "./assets/workflows/chatbot.png";
import imgComidas  from "./assets/workflows/comidas.png";
import imgNoticias from "./assets/workflows/noticias.png";
import imgScraper  from "./assets/workflows/scraper.png";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #06101f; --bg-card: #0b1828; --bg-card2: #0f1e30;
    --teal: #12b8a5; --teal-lt: #2dd4bf; --teal-dk: #0d9488;
    --cream: #e8dcc8; --cream-muted: #b8a98a;
    --text: #eef2f7; --text-muted: #7a8ea8;
    --border: rgba(18,184,165,0.12); --border-hover: rgba(18,184,165,0.38);
  }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--teal-dk); border-radius: 2px; }

  @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  .float  { animation: floatY 7s ease-in-out infinite; }
  .float2 { animation: floatY 9s ease-in-out infinite 1.5s; }
  .fade-up   { animation: fadeUp .75s ease both; }
  .fade-up-1 { animation: fadeUp .75s ease .10s both; }
  .fade-up-2 { animation: fadeUp .75s ease .20s both; }
  .fade-up-3 { animation: fadeUp .75s ease .35s both; }
  .fade-up-4 { animation: fadeUp .75s ease .50s both; }

  .nav-link { color: var(--text-muted); text-decoration: none; font-size: .88rem; font-weight: 500; position: relative; transition: color .2s; }
  .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background: var(--teal); transition: width .3s; }
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::after { width:100%; }

  .btn-primary { display:inline-flex; align-items:center; gap:8px; background: var(--teal); color: #06101f; font-family:'DM Sans',sans-serif; font-weight:700; font-size:.88rem; padding:.75rem 1.6rem; border-radius:10px; border:none; cursor:pointer; text-decoration:none; transition: background .2s, transform .15s, box-shadow .2s; }
  .btn-primary:hover { background: var(--teal-lt); transform:translateY(-2px); box-shadow:0 10px 30px rgba(18,184,165,.25); }
  .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:transparent; color: var(--teal); font-family:'DM Sans',sans-serif; font-weight:700; font-size:.88rem; padding:.75rem 1.6rem; border-radius:10px; border:1px solid var(--teal); cursor:pointer; text-decoration:none; transition: background .2s, transform .15s; }
  .btn-ghost:hover { background:rgba(18,184,165,.08); transform:translateY(-2px); }

  /* ── Workflow card ── */
  .card-workflow { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: transform .35s cubic-bezier(.22,.68,0,1.2), border-color .3s, box-shadow .35s; }
  .card-workflow:hover { transform: translateY(-7px); border-color: var(--border-hover); box-shadow: 0 28px 56px rgba(18,184,165,.10); }
  .wf-thumb { width: 100%; height: 210px; overflow: hidden; position: relative; background: #070f1c; cursor: zoom-in; }
  .wf-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: left top; transition: transform .55s cubic-bezier(.22,.68,0,1.2), filter .35s; display: block; filter: brightness(.85) saturate(1.1); }
  .card-workflow:hover .wf-thumb img { transform: scale(1.13); filter: brightness(1) saturate(1.25); }
  .wf-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(6,16,31,.8) 100%); opacity: 0; display: flex; align-items: flex-end; justify-content: flex-end; padding: 14px; transition: opacity .3s; pointer-events: none; }
  .card-workflow:hover .wf-thumb-overlay { opacity: 1; }
  .wf-thumb-overlay svg { color: var(--teal); filter: drop-shadow(0 0 6px rgba(18,184,165,.7)); }
  .wf-thumb::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 55px; background: linear-gradient(transparent, var(--bg-card)); pointer-events: none; }
  .wf-body { padding: 1.6rem 1.8rem 2rem; }

  .card-testimonial { background: var(--bg-card); border:1px solid var(--border); border-radius:20px; padding:2.5rem; }

  .container { max-width:1180px; margin:0 auto; padding:0 2rem; }
  .section { padding:7rem 0; }
  .section-label { display:block; color:var(--teal); font-size:.75rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; margin-bottom:.75rem; }
  .section-title { font-family:'Outfit',sans-serif; font-size:clamp(2rem,4vw,3rem); font-weight:800; line-height:1.12; letter-spacing:-.03em; color:var(--text); margin-bottom:1rem; }
  .section-sub { color:var(--text-muted); font-size:1.02rem; line-height:1.75; max-width:540px; }

  .tag { display:inline-block; background:rgba(255,255,255,.05); color:var(--text-muted); font-size:.75rem; padding:4px 12px; border-radius:6px; border:1px solid rgba(255,255,255,.07); }
  .badge { display:inline-block; background:rgba(18,184,165,.14); color:var(--teal); font-size:.72rem; font-weight:700; letter-spacing:.06em; padding:4px 14px; border-radius:100px; }

  /* ── Lightbox ── */
  .lightbox-backdrop { position: fixed; inset: 0; z-index: 9000; background: rgba(4,10,20,.93); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fadeUp .2s ease; }
  .lightbox-img { max-width: 90vw; max-height: 88vh; border-radius: 14px; box-shadow: 0 40px 100px rgba(0,0,0,.7); border: 1px solid var(--border-hover); }
  .lightbox-close { position: fixed; top: 1.5rem; right: 1.5rem; background: rgba(18,184,165,.15); border: 1px solid var(--border-hover); color: var(--text); border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s; }
  .lightbox-close:hover { background: rgba(18,184,165,.3); }
`;

const WORKFLOWS = [
  {
    category: "Chatbot · IA Multimodal",
    title: "Asistente Telegram con IA",
    desc: "Bot que entiende texto, audio e imágenes. Transcribe audios, analiza fotos con GPT-4 Vision y responde con memoria de conversación — incluso por voz.",
    tags: ["n8n", "Telegram", "OpenAI GPT-4", "Whisper", "TTS"],
    img: imgChatbot,
    alt: "Workflow chatbot multimodal Telegram",
  },
  {
    category: "Gastronomía · WhatsApp",
    title: "Sistema de Pedidos por WhatsApp",
    desc: "Gestión completa de pedidos vía WhatsApp con IA: muestra menú, toma el pedido, chequea stock, actualiza estado y confirma — sin intervención humana.",
    tags: ["n8n", "WhatsApp", "OpenAI", "Google Sheets", "Subflow"],
    img: imgComidas,
    alt: "Workflow sistema de pedidos por WhatsApp",
  },
  {
    category: "Contenido · Automatización",
    title: "Informe Diario Noticias + Clima",
    desc: "Scrapea portales de noticias, obtiene el pronóstico del tiempo y genera un informe personalizado con IA que se envía automáticamente cada mañana.",
    tags: ["n8n", "Scraping HTTP", "Gemini AI", "Telegram", "Schedule"],
    img: imgNoticias,
    alt: "Workflow informe noticias y clima",
  },
  {
    category: "Lead Generation · Maps",
    title: "Scraper de Clientes en Google Maps",
    desc: "Busca negocios locales por rubro y zona, extrae emails de sus sitios web, filtra duplicados y guarda todo limpio y listo en Google Sheets.",
    tags: ["n8n", "Google Maps API", "Web Scraping", "Google Sheets"],
    img: imgScraper,
    alt: "Workflow scraper Google Maps clientes locales",
  },
];

const TESTIMONIALS = [
  {
    text: "Automatizamos la recepción de pedidos de mi negocio, lo que antes tomaba dos horas de trabajo manual ahora se ejecuta solo en minutos, sin errores.",
    name: "Martina G.",
  },
  {
    text: "Mejoró las ventas y las métricas mensuales me ayudaron a elegir mejor mis productos, tenemos datos actualizados en tiempo real, es genial",
    name: "Alejandro P.",
  },
];

const NAV_ITEMS = [
  { label: "Servicios",   href: "#servicios" },
  { label: "Sobre mí",   href: "#about" },
  { label: "Testimonios", href: "#testimonios" },
];

function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4,16 Q10,4 16,16 Q22,28 28,16" stroke="#12b8a5" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M4,16 Q10,28 16,16 Q22,4 28,16" stroke="#e8dcc8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".55"/>
    </svg>
  );
}

function HeroRibbon() {
  return (
    <div className="float" style={{ width:"100%", maxWidth:560 }}>
      <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="r1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488"/><stop offset="50%" stopColor="#12b8a5"/><stop offset="100%" stopColor="#2dd4bf"/>
          </linearGradient>
          <linearGradient id="r2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8dcc8" stopOpacity=".35"/><stop offset="100%" stopColor="#e8dcc8" stopOpacity=".08"/>
          </linearGradient>
          <linearGradient id="r3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity=".7"/><stop offset="100%" stopColor="#12b8a5" stopOpacity=".3"/>
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M70 390 C140 280, 195 180, 340 130 C440 105, 510 128, 548 82 C530 170, 470 215, 365 258 C240 308, 165 370, 108 450 Z" fill="url(#r1)" opacity=".92" filter="url(#glow)"/>
        <path d="M70 390 C140 280, 195 180, 340 130 C440 105, 510 128, 548 82 C543 92, 536 108, 522 128 C475 208, 368 255, 242 305 C168 338, 120 392, 90 452 Z" fill="url(#r1)" opacity=".65"/>
        <path d="M108 412 C172 302, 218 202, 355 148 C450 122, 518 142, 554 96 C550 104, 544 118, 534 136 C488 218, 385 265, 258 314 C182 346, 134 402, 104 460 Z" fill="url(#r2)"/>
        <path d="M290 42 C395 72, 494 148, 512 252 C528 330, 500 390, 468 428 C450 365, 460 300, 438 222 C405 128, 332 70, 256 52 Z" fill="url(#r3)" opacity=".78"/>
        <path d="M290 42 C395 72, 494 148, 512 252 C520 288, 516 320, 506 350 C500 312, 505 278, 490 210 C458 118, 386 66, 272 50 Z" fill="url(#r2)"/>
        <path d="M380 132 C468 110, 522 132, 548 82" stroke="#2dd4bf" strokeWidth="1.5" fill="none" opacity=".6"/>
      </svg>
    </div>
  );
}

function FlowNode({ label, color }) {
  return (
    <div style={{ background:`${color}18`, border:`1px solid ${color}45`, borderRadius:10, padding:"10px 18px", color, fontSize:".82rem", fontWeight:700, textAlign:"center", minWidth:90 }}>
      {label}
    </div>
  );
}

function GridBg({ opacity = 0.03 }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ position:"absolute", inset:0, pointerEvents:"none", opacity }}>
      <defs><pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth=".8"/></pattern></defs>
      <rect width="400" height="400" fill="url(#grid)"/>
    </svg>
  );
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="cerrar"><X size={18}/></button>
      <img src={src} alt={alt} className="lightbox-img" onClick={e => e.stopPropagation()}/>
    </div>
  );
}

function WorkflowCard({ category, title, desc, tags, img, alt, onOpen }) {
  return (
    <div className="card-workflow">
      <div className="wf-thumb" onClick={() => onOpen(img, alt)} title="Clic para ampliar">
        <img src={img} alt={alt} loading="lazy"/>
        <div className="wf-thumb-overlay"><ZoomIn size={22}/></div>
      </div>
      <div className="wf-body">
        <span className="badge" style={{ marginBottom:"1rem", display:"inline-block" }}>{category}</span>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"1.18rem", fontWeight:800, color:"var(--text)", marginBottom:".65rem", letterSpacing:"-.02em", lineHeight:1.3 }}>{title}</h3>
        <p style={{ color:"var(--text-muted)", fontSize:".875rem", lineHeight:1.78, marginBottom:"1.25rem" }}>{desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:".45rem" }}>{tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "delva-global";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => { document.head.removeChild(style); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)}/>}

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:999, padding:"1.1rem 0", background:scrolled?"rgba(6,16,31,.92)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid var(--border)":"none", transition:"all .35s ease" }}>
        <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <Logo/>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"1.15rem", color:"var(--text)", letterSpacing:"-.02em" }}>
              IGNACIO<span style={{ color:"var(--teal)" }}>ROBERTSON</span>
            </span>
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:"2.5rem" }}>
            {NAV_ITEMS.map(({ label, href }) => <a key={label} href={href} className="nav-link">{label}</a>)}
            <a href="#contacto" className="btn-primary" style={{ padding:".6rem 1.3rem", fontSize:".83rem" }}>Contactar</a>
          </div>
          <button onClick={() => setMenuOpen(o => !o)} style={{ display:"none", background:"none", border:"none", color:"var(--text)", cursor:"pointer" }} aria-label="menu">
            {menuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background:"var(--bg-card)", borderTop:"1px solid var(--border)", padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            {NAV_ITEMS.map(({ label, href }) => <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a href="#contacto" className="btn-primary" style={{ alignSelf:"flex-start" }} onClick={() => setMenuOpen(false)}>Contactar</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:"6rem" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", right:"-5%", top:"10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(18,184,165,.12) 0%, transparent 70%)" }}/>
          <div style={{ position:"absolute", left:"20%", bottom:"5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,.06) 0%, transparent 70%)" }}/>
        </div>
        <div className="container" style={{ display:"flex", alignItems:"center", gap:"3rem", position:"relative", zIndex:10 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <span className="section-label fade-up">n8n Expert · Automatizaciones</span>
            <h1 className="fade-up-1" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(3rem,6.5vw,5.5rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-.04em", color:"var(--text)", marginBottom:"1.5rem" }}>
              Automatizaciones<br/><span style={{ color:"var(--teal)" }}>que fluyen</span>
            </h1>
            <p className="fade-up-2" style={{ color:"var(--text-muted)", fontSize:"1.08rem", lineHeight:1.75, maxWidth:500, marginBottom:"2.5rem" }}>
              Diseño e implemento flujos con n8n que conectan tus herramientas, eliminan tareas manuales y escalan tu negocio sin fricciones ni código innecesario.
            </p>
            <div className="fade-up-3" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3.5rem" }}>
              <a href="#servicios" className="btn-primary">Ver mis trabajos <ArrowRight size={16}/></a>
              <a href="#contacto" className="btn-ghost">Hablemos</a>
            </div>
            <div className="fade-up-4" style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
              {[["20+","Flujos creados"],["15+","Clientes"],["100%","Proyectos entregados"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"2.2rem", fontWeight:800, color:"var(--teal)", lineHeight:1 }}>{n}</div>
                  <div style={{ color:"var(--text-muted)", fontSize:".82rem", marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:"0 0 auto", width:"44%", display:"flex", justifyContent:"center" }}><HeroRibbon/></div>
        </div>
        <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:.4 }}>
          <span style={{ fontSize:".7rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--text-muted)" }}>scroll</span>
          <div style={{ width:1, height:32, background:"var(--teal)", opacity:.5 }}/>
        </div>
      </section>

      {/* SERVICES / WORKFLOWS */}
      <section id="servicios" className="section" style={{ background:"rgba(11,24,40,.6)" }}>
        <div className="container">
          <div style={{ marginBottom:"4rem" }}>
            <span className="section-label">Trabajos reales</span>
            <h2 className="section-title">Lo que puedo construir<br/>para vos</h2>
            <p className="section-sub">
              Flujos reales que desarrollé para resolver problemas concretos de negocio. Hacé clic en la imagen para ver el workflow completo.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(500px, 1fr))", gap:"1.5rem" }}>
            {WORKFLOWS.map(wf => (
              <WorkflowCard key={wf.title} {...wf} onOpen={(src,alt) => setLightbox({ src, alt })}/>
            ))}
          </div>
          <div style={{ marginTop:"3.5rem", textAlign:"center", color:"var(--text-muted)", fontSize:".88rem" }}>
            ¿Tenés un flujo en mente?{" "}
            <a href="#contacto" style={{ color:"var(--teal)", textDecoration:"none", fontWeight:600 }}>Contame y lo armamos juntos →</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
          <div>
            <span className="section-label">Sobre mí</span>
            <h2 className="section-title">¿Por qué n8n<br/>por qué yo?</h2>
            <p style={{ color:"var(--text-muted)", lineHeight:1.8, marginBottom:"1.25rem", fontSize:".97rem" }}>
              n8n es la herramienta de automatización más flexible del mercado: open source, auto-hosteable y con 400+ integraciones nativas. Permite flujos de cualquier complejidad sin los límites de Zapier o Make.
            </p>
            <p style={{ color:"var(--text-muted)", lineHeight:1.8, marginBottom:"2.25rem", fontSize:".97rem" }}>
              Soy especialista en n8n y me dedico exclusivamente a automatizaciones. Cada proyecto incluye documentación, soporte post-entrega y código limpio que vos o tu equipo pueden mantener.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".9rem" }}>
              {["Flujos escalables y bien documentados","Lógica adaptada a tu negocio, no al revés","Soporte y ajustes post-implementación","Auto-hosting o cloud, vos elegís"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <CheckCircle size={17} color="var(--teal)" style={{ flexShrink:0 }}/>
                  <span style={{ color:"var(--text)", fontSize:".92rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:24, padding:"2.5rem", position:"relative", overflow:"hidden" }}>
            <GridBg opacity={0.025}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:"2rem" }}>
                <FlowNode label="Trigger" color="#fb923c"/>
                <div style={{ color:"var(--text-muted)", fontSize:"1.2rem" }}>→</div>
                <FlowNode label="Proceso" color="var(--teal)"/>
                <div style={{ color:"var(--text-muted)", fontSize:"1.2rem" }}>→</div>
                <FlowNode label="Output"  color="#a78bfa"/>
              </div>
              <div style={{ textAlign:"center", padding:"1.5rem", background:"rgba(18,184,165,.05)", borderRadius:14, border:"1px solid rgba(18,184,165,.12)", marginBottom:"1.75rem" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"3.5rem", fontWeight:900, color:"var(--teal)", lineHeight:1 }}>n8n</div>
                <div style={{ color:"var(--text-muted)", fontSize:".8rem", marginTop:6 }}>400+ integraciones · Open source · Self-hosted</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:".6rem" }}>
                {["Whatsapp","Gmail","OpenAI","Gemini","Telegram","PostgreSQL","Google Drive","Google Sheets","Y MÁS.."].map(app => (
                  <div key={app} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:8, padding:".55rem .5rem", color:"var(--text-muted)", fontSize:".75rem", textAlign:"center" }}>{app}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonios" className="section" style={{ background:"rgba(11,24,40,.6)" }}>
        <div className="container">
          <div style={{ marginBottom:"4rem" }}>
            <span className="section-label">Testimonios</span>
            <h2 className="section-title">Lo que dicen mis clientes</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(420px,1fr))", gap:"1.5rem" }}>
            {TESTIMONIALS.map(({ text, name, role, initial }) => (
              <div key={name} className="card-testimonial">
                <div style={{ color:"var(--teal)", fontSize:"3.5rem", lineHeight:.9, marginBottom:"1rem", fontFamily:"Georgia,serif", opacity:.8 }}>"</div>
                <p style={{ color:"#c0ccd8", fontSize:".97rem", lineHeight:1.8, fontStyle:"italic", marginBottom:"1.75rem" }}>{text}</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,var(--teal),#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", color:"#06101f", fontWeight:800, fontSize:"1rem" }}>{initial}</div>
                  <div>
                    <div style={{ color:"var(--text)", fontWeight:700, fontSize:".9rem" }}>{name}</div>
                    <div style={{ color:"var(--text-muted)", fontSize:".78rem" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="section" style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:600, height:400, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(18,184,165,.08) 0%, transparent 70%)" }}/>
        </div>
        <div className="container" style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <span className="section-label">Contacto</span>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:900, letterSpacing:"-.03em", color:"var(--text)", marginBottom:"1rem" }}>
            ¿Listo para automatizar?
          </h2>
          {/* <p style={{ color:"var(--text-muted)", fontSize:"1.05rem", maxWidth:460, margin:"0 auto 2.75rem", lineHeight:1.75 }}>
            Contame tu proyecto. En menos de 24 horas te respondo con una propuesta concreta.
          </p> */}
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <a href="mailto:juanignaciorobertson@gmail.com" className="btn-primary" style={{ fontSize:"1rem", padding:"1rem 2rem" }}>
              <Mail size={18}/> Enviar email
            </a>
            <a href="https://wa.me/542613028513" target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize:"1rem", padding:"1rem 2rem" }}>
              <MessageCircle size={18}/> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#040c18", borderTop:"1px solid var(--border)", padding:"2.75rem 0" }}>
        <div className="container" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1.5rem" }}>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <Logo size={26}/>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, color:"var(--text)", fontSize:"1rem" }}>
              IGNACIO<span style={{ color:"var(--teal)" }}>ROBERTSON</span>
            </span>
          </a>
          <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
            {[["Servicios","#servicios"],["Sobre mí","#about"],["Testimonios","#testimonios"],["Contacto","#contacto"]].map(([l,h]) => (
              <a key={l} href={h} style={{ color:"var(--text-muted)", textDecoration:"none", fontSize:".83rem", transition:"color .2s" }}
                onMouseEnter={e => (e.target.style.color="var(--text)")}
                onMouseLeave={e => (e.target.style.color="var(--text-muted)")}>{l}</a>
            ))}
          </div>
          <div style={{ color:"#3a4d62", fontSize:".78rem" }}>© {new Date().getFullYear()} IgnacioRobertson · n8n Expert</div>
        </div>
      </footer>

    </div>
  );
}
