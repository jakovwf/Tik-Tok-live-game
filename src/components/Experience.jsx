import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { useGame } from "../hooks/useGame";
import { Character } from "./Character";
import * as THREE from "three";
import { useMemo } from "react";

export const Experience = () => {
  const { phase, redScore, blueScore, winner } = useGame();

  const diff = redScore - blueScore;
  const offset = Math.max(-4, Math.min(4, diff / 10));

  let redAnim = "idle";
  let blueAnim = "idle";
  
  if (phase === "playing") {
    redAnim = "pull";
    blueAnim = "pull";
  } else if (phase === "ended") {
    redAnim = winner === "red" ? "win" : "lose";
    blueAnim = winner === "blue" ? "win" : "lose";
  }

  const rawMudTexture = useTexture("/textures/mud.jpg");
  const mudTexture = useMemo(() => {
    const t = rawMudTexture.clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(8, 8);
    return t;
  }, [rawMudTexture]);

  const rawRopeTexture = useTexture("/textures/rope.png"); 
  const ropeTexture = useMemo(() => {
    const t = rawRopeTexture.clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, 8); 
    return t;
  }, [rawRopeTexture]);

  // --- PODESIO SAM KONOPAC DA BUDE VIŠLJI I DUŽI ---
  const ropeCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      // Crveni kraj (Desna strana) - Malo iza leđa (2.6) i visoko (1.9)
      new THREE.Vector3(2.6, 1.9, 0), 
      // Sredina - Visi (1.6)
      new THREE.Vector3(0, 1.6, 0),   
      // Plavi kraj (Leva strana) - Malo iza leđa (-2.6) i visoko (1.9)
      new THREE.Vector3(-2.6, 1.9, 0) 
    ]);
  }, []);

  return (
    <>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      <fog attach="fog" args={['#1a1a1a', 8, 20]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment preset="sunset" />

      <group position={[offset, 0, 0]}>
        {/* CRVENI TIM (Desno) - Gleda ka Levo (-PI/2) */}
        <Character 
          path={`/models/red_${redAnim}.glb`} 
          anim={redAnim} 
          position={[2, 0, 0]} 
          rotation={[0, -Math.PI / 2, 0]} 
        />

        {/* KONOPAC */}
        <mesh castShadow receiveShadow>
          <tubeGeometry args={[ropeCurve, 64, 0.06, 16, false]} />
          <meshStandardMaterial map={ropeTexture} roughness={0.8} bumpScale={1} color="#cccccc" />
        </mesh>

        {/* PLAVI TIM (Levo) - Gleda ka Desno (PI/2) */}
        <Character 
          path={`/models/blue_${blueAnim}.glb`} 
          anim={blueAnim} 
          position={[-2, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
        />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial map={mudTexture} roughness={0.8} color="#555555" />
      </mesh>
    </>
  );
};