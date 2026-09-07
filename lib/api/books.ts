import { Book } from "@/types/book";

const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export async function getBooksByStatus(
  status: "selected" | "recommended" | "suggested"
): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/getBooks?status=${status}`);
  if (!res.ok) throw new Error(`Failed to fetch ${status} books`);
  const data = await res.json();
  // "selected" returns a single object, not an array
  return Array.isArray(data) ? data : [data];
}

export async function getBookById(id: string): Promise<Book> {
  const res = await fetch(`${BASE_URL}/getBook?id=${id}`);
  if (!res.ok) throw new Error(`Failed to fetch book ${id}`);
  return res.json();
}

export async function searchBooks(query: string): Promise<Book[]> {
  const res = await fetch(
    `${BASE_URL}/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}