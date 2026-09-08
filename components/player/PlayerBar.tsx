"use client";

import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdReplay10, MdForward10 } from "react-icons/md";
import { Book } from "@/types/book";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { formatTime } from "@/lib/utils/formatTime";

export default function PlayerBar({ book }: { book: Book }) {
  const { isPlaying, currentTime, duration, togglePlay, seek, skip } =
    useAudioPlayer(book.audioLink);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const seekBar = (
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
      className="w-full min-w-0 h-1 rounded-full outline-none focus:outline-none appearance-none cursor-pointer
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
  );

  const controls = (
    <div className="flex items-center gap-4 shrink-0">
      <button onClick={() => skip(-10)} aria-label="Back 10 seconds">
        <MdReplay10 size={32} />
      </button>
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center"
      >
        {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
      </button>
      <button onClick={() => skip(10)} aria-label="Forward 10 seconds">
        <MdForward10 size={32} />
      </button>
    </div>
  );

  const bookInfo = (
    <div className="flex items-center gap-3">
      <div className="relative w-11 h-11 shrink-0">
        <Image
          src={book.imageLink}
          alt={book.title}
          fill
          className="object-contain"
          sizes="44px"
        />
      </div>
      <div>
        <p className="text-sm font-normal">{book.title}</p>
        <p className="text-sm text-gray-400">{book.author}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-navy-dark text-white z-30">
      {/* md and up: original three-column grid */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 h-20">
        <div className="flex items-center gap-3 md:flex-wrap md:min-w-0">
          {bookInfo}
        </div>
        {controls}
        <div className="flex items-center gap-3 justify-center min-w-0">
          <span className="text-sm w-12 text-right shrink-0">
            {formatTime(currentTime)}
          </span>
          {seekBar}
          <span className="text-sm w-12 shrink-0">{formatTime(duration)}</span>
        </div>
      </div>

      {/* below md: stacked layout */}
      <div className="md:hidden flex flex-col items-center gap-3 px-20 py-4">
        <div className="w-full flex justify-center">{bookInfo}</div>
        <div className="flex justify-center">{controls}</div>
        <div className="w-full flex items-center gap-3">
          <span className="text-sm w-12 px-14 text-right shrink-0">
            {formatTime(currentTime)}
          </span>
          {seekBar}
          <span className="text-sm w-12 shrink-0">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
