"use client";

import LoaderC from "@/components/LoaderC";
import Island from "@/models/Island";
import Sky from "@/models/Sky";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Vector3, Euler, AmbientLight } from "three";
import { useEffect, useState } from "react";
import Bird from "@/models/Bird";
import Plane from "@/models/Plane";
import HomeINfo from "@/components/HomeINfo";

const adjustIslandForScreen = (width: number): [Vector3, Vector3, Euler] => {
  let screenScale: Vector3 = new Vector3();
  let screenPosition: Vector3 = new Vector3(0, -6.5, -43);
  let rotation: Euler = new Euler(0.1, 4.7, 0, "XYZ");

  if (width < 768) {
    screenScale.set(0.9, 0.9, 0.9);
  } else {
    screenScale.set(1, 1, 1);
  }

  return [screenScale, screenPosition, rotation];
};

const adjustPlaneForScreen = (width: number): [Vector3, Vector3] => {
  let screenScale: Vector3 = new Vector3();
  let screenPosition: Vector3 = new Vector3();
  //let rotation: Euler = new Euler(0.1, 4.7, 0, "XYZ");

  if (width < 768) {
    screenScale.set(1.5, 1.5, 1.5);
    screenPosition.set(0, -1.5, 0);
  } else {
    screenScale.set(3, 3, 3);
    screenPosition.set(0, -4, -4);
  }

  return [screenScale, screenPosition];
};

const Home = () => {
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreen(windowWidth);
  const [planeScale, planePosition] = adjustPlaneForScreen(windowWidth);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {<HomeINfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<LoaderC />}>
          <directionalLight position={[1, 1, 1]} intensity={1.3} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            //@ts-ignore
            skyColor="#0047AB"
            groundColor="#000000"
            intensity={0.6}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={[0.1, 4.7077, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 14.2, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
