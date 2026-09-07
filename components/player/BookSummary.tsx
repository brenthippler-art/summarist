// components/player/BookSummary.tsx
"use client";

import { useAppSelector } from "@/lib/redux/hooks";

const FONT_SIZE_PX: Record<string, string> = {
  base: "16px",
  lg: "19px",
  xl: "22px",
  twoxl: "25px",
};

export default function BookSummary({ summary }: { summary: string }) {
  const fontSize = useAppSelector((state) => state.reader.fontSize);

  return (
    <p
      className="text-[#032b41] leading-relaxed whitespace-pre-line"
      style={{ fontSize: FONT_SIZE_PX[fontSize] }}
    >
      {summary}
    </p>
  );
}