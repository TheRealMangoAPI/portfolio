"use client";

// @ts-ignore
import freaky from "../../public/music/freaky-aylex.mp3";
import { useEffect, useRef, useState } from "react";
import { soundoff, soundon } from "../../public/icons";
import Image from "next/image";

interface ControlesProps {}

const Controles: React.FC<ControlesProps> = ({}) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(freaky));
  audioRef.current.volume = 0.3;
  audioRef.current.loop = true;

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlaying]);

  return (
    <div className="absolute bottom-5 left-5 z-50">
      <Image
        alt="sound"
        src={!isPlaying ? soundoff : soundon}
        className="w-12 h-12 cursor-pointer object-contain"
        onClick={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
};

export default Controles;
