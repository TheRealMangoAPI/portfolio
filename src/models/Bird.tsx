import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

// @ts-ignore
import birdScene from "../../public/3d/bird.glb";
import { useFrame } from "@react-three/fiber";

interface BirdProps {}

const Bird: React.FC<BirdProps> = ({}) => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef<any>();
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    // @ts-ignore
    actions["Take 001"].play();
  }, []);

  useFrame(({ clock, camera }) => {
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      birdRef.current.rotation.y = 0;
    }

    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.02;
      birdRef.current.position.z -= 0.02;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.02;
      birdRef.current.position.z += 0.02;
    }
  });

  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
