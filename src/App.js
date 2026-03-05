import React, { useState, useEffect, useCallback, useMemo } from "react";
// ── Add your images here — just swap the file paths ──────────────────────
// const birthdayImg1 = "/.jpg";  // slide 1 (intro)
const birthdayImg2 = "/start.jpg";  // slide 2 (annoying)
const birthdayImg3 = "/blue.jpg";  // slide 3 (everyone left)
const birthdayImg4 = "/pig.jpg";  // slide 4 (akka too much)
const birthdayImg5 = "/last.jpg";  // slide 5 (grateful)
const birthdayImg6 = "/red.jpg";  // slide 6 (thank you)
const birthdayImgFinal = "/final.jpg"; // final screen

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars() {
  const stars = useMemo(() =>
    [...Array(90)].map((_, i) => ({
      x: (i * 137.5) % 100,
      y: (i * 73.3) % 100,
      r: 0.7 + (i % 4) * 0.4,
      delay: (i * 0.19) % 5,
      dur: 2.5 + (i % 3),
      op: 0.25 + (i % 5) * 0.12,
    })), []);

  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      {stars.map((s, i) => (
        <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white" opacity={s.op}>
          <animate attributeName="opacity"
            values={`${s.op};${s.op * 0.15};${s.op}`}
            dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

// ── Moon SVG ───────────────────────────────────────────────────────────────
// Moon sits in the BOTTOM half so it never clashes with content text above
function Moon({ phase }) {
  // cy="78%" keeps the moon in the lower portion of the screen
  const CY = "78%";
  const R  = 110;

  const defs = (
    <defs>
      <radialGradient id="mg" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stopColor="#F8F0DC"/>
        <stop offset="45%"  stopColor="#D9BE94"/>
        <stop offset="80%"  stopColor="#AA8050"/>
        <stop offset="100%" stopColor="#7A5830"/>
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#E8D5A0" stopOpacity="1"/>
        <stop offset="100%" stopColor="#E8D5A0" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="bloodmoon" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stopColor="#FF7055"/>
        <stop offset="50%"  stopColor="#BB2200"/>
        <stop offset="100%" stopColor="#440000"/>
      </radialGradient>
      <radialGradient id="bloodglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#FF3300" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#FF3300" stopOpacity="0"/>
      </radialGradient>
    </defs>
  );

  const bg = phase === "blood" ? "#1A0505" : "#0D0D1A";

  const shape = {
    full: <>
      <circle cx="50%" cy={CY} r={R*1.5} fill="url(#glow)" opacity="0.1"/>
      <circle cx="50%" cy={CY} r={R}     fill="url(#mg)" opacity="0.2"/>
    </>,
    crescent: <>
      <circle cx="50%" cy={CY} r={R*1.15} fill="url(#glow)" opacity="0.08"/>
      <circle cx="50%" cy={CY} r={R}      fill="url(#mg)" opacity="0.2"/>
      <circle cx="58%" cy={CY} r={R*0.85} fill={bg}/>
    </>,
    gibbous: <>
      <circle cx="50%" cy={CY} r={R*1.4}  fill="url(#glow)" opacity="0.09"/>
      <circle cx="50%" cy={CY} r={R}      fill="url(#mg)" opacity="0.2"/>
      <ellipse cx="61%" cy={CY} rx={R*0.53} ry={R} fill={bg} opacity="0.9"/>
      <ellipse cx="57%" cy={CY} rx={R*0.25} ry={R} fill={bg} opacity="0.45"/>
    </>,
    half: <>
      <circle cx="50%" cy={CY} r={R*1.35} fill="url(#glow)" opacity="0.09"/>
      <circle cx="50%" cy={CY} r={R}      fill="url(#mg)" opacity="0.2"/>
      <rect   x="50%"  y="0"   width="50%" height="100%" fill={bg} opacity="0.97"/>
    </>,
    waning: <>
      <circle cx="50%" cy={CY} r={R*1.3}  fill="url(#glow)" opacity="0.08"/>
      <circle cx="50%" cy={CY} r={R}      fill="url(#mg)" opacity="0.2"/>
      <circle cx="43%" cy={CY} r={R*0.83} fill={bg} opacity="0.97"/>
    </>,
    new: <>
      <circle cx="50%" cy={CY} r={R}   fill={bg} opacity="0.5"/>
      <circle cx="50%" cy={CY} r={R}   stroke="rgba(200,185,255,0.12)" strokeWidth="2" fill="none"/>
    </>,
    blood: <>
      <circle cx="50%" cy={CY} r={R*1.55} fill="url(#bloodglow)" opacity="0.12"/>
      <circle cx="50%" cy={CY} r={R}      fill="url(#bloodmoon)" opacity="0.2"/>
    </>,
  }[phase] || null;

  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      {defs}
      {shape}
    </svg>
  );
}

// ── Tiny floating moons ────────────────────────────────────────────────────
function FloatingMoons() {
  const list = [
    { s:16, x:"7%",  y:"72%", d:0,   t:6   },
    { s:10, x:"87%", y:"58%", d:1.4, t:7.5 },
    { s:7,  x:"14%", y:"48%", d:0.7, t:5.2 },
    { s:20, x:"81%", y:"78%", d:2.1, t:8   },
    { s:5,  x:"91%", y:"38%", d:2.8, t:6.2 },
  ];
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {list.map((m,i) => (
        <div key={i} style={{
          position:"absolute", left:m.x, top:m.y,
          width:m.s, height:m.s, borderRadius:"50%",
          background:"radial-gradient(circle at 35% 35%, #F5ECD7, #9A7040)",
          boxShadow:`0 0 ${m.s}px ${m.s/3}px rgba(230,205,160,0.2)`,
          opacity:0.5,
          animation:`floatM ${m.t}s ease-in-out ${m.d}s infinite alternate`,
        }}/>
      ))}
    </div>
  );
}

// ── Moon confetti ──────────────────────────────────────────────────────────
function MoonConfetti() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {[...Array(40)].map((_,i) => {
        const isMoon = i % 3 === 0;
        const size   = 6 + (i % 7);
        const colors = ["#F5ECD7","#D4B880","#C4A0FF","#9B8EC4","#B8E0FF"];
        return (
          <div key={i} style={{
            position:"absolute",
            left:`${(i*37+13)%100}%`,
            top:"-6%",
            width: isMoon ? "auto" : size,
            height: isMoon ? "auto" : size,
            fontSize: isMoon ? 14 : 0,
            background: isMoon ? "none" : colors[i%colors.length],
            borderRadius: isMoon ? 0 : "50%",
            animation:`fall ${2.2+(i*0.07)%2}s linear ${(i*0.13)%3}s infinite`,
          }}>
            {isMoon ? "🌙" : null}
          </div>
        );
      })}
    </div>
  );
}

// ── Photo polaroid ─────────────────────────────────────────────────────────
function Photo({ caption, src, portrait = false }) {
  return (
    <div style={{ position:"relative", marginBottom:18, display:"inline-block" }}>
      <div
        style={{
          background:"#100E1C",
          padding:"9px 9px 42px",
          borderRadius:3,
          boxShadow:"0 18px 55px rgba(0,0,0,0.75), 0 0 30px rgba(180,145,90,0.12)",
          border:"1px solid rgba(220,200,160,0.1)",
          transform:"rotate(-1.8deg)",
          transition:"transform 0.35s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.transform="rotate(1.2deg) scale(1.03)"}
        onMouseLeave={e => e.currentTarget.style.transform="rotate(-1.8deg)"}
      >
        <img
          src={src} alt="Memory"
          style={{
            width:"clamp(160px,44vw,250px)",
            height:"clamp(210px,58vw,330px)",
            objectFit:"cover", display:"block", borderRadius:2,
            filter:"brightness(0.88) saturate(0.8)",
          }}
          onError={e=>{e.target.style.background="linear-gradient(135deg,#AA7040,#7060A0)";e.target.src="";}}
        />
        <p style={{
          fontFamily:"'Caveat',cursive",
          fontSize:"0.95rem", color:"#D0B888",
          marginTop:7, textAlign:"center", opacity:0.9,
        }}>{caption}</p>
      </div>
    </div>
  );
}

// ── Slide themes ───────────────────────────────────────────────────────────
const THEMES = [
  { bg:"#08061A", moon:"full"    },
  { bg:"#080512", moon:"crescent"},
  { bg:"#07091A", moon:"gibbous" },
  { bg:"#080A18", moon:"half"    },
  { bg:"#0F0614", moon:"waning"  },
  { bg:"#050410", moon:"new"     },
  { bg:"#130404", moon:"blood"   },
];

// ── Shared text styles ─────────────────────────────────────────────────────
const T = {
  tag:  { fontFamily:"'Cinzel',serif", fontSize:"0.78rem", letterSpacing:"3px", color:"#D8C898", opacity:0.7, marginBottom:6, display:"block" },
  h1:   { fontFamily:"'Cinzel Decorative',serif", fontSize:"clamp(1.35rem,4.2vw,2.1rem)", lineHeight:1.35, color:"#F0E2C0", marginBottom:14, maxWidth:460 },
  big:  { fontFamily:"'Cinzel Decorative',serif", fontSize:"clamp(1.9rem,6.5vw,3.4rem)", fontWeight:900, color:"#F5ECD7", textShadow:"0 0 40px rgba(240,220,160,0.5)", marginBottom:10 },
  body: { fontSize:"clamp(0.95rem,3vw,1.25rem)", lineHeight:1.65, maxWidth:400, color:"#DDD0B0" },
  note: { fontSize:"0.78rem", opacity:0.45, marginTop:12, color:"#C4A882" },
};

// ── Button ─────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant="gold" }) {
  const [hov, setHov] = useState(false);
  const bg = variant === "silver"
    ? (hov ? "#C0B0E0" : "#A898C8")
    : (hov ? "#E8CC80" : "#C8A860");
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onTouchStart={()=>setHov(true)} onTouchEnd={()=>{setHov(false);onClick();}}
      style={{
        marginTop:24, padding:"14px 38px",
        fontFamily:"'Cinzel',serif", fontSize:"0.82rem", letterSpacing:"2px",
        fontWeight:700, textTransform:"uppercase",
        background:bg, color:"#0A0818",
        border:"none", borderRadius:50, cursor:"pointer",
        boxShadow: hov ? "0 8px 32px rgba(200,170,80,0.4)" : "0 4px 16px rgba(0,0,0,0.4)",
        transform: hov ? "scale(1.04)" : "scale(1)",
        transition:"all 0.25s ease",
        touchAction:"manipulation",
        maxWidth:"90vw",
        whiteSpace:"normal",
        lineHeight:1.5,
        textAlign:"center",
      }}>
      {children}
    </button>
  );
}

// ── Slide shell ────────────────────────────────────────────────────────────
function Slide({ children }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", textAlign:"center",
      padding:"0 22px", maxWidth:560, width:"100%",
      position:"relative", zIndex:2,
    }}>
      {children}
    </div>
  );
}

// ── Moon phase progress ────────────────────────────────────────────────────
function Progress({ current, total }) {
  const phases = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗"];
  return (
    <div style={{ position:"absolute", top:18, display:"flex", gap:6, alignItems:"center", zIndex:3 }}>
      {phases.slice(0,total).map((m,i) => (
        <span key={i} style={{
          fontSize: i===current ? "1.3rem" : "0.85rem",
          opacity: i < current ? 0.9 : i===current ? 1 : 0.25,
          filter: i===current ? "drop-shadow(0 0 6px rgba(230,200,120,0.9))" : "none",
          transition:"all 0.45s ease",
        }}>{m}</span>
      ))}
    </div>
  );
}

// ── Slides ─────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🌕 full moon</span>
        <h1 style={T.h1}>I have been waiting to say <em>Happy Birthday</em> to our</h1>
        <div style={T.big}>LUNAR QUEEN 🌙</div>
        <p style={{...T.body, marginTop:8}}>This required maximum moonlight ✨</p>
        <Btn onClick={next}>Keep the Smile always, Dinosaur 🦕</Btn>
        <p style={T.note}>(Yeah it takes quite a lot to handle her)</p>
      </Slide>
    )
  },
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🌙 crescent moon</span>
        <p style={{...T.body, fontSize:"clamp(0.88rem,2.6vw,1.05rem)", marginBottom:16, opacity:0.85}}>
          Like a crescent moon that marks new beginnings, may this year bring you fresh starts, gentle light, and beautiful moments
        </p>
        <h1 style={T.h1}>I'm just assuming you're smiling like an idiot right now</h1>
        <div style={T.big}>MOON CHILD 🌙✨</div>
        <Btn onClick={next} variant="silver">
          Dinosaurs are gone, empires fell — but you're still here riding the wave 🌊
        </Btn>
      </Slide>
    )
  },
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🌔 waxing gibbous</span>
        <Photo src={birthdayImg2} caption="When I was being extra annoying…"/>
        <p style={{...T.body, marginTop:4}}>But you still checked on me 🥺❤️</p>
        <Btn onClick={next}>Hope you smiled (you definitely did 😅)</Btn>
      </Slide>
    )
  },
  {
    render: () => (
      <Slide>
        <span style={T.tag}>🌓 half moon</span>
        <Photo src={birthdayImg3} caption="Everyone left… You STAYED 🌙"/>
        <div style={T.body}>
          Through my chaos, you were my <strong style={{color:"#E8D5A0"}}>moonlight</strong> ✨
        </div>
        <p style={T.note}>Can't wait…? 🤨</p>
      </Slide>
    ),
    autoNext: 3500
  },
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🌘 waning moon</span>
        <Photo src={birthdayImg4} caption='"Akka, you are TOO MUCH 😭 '/>
        <p style={T.body}>At this point I think I need a collar rope just to control your unlimited energy😂 but you tried to be there for me always ka ❤️🌙</p>
        <Btn onClick={next}>Getting bored of this uh? 😏</Btn>
      </Slide>
    )
  },
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🌑 new moon</span>
        <Photo src={birthdayImg5} caption="Who expects to find a person like you — I'm grateful"/>
        <div style={{...T.body, marginTop:10}}>
          You cared with your <strong style={{color:"#C4AAFF"}}>whole heart</strong> ❤️
          <br/>
          <span style={{fontSize:"0.92em", opacity:0.75, fontStyle:"italic"}}>
            "அகத்தின் அழகு முகத்தில் தெரியும்" — it made sense
          </span>
        </div>
        <Btn onClick={next} variant="silver">Feeling sleepy ah, stupid Panda 🐼</Btn>
      </Slide>
    )
  },
  {
    render: (next) => (
      <Slide>
        <span style={T.tag}>🔴 blood moon</span>
        <Photo src={birthdayImg6} caption="Thank you for EVERYTHING 🌙✨"/>
        <ul style={{ listStyle:"none", padding:0, margin:"10px 0", textAlign:"left", lineHeight:2.1, color:"#D8C8A0", fontSize:"1rem" }}>
          {[
            "Scolding my nonsense 🌑",
            "Laughing at bad jokes 🌒",
            "Being my safe space 🌓",
            "EVERYTHING ✨🌕",
          ].map((t,i) => (
            <li key={i}><span style={{color:"#C4A882",marginRight:8}}>✦</span>
              <span style={i===3?{color:"#F0E0A0",fontWeight:700}:{}}>{t}</span>
            </li>
          ))}
        </ul>
        <Btn onClick={next} variant="silver">🌕 I wish you good things in your 26</Btn>
      </Slide>
    )
  },
];

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [slide, setSlide] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone]   = useState(false);

  const next = useCallback(() => {
    if (locked) return;
    setLocked(true);
    setTimeout(() => {
      if (slide + 1 >= SLIDES.length) setDone(true);
      else setSlide(s => s + 1);
      setLocked(false);
    }, 380);
  }, [slide, locked]);

  useEffect(() => {
    const s = SLIDES[slide];
    if (s?.autoNext) {
      const t = setTimeout(next, s.autoNext);
      return () => clearTimeout(t);
    }
  }, [slide, next]);

  // ── Final screen ──────────────────────────────────────────────────────────
  if (done) return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"#060412",
      color:"#fff", textAlign:"center", padding:"30px 20px",
      overflow:"hidden", position:"relative",
    }}>
      <Stars/>
      <Moon phase="full"/>
      <FloatingMoons/>
      <MoonConfetti/>

      <div style={{ position:"relative", zIndex:2, maxWidth:550 }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:"0.75rem", letterSpacing:"4px", color:"#C4A882", opacity:0.65, marginBottom:12 }}>
          🌕 under the full moon 🌕
        </p>

        {/* Title — solid and bright, not washed out */}
        <h1 style={{
          fontFamily:"'Cinzel Decorative',serif",
          fontSize:"clamp(2.2rem,8.5vw,4rem)",
          fontWeight:900,
          lineHeight:1.15,
          marginBottom:26,
          color:"#F5ECD7",
          textShadow:"0 0 50px rgba(240,210,130,0.55), 0 2px 6px rgba(0,0,0,0.9)",
        }}>
          Happy Birthday,<br/>
          <span style={{
            background:"linear-gradient(135deg,#FFE580 0%,#F0C040 50%,#E09820 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
          }}>EPSIBHA!</span> 🌙
        </h1>

        {/* Polaroid */}
        {/* /* hoping it works */ }
        <div style={{
          background:"#100E1C",
          padding:"12px 12px 50px",
          borderRadius:3, display:"inline-block",
          boxShadow:"0 28px 70px rgba(0,0,0,0.8), 0 0 80px rgba(180,145,90,0.1)",
          border:"1px solid rgba(220,200,160,0.1)",
          transform:"rotate(1.2deg)", marginBottom:26,
        }}>
          <img
            src={birthdayImgFinal} alt="Epsibha"
            style={{
              width:"clamp(200px,60vw,320px)", height:"clamp(200px,60vw,320px)",
              objectFit:"cover", display:"block", borderRadius:2,
              filter:"brightness(0.88) saturate(0.82)",
            }}
            onError={e=>{e.target.style.background="linear-gradient(135deg,#AA7040,#7060A0)";e.target.src="";}}
          />
          <p style={{ fontFamily:"'Caveat',cursive", color:"#C8A870", fontSize:"1.1rem", marginTop:8 }}>
            Being my Sister 🌙
          </p>
        </div>

        {/* Message */}
        <div style={{
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(220,200,150,0.1)",
          borderRadius:16, padding:"24px 28px",
          fontSize:"clamp(0.9rem,3vw,1.1rem)", lineHeight:2,
          color:"#D8C898",
          textAlign:"left",
        }}>
          6 months ago: Office colleague 👋<br/>
          Today: <strong style={{ color:"#F0E0B0" }}>Being my only Sister🌙</strong><br/><br/>
          You stayed when others left.<br/>
          You cared when I was a mess.<br/>
          I keep a lot inside… but when it counts, you'll know.<br/>
          You bully me daily -:- and somehow it's exactly what I needed.<br/><br/>
          <span style={{ color:"#E8D090", fontWeight:700, fontSize:"1.1em" }}>
            Thank you for everything Enjoy your Day✨🌕
            Hope you liked this ... :) once again Happy Birthday Dinosaur❤️
          </span>
        </div>

        <div style={{ marginTop:22, fontSize:"1.4rem", letterSpacing:"4px", opacity:0.5 }}>
          🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘
        </div>
        <p style={{ marginTop:12, fontSize:"0.85rem", color:"#A89060", opacity:0.6 }}>
          — your annoying lil bro 💪🌙
        </p>
      </div>

      <style>{css}</style>
    </div>
  );

  // ── Slide screen ──────────────────────────────────────────────────────────
  const theme = THEMES[slide] || THEMES[0];
  const { render } = SLIDES[slide];

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background: theme.bg,
      color:"#fff", padding:"30px 16px",
      overflow:"hidden", position:"relative",
      transition:"background 0.9s ease",
    }}>
      <Stars/>
      <Moon phase={theme.moon}/>
      <FloatingMoons/>

      <div style={{
        position:"absolute", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(220,195,130,0.05) 0%, transparent 70%)",
        top:"-20%", left:"50%", transform:"translateX(-50%)",
        pointerEvents:"none",
      }}/>

      <Progress current={slide} total={SLIDES.length}/>
      {render(next)}

      <style>{css}</style>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Caveat:wght@500&display=swap');
  * { box-sizing: border-box; }
  @keyframes floatM {
    from { transform: translateY(0) rotate(0deg); }
    to   { transform: translateY(-16px) rotate(8deg); }
  }
  @keyframes fall {
    from { transform: translateY(-10vh) rotate(0deg); opacity:1; }
    to   { transform: translateY(110vh) rotate(540deg); opacity:0; }
  }
`;
