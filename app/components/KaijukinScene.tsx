'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {ContactShadows,Environment,MeshReflectorMaterial} from '@react-three/drei';
import * as THREE from 'three';
import {useMemo,useRef} from 'react';

type Mode='egg'|'hatch'|'portrait'|'nest';

function Moki({hero=false}:{hero?:boolean}){
 const ref=useRef<THREE.Group>(null!);
 const mat=useMemo(()=>new THREE.MeshPhysicalMaterial({color:'#050608',roughness:.2,clearcoat:.72,clearcoatRoughness:.2}),[]);
 useFrame(({clock})=>{if(ref.current){const t=clock.elapsedTime;ref.current.position.y=(hero?.12:.34)+Math.sin(t*1.7)*.022;ref.current.rotation.y=Math.sin(t*.42)*.06}});
 return <group ref={ref} scale={hero?1.2:.95}>
  <mesh material={mat} scale={[1.28,.82,.93]} castShadow><sphereGeometry args={[.68,64,48]}/></mesh>
  <mesh material={mat} position={[.34,.61,-.06]} rotation={[0,.04,-.34]} scale={[.4,.86,.3]} castShadow><sphereGeometry args={[.68,48,36]}/></mesh>
  <mesh material={mat} position={[.48,.91,-.1]} rotation={[0,.08,-.5]} scale={[.22,.58,.18]} castShadow><sphereGeometry args={[.58,40,30]}/></mesh>
  {[-1,1].map(s=><mesh key={s} position={[s*.235,.165,.642]} scale={[.74,1.38,.28]}><sphereGeometry args={[.112,32,24]}/><meshStandardMaterial color="#fffaf0" emissive="#fff7e8" emissiveIntensity={1.5}/></mesh>)}
  <mesh position={[0,-.09,.695]} scale={[1.3,.7,.32]}><sphereGeometry args={[.074,28,20]}/><meshStandardMaterial color="#f48c9d" roughness={.4}/></mesh>
  {[[-.62,-.34,.37],[.62,-.34,.37],[-.38,-.39,-.27],[.38,-.39,-.27]].map((p,i)=><mesh key={i} material={mat} position={p as [number,number,number]} scale={i<2?[.5,.3,.56]:[.38,.24,.46]} castShadow><sphereGeometry args={[.45,32,24]}/></mesh>)}
 </group>
}

function Egg({day=1}:{day?:number}){
 const ref=useRef<THREE.Group>(null!);
 useFrame(({clock})=>{if(ref.current){const t=clock.elapsedTime;ref.current.position.y=Math.sin(t*1.3)*.035;ref.current.rotation.z=day>=4?Math.sin(t*15)*.012:0}});
 return <group ref={ref}>
  <mesh scale={[.88,1.2,.88]} castShadow><sphereGeometry args={[1,72,54]}/><meshPhysicalMaterial color="#8d969c" metalness={.74} roughness={.18} clearcoat={.8}/></mesh>
  {day>=2&&<mesh position={[.1,.18,.87]} rotation={[0,0,.65]} scale={[.025,.5,.025]}><boxGeometry/><meshStandardMaterial color="#fff0ba" emissive="#ffc55d" emissiveIntensity={5}/></mesh>}
  {day>=3&&<mesh position={[-.12,-.12,.86]} rotation={[0,0,-.55]} scale={[.022,.42,.022]}><boxGeometry/><meshStandardMaterial color="#fff0ba" emissive="#ffc55d" emissiveIntensity={5}/></mesh>}
  {day>=4&&<pointLight position={[0,0,.7]} color="#ffd98c" intensity={10} distance={3}/>}
 </group>
}

function Cave(){
 return <group>
  {[[-2.1,.3,-1.2],[2,.2,-1.1],[-1.8,.15,.8],[1.9,.18,.7]].map((p,i)=><mesh key={i} position={p as [number,number,number]} scale={[1,.65,1]} castShadow><dodecahedronGeometry args={[1,2]}/><meshStandardMaterial color={i%2?'#1c2224':'#282c2d'} roughness={.95}/></mesh>)}
  <mesh position={[1.45,.03,-.1]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.72,48]}/><meshPhysicalMaterial color="#24464d" roughness={.18}/></mesh>
  <pointLight position={[-1.5,.55,.5]} color="#ff9955" intensity={7} distance={3.5}/>
  <pointLight position={[1.5,.75,-.1]} color="#8bd6df" intensity={4} distance={3}/>
 </group>
}

export default function KaijukinScene({mode='nest',day=1}:{mode?:Mode;day?:number}){
 const hero=mode==='portrait'||mode==='hatch',egg=mode==='egg';
 const cam=egg?[0,.3,4.2]:hero?[0,.62,3.25]:[0,1.85,4.7];
 return <div className={'threeScene '+(hero?'portraitScene ':'')+(egg?'eggScene':'')}>
  <Canvas shadows dpr={[1,1.8]} camera={{position:cam as [number,number,number],fov:egg?34:hero?33:39}}>
   <color attach="background" args={[egg?'#0d1114':'#090d0f']}/><fog attach="fog" args={['#090d0f',4.7,9]}/>
   <ambientLight intensity={.5}/><directionalLight castShadow position={[-2.8,5,3.8]} intensity={egg?4:2.8} color="#d9edff"/>
   <spotLight position={[2.6,4,2.2]} angle={.38} penumbra={1} intensity={egg?9:12} color="#ffd29b"/>
   {egg?<Egg day={day}/>:<>{mode==='nest'&&<Cave/>}<Moki hero={hero}/></>}
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,egg?-1.15:-.55,0]} receiveShadow><circleGeometry args={[egg?2.2:4,64]}/>{mode==='nest'?<MeshReflectorMaterial color="#171817" roughness={.92} blur={[220,70]} resolution={256} mixStrength={.22}/>:<meshStandardMaterial color="#101416" roughness={.94}/>}</mesh>
   <ContactShadows position={[0,egg?-1.12:-.53,0]} opacity={.62} scale={5} blur={2.4} far={3}/><Environment preset="night"/>
  </Canvas><div className="sceneVignette"/>
 </div>
}