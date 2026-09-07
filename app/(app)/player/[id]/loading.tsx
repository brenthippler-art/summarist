export default function PlayerLoading() {
  return (
    <div className="max-w-[750px] mx-auto pb-24 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-4 pb-4 border-b border-gray-200" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}