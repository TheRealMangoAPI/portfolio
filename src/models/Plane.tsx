import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

// @ts-ignore
import planeScene from "../../public/3d/plane.glb";

interface PlaneProps {
  isRotating: boolean;
  [key: string]: any;
}

const Plane: React.FC<PlaneProps> = ({ isRotating, ...props }) => {
  const ref = useRef<any>();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isRotating) {
      //@ts-ignore
      actions["Take 001"].play();
    } else {
      //@ts-ignore
      actions["Take 001"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh ref={ref} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
