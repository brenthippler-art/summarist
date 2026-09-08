"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX, FiClock } from "react-icons/fi";
import { Book } from "@/types/book";
import { searchBooks } from "@/lib/api/books";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useBookDuration } from "@/hooks/useBookDuration";
import { formatTime } from "@/lib/utils/formatTime";
import SearchResultsSkeleton from "./SearchResultsSkeleton";

function SearchResultRow({ book }: { book: Book }) {
  const duration = useBookDuration(book.audioLink);

  return (
    <Link
      href={`/book/${book.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50"
    >
      <div className="relative w-20 h-20 shrink-0">
        <Image
          src={book.imageLink}
          alt={book.title}
          fill
          className="object-contain"
          sizes="44px"
        />
      </div>
      <div className="min-w-0">
        <p className="text-base font-medium text-brand-navy py-1">
          {book.title}
        </p>
        <p className="text-sm text-gray-400 truncate">{book.author}</p>
        {duration !== null && (
          <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <FiClock size={12} />
            {formatTime(duration)}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    searchBooks(trimmed)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const showDropdown = query.trim().length > 0;

  return (
    <div className="relative w-[220px] sm:w-[280px] md:w-[330px]">
      <div className="flex items-center border-2 border-gray-300 rounded-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
          className="flex-1 min-w-0 h-10 px-3 outline-none text-sm bg-gray-100 rounded-l-lg"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="w-10 h-10 flex items-center justify-center border-l border-gray-300 bg-gray-100 text-brand-navy hover:text-gray-700 rounded-r-lg"
          >
            <FiX size={24} />
          </button>
        ) : (
          <span className="w-10 h-10 flex items-center justify-center border-l bg-gray-100 text-brand-navy border-gray-300 rounded-r-lg">
            <FiSearch size={18} />
          </span>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-[90vw] max-w-[420px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {isLoading ? (
            <SearchResultsSkeleton />
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 font-light">
              No books found
            </p>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[620px] font-light overflow-y-auto">
              {results.map((book) => (
                <SearchResultRow key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
