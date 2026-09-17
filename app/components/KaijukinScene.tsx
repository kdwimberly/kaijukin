'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {ContactShadows,Environment,Float,MeshReflectorMaterial,RoundedBox} from '@react-three/drei';
import * as THREE from 'three';
import {useMemo,useRef} from 'react';

type SceneMode='nest'|'portrait';

function Moki({portrait=false}:{portrait?:boolean}){
 const group=useRef<THREE.Group>(null!);
 const bodyMat=useMemo(()=>new THREE.MeshPhysicalMaterial({color:'#050607',roughness:.22,metalness:.03,clearcoat:.55,clearcoatRoughness:.24}),[]);
 useFrame(({clock})=>{if(group.current){const t=clock.elapsedTime;group.current.position.y=(portrait?.2:.38)+Math.sin(t*1.75)*.026;group.current.rotation.y=Math.sin(t*.45)*.075;group.current.scale.y=1+Math.sin(t*1.75)*.012;}});
 return <group ref={group} position={[0,portrait?.2:.38,portrait?0:.3]} scale={portrait?1.22:.94}>
  <mesh material={bodyMat} scale={[1.24,.86,.9]} castShadow receiveShadow><sphereGeometry args={[.68,64,48]}/></mesh>
  <mesh material={bodyMat} position={[.34,.64,-.04]} rotation={[0,.04,-.34]} scale={[.42,.9,.31]} castShadow><sphereGeometry args={[.66,48,36]}/></mesh>
  <mesh material={bodyMat} position={[.47,.93,-.08]} rotation={[0,.05,-.5]} scale={[.23,.62,.2]} castShadow><sphereGeometry args={[.58,40,30]}/></mesh>
  {[-1,1].map((s)=><mesh key={`eye-${s}`} position={[s*.225,.18,.625]} scale={[.78,1.36,.34]} castShadow><sphereGeometry args={[.11,32,24]}/><meshStandardMaterial color="#f6fbff" emissive="#e7f7ff" emissiveIntensity={1.25} roughness={.25}/></mesh>)}
  <mesh position={[0,-.085,.69]} scale={[1.35,.7,.36]}><sphereGeometry args={[.075,30,20]}/><meshStandardMaterial color="#ef8795" emissive="#a93048" emissiveIntensity={.2} roughness={.45}/></mesh>
  <mesh material={bodyMat} position={[-.62,-.34,.36]} scale={[.48,.29,.55]} rotation={[0,.15,.08]} castShadow><sphereGeometry args={[.45,36,28]}/></mesh>
  <mesh material={bodyMat} position={[.62,-.34,.36]} scale={[.48,.29,.55]} rotation={[0,-.15,-.08]} castShadow><sphereGeometry args={[.45,36,28]}/></mesh>
  <mesh material={bodyMat} position={[-.36,-.42,-.25]} scale={[.38,.24,.46]} castShadow><sphereGeometry args={[.45,32,24]}/></mesh>
  <mesh material={bodyMat} position={[.36,-.42,-.25]} scale={[.38,.24,.46]} castShadow><sphereGeometry args={[.45,32,24]}/></mesh>
 </group>
}

function Rocks(){return <>{[[-2,.15,-1.5,.8],[2,.1,-1.2,1.1],[-1.7,.25,.5,.65],[1.8,.3,.7,.75],[-2.2,.5,-.2,.65],[2.3,.55,-.3,.8]].map((r,i)=><mesh key={i} position={[r[0],r[1],r[2]]} scale={[r[3],r[3]*.7,r[3]]} rotation={[0,i*.7,.15]} castShadow receiveShadow><dodecahedronGeometry args={[1,2]}/><meshStandardMaterial color={i%2?'#1b1d1d':'#242525'} roughness={.96}/></mesh>)}</>}

export default function KaijukinScene({mode='nest'}:{mode?:SceneMode}){
 const portrait=mode==='portrait';
 return <div className={`threeScene ${portrait?'portraitScene':''}`}><Canvas shadows camera={{position:portrait?[0,.65,3.35]:[0,2.05,4.8],fov:portrait?34:39}} dpr={[1,2]} gl={{antialias:true,alpha:portrait}}><color attach="background" args={[portrait?'#0b1013':'#090d0f']}/><fog attach="fog" args={[portrait?'#0b1013':'#090d0f',4.5,9]}/><ambientLight intensity={portrait?.7:.5}/><directionalLight castShadow position={[-2,5,3]} intensity={portrait?3:2.2} color="#dff4ff" shadow-mapSize-width={1024} shadow-mapSize-height={1024}/><pointLight position={[-2,.8,2]} intensity={portrait?12:8} distance={5} color="#ff9f55"/><spotLight position={[2.6,4,1]} angle={.38} penumbra={1} intensity={portrait?16:10} color="#b8e5ec"/>{!portrait&&<><Rocks/><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.03,0]} receiveShadow><circleGeometry args={[4,64]}/><MeshReflectorMaterial color="#191816" roughness={.9} metalness={0} blur={[300,80]} resolution={256} mixBlur={1} mixStrength={.35}/></mesh><Float speed={1.4} floatIntensity={.12}><RoundedBox args={[.32,.18,.32]} radius={.08} position={[-1.25,.2,.8]} castShadow><meshStandardMaterial color="#b78c49" roughness={.6}/></RoundedBox></Float></>}<Moki portrait={portrait}/>{portrait&&<><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.58,0]} receiveShadow><circleGeometry args={[2.2,64]}/><meshStandardMaterial color="#11171a" roughness={.9}/></mesh><ContactShadows position={[0,-.56,0]} opacity={.65} scale={4} blur={2.6} far={2.5}/></>}<Environment preset="night"/></Canvas><div className="sceneVignette"/></div>}
