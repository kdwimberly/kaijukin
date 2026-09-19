'use client';
import {Canvas,useFrame} from '@react-three/fiber'; import {ContactShadows,Environment} from '@react-three/drei'; import * as THREE from 'three'; import {useMemo,useRef} from 'react';
type Mode='egg'|'hatch'|'portrait'|'nest'; type Mood='neutral'|'happy'|'playful'|'curious';
function Moki({hero=false,mood='neutral'}:{hero?:boolean,mood?:Mood}){
 const root=useRef<THREE.Group>(null!),face=useRef<THREE.Group>(null!);
 const mat=useMemo(()=>new THREE.MeshPhysicalMaterial({color:'#07080a',roughness:.22,metalness:0,clearcoat:1,clearcoatRoughness:.14,sheen:.35,sheenColor:new THREE.Color('#334052')}),[]);
 useFrame(({clock})=>{if(!root.current)return;const t=clock.elapsedTime;root.current.position.y=(hero?.02:-.27)+Math.sin(t*1.8)*.018;root.current.rotation.y=Math.sin(t*.45)*.045;const s=1+Math.sin(t*1.8)*.012;root.current.scale.y=(hero?1.28:.86)*s});
 const eyeY=mood==='happy'?.12:.18;
 return <group ref={root} scale={[hero?1.28:.86,hero?1.28:.86,hero?1.28:.86]}>
  <mesh material={mat} scale={[1.5,.88,1.05]} castShadow><sphereGeometry args={[.72,72,54]}/></mesh>
  <mesh material={mat} position={[.15,.72,-.1]} rotation={[0,-.08,-.42]} scale={[.34,1.03,.28]} castShadow><sphereGeometry args={[.72,56,42]}/></mesh>
  <mesh material={mat} position={[.38,1.05,-.15]} rotation={[0,-.05,-.55]} scale={[.2,.65,.17]} castShadow><sphereGeometry args={[.64,48,36]}/></mesh>
  <group ref={face}>
   {[-1,1].map(s=>mood==='happy'?<mesh key={s} position={[s*.28,eyeY,.73]} rotation={[0,0,s*.16]} scale={[.8,.28,.25]}><torusGeometry args={[.105,.035,16,32,Math.PI]}/><meshStandardMaterial color="#fffdf5" emissive="#fff8e9" emissiveIntensity={1.8}/></mesh>:<mesh key={s} position={[s*.27,.2,.755]} scale={[.72,1.42,.24]}><sphereGeometry args={[.115,40,30]}/><meshStandardMaterial color="#fffdf7" emissive="#fff8e9" emissiveIntensity={1.55}/></mesh>)}
   <mesh position={[0,-.13,.79]} scale={[1.35,mood==='happy'?1:.7,.28]}><sphereGeometry args={[.077,32,24]}/><meshStandardMaterial color="#ff8298" emissive="#8c2038" emissiveIntensity={.18}/></mesh>
  </group>
  {[[-.67,-.37,.44],[.67,-.37,.44],[-.53,-.37,-.31],[.53,-.37,-.31]].map((p,i)=><group key={i} position={p as [number,number,number]}><mesh material={mat} scale={i<2?[.55,.34,.62]:[.4,.27,.5]} castShadow><sphereGeometry args={[.47,40,30]}/></mesh>{i<2&&[[-.08,.035,.43],[0,.06,.45],[.08,.035,.43]].map((q,j)=><mesh key={j} position={q as [number,number,number]} scale={[.04,.018,.025]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#27292c" roughness={.55}/></mesh>)}</group>)}
 </group>
}
function Egg({day}:{day:number}){const r=useRef<THREE.Group>(null!);useFrame(({clock})=>{if(r.current){r.current.position.y=Math.sin(clock.elapsedTime*1.3)*.03;r.current.rotation.z=day>=4?Math.sin(clock.elapsedTime*15)*.012:0}});return <group ref={r}><mesh scale={[.88,1.2,.88]} castShadow><sphereGeometry args={[1,72,54]}/><meshPhysicalMaterial color="#a5adb2" metalness={.82} roughness={.14} clearcoat={1}/></mesh>{day>=2&&<pointLight position={[0,0,.8]} color="#ffd78b" intensity={day*2} distance={3}/>}</group>}
function Cave(){return <group>
 <mesh position={[0,3,-4]} scale={[5.3,2.5,1.4]}><dodecahedronGeometry args={[1,3]}/><meshStandardMaterial color="#20211f" roughness={1}/></mesh>
 {[[-2.5,.4,-1.8],[2.5,.45,-1.6],[-2.7,1.7,-2.3],[2.7,1.8,-2.2],[-1.8,2.8,-2.9],[1.8,2.9,-2.9]].map((p,i)=><mesh key={i} position={p as [number,number,number]} scale={[1.4,.95,1.2]} rotation={[i*.12,i*.43,i*.05]} castShadow><dodecahedronGeometry args={[1,2]}/><meshStandardMaterial color={i%2?'#3a342e':'#292a27'} roughness={.96}/></mesh>)}
 <mesh position={[1.75,-.49,-.9]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.1,56]}/><meshPhysicalMaterial color="#39636a" roughness={.12} clearcoat={.7}/></mesh>
 <mesh position={[1.8,.45,-2.65]} scale={[.48,1.8,.1]}><planeGeometry/><meshPhysicalMaterial color="#9bdde2" transparent opacity={.52}/></mesh>
 <mesh position={[-1.7,-.36,-.8]}><cylinderGeometry args={[.5,.62,.2,32]}/><meshStandardMaterial color="#4b3829" roughness={.9}/></mesh>
 <pointLight position={[-1.7,.3,.1]} color="#ff914d" intensity={10} distance={4}/><pointLight position={[2.2,2,-1]} color="#bcecff" intensity={5} distance={5}/>
 </group>}
export default function Scene({mode='nest',day=1,mood='neutral'}:{mode?:Mode,day?:number,mood?:Mood}){const hero=mode==='portrait'||mode==='hatch',egg=mode==='egg',nest=mode==='nest';return <div className="threeScene"><Canvas shadows dpr={[1,1.8]} camera={{position:egg?[0,.3,4.2]:hero?[0,.55,3.25]:[0,1.2,5.2],fov:nest?44:34}} gl={{powerPreference:'high-performance',antialias:true}}>
 <color attach="background" args={[nest?'#17191a':'#090c0e']}/><fog attach="fog" args={[nest?'#17191a':'#090c0e',5.5,11]}/><ambientLight intensity={nest?.7:.48}/><spotLight castShadow position={[-3,5,4]} angle={.48} penumbra={1} intensity={nest?5:9} color="#ffd2a0"/>
 {egg?<Egg day={day}/>:<>{nest&&<Cave/>}<Moki hero={hero} mood={mood}/></>}<mesh rotation={[-Math.PI/2,0,0]} position={[0,nest?-.64:-1.15,0]} receiveShadow><planeGeometry args={[10,10]}/><meshStandardMaterial color={nest?'#604a37':'#111517'} roughness={.96}/></mesh>
 <ContactShadows position={[0,nest?-.62:-1.12,0]} opacity={.72} scale={5} blur={2.7} far={3}/><Environment preset="sunset"/></Canvas><div className="sceneVignette"/></div>}