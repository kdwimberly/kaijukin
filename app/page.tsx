'use client';
import {useEffect,useState} from 'react';
import dynamic from 'next/dynamic';
const KaijukinScene=dynamic(()=>import('./components/KaijukinScene'),{ssr:false});
type Stage='egg'|'hatch'|'name'|'home';

export default function Home(){
 const [stage,setStage]=useState<Stage>('egg'),[day,setDay]=useState(1),[name,setName]=useState('Moki'),[hydrated,setHydrated]=useState(false);
 useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('kaijukin-visual-v2')||'{}');if(s.stage)setStage(s.stage);if(s.day)setDay(s.day);if(s.name)setName(s.name)}catch{}setHydrated(true)},[]);
 useEffect(()=>{if(hydrated)localStorage.setItem('kaijukin-visual-v2',JSON.stringify({stage,day,name}))},[hydrated,stage,day,name]);

 if(stage==='egg')return <main className="screen cinematic"><Brand/><section className="introWorld"><KaijukinScene mode="egg" day={day}/></section><section className="introPanel"><div className="eyebrow">INCUBATION · DAY {day} OF 4</div><h1>{day===4?'It knows you’re here.':'Something is growing.'}</h1><p>{day<4?'Return. Care for it. Let it learn your presence.':'Light leaks through the shell.'}</p><button className="primaryCta" onClick={()=>day<4?setDay(day+1):setStage('hatch')}>{day===4?'BEGIN HATCHING':'CHECK IN'}</button><button className="devLink" onClick={()=>setDay(4)}>DEV · DAY 4</button></section></main>;
 if(stage==='hatch')return <main className="screen cinematic"><Brand/><section className="introWorld hatchWorld"><KaijukinScene mode="hatch"/></section><section className="introPanel"><div className="eyebrow">BIRTH · DAY ONE</div><h1>Hello, little one.</h1><p>For the first time, it looks back.</p><button className="primaryCta" onClick={()=>setStage('name')}>MEET YOUR KAIJUKIN</button></section></main>;
 if(stage==='name')return <main className="screen namingStage"><Brand/><section className="nameWorld"><KaijukinScene mode="portrait"/></section><section className="nameSheet"><div className="eyebrow">FIRST BOND</div><h1>Give it a name.</h1><p>This is the first thing it will learn from you.</p><label className="nameField"><span>NAME</span><input value={name} onChange={e=>setName(e.target.value)} maxLength={16}/></label><button className="primaryCta full" disabled={!name.trim()} onClick={()=>setStage('home')}>ENTER THE NEST</button></section></main>;

 return <main className="screen habitatStage">
   <section className="habitat"><KaijukinScene mode="nest"/><div className="habitatShade"/>
     <div className="profileCard"><MokiIcon/><div><strong>{name}</strong><span>Lv. 1</span><i><em/></i></div></div>
     <div className="rightHud"><div className="kinCard"><b>◆</b><strong>625</strong><button>+</button></div><div className="dayCard"><b>☀</b><span>Day 1</span></div><button className="utility">▣</button><button className="utility">▧</button><button className="utility">⚙</button></div>
     <div className="mokiStatus"><b>CURIOUS</b><span>{name} notices you watching.</span></div>
   </section>
   <section className="actionDock">
    <Action icon="chat" label="TALK"/><Action icon="feed" label="FEED"/><Action icon="play" label="PLAY" active/><Action icon="explore" label="EXPLORE"/>
   </section>
   <nav className="bottomNav"><Nav icon="⌂" label="HOME" active/><Nav icon="▤" label="JOURNAL"/><Nav icon="▣" label="BAG"/><Nav icon="⌑" label="SHOP"/><Nav icon="♧" label="FRIENDS"/></nav>
 </main>
}
function Brand(){return <div className="brand"><MokiIcon/><b>KAIJUKIN</b></div>}
function MokiIcon(){return <svg viewBox="0 0 100 80"><path d="M18 65C7 62 7 45 19 42c1-19 12-31 27-34 10-8 27-9 35-4 7 5 3 21-5 31 8 3 13 10 13 19 9 2 10 17-1 20-12 3-19-2-22-5-9 6-23 7-34 1-4 4-8 5-14 5Z"/><ellipse cx="39" cy="46" rx="5" ry="10"/><ellipse cx="61" cy="46" rx="5" ry="10"/></svg>}
const paths:{[k:string]:string}={chat:'M4 5h16v11H9l-5 4V5Z',feed:'M12 3c4 4 5 8 2 12-2 3-6 4-9 1 2-1 4-3 5-6 1-3 1-5 2-7Z',play:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1 4 5 4-5 4V8Z',explore:'M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z'};
function Action({icon,label,active=false}:{icon:string,label:string,active?:boolean}){return <button className={active?'active':''}><svg viewBox="0 0 24 24"><path d={paths[icon]}/></svg><span>{label}</span></button>}
function Nav({icon,label,active=false}:{icon:string,label:string,active?:boolean}){return <button className={active?'active':''}><b>{icon}</b><span>{label}</span></button>}
