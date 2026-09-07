import SelectedBookSection from "@/components/for-you/SelectedBookSection";
import BookRow from "@/components/for-you/BookRow";

export default function ForYouPage() {
  return (
    <>
      <SelectedBookSection />
      <BookRow
        status="recommended"
        title="Recommended For You"
        subtitle="We think you'll like these"
      />
      <BookRow status="suggested" title="Suggested Books" subtitle="Browse these books" />
    </>
  );
}