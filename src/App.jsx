import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { useEffect } from "react";
import { useGame } from "./hooks/useGame";

function App() {
  const { addScore } = useGame();

  // Test komande (Strelice)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") addScore("blue", 5);
      if (e.key === "ArrowRight") addScore("red", 5);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [addScore]);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 12], fov: 45 }}>
        {/* OVO FARBA 3D POZADINU U TAMNO SIVO */}
        <color attach="background" args={["#1a1a1a"]} /> 
        <Experience />
      </Canvas>
      <UI />
    </>
  );
}

export default App;