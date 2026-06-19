// Wayfare mobile app — screens + tab bar. Inside <IOSDevice>.
const A = window.WF_APP;
const DS = window.WayfareDesignSystem_5f474a;

function AIcon({ name, size = 24, color = "currentColor", sw = 1.7, fill = false }) {
  const p = {
    compass: <><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.9 6.3-6.3 2.9 2.9-6.3 6.3-2.9z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    bag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    heart: <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 5a5 5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></>,
    star: <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/>,
    chevL: <path d="m15 18-6-6 6-6"/>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : "none"} stroke={fill ? "none" : color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none" }}>{p[name]}</svg>;
}

// ——— Explore (home) ———
function Explore({ onOpen }) {
  const [feeling, setFeeling] = React.useState("Contentment");
  return (
    <div style={{ background: "var(--wf-cream)", minHeight: "100%", paddingBottom: 96 }}>
      <div style={{ padding: "60px 22px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-500)" }}>Good morning, Jane</div>
        <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 34, letterSpacing: "-0.02em", margin: "8px 0 0", color: "var(--wf-ink-900)" }}>Where to next?</h1>
      </div>

      {/* feeling chips */}
      <div style={{ display: "flex", gap: 9, overflowX: "auto", padding: "0 22px 22px", scrollbarWidth: "none" }}>
        {A.feelings.map((f) => (
          <button key={f} onClick={() => setFeeling(f)} style={{ flex: "none", padding: "9px 16px", borderRadius: 999, border: `1px solid ${feeling === f ? "var(--wf-ink-900)" : "var(--wf-border-strong)"}`, background: feeling === f ? "var(--wf-ink-900)" : "transparent", color: feeling === f ? "#fff" : "var(--wf-ink-700)", fontFamily: "var(--wf-font-sans)", fontSize: 13.5, fontWeight: 500 }}>{f}</button>
        ))}
      </div>

      {/* your trips */}
      <div style={{ padding: "0 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 21, margin: 0, color: "var(--wf-ink-900)" }}>Your journeys</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {A.trips.map((t, i) => (
            <div key={i} onClick={() => onOpen(t)} style={{ position: "relative", height: 150, borderRadius: "var(--wf-radius-md)", overflow: "hidden", boxShadow: "var(--wf-shadow-sm)" }}>
              <div style={{ position: "absolute", inset: 0, background: t.grad }} />
              <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
              <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 9px", borderRadius: "var(--wf-radius-sm)", background: t.status === "Confirmed" ? "var(--wf-success)" : "rgba(255,255,255,0.92)", color: t.status === "Confirmed" ? "#fff" : "var(--wf-ink-900)" }}>{t.status}</span>
              <div style={{ position: "absolute", left: 16, bottom: 14, color: "#fff" }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-400)" }}>{t.region}</div>
                <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 24, marginTop: 2 }}>{t.title}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>{t.dates}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* explore grid */}
      <div style={{ padding: "26px 22px 0" }}>
        <h2 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 21, margin: "0 0 14px", color: "var(--wf-ink-900)" }}>Inspired by <span style={{ fontStyle: "italic" }}>{feeling.toLowerCase()}</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {A.explore.map((d, i) => (
            <div key={i} onClick={() => onOpen({ ...d, dates: "Tailor-made" })} style={{ position: "relative", height: 200, borderRadius: "var(--wf-radius-md)", overflow: "hidden", boxShadow: "var(--wf-shadow-xs)" }}>
              <div style={{ position: "absolute", inset: 0, background: d.grad }} />
              <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "#fff" }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-coral-400)" }}>{d.region}</div>
                <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 18, marginTop: 2 }}>{d.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5, fontSize: 11.5 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><AIcon name="star" size={11} color="var(--wf-coral-400)" fill />{d.rating}</span>
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>from {d.price}/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ——— Search / Feelings ———
function SearchScreen({ onOpen }) {
  const [feeling, setFeeling] = React.useState(null);
  return (
    <div style={{ background: "var(--wf-ink-900)", minHeight: "100%", color: "#fff", padding: "60px 22px 110px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)" }}>The Feelings Engine</div>
      <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 32, letterSpacing: "-0.02em", margin: "10px 0 24px" }}>How do you want to feel?</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {A.feelings.map((f) => (
          <button key={f} onClick={() => setFeeling(f)} style={{ padding: "11px 18px", borderRadius: 999, cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontSize: 14.5, fontWeight: 500, background: feeling === f ? "var(--wf-coral-500)" : "transparent", color: "#fff", border: `1px solid ${feeling === f ? "var(--wf-coral-500)" : "rgba(255,255,255,0.3)"}` }}>{f}</button>
        ))}
      </div>
      {feeling && (
        <>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,231,0.55)", margin: "34px 0 14px" }}>{feeling} · suggested</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {A.explore.slice(0, 3).map((d, i) => (
              <div key={i} onClick={() => onOpen({ ...d, dates: "Tailor-made" })} style={{ position: "relative", height: 130, borderRadius: "var(--wf-radius-md)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: d.grad }} />
                <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
                <div style={{ position: "absolute", left: 16, bottom: 14, color: "#fff" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wf-coral-400)" }}>{d.region}</div>
                  <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 21 }}>{d.title}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ——— Trips list ———
function TripsScreen({ onOpen }) {
  return (
    <div style={{ background: "var(--wf-cream)", minHeight: "100%", padding: "60px 22px 110px" }}>
      <h1 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 32, letterSpacing: "-0.02em", margin: "0 0 20px", color: "var(--wf-ink-900)" }}>Your trips</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {A.trips.map((t, i) => (
          <div key={i} onClick={() => onOpen(t)} style={{ background: "var(--wf-paper)", borderRadius: "var(--wf-radius-md)", overflow: "hidden", border: "1px solid var(--wf-border)", boxShadow: "var(--wf-shadow-xs)" }}>
            <div style={{ position: "relative", height: 130, background: t.grad }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
              <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 9px", borderRadius: "var(--wf-radius-sm)", background: t.status === "Confirmed" ? "var(--wf-success)" : "rgba(255,255,255,0.92)", color: t.status === "Confirmed" ? "#fff" : "var(--wf-ink-900)" }}>{t.status}</span>
            </div>
            <div style={{ padding: "16px 18px 18px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-500)" }}>{t.region}</div>
              <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 23, color: "var(--wf-ink-900)", marginTop: 3 }}>{t.title}</div>
              <div style={{ fontSize: 13.5, color: "var(--wf-ink-500)", marginTop: 4 }}>{t.dates} · 7 nights</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ——— Destination detail overlay ———
function Detail({ trip, onClose }) {
  if (!trip) return null;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 80, background: "var(--wf-cream)", overflow: "auto" }}>
      <div style={{ position: "relative", height: 340, background: trip.grad }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-bottom)" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 54, left: 18, width: 40, height: 40, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center", cursor: "pointer" }}><AIcon name="chevL" size={20} color="var(--wf-ink-900)" /></button>
        <div style={{ position: "absolute", left: 22, bottom: 22, color: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wf-coral-400)" }}>{trip.region}</div>
          <div style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 38, marginTop: 4 }}>{trip.title}</div>
        </div>
      </div>
      <div style={{ padding: "24px 22px 120px" }}>
        <div style={{ display: "flex", gap: 22, paddingBottom: 22, borderBottom: "1px solid var(--wf-border)", fontSize: 13.5, color: "var(--wf-ink-700)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><AIcon name="star" size={15} color="var(--wf-coral-500)" fill /> {trip.rating || "4.9"}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><AIcon name="pin" size={15} color="var(--wf-ink-500)" /> {trip.dates}</span>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--wf-ink-700)", margin: "22px 0 0" }}>A fully tailor-made journey, paced entirely around you. Stay in handpicked retreats, travel with expert private guides, and discover the corners most travellers never reach.</p>
        <h3 style={{ fontFamily: "var(--wf-font-display)", fontWeight: 500, fontSize: 22, margin: "30px 0 14px", color: "var(--wf-ink-900)" }}>Trip highlights</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {["Private overwater villa with a personal host", "A day at sea with a marine biologist", "Sunset dinner on a sandbank, just the two of you"].map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flex: "none", marginTop: 2, color: "var(--wf-coral-500)" }}><AIcon name="compass" size={20} color="var(--wf-coral-500)" /></span>
              <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--wf-ink-700)" }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
      {/* sticky CTA */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 22px 30px", background: "linear-gradient(to top, var(--wf-cream) 70%, transparent)", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: "var(--wf-ink-500)" }}>from</div><div style={{ fontFamily: "var(--wf-font-display)", fontSize: 24, fontWeight: 500, color: "var(--wf-ink-900)" }}>{trip.price || "$1,240"}<span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, color: "var(--wf-ink-500)" }}> / night</span></div></div>
        <DS.Button variant="primary" size="lg">Enquire now</DS.Button>
      </div>
    </div>
  );
}

// ——— Tab bar ———
function TabBar({ tab, setTab }) {
  const tabs = [["explore", "compass", "Explore"], ["search", "search", "Feel"], ["trips", "bag", "Trips"], ["saved", "heart", "Saved"], ["account", "user", "You"]];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 70, paddingBottom: 26, background: "linear-gradient(to top, var(--wf-cream) 62%, transparent)" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 12px 6px", margin: "0 14px", borderTop: "1px solid var(--wf-border)" }}>
        {tabs.map(([k, icon, label]) => (
          <button key={k} onClick={() => setTab(k)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: tab === k ? "var(--wf-coral-600)" : "var(--wf-ink-400)" }}>
            <AIcon name={icon} size={23} color={tab === k ? "var(--wf-coral-600)" : "var(--wf-ink-400)"} fill={tab === k && (k === "saved")} sw={1.7} />
            <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.02em" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function WayfareApp() {
  const [tab, setTab] = React.useState("explore");
  const [detail, setDetail] = React.useState(null);
  const screens = {
    explore: <Explore onOpen={setDetail} />,
    search: <SearchScreen onOpen={setDetail} />,
    trips: <TripsScreen onOpen={setDetail} />,
    saved: <TripsScreen onOpen={setDetail} />,
    account: <Explore onOpen={setDetail} />,
  };
  const dark = tab === "search";
  return (
    <IOSDevice dark={dark}>
      <div style={{ position: "relative", height: "100%" }}>
        {screens[tab]}
        <TabBar tab={tab} setTab={setTab} />
        <Detail trip={detail} onClose={() => setDetail(null)} />
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { WayfareApp });
