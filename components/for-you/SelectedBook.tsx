import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Book } from "@/types/books";

export default function SelectedBook({ book }: { book: Book }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-[#032b41] mb-4">Selected just for you</h2>
      <div className="max-w-[680px] bg-[#fbefda] rounded-md flex flex-col md:flex-row items-start gap-4 md:gap-8 px-8 py-8">
        <p className="md:hidden text-[#032b41] font-base">{book.subTitle}</p>

        <p className="hidden md:block text-[#032b41] font-base flex-1 max-w-[220px]">
          {book.subTitle}
        </p>

        <div className="hidden md:block w-px self-stretch bg-[#e0d5c0]" />

        <Link href={`/book/${book.id}`} className="flex items-start gap-4 hover:opacity-90">
          <Image
            src={book.imageLink}
            alt={book.title}
            width={140}
            height={140}
            className="rounded"
          />
          <div>
            <div className="font-bold text-[#032b41]">{book.title}</div>
            <div className="text-sm text-gray-700 mb-3">{book.author}</div>
            <div className="flex items-center gap-2">
              <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                <FaPlay size={16} />
              </span>
              <span className="text-sm font-medium text-[#032b41]">Play summary</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}