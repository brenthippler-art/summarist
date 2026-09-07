import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Book } from "@/types/book";

export interface LibraryEntry {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  averageRating: number;
  subscriptionRequired: boolean;
  finished: boolean;
}

export function addToLibrary(uid: string, book: Book) {
  const ref = doc(db, "users", uid, "library", book.id);
  return setDoc(ref, {
    id: book.id,
    title: book.title,
    author: book.author,
    subTitle: book.subTitle,
    imageLink: book.imageLink,
    audioLink: book.audioLink,
    averageRating: book.averageRating,
    subscriptionRequired: book.subscriptionRequired,
    finished: false,
    addedAt: serverTimestamp(),
  });
}

export function removeFromLibrary(uid: string, bookId: string) {
  const ref = doc(db, "users", uid, "library", bookId);
  return deleteDoc(ref);
}

export function markAsFinished(uid: string, bookId: string) {
  const ref = doc(db, "users", uid, "library", bookId);
  return setDoc(ref, { finished: true }, { merge: true });
}

export function subscribeToLibrary(
  uid: string,
  callback: (entries: LibraryEntry[]) => void
) {
  const ref = collection(db, "users", uid, "library");
  return onSnapshot(ref, (snapshot) => {
    const entries = snapshot.docs.map((d) => d.data() as LibraryEntry);
    callback(entries);
  });
}