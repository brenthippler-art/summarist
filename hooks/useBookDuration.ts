"use client";

import { useEffect, useState } from "react";

export function useBookDuration(audioLink: string) {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = audioLink;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.src = "";
    };
  }, [audioLink]);

  return duration;
}