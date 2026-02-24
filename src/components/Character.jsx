import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Character({ path, anim, position, rotation, scale = 1.5 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, group);

  // Senke na modelu
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (actions) {
      const actionKey = Object.keys(actions)[0];
      const action = actions[actionKey];

      if (action) {
        // RESETUJ PRE NEGO ŠTO KRENEŠ
        action.reset().fadeIn(0.5);

        // --- HACK ZA ANIMACIJU: PRESKOČI POČETAK ---
        if (anim === 'pull') {
            // Ako animacija traje 2 sekunde, a hvatanje je 0.8s
            // Ovde kažemo: Kreni od 0.8s
            action.time = 0.8; 
            
            // Povećaj brzinu ako hoćeš da deluje teže/brže
            action.timeScale = 1.2; 
        } else {
            action.timeScale = 1;
        }

        action.play();
      }
      return () => action?.fadeOut(0.5);
    }
  }, [anim, path, actions]);

  return (
    <group ref={group} position={position} rotation={rotation} dispose={null}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

useGLTF.preload('/models/red_idle.glb');
useGLTF.preload('/models/blue_idle.glb');