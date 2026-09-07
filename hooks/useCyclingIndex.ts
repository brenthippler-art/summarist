"use client";

import { useEffect, useState } from "react";

export function useCyclingIndex(length: number, intervalMs = 2500) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  return index;
}