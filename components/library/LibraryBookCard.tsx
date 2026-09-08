"use client";

import Link from "next/link";
import Image from "next/image";
import { FiStar, FiClock } from "react-icons/fi";
import { LibraryEntry } from "@/lib/firebase/library";
import { useBookDuration } from "@/hooks/useBookDuration";
import { formatTime } from "@/lib/utils/formatTime";

export default function LibraryBookCard({ book }: { book: LibraryEntry }) {
  const duration = useBookDuration(book.audioLink);

  return (
    <Link href={`/book/${book.id}`} className="block w-[180px] shrink-0">
      <div className="relative w-[180px] aspect-square mb-3">
        <Image
          src={book.imageLink}
          alt={book.title}
          fill
          sizes="180px"
          className="object-contain"
        />
      </div>
      <h3 className="font-bold text-brand-navy text-md leading-snug mb-1">
        {book.title}
      </h3>
      <p className="text-gray-500 text-sm font-light mb-1">{book.author}</p>
      <p className="text-gray-600 text-sm mb-2">{book.subTitle}</p>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        {duration !== null && (
          <span className="flex items-center gap-1">
            <FiClock size={16} />
            {formatTime(duration)}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiStar className="text-gray-500" size={16} />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}
