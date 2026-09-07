import { getBookById } from "@/lib/api/books";
import PlayerBar from "@/components/player/PlayerBar";
import BookSummary from "@/components/player/BookSummary";

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <div className="max-w-[750px] mx-auto pb-24">
      <h1 className="text-2xl font-bold text-[#032b41] mb-4 pb-4 border-b border-gray-200">
        {book.title}
      </h1>
      <BookSummary summary={book.summary} />
      <PlayerBar book={book} />
    </div>
  );
}