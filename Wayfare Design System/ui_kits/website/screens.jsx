// Wayfare website — screens. Composes DS primitives + local chrome.
const WFS = window.WayfareDesignSystem_5f474a;
const D = window.WF_DATA;

// ————————————————————————————————————————————————
//  HERO
// ————————————————————————————————————————————————
function Hero({ onSearch }) {
  return (
    <section style={{ position: "relative", height: "calc(100vh - 0px)", minHeight: 640, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#43525e,#1a2730 70%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(22,19,15,0.78) 0%, rgba(22,19,15,0.25) 45%, rgba(22,19,15,0.35) 100%)" }} />
      <span style={{ position: "absolute", top: 100, left: 34, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Your hero film / photo</span>
      <div style={{ position: "relative", width: "100%", maxWidth: "var(--wf-container-wide)", margin: "0 auto", padding: "0 32px 64px", color: "#fff" }}>
        <div style={{ maxWidth: 760 }}>
          <WFS.Eyebrow tone="light">Tailor-made · Est. 2005</WFS.Eyebrow>
          <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 78, lineHeight: 1.02, letterSpacing: "-0.02em", margin: "20px 0 0" }}>Every journey starts<br />with a <span style={{ fontStyle: "italic" }}>feeling</span>.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.85)", margin: "22px 0 0", maxWidth: 520 }}>Fully personalised itineraries for couples, families and solo travellers — designed around how you want to feel, not where the crowds go.</p>
        </div>
        <div style={{ marginTop: 38, maxWidth: 920 }}>
          <WFS.SearchBar
            fields={[{ label: "Where", value: "Anywhere" }, { label: "When", value: "Any month" }, { label: "Feeling", value: "Choose a feeling" }]}
            ctaLabel="Find my trip" onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
//  FEELING INTRO
// ————————————————————————————————————————————————
function FeelingIntro() {
  return (
    <section style={{ background: "var(--wf-cream)", padding: "104px 32px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <WFS.Eyebrow>The Pursuit of Feeling</WFS.Eyebrow>
        <p style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 34, lineHeight: 1.28, letterSpacing: "-0.01em", color: "var(--wf-ink-900)", margin: "22px 0 0" }}>
          The world is vast and full of wonder — yet the more choice there is, the more overwhelmed we feel. So we ask a different question first: not <em>where</em> do you want to go, but <em>how</em> do you want to feel?
        </p>
        <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
          <WFS.Button variant="outline" size="md">Read our story</WFS.Button>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
//  POPULAR DESTINATIONS
// ————————————————————————————————————————————————
function PopularDestinations({ onOpen }) {
  return (
    <section style={{ background: "var(--wf-cream)", padding: "0 32px 104px" }}>
      <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <SectionHead eyebrow="Most popular" title="Where our travellers are going" />
          <WFS.Button variant="link" onClick={() => onOpen("destinations")}>View all destinations</WFS.Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {D.destinations.slice(0, 6).map((d, i) => (
            <DestPlaceholder key={i} d={d} onClick={() => onOpen("destinations")} />
          ))}
        </div>
      </div>
    </section>
  );
}

// A DestinationCard wrapper that paints the tonal placeholder gradient
function DestPlaceholder({ d, onClick, height = 420 }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", height, borderRadius: "var(--wf-radius-md)", overflow: "hidden", cursor: "pointer", boxShadow: hover ? "var(--wf-shadow-hover)" : "var(--wf-shadow-sm)", transition: "box-shadow .3s" }}>
      <div style={{ position: "absolute", inset: 0, background: d.grad, transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform .6s cubic-bezier(.22,1,.36,1)" }} />
      <span style={{ position: "absolute", top: 14, left: 16, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Your photo</span>
      <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
      <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(255,255,255,0.92)", color: "var(--wf-ink-900)", padding: "5px 10px", borderRadius: "var(--wf-radius-sm)", alignSelf: "flex-start" }}>{d.badge}</span>
        <span style={{ width: 34, height: 34, borderRadius: 999, background: "rgba(22,19,15,0.32)", backdropFilter: "blur(6px)", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.35)" }}>
          <Icon name="star" size={14} color="#fff" />
        </span>
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, zIndex: 2, color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-400)", marginBottom: 6 }}>{d.region}</div>
        <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 27, lineHeight: 1.08 }}>{d.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, fontSize: 13 }}>
          <span><span style={{ color: "rgba(255,255,255,0.75)" }}>from </span><b>{d.price}</b></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="star" size={13} color="var(--wf-coral-400)" />{d.rating}</span>
        </div>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————
//  EXPERIENCES (dark editorial band)
// ————————————————————————————————————————————————
function Experiences() {
  return (
    <section style={{ background: "var(--wf-ink-900)", padding: "104px 32px" }}>
      <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto" }}>
        <SectionHead eyebrow="Remarkable experiences" title="Journeys you won't find anywhere else" tone="light" intro="Each one designed to move you — crafted with experts, guides and storytellers on the ground." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 44 }}>
          {D.experiences.map((e, i) => (
            <div key={i} style={{ borderRadius: "var(--wf-radius-md)", overflow: "hidden", background: "var(--wf-ink-800)" }}>
              <div style={{ position: "relative", height: 260, background: e.grad }}>
                <span style={{ position: "absolute", top: 12, left: 14, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Your photo</span>
                <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-full)" }} />
              </div>
              <div style={{ padding: "26px 26px 30px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-400)", marginBottom: 12 }}>{e.eyebrow}</div>
                <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 26, color: "#fff", lineHeight: 1.1 }}>{e.title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(244,239,231,0.7)", margin: "12px 0 20px" }}>{e.body}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 4, cursor: "pointer" }}>
                  Discover <Icon name="arrow" size={15} color="#fff" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
//  TESTIMONIALS
// ————————————————————————————————————————————————
function Testimonials() {
  const [i, setI] = React.useState(0);
  const t = D.testimonials[i];
  return (
    <section style={{ background: "var(--wf-sand)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <WFS.Eyebrow>Why travellers choose us</WFS.Eyebrow>
        <blockquote style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 38, lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--wf-ink-900)", margin: "24px 0 0" }}>
          “{t.quote}”
        </blockquote>
        <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", color: "var(--wf-ink-700)" }}>{t.who} · <span style={{ color: "var(--wf-coral-600)" }}>{t.where}</span></div>
        <div style={{ display: "flex", justifyContent: "center", gap: 9, marginTop: 30 }}>
          {D.testimonials.map((_, n) => (
            <button key={n} onClick={() => setI(n)} style={{ width: n === i ? 28 : 9, height: 9, borderRadius: 999, border: "none", cursor: "pointer", background: n === i ? "var(--wf-ink-900)" : "var(--wf-ink-300)", transition: "all .3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
//  PRESS + WHY
// ————————————————————————————————————————————————
function PressWhy() {
  const why = [
    { icon: "award", label: "Award-winning planners" },
    { icon: "globe", label: "100+ destinations" },
    { icon: "phone", label: "24/7 on-the-ground support" },
    { icon: "pin", label: "Expert private guides" },
  ];
  return (
    <section style={{ background: "var(--wf-cream)", padding: "80px 32px 104px" }}>
      <div style={{ maxWidth: "var(--wf-container)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "28px 56px", alignItems: "center", paddingBottom: 64, borderBottom: "1px solid var(--wf-border)" }}>
          {D.press.map((p) => (
            <span key={p} style={{ fontFamily: "var(--wf-font-display)", fontSize: 21, letterSpacing: "0.04em", color: "var(--wf-ink-400)" }}>{p}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, marginTop: 56 }}>
          {why.map((w) => (
            <div key={w.label} style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, border: "1px solid var(--wf-border-strong)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
                <Icon name={w.icon} size={24} color="var(--wf-coral-600)" strokeWidth={1.4} />
              </div>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--wf-ink-900)" }}>{w.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
//  DESTINATIONS SCREEN
// ————————————————————————————————————————————————
function DestinationsScreen({ onOpen }) {
  const filters = ["All", "Beach", "Adventure", "Safari", "Cultural", "Honeymoon", "Family"];
  const [sel, setSel] = React.useState("All");
  const list = [...D.destinations, ...D.destinations];
  return (
    <div>
      <section style={{ background: "var(--wf-ink-900)", color: "#fff", padding: "120px 32px 56px" }}>
        <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto" }}>
          <WFS.Eyebrow tone="light">Destinations</WFS.Eyebrow>
          <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 56, letterSpacing: "-0.02em", margin: "16px 0 0" }}>Find your next horizon</h1>
          <p style={{ fontSize: 17, color: "rgba(244,239,231,0.75)", maxWidth: 540, margin: "16px 0 0", lineHeight: 1.6 }}>Over 100 destinations, each one planned from scratch around you.</p>
        </div>
      </section>
      <section style={{ background: "var(--wf-cream)", padding: "32px 32px 96px" }}>
        <div style={{ maxWidth: "var(--wf-container-wide)", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", padding: "12px 0 32px", position: "sticky", top: "var(--wf-header-h)", background: "var(--wf-cream)", zIndex: 10 }}>
            {filters.map((f) => <WFS.Tag key={f} selected={sel === f} onClick={() => setSel(f)}>{f}</WFS.Tag>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {list.map((d, i) => <DestPlaceholder key={i} d={d} height={380} onClick={() => {}} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

// ————————————————————————————————————————————————
//  TRIP FINDER (feelings engine)
// ————————————————————————————————————————————————
function TripFinder() {
  const [feeling, setFeeling] = React.useState(null);
  const [month, setMonth] = React.useState(null);
  const ready = feeling && month;
  return (
    <div style={{ background: "var(--wf-ink-900)", minHeight: "100vh", color: "#fff", padding: "128px 32px 96px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <WFS.Eyebrow tone="light">The Feelings Engine</WFS.Eyebrow>
          <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 58, letterSpacing: "-0.02em", margin: "18px 0 0" }}>How do you want to feel?</h1>
        </div>
        <div style={{ marginTop: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)", marginBottom: 16 }}>01 — The feeling</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {D.feelings.map((f) => (
              <button key={f} onClick={() => setFeeling(f)} style={{ padding: "12px 22px", borderRadius: 999, cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontSize: 15, fontWeight: 500, background: feeling === f ? "var(--wf-coral-500)" : "transparent", color: "#fff", border: `1px solid ${feeling === f ? "var(--wf-coral-500)" : "rgba(255,255,255,0.3)"}`, transition: "all .2s" }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)", marginBottom: 16 }}>02 — When</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {D.months.map((m) => (
              <button key={m} onClick={() => setMonth(m)} style={{ width: 72, padding: "12px 0", borderRadius: "var(--wf-radius-md)", cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontSize: 14, fontWeight: 500, background: month === m ? "#fff" : "transparent", color: month === m ? "var(--wf-ink-900)" : "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.25)", transition: "all .2s" }}>{m}</button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <WFS.Button variant="primary" size="lg" disabled={!ready}>{ready ? `Show me ${feeling} in ${month}` : "Choose a feeling & month"}</WFS.Button>
          {ready && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, width: "100%", marginTop: 12 }}>
              {D.destinations.slice(0, 3).map((d, i) => <DestPlaceholder key={i} d={d} height={300} onClick={() => {}} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————
//  ENQUIRY MODAL
// ————————————————————————————————————————————————
function EnquiryModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(22,19,15,0.55)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--wf-cream-2)", borderRadius: "var(--wf-radius-lg)", maxWidth: 560, width: "100%", padding: "40px 44px", boxShadow: "var(--wf-shadow-lg)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer" }}><Icon name="x" size={22} color="var(--wf-ink-500)" /></button>
        <WFS.Eyebrow>Start your journey</WFS.Eyebrow>
        <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 34, letterSpacing: "-0.02em", margin: "14px 0 6px", color: "var(--wf-ink-900)" }}>Let's plan something remarkable</h2>
        <p style={{ fontSize: 15, color: "var(--wf-ink-500)", margin: "0 0 26px", lineHeight: 1.6 }}>Tell us a little about your trip. No planning fees, no obligation — one of our experts will be in touch within 24 hours.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <WFS.Input label="First name" placeholder="Jane" />
          <WFS.Input label="Last name" placeholder="Appleseed" />
          <WFS.Input label="Email" type="email" placeholder="you@email.com" />
          <WFS.Input label="Destination" placeholder="Where to?" />
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          <WFS.Button variant="primary" size="lg" fullWidth>Send enquiry</WFS.Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, FeelingIntro, PopularDestinations, Experiences, Testimonials, PressWhy, DestinationsScreen, TripFinder, EnquiryModal });
