import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// @ts-ignore
import skyScene from "../../public/3d/sky.glb";

interface SkyProps {
  isRotating: boolean;
}

export default function Sky({ isRotating }: SkyProps): JSX.Element {
  const sky = useGLTF(skyScene);
  const skyRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <mesh ref={skyRef} >
      <primitive object={sky.scene} />
    </mesh>
  );
}
