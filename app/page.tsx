'use client';
import {useEffect,useState} from 'react';
import dynamic from 'next/dynamic';

const KaijukinScene=dynamic(()=>import('./components/KaijukinScene'),{ssr:false});
type Stage='egg'|'hatch'|'name'|'home';

export default function Home(){
 const [stage,setStage]=useState<Stage>('egg');
 const [day,setDay]=useState(1);
 const [name,setName]=useState('Moki');
 const [kin,setKin]=useState(625);
 const [xp,setXp]=useState(32);
 const [hydrated,setHydrated]=useState(false);

 useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('kaijukin-visual-v1')||'{}');if(s.stage)setStage(s.stage);if(s.day)setDay(s.day);if(s.name)setName(s.name)}catch{}setHydrated(true)},[]);
 useEffect(()=>{if(hydrated)localStorage.setItem('kaijukin-visual-v1',JSON.stringify({stage,day,name}))},[hydrated,stage,day,name]);

 if(stage==='egg') return <main className="screen cinematic incubation3d">
   <Brand/>
   <section className="hero3d eggHero"><KaijukinScene mode="egg" day={day}/><div className="heroFade"/></section>
   <section className="storyPanel">
     <div className="eyebrow"><span/>INCUBATION · DAY {day} OF 4<span/></div>
     <h1>{day===4?'It knows you’re here.':'Something is growing.'}</h1>
     <p>{day===1?'Warmth gathers beneath the shell.':day===2?'A faint rhythm answers your touch.':day===3?'The shell trembles when you come close.':'Light leaks through the fractures.'}</p>
     <button className="primaryCta" onClick={()=>day<4?setDay(d=>d+1):setStage('hatch')}>{day===4?'BEGIN HATCHING':'CHECK IN'}</button>
     <button className="devLink" onClick={()=>setDay(4)}>DEV · ADVANCE TO DAY 4</button>
   </section>
 </main>;

 if(stage==='hatch') return <main className="screen cinematic hatchStage">
   <Brand/>
   <section className="hatchCanvas"><KaijukinScene mode="hatch"/><div className="hatchAura"/><div className="shellShard s1"/><div className="shellShard s2"/></section>
   <section className="revealCopy">
    <span className="eyebrow solo">BIRTH · DAY ONE</span>
    <h1>Hello, little one.</h1>
    <p>For the first time, it looks back.</p>
    <button className="primaryCta" onClick={()=>setStage('name')}>MEET YOUR KAIJUKIN</button>
   </section>
 </main>;

 if(stage==='name') return <main className="screen cinematic namingStage">
   <Brand/>
   <section className="nameHero"><KaijukinScene mode="portrait"/><div className="heroFade"/></section>
   <section className="nameSheet">
    <span className="eyebrow solo">FIRST BOND</span>
    <h1>Give it a name.</h1>
    <p>This is the first thing it will learn from you.</p>
    <label className="nameField"><span>NAME</span><input value={name} onChange={e=>setName(e.target.value)} maxLength={16} autoComplete="off" spellCheck={false}/></label>
    <button className="primaryCta full" disabled={!name.trim()} onClick={()=>setStage('home')}>ENTER THE NEST</button>
   </section>
 </main>;

 return <main className="screen nestStage">
   <header className="premiumHud">
    <div className="identityBlock"><MokiIcon/><div><strong>{name.toUpperCase()}</strong><small>GROWTH I · LEVEL 1</small></div></div>
    <div className="currency"><b>◆ {kin}</b><small>KIN</small></div>
   </header>
   <section className="nestWorld"><KaijukinScene mode="nest"/><div className="nestGradient"/>
     <div className="presence"><span className="presenceDot"/><b>CURIOUS</b><small>{name} notices you watching.</small></div>
   </section>
   <section className="premiumActions">
    <button><Icon type="chat"/><b>TALK</b><small>Bond</small></button>
    <button><Icon type="feed"/><b>FEED</b><small>Care</small></button>
    <button><Icon type="play"/><b>PLAY</b><small>Interact</small></button>
    <button><Icon type="explore"/><b>EXPLORE</b><small>Discover</small></button>
   </section>
   <footer className="premiumNav">
    <button className="active"><span>⌂</span><small>NEST</small></button>
    <button><span>▱</span><small>JOURNAL</small></button>
    <div className="xpMedallion"><b>{xp}</b><small>XP</small></div>
    <button><span>◇</span><small>COLLECT</small></button>
    <button><span>···</span><small>MORE</small></button>
   </footer>
 </main>
}

function Brand(){return <div className="brand premiumBrand"><MokiIcon/><b>KAIJUKIN</b></div>}
function MokiIcon(){return <svg viewBox="0 0 100 80" aria-hidden="true"><path d="M18 65C7 62 7 45 19 42c1-19 12-31 27-34 10-8 27-9 35-4 7 5 3 21-5 31 8 3 13 10 13 19 9 2 10 17-1 20-12 3-19-2-22-5-9 6-23 7-34 1-4 4-8 5-14 5Z"/><ellipse cx="39" cy="46" rx="5" ry="10"/><ellipse cx="61" cy="46" rx="5" ry="10"/></svg>}
function Icon({type}:{type:string}){const paths:{[k:string]:string}={chat:'M4 5h16v11H9l-5 4V5Z',feed:'M12 3c4 4 5 8 2 12-2 3-6 4-9 1 2-1 4-3 5-6 1-3 1-5 2-7Z',play:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1 4 5 4-5 4V8Z',explore:'M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z'};return <svg className="actionIcon" viewBox="0 0 24 24"><path d={paths[type]}/></svg>}
