"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setFontSize, FontSize } from "@/lib/redux/slices/readerSlice";

const SIZES: { value: FontSize; label: string; px: string }[] = [
  { value: "base", label: "Aa", px: "15px" },
  { value: "lg", label: "Aa", px: "18px" },
  { value: "xl", label: "Aa", px: "21px" },
  { value: "twoxl", label: "Aa", px: "24px" },
];

export default function FontSizeControl() {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector((state) => state.reader.fontSize);

  return (
    <div className="flex items-center gap-3 px-6 py-4">
      {SIZES.map(({ value, label, px }) => (
        <button
          key={value}
          type="button"
          onClick={() => dispatch(setFontSize(value))}
          className={`font-medium ${
            fontSize === value
              ? "text-[#032b41] border-b-2 border-[#2bd97c]"
              : "text-gray-400"
          }`}
          style={{ fontSize: px }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}