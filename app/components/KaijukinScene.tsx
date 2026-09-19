'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {ContactShadows,Environment} from '@react-three/drei';
import * as THREE from 'three';
import {useMemo,useRef} from 'react';
type Mode='egg'|'hatch'|'portrait'|'nest';

function Moki({hero=false}:{hero?:boolean}){
 const ref=useRef<THREE.Group>(null!);
 const mat=useMemo(()=>new THREE.MeshPhysicalMaterial({color:'#030405',roughness:.18,clearcoat:.8,clearcoatRoughness:.16}),[]);
 useFrame(({clock})=>{if(ref.current){const t=clock.elapsedTime;ref.current.position.y=(hero?.06:-.24)+Math.sin(t*1.5)*.018;ref.current.rotation.y=Math.sin(t*.35)*.035}});
 return <group ref={ref} scale={hero?1.25:.82}>
  <mesh material={mat} scale={[1.35,.82,.98]} castShadow><sphereGeometry args={[.7,64,48]}/></mesh>
  <mesh material={mat} position={[.25,.62,-.08]} rotation={[0,.04,-.3]} scale={[.38,.88,.3]} castShadow><sphereGeometry args={[.7,48,36]}/></mesh>
  <mesh material={mat} position={[.45,.92,-.12]} rotation={[0,.08,-.46]} scale={[.2,.55,.17]} castShadow><sphereGeometry args={[.6,40,30]}/></mesh>
  {[-1,1].map(s=><mesh key={s} position={[s*.25,.14,.67]} scale={[.7,1.35,.25]}><sphereGeometry args={[.115,32,24]}/><meshStandardMaterial color="#fff" emissive="#fff8e9" emissiveIntensity={1.25}/></mesh>)}
  <mesh position={[0,-.1,.715]} scale={[1.25,.65,.28]}><sphereGeometry args={[.075,28,20]}/><meshStandardMaterial color="#f47f91"/></mesh>
  {[[-.63,-.35,.4],[.63,-.35,.4],[-.48,-.36,-.28],[.48,-.36,-.28]].map((p,i)=><mesh key={i} material={mat} position={p as [number,number,number]} scale={i<2?[.5,.31,.58]:[.38,.25,.46]} castShadow><sphereGeometry args={[.46,32,24]}/></mesh>)}
 </group>
}
function Egg({day}:{day:number}){const ref=useRef<THREE.Group>(null!);useFrame(({clock})=>{if(ref.current){ref.current.position.y=Math.sin(clock.elapsedTime*1.3)*.03;ref.current.rotation.z=day>=4?Math.sin(clock.elapsedTime*15)*.012:0}});return <group ref={ref}><mesh scale={[.88,1.2,.88]} castShadow><sphereGeometry args={[1,64,48]}/><meshPhysicalMaterial color="#899298" metalness={.75} roughness={.17} clearcoat={.8}/></mesh>{day>=2&&<pointLight position={[0,0,.8]} color="#ffd78b" intensity={day*1.8} distance={3}/>}</group>}
function Cave(){
 const rock='#302b27',dark='#17191a';
 return <group>
  <mesh position={[0,2.8,-3.4]} scale={[4.8,2.2,1.2]}><dodecahedronGeometry args={[1,2]}/><meshStandardMaterial color={dark} roughness={1}/></mesh>
  {[[-2.3,.5,-1.7],[2.25,.5,-1.5],[-2.4,1.7,-2.2],[2.35,1.8,-2.1],[-1.7,2.6,-2.6],[1.7,2.7,-2.6]].map((p,i)=><mesh key={i} position={p as [number,number,number]} scale={[1.3,.9,1.15]} rotation={[i*.2,i*.5,i*.08]} castShadow><dodecahedronGeometry args={[1,2]}/><meshStandardMaterial color={i%2?rock:'#242321'} roughness={.95}/></mesh>)}
  <mesh position={[1.65,-.48,-.75]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.05,48]}/><meshPhysicalMaterial color="#315a61" roughness={.15} metalness={.08}/></mesh>
  <mesh position={[1.7,.35,-2.5]} scale={[.42,1.7,.12]}><planeGeometry/><meshPhysicalMaterial color="#82cbd6" transparent opacity={.55} roughness={.1}/></mesh>
  <mesh position={[-1.65,-.35,-.6]}><cylinderGeometry args={[.48,.58,.18,24]}/><meshStandardMaterial color="#4a392b" roughness={.9}/></mesh>
  <pointLight position={[-1.65,.25,.2]} color="#ff9c55" intensity={8} distance={4}/>
  <directionalLight position={[2.5,5,-1]} color="#ffd99e" intensity={3}/>
 </group>
}
export default function KaijukinScene({mode='nest',day=1}:{mode?:Mode;day?:number}){
 const hero=mode==='portrait'||mode==='hatch',egg=mode==='egg',nest=mode==='nest';
 return <div className="threeScene"><Canvas shadows dpr={[1,1.7]} camera={{position:egg?[0,.3,4.2]:hero?[0,.55,3.2]:[0,1.25,5.3],fov:nest?45:34}} gl={{powerPreference:'high-performance'}}>
  <color attach="background" args={[nest?'#161719':'#090c0e']}/><fog attach="fog" args={[nest?'#161719':'#090c0e',5,10]}/><ambientLight intensity={nest?.72:.48}/>
  <spotLight castShadow position={[-3,5,4]} angle={.5} penumbra={1} intensity={nest?4:8} color="#ffd6a0"/>
  {egg?<Egg day={day}/>:<>{nest&&<Cave/>}<Moki hero={hero}/></>}
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,nest?-.62:-1.15,0]} receiveShadow><planeGeometry args={[10,10]}/><meshStandardMaterial color={nest?'#554333':'#111517'} roughness={.95}/></mesh>
  <ContactShadows position={[0,nest?-.6:-1.12,0]} opacity={.65} scale={5} blur={2.5} far={3}/><Environment preset="sunset"/>
 </Canvas><div className="sceneVignette"/></div>
}