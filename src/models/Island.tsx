"use client";

import * as THREE from "three";
import React, { useRef, useEffect, MutableRefObject, use } from "react";
import { useGLTF } from "@react-three/drei";
import { Euler, Vector3, useFrame, useThree } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { a } from "@react-spring/three";

// @ts-ignore
import islandScene from "../../public/3d/island.glb";

type GLTFResult = GLTF & {
  nodes: {
    polySurface944_tree_body_0: THREE.Mesh;
    polySurface945_tree1_0: THREE.Mesh;
    polySurface946_tree2_0: THREE.Mesh;
    polySurface947_tree1_0: THREE.Mesh;
    polySurface948_tree_body_0: THREE.Mesh;
    polySurface949_tree_body_0: THREE.Mesh;
    pCube11_rocks1_0: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    //PaletteMaterial001: THREE.MeshStandardMaterial;
  };
};

interface IslandProps {
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  setCurrentStage: (stage: number) => void;
}

function Island({
  position,
  scale,
  rotation,
  isRotating,
  setIsRotating,
  setCurrentStage,
}: IslandProps) {
  const islandRef = useRef<THREE.Group | null>(
    null
  ) as MutableRefObject<THREE.Group | null>;

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene) as GLTFResult;

  const lastx = useRef<number>(0);
  const rotationSpeed = useRef<number>(0);
  const dampingFactor = 0.95;

  // eslint-disable-next-line
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastx.current = clientX;
  };

  // eslint-disable-next-line
  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  // eslint-disable-next-line
  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      if (!islandRef.current) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastx.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.005 * Math.PI;
      lastx.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // eslint-disable-next-line
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!islandRef.current) return;

    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  // eslint-disable-next-line
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!islandRef.current) return;

    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(0);
      }
    }
  });

  return (
    <a.group ref={islandRef} position={position} scale={scale} rotation={rotation}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}

export default Island;
