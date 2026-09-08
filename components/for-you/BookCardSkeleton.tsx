export default function BookCardSkeleton() {
  return (
    <div className="w-[180px] shrink-0 animate-pulse">
      <div
        className="w-[180px] aspect-square bg-gray-200 mb-3"
        style={{ borderRadius: "50% 50% 0 0" }}
      />
      <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mb-2 w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
