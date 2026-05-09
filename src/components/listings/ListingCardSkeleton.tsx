export function ListingCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden glass animate-pulse">
      <div className="h-52 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-white/5 rounded w-3/5" />
          <div className="h-4 bg-white/5 rounded w-1/6" />
        </div>
        <div className="h-3 bg-white/5 rounded w-2/5" />
        <div className="h-3 bg-white/5 rounded w-1/3" />
        <div className="h-5 bg-white/5 rounded w-1/4 mt-1" />
      </div>
    </div>
  );
}
