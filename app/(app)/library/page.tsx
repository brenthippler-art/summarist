"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";
import { subscribeToLibrary, LibraryEntry } from "@/lib/firebase/library";
import LibraryBookCard from "@/components/library/LibraryBookCard";

export default function LibraryPage() {
  const uid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState<LibraryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = subscribeToLibrary(uid, (data) => {
      setEntries(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [uid]);

  if (!uid) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-brand-navy mb-4 pb-4 border-b border-gray-200">
          My Library
        </h1>
        <div className="w-[460px] h-[402px] mx-auto flex flex-col items-center justify-between py-6">
          <div className="relative flex-1 w-full">
            <Image
              src="/login.png"
              alt="Login required"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-bold text-brand-navy text-lg">
            Log in to your account to see your library.
          </p>
          <button
            type="button"
            onClick={() => dispatch(openAuthModal("login"))}
            className="btn max-w-[200px]"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const savedBooks = entries.filter((entry) => !entry.finished);
  const finishedBooks = entries.filter((entry) => entry.finished);

  return (
    <div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-brand-navy mb-1">Saved Books</h2>
        <p className="text-gray-500 text-md mb-4">
          {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        </p>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : savedBooks.length === 0 ? (
          <p className="text-gray-500 text-sm">
            You haven&apos;t saved any books yet.
          </p>
        ) : (
          <div className="flex gap-12 overflow-hidden">
            {savedBooks.map((book) => (
              <LibraryBookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy mb-1">
          Finished Books
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          {finishedBooks.length} {finishedBooks.length === 1 ? "item" : "items"}
        </p>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : finishedBooks.length === 0 ? (
          <p className="text-gray-500 text-sm">
            You haven&apos;t finished any books yet.
          </p>
        ) : (
          <div className="flex gap-6 overflow-hidden">
            {finishedBooks.map((book) => (
              <LibraryBookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
