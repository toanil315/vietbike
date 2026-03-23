export default function BikesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="h-10 w-72 bg-surface-container rounded-lg animate-pulse mb-4" />
      <div className="h-5 w-full max-w-2xl bg-surface-container rounded-lg animate-pulse mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-64 rounded-2xl bg-surface-container animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
