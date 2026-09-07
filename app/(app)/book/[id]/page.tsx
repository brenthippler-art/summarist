import { getBookById } from "@/lib/api/books";
import BookDetail from "@/components/book/BookDetail";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(id);

  return <BookDetail book={book} />;
}