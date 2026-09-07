import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="border-b border-gray-200">
          <div className="max-w-[1070px] mx-auto flex justify-end px-6 py-6">
            <SearchBar />
          </div>
        </div>
        <div className="max-w-[1070px] mx-auto px-6 py-10">{children}</div>
      </div>
    </div>
  );
}