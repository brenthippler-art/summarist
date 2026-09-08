export default function SelectedBookSkeleton() {
  return (
    <section className="mb-10 animate-pulse">
      <div className="max-w: 680px h-6 bg-gray-200 rounded w-56 mb-4" />
      <div className="bg-gray-100 rounded-lg flex items-center gap-8 px-8 py-6 h-[172px]">
        <div className="flex-1 max-w-[280px] space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="w-px self-stretch bg-gray-200" />
        <div className="flex items-center gap-4">
          <div className="w-[120px] h-[120px] bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
