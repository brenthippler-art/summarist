"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getBooksByStatus } from "@/lib/api/books";
import SelectedBook from "./SelectedBook";
import SelectedBookSkeleton from "./SelectedBookSkeleton";

export default function SelectedBookSection() {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getBooksByStatus("selected")
      .then((data) => {
        if (!cancelled) setBook(data[0] ?? null);
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
  }, []);

  if (isLoading) return <SelectedBookSkeleton />;
  if (error || !book) {
    return (
      <p className="text-red-600 text-sm mb-10">
        Couldn&apos;t load selected book.
      </p>
    );
  }

  return <SelectedBook book={book} />;
}
