export default function BikeDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="h-8 w-60 bg-surface-container rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[380px] rounded-2xl bg-surface-container animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-surface-container rounded-lg animate-pulse" />
          <div className="h-5 w-full bg-surface-container rounded-lg animate-pulse" />
          <div className="h-5 w-5/6 bg-surface-container rounded-lg animate-pulse" />
          <div className="h-16 w-full bg-surface-container rounded-xl animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}
