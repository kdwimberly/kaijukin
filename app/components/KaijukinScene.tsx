'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,Float,MeshReflectorMaterial,RoundBox} from '@react-three/drei';
import * as THREE from 'three';
import {useRef} from 'react';

function Moki(){
 const group=useRef<THREE.Group>(null!);
 useFrame(({clock})=>{if(group.current){group.current.position.y=.38+Math.sin(clock.elapsedTime*2)*.025;group.current.rotation.y=Math.sin(clock.elapsedTime*.55)*.08}});
 const dark=new THREE.MeshStandardMaterial({color:'#050608',roughness:.32,metalness:.08});
 return <group ref={group} position={[0,.38,.3]} scale={.92}>
  <mesh material={dark} scale={[1.18,.82,.82]}><sphereGeometry args={[.68,48,32]}/></mesh>
  <mesh material={dark} position={[.35,.63,-.02]} rotation={[0,0,-.36]} scale={[.43,.85,.28]}><sphereGeometry args={[.65,32,24]}/></mesh>
  <mesh position={[-.22,.17,.61]}><sphereGeometry args={[.09,24,18]}/><meshStandardMaterial color="white" emissive="white" emissiveIntensity={.3}/></mesh>
  <mesh position={[.22,.17,.61]}><sphereGeometry args={[.09,24,18]}/><meshStandardMaterial color="white" emissive="white" emissiveIntensity={.3}/></mesh>
  <mesh position={[0,-.08,.67]} scale={[1.2,.65,.35]}><sphereGeometry args={[.075,20,16]}/><meshStandardMaterial color="#e67d8c" roughness={.55}/></mesh>
  {[[-.58,-.37,.34],[.58,-.37,.34],[-.35,-.4,-.28],[.35,-.4,-.28]].map((p,i)=><mesh key={i} material={dark} position={p as [number,number,number]} scale={[.43,.26,.48]}><sphereGeometry args={[.45,24,18]}/></mesh>)}
 </group>
}
function Rocks(){return <>{[[-2,.15,-1.5,.8],[2,.1,-1.2,1.1],[-1.7,.25,.5,.65],[1.8,.3,.7,.75],[-2.2,.5,-.2,.65],[2.3,.55,-.3,.8]].map((r,i)=><mesh key={i} position={[r[0],r[1],r[2]]} scale={[r[3],r[3]*.7,r[3]]} rotation={[0,i*.7,.15]}><dodecahedronGeometry args={[1,1]}/><meshStandardMaterial color={i%2?'#1b1d1d':'#242525'} roughness={.96}/></mesh>)}</>}
export default function KaijukinScene(){return <div className="threeScene"><Canvas camera={{position:[0,2.05,4.8],fov:39}} dpr={[1,1.6]} gl={{antialias:true,alpha:false}}><color attach="background" args={['#090d0f']}/><fog attach="fog" args={['#090d0f',4.5,9]}/><ambientLight intensity={.55}/><directionalLight position={[-2,5,3]} intensity={2.2} color="#dff4ff"/><pointLight position={[-2,.65,1.4]} intensity={8} distance={4} color="#ff8a3d"/><spotLight position={[2.4,4,-1]} angle={.42} penumbra={1} intensity={10} color="#a8d9df"/><Rocks/><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.03,0]}><circleGeometry args={[4,64]}/><MeshReflectorMaterial color="#191816" roughness={.9} metalness={0} blur={[300,80]} resolution={256} mixBlur={1} mixStrength={.35}/></mesh><Moki/><Float speed={1.4} floatIntensity={.12}><RoundBox args={[.32,.18,.32]} radius={.08} position={[-1.25,.2,.8]}><meshStandardMaterial color="#b78c49" roughness={.6}/></RoundBox></Float><Environment preset="night"/></Canvas><div className="sceneVignette"/></div>}
