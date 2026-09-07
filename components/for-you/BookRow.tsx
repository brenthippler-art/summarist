"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getBooksByStatus } from "@/lib/api/books";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

interface BookRowProps {
  status: "recommended" | "suggested";
  title: string;
  subtitle: string;
}

export default function BookRow({ status, title, subtitle }: BookRowProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getBooksByStatus(status)
      .then((data) => {
        if (!cancelled) setBooks(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-[#032b41] mb-1 pb-3">{title}</h2>
      <p className="text-[#394547] text-lg font-light mb-4">{subtitle}</p>

      {error ? (
        <p className="text-red-600 text-sm">Couldn&apos;t load books. Please try again later.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <BookCardSkeleton key={i} />)
            : books.slice(0, 5).map((book) => <BookCard key={book.id} book={book} />)
          }
        </div>
      )}
    </section>
  );
}