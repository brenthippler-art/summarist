"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiStar, FiBookOpen, FiMic, FiBookmark, FiClock } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Book } from "@/types/book";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";
import {
  addToLibrary,
  removeFromLibrary,
  subscribeToLibrary,
} from "@/lib/firebase/library";
import { useBookDuration } from "@/hooks/useBookDuration";
import { formatTime } from "@/lib/utils/formatTime";

export default function BookDetail({ book }: { book: Book }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);
  const isSubscribed = useAppSelector((state) => state.auth.isSubscribed);
  const [isSaved, setIsSaved] = useState(false);
  const duration = useBookDuration(book.audioLink);

  useEffect(() => {
    if (!uid) {
      setIsSaved(false);
      return;
    }
    const unsubscribe = subscribeToLibrary(uid, (entries) => {
      setIsSaved(entries.some((entry) => entry.id === book.id));
    });
    return () => unsubscribe();
  }, [uid, book.id]);

  const handleReadOrListen = () => {
    if (!uid) {
      dispatch(openAuthModal("login"));
      return;
    }
    if (book.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }
    router.push(`/player/${book.id}`);
  };

  const handleToggleLibrary = () => {
    if (!uid) {
      dispatch(openAuthModal("login"));
      return;
    }
    if (isSaved) {
      removeFromLibrary(uid, book.id);
    } else {
      addToLibrary(uid, book);
    }
  };

  return (
    <div className="flex gap-12">
      <div className="flex-1 max-w-[620px]">
        <h1 className="text-3xl font-bold text-[#032b41] mb-2">{book.title}</h1>
        <p className="font-bold text-[#032b41] mb-2">{book.author}</p>
        <p className="text-[#032b41] text-xl font-light mb-4">
          {book.subTitle}
        </p>

        <div className="flex items-center gap-16 py-4 border-y border-gray-200 mb-6">
          <div className="flex flex-col gap-4 font-bold">
            <span className="flex items-center gap-2 text-sm text-[#032b41]">
              <FiStar className="text-[#032b41]" size={24} />
              {book.averageRating} ({book.totalRating} ratings)
            </span>
            <span className="flex items-center gap-2 text-sm text-[#032b41]">
              <FiMic size={24} />
              {book.type}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {duration !== null && (
              <span className="flex items-center gap-2 text-sm text-[#032b41]">
                <FiClock size={24} />
                {formatTime(duration)}
              </span>
            )}
            <span className="flex items-center gap-2 text-sm text-[#032b41] font-bold">
              <HiOutlineLightBulb size={24} />
              {book.keyIdeas} Key ideas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleReadOrListen}
            className="flex items-center gap-2 bg-[#032b41] text-white px-10 h-11 rounded font-medium hover:opacity-90"
          >
            <FiBookOpen size={16} />
            Read
          </button>
          <button
            onClick={handleReadOrListen}
            className="flex items-center gap-2 bg-[#032b41] text-white px-6 h-11 rounded font-medium hover:opacity-90"
          >
            <FiMic size={16} />
            Listen
          </button>
        </div>

        <button
          onClick={handleToggleLibrary}
          className="flex items-center gap-2 text-blue-600 text-lg font-medium mb-8 hover:text-blue-800"
        >
          <FiBookmark size={24} fill={isSaved ? "currentColor" : "none"} />
          {isSaved ? "Remove from My Library" : "Add title to My Library"}
        </button>

        <h2 className="font-bold text-lg text-[#032b41] mb-3">
          What&apos;s it about?
        </h2>
        <div className="flex gap-3 mb-6">
          {book.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              disabled
              className="bg-gray-100 text-[#032b41] text-base font-medium px-4 py-2 rounded-b-lg cursor-not-allowed disabled:opacity-100"
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="text-[#032b41] leading-relaxed mb-8 whitespace-pre-line">
          {book.bookDescription}
        </p>

        <h2 className="font-bold text-[#032b41] text-lg mb-3">
          About the author
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {book.authorDescription}
        </p>
      </div>

      <div className="w-[320px] shrink-0">
        <Image
          src={book.imageLink}
          alt={book.title}
          width={280}
          height={280}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
