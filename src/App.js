import React, { useState, useEffect, useCallback } from "react";
const birthdayImg = "/download.jpg";
// ── Confetti particle ──────────────────────────────────────────────────────
const COLORS = ["#FF6B6B","#FFD93D","#6BCB77","#4D96FF","#F72585","#7209B7","#FB8500","#00F5D4"];

function Particle({ i }) {
  const color  = COLORS[i % COLORS.length];
  const left   = `${(i * 37 + 13) % 100}%`;
  const delay  = `${(i * 0.13) % 3}s`;
  const dur    = `${2.2 + (i * 0.07) % 2}s`; 
  const size   = 8 + (i % 10);
  const shapes = ["50%","0%","50% 0% 0% 50%"];
  const radius = shapes[i % 3];
  return (
    <div style={{
      position:"absolute", width:size, height:size,
      background:color, left, top:"-5%",
      borderRadius:radius,
      animation:`confettiFall ${dur} linear ${delay} infinite`,
      pointerEvents:"none"
    }}/>
  );
}

// ── Slide wrapper ──────────────────────────────────────────────────────────
function Slide({ children, visible }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", textAlign:"center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
      transition:"opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
      padding:"0 20px", maxWidth:560, width:"100%"
    }}>
      {children}
    </div>
  );
}

// ── Main button ────────────────────────────────────────────────────────────
function Btn({ children, onClick, accent = false }) {
  const [hov, setHov] = useState(false);
  const [tap, setTap] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={() => setTap(true)}
      onMouseUp={() => setTap(false)}
      onTouchStart={() => setTap(true)}
      onTouchEnd={() => { setTap(false); onClick(); }}
      style={{
        marginTop:28,
        padding:"18px 48px",
        fontSize:"1.05rem",
        fontWeight:700,
        fontFamily:"'Playfair Display', Georgia, serif",
        letterSpacing:"1.5px",
        textTransform:"uppercase",
        background: accent
          ? "linear-gradient(135deg,#F72585,#7209B7)"
          : "linear-gradient(135deg,#FF6B6B,#FFD93D)",
        color:"#fff",
        border:"none",
        borderRadius:60,
        cursor:"pointer",
        boxShadow: hov
          ? "0 12px 40px rgba(247,37,133,0.55)"
          : "0 6px 24px rgba(0,0,0,0.35)",
        transform: tap ? "scale(0.95)" : hov ? "scale(1.06)" : "scale(1)",
        transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        touchAction:"manipulation"
      }}
    >
      {children}
    </button>
  );
}

// ── Photo card ─────────────────────────────────────────────────────────────
function Photo({ caption }) {
  return (
    <div style={{
      position:"relative", marginBottom:24, display:"inline-block"
    }}>
      {/* polaroid frame */}
      <div style={{
        background:"#fff", padding:"12px 12px 48px",
        borderRadius:4,
        boxShadow:"0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
        transform:"rotate(-2deg)",
        transition:"transform 0.4s ease",
      }}
        onMouseEnter={e=>e.currentTarget.style.transform="rotate(1deg) scale(1.04)"}
        onMouseLeave={e=>e.currentTarget.style.transform="rotate(-2deg)"}
      >
        <img
          src={birthdayImg}
          alt="Memory"
          style={{
            width:"clamp(200px,55vw,310px)",
            height:"clamp(200px,55vw,310px)",
            objectFit:"cover",
            display:"block",
            borderRadius:2
          }}
          onError={e=>{
            // Graceful fallback if image not found
            e.target.style.background="linear-gradient(135deg,#F72585,#7209B7)";
            e.target.src="";
          }}
        />
        <p style={{
          fontFamily:"'Caveat', cursive, Georgia, serif",
          fontSize:"1.1rem",
          color:"#333",
          marginTop:10,
          textAlign:"center"
        }}>{caption}</p>
      </div>
    </div>
  );
}

// ── Slides data ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id:0,
    content: (next) => (
      <Slide visible>
        <p style={tag}>🚨 INTRUDER ALERT 🚨</p>
        <h1 style={hdr}>Someone wants to wish <em>Happy Birthday</em> to our</h1>
        <div style={crown}>OFFICE QUEEN 👑</div>
        <p style={sub}>This requires <span style={{color:"#FFD93D"}}>maximum commitment</span> 😈</p>
        <Btn onClick={next}>I'm ready to risk it all 🔥</Btn>
        <p style={footnote}>(Like when she handles my daily drama 😂)</p>
      </Slide>
    )
  },
  {
    id:1,
    content: (next) => (
      <Slide visible>
        <p style={tag}>⚠️ DANGER ZONE ⚠️</p>
        <h1 style={hdr}>99.9% chance of you smiling like an absolute</h1>
        <div style={{...crown, background:"linear-gradient(135deg,#4D96FF,#00F5D4)", fontSize:"clamp(2rem,8vw,3.5rem)"}}>
          IDIOT 🤪
        </div>
        <Btn onClick={next} accent>I accept the risk 😎</Btn>
      </Slide>
    )
  },
  {
    id:2,
    content: (next) => (
      <Slide visible>
        <Photo caption="When I was being extra annoying…" />
        <p style={memText}>But you still checked on me 🥺❤️</p>
        <Btn onClick={next}>Next memory ➡️</Btn>
      </Slide>
    )
  },
  {
    id:3,
    content: () => (
      <Slide visible>
        <Photo caption="Everyone left… You STAYED 💪" />
        <div style={memText}>
          Through my chaos, you were my <span style={{color:"#FFD93D",fontWeight:700}}>ROCK</span> ✨
        </div>
        <p style={footnote}>Auto-advancing in a moment…</p>
      </Slide>
    ),
    autoNext:3500
  },
  {
    id:4,
    content: (next) => (
      <Slide visible>
        <Photo caption='"Bro you are TOO MUCH You, 50+ times 😂' />
        <p style={memText}>But never gave up on me ❤️</p>
        <Btn onClick={next}>More love ➡️ 😍</Btn>
      </Slide>
    ) 
  },
  {
    id:5,
    content: (next) => (
      <Slide visible>
        <Photo caption="6 months → Sister for LIFE 👭" />
        <div style={memText}>
          You cared with your <span style={{color:"#6BCB77",fontWeight:700}}>WHOLE HEART</span> ❤️
        </div>
        <Btn onClick={next} accent>Almost there…</Btn>
      </Slide>
    )
  },
  {
    id:6,
    content: (next) => (
      <Slide visible>
        <Photo caption="Thank you for EVERYTHING ✨" />
        <ul style={{listStyle:"none",padding:0,margin:"12px 0",textAlign:"left",fontSize:"1.1rem",lineHeight:2}}>
          {["Scolding my nonsense","Laughing at bad jokes","Being my safe space","EVERYTHING ✨"].map((t,i)=>(
            <li key={i}>✅ <span style={i===3?{color:"#F72585",fontWeight:700}:{}}>{t}</span></li>
          ))}
        </ul>
        <Btn onClick={next} accent>🎉 FINAL REVEAL ➡️</Btn>
      </Slide>
    )
  },
];

// ── Typography tokens ──────────────────────────────────────────────────────
const tag     = { fontFamily:"'Courier New',monospace", letterSpacing:3, fontSize:"0.9rem", opacity:0.75, marginBottom:8 };
const hdr     = { fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.6rem,5vw,2.4rem)", lineHeight:1.25, marginBottom:16, maxWidth:480 };
const crown   = { fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.2rem,8vw,4rem)", fontWeight:900, background:"linear-gradient(135deg,#F72585,#FFD93D)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 };
const sub     = { fontSize:"1rem", opacity:0.85, marginTop:6 };
const footnote= { fontSize:"0.85rem", opacity:0.6, marginTop:14 };
const memText = { fontSize:"clamp(1.1rem,3.5vw,1.5rem)", lineHeight:1.5, maxWidth:400 };

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [slide, setSlide] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const next = useCallback(() => {
    if (locked) return;
    setLocked(true);
    setTimeout(() => {
      const newSlide = slide + 1;
      if (newSlide >= SLIDES.length) { setDone(true); }
      else { setSlide(newSlide); }
      setLocked(false);
    }, 400);
  }, [slide, locked]);

  // Auto-advance
  useEffect(() => {
    const s = SLIDES[slide];
    if (s?.autoNext) {
      const t = setTimeout(next, s.autoNext);
      return () => clearTimeout(t);
    }
  }, [slide, next]);

  // ── Final celebration screen ─────────────────────────────────────────────
  if (done) return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0D0D1A 0%,#1a0a2e 50%,#0d1a0d 100%)",
      color:"#fff", textAlign:"center", padding:"30px 20px",
      overflow:"hidden", position:"relative", fontFamily:"system-ui,sans-serif"
    }}>
      {/* Confetti */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        {[...Array(60)].map((_,i)=><Particle key={i} i={i}/>)}
      </div>

      <div style={{position:"relative",zIndex:2,maxWidth:560}}>
        <p style={{...tag,opacity:0.6,marginBottom:4}}>🎂 TODAY IS SPECIAL 🎂</p>
        <h1 style={{
          fontFamily:"'Playfair Display',Georgia,serif",
          fontSize:"clamp(2.4rem,9vw,4.5rem)",
          lineHeight:1.1, marginBottom:24,
          background:"linear-gradient(135deg,#F72585,#FFD93D,#6BCB77,#4D96FF)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
        }}>
          Happy Birthday,<br/>Sister! 🎉
        </h1>

        {/* Polaroid final */}
        <div style={{
          background:"#fff", padding:"14px 14px 56px",
          borderRadius:4, display:"inline-block",
          boxShadow:"0 30px 80px rgba(247,37,133,0.4), 0 10px 30px rgba(0,0,0,0.5)",
          transform:"rotate(1.5deg)", marginBottom:28
        }}>
          <img
            src={birthdayImg}
            alt="You"
            style={{width:"clamp(220px,65vw,340px)",height:"clamp(220px,65vw,340px)",objectFit:"cover",display:"block",borderRadius:2}}
            onError={e=>{e.target.style.background="linear-gradient(135deg,#F72585,#7209B7)";e.target.src="";}}
          />
          <p style={{fontFamily:"'Caveat',cursive,Georgia,serif",color:"#333",fontSize:"1.2rem",marginTop:8,textAlign:"center"}}>
            Sister for life ❤️
          </p>
        </div>

        <div style={{
          background:"rgba(255,255,255,0.07)",
          backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.15)",
          borderRadius:20, padding:"28px 32px",
          fontSize:"clamp(1rem,3.5vw,1.3rem)", lineHeight:1.8
        }}>
          6 months ago: Office colleague 👋<br/>
          Today: <span style={{color:"#F72585",fontWeight:700,fontSize:"1.25em"}}>Sister for life ❤️</span><br/><br/>
          You stayed when others left.<br/>
          You cared when I was a mess.<br/>
          You laughed at my stupid jokes.<br/>
          You scolded me — and I needed that 😂<br/><br/>
          <span style={{fontSize:"1.4em",background:"linear-gradient(90deg,#FFD93D,#F72585)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:700}}>
            Thank you for EVERYTHING ✨
          </span>
        </div>

        <p style={{marginTop:24,opacity:0.65,fontSize:"1rem"}}>
          — Your annoying lil bro 💪
        </p>
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform:translateY(-10vh) rotate(0deg); opacity:1; }
          100% { transform:translateY(110vh) rotate(600deg); opacity:0; }
        }
      `}</style>
    </div>
  );

  // ── Normal slides ────────────────────────────────────────────────────────
  const { content } = SLIDES[slide];
  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(160deg,#0D0D1A 0%,#1a0a2e 40%,#12001F 100%)",
      color:"#fff", padding:"30px 16px",
      fontFamily:"system-ui,sans-serif", overflow:"hidden", position:"relative"
    }}>
      {/* Ambient glow orbs */}
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(247,37,133,0.12) 0%,transparent 70%)",top:"-20%",left:"-10%",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(114,9,183,0.12) 0%,transparent 70%)",bottom:"-10%",right:"-5%",pointerEvents:"none"}}/>

      {/* Progress dots */}
      <div style={{position:"absolute",top:24,display:"flex",gap:8}}>
        {SLIDES.map((_,i)=>(
          <div key={i} style={{
            width: i===slide?24:8, height:8,
            borderRadius:4,
            background: i<slide?"#F72585":i===slide?"#FFD93D":"rgba(255,255,255,0.2)",
            transition:"all 0.4s ease"
          }}/>
        ))}
      </div>

      {content(next)}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Caveat:wght@500&display=swap');
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}