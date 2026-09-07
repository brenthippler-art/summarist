"use client";

import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { Book } from "@/types/book";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { formatTime } from "@/lib/utils/formatTime";
import { useAppSelector } from "@/lib/redux/hooks";
import { markAsFinished } from "@/lib/firebase/library";

export default function PlayerBar({ book }: { book: Book }) {
  const uid = useAppSelector((state) => state.auth.uid);

  const { isPlaying, currentTime, duration, togglePlay, seek, skip } = useAudioPlayer(
    book.audioLink,
    () => {
      if (uid) markAsFinished(uid, book.id);
    }
  );

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#042330] text-white grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 h-20 z-30">
      <div className="flex items-center gap-3 w-[240px] shrink-0">
        <div className="relative w-11 h-11 shrink-0">
          <Image
            src={book.imageLink}
            alt={book.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-normal whitespace-nowrap">{book.title}</p>
          <p className="text-sm text-gray-400">{book.author}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button onClick={() => skip(-10)} aria-label="Back 10 seconds">
          <MdReplay10 size={32} />
        </button>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-10 h-10 rounded-full bg-white text-[#032b41] flex items-center justify-center"
        >
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>
        <button onClick={() => skip(10)} aria-label="Forward 10 seconds">
          <MdForward10 size={32} />
        </button>
      </div>

      <div className="flex items-center gap-3 justify-center">
        <span className="text-sm w-12 text-right shrink-0">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #2bd97c ${progressPercent}%, #4b5563 ${progressPercent}%)`,
          }}
          className="w-80 h-1 rounded-full outline-none focus:outline-none appearance-none cursor-pointer
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3
    [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
    [&::-moz-range-thumb]:w-3
    [&::-moz-range-thumb]:h-3
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-white
    [&::-moz-range-thumb]:border-0"
        />
        <span className="text-sm w-12 shrink-0">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
