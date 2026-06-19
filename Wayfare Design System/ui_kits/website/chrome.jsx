// Wayfare website — shared chrome: Icon, Header, Hero, Footer, SectionHead.
// Composes design-system primitives off window.WayfareDesignSystem_5f474a.

const WF = window.WayfareDesignSystem_5f474a;

// ——— Minimal thin-stroke icon set (editorial line glyphs) ———
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.6 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>,
    menu: <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>,
    x: <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>,
    star: <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={name === "star" ? color : "none"} stroke={name === "star" ? "none" : color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none" }}>
      {paths[name]}
    </svg>
  );
}

function Header({ onNav, current, onEnquire }) {
  const [scrolled, setScrolled] = React.useState(false);
  const links = ["Destinations", "Experiences", "Inspiration", "About"];
  const dark = current === "home" && !scrolled;
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: dark ? "transparent" : "var(--wf-cream)",
        borderBottom: dark ? "1px solid transparent" : "1px solid var(--wf-border)",
        transition: "background .3s, border-color .3s",
      }}
      ref={(el) => {
        if (!el) return;
        const scroller = el.closest("[data-scroll]");
        if (scroller && !scroller.__bound) {
          scroller.__bound = true;
          scroller.addEventListener("scroll", () => setScrolled(scroller.scrollTop > 60));
        }
      }}
    >
      <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto", height: "var(--wf-header-h)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => onNav("home")}>
          <img src="../../assets/wayfare-mark.svg" style={{ width: 32, height: 32, filter: dark ? "brightness(0) invert(1)" : "none" }} alt="" />
          <span style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 25, color: dark ? "#fff" : "var(--wf-ink-900)" }}>Wayfare</span>
        </div>
        <nav style={{ display: "flex", gap: 34 }}>
          {links.map((l) => {
            const key = l.toLowerCase();
            const active = current === key || (key === "destinations" && current === "destinations");
            return (
              <button key={l} onClick={() => onNav(key === "destinations" ? "destinations" : key === "inspiration" ? "tripfinder" : key)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontSize: 14, fontWeight: 500, letterSpacing: "0.01em", color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)", paddingBottom: 2, borderBottom: active ? `1.5px solid ${dark ? "#fff" : "var(--wf-coral-500)"}` : "1.5px solid transparent" }}>
                {l}
              </button>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 500, color: dark ? "rgba(255,255,255,0.9)" : "var(--wf-ink-700)" }}>
            <Icon name="phone" size={15} color={dark ? "#fff" : "var(--wf-ink-700)"} />+44 207 426 9888
          </span>
          <WF.Button variant={dark ? "primary" : "dark"} size="sm" onClick={onEnquire}>Enquire now</WF.Button>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, title, intro, align = "left", tone = "ink" }) {
  return (
    <div style={{ maxWidth: align === "center" ? 720 : "none", margin: align === "center" ? "0 auto" : 0, textAlign: align }}>
      <WF.Eyebrow tone={tone === "light" ? "light" : "coral"}>{eyebrow}</WF.Eyebrow>
      <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 40, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "14px 0 0", color: tone === "light" ? "var(--wf-text-on-dark)" : "var(--wf-ink-900)" }}>{title}</h2>
      {intro && <p style={{ fontSize: 17, lineHeight: 1.6, color: tone === "light" ? "rgba(244,239,231,0.8)" : "var(--wf-ink-500)", margin: "16px 0 0", maxWidth: 620, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{intro}</p>}
    </div>
  );
}

function Footer({ onEnquire }) {
  const cols = {
    "Who we are": ["Our purpose", "Our team", "Awards", "Press"],
    "Experiences": ["Family", "Couples", "Honeymoons", "Safari", "Slow travel"],
    "Useful": ["How it works", "FAQ", "Booking conditions", "Careers"],
  };
  return (
    <footer style={{ background: "var(--wf-ink-900)", color: "var(--wf-text-on-dark)", padding: "72px 32px 36px" }}>
      <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <img src="../../assets/wayfare-mark-reversed.svg" style={{ width: 34 }} alt="" />
              <span style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 27 }}>Wayfare</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(244,239,231,0.7)", maxWidth: 320, margin: "18px 0 22px" }}>Tailor-made luxury travel, designed entirely around how you want to feel. No templates. No planning fees.</p>
            <WF.Button variant="primary" size="md" onClick={onEnquire}>Start your journey</WF.Button>
          </div>
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)", marginBottom: 16 }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {items.map((i) => <li key={i} style={{ fontSize: 14.5, color: "rgba(244,239,231,0.85)", cursor: "pointer" }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, fontSize: 13, color: "rgba(244,239,231,0.5)" }}>
          <span>© 2026 Wayfare. A demonstration brand.</span>
          <span style={{ display: "flex", gap: 22 }}><span>Privacy</span><span>Terms</span><span>Sitemap</span></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Header, SectionHead, Footer });
