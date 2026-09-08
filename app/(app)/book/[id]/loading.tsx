export default function BookLoading() {
  return (
    <div className="flex gap-12 animate-pulse">
      <div className="flex-1 max-w-[620px]">
        <div className="h-9 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />

        <div className="flex items-center gap-8 py-4 border-y border-gray-200 mb-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="h-11 bg-gray-200 rounded w-28" />
          <div className="h-11 bg-gray-200 rounded w-28" />
        </div>

        <div className="h-5 bg-gray-200 rounded w-48 mb-8" />

        <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
        <div className="flex gap-3 mb-6">
          <div className="h-9 bg-gray-200 rounded-full w-32" />
          <div className="h-9 bg-gray-200 rounded-full w-36" />
        </div>

        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>

      <div className="w-[320px] shrink-0">
        <div className="w-full aspect-square bg-gray-200 rounded" />
      </div>
    </div>
  );
}
