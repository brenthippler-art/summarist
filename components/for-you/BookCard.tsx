"use client";

import Link from "next/link";
import Image from "next/image";
import { FiStar, FiClock } from "react-icons/fi";
import { Book } from "@/types/book";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBookDuration } from "@/hooks/useBookDuration";
import { formatTime } from "@/lib/utils/formatTime";
import BookPill from "./BookPill";

export default function BookCard({ book }: { book: Book }) {
  const isSubscribed = useAppSelector((state) => state.auth.isSubscribed);
  const showPill = book.subscriptionRequired && !isSubscribed;
  const duration = useBookDuration(book.audioLink);

  return (
    <Link href={`/book/${book.id}`} className="block w-[180px] shrink-0">
      <div className="flex justify-end mb-2 h-6">
        {showPill && <BookPill />}
      </div>

      <div className="relative w-[180px] aspect-square mb-3">
        <Image
          src={book.imageLink}
          alt={book.title}
          fill
          sizes="180px"
          className="object-contain"
        />
      </div>

      <h3 className="font-bold text-brand-navy text-base leading-snug mb-1">
        {book.title}
      </h3>
      <p className="text-[#6b757b] text-sm font-sans mb-1">{book.author}</p>
      <p className="text-brand-navy text-sm font-normal font-sans mb-2">
        {book.subTitle}
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        {duration !== null && (
          <span className="flex items-center gap-1 text-sm font-sans font-light">
            <FiClock className="text-[#6b757b]" size={16} />
            {formatTime(duration)}
          </span>
        )}
        <span className="flex items-center text-sm font-sans font-light gap-2">
          <FiStar className="text-[#6b757b]" size={16} />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}
