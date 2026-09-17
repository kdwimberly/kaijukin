'use client';

import { useEffect, useState } from 'react';

type Stage = 'egg' | 'hatch' | 'home';
type Action = 'talk' | 'feed' | 'play' | 'explore';

const actions: { id: Action; label: string; glyph: string }[] = [
  { id: 'talk', label: 'TALK', glyph: '◌' },
  { id: 'feed', label: 'FEED', glyph: '◇' },
  { id: 'play', label: 'PLAY', glyph: '○' },
  { id: 'explore', label: 'EXPLORE', glyph: '⌁' },
];

export default function Home() {
  const [stage, setStage] = useState<Stage>('egg');
  const [checkin, setCheckin] = useState(1);
  const [xp, setXp] = useState(0);
  const [kin, setKin] = useState(100);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState('curious');
  const [message, setMessage] = useState('Something is waiting.');
  const [panel, setPanel] = useState<Action | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kaijukin-v0');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setStage(s.stage ?? 'egg'); setCheckin(s.checkin ?? 1); setXp(s.xp ?? 0); setKin(s.kin ?? 100); setLevel(s.level ?? 1);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kaijukin-v0', JSON.stringify({ stage, checkin, xp, kin, level }));
  }, [stage, checkin, xp, kin, level]);

  function incubate() {
    if (checkin < 4) {
      setKin(v => v + 125);
      setCheckin(v => v + 1);
      setMessage(checkin === 1 ? 'It moved.' : checkin === 2 ? 'Something answered from inside.' : 'The shell is ready.');
    } else setStage('hatch');
  }

  function enterHome() { setStage('home'); setKin(v => v + 500); setMessage('Moki is watching you.'); }

  function interact(id: Action) {
    setPanel(id);
    const rewards = { talk: [15,20], feed:[10,10], play:[20,20], explore:[25,35] } as const;
    const [dx, dk] = rewards[id];
    setXp(v => {
      const n = v + dx;
      if (n >= level * 100) { setLevel(l => l + 1); return 0; }
      return n;
    });
    setKin(v => v + dk);
    const copy = {
      talk: 'Moki tilts its head. “...you came back.”',
      feed: 'Moki devours the snack, then checks for another.',
      play: 'The ball is now the most important object in existence.',
      explore: 'Moki disappears into the cavern and returns with a strange stone.'
    };
    setMessage(copy[id]);
    setMood(id === 'play' ? 'happy' : id === 'feed' ? 'content' : 'curious');
  }

  if (stage === 'egg') return <main className="incubation">
    <Brand />
    <section className="eggScene">
      <div className={`egg egg${checkin}`}><span /></div>
      <p className="eyebrow">INCUBATION · CHECK-IN {checkin}/4</p>
      <h1>{checkin === 1 ? 'Something is inside.' : checkin === 4 ? 'It is ready.' : message}</h1>
      <p className="muted">No personality yet. Just presence.</p>
      <button className="primary" onClick={incubate}>{checkin === 1 ? 'WARM THE EGG' : checkin === 2 ? 'TOUCH' : checkin === 3 ? 'CALL' : 'HATCH'}</button>
      <button className="dev" onClick={() => setCheckin(4)}>DEV · SKIP TO HATCH</button>
    </section>
  </main>;

  if (stage === 'hatch') return <main className="hatch">
    <div className="shell">◜　◝</div>
    <Moki mood="newborn" />
    <p className="eyebrow">DAY ONE</p><h1>It needs a name.</h1>
    <input defaultValue="Moki" aria-label="Kaijukin name" />
    <button className="primary" onClick={enterHome}>MEET MOKI</button>
  </main>;

  return <main className="game">
    <header><div><strong>MOKI</strong><small> LV. {level}</small><div className="xp"><i style={{width:`${Math.min(100,xp)}%`}} /></div></div><div className="currency">◆ {kin.toLocaleString()} KIN</div></header>
    <section className="cavern">
      <div className="light"/><div className="waterfall"/><div className="fire">✦</div><div className="ball"/>
      <Moki mood={mood} />
      <div className="speech">{message}</div>
    </section>
    <section className="actions">{actions.map(a => <button key={a.id} onClick={() => interact(a.id)}><b>{a.glyph}</b><span>{a.label}</span></button>)}</section>
    <nav>{['HOME','JOURNAL','BAG','SHOP','FRIENDS'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}</nav>
    {panel && <div className="toast">+ XP · + KIN <button onClick={()=>setPanel(null)}>×</button></div>}
  </main>;
}

function Brand(){ return <div className="brand"><MokiIcon/><span>KAIJUKIN</span></div> }
function MokiIcon(){ return <svg viewBox="0 0 100 80" aria-hidden><path d="M18 65C7 62 7 45 19 42c1-19 12-31 27-34 10-8 27-9 35-4 7 5 3 21-5 31 8 3 13 10 13 19 9 2 10 17-1 20-12 3-19-2-22-5-9 6-23 7-34 1-4 4-8 5-14 5Z"/><ellipse cx="39" cy="46" rx="5" ry="10"/><ellipse cx="61" cy="46" rx="5" ry="10"/></svg> }
function Moki({mood}:{mood:string}) { return <div className={`moki ${mood}`}><div className="crest"/><div className="eye left"/><div className="eye right"/><div className="mouth"/><div className="paw p1"/><div className="paw p2"/><div className="paw p3"/><div className="paw p4"/></div> }
