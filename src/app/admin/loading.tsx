export default function AdminLoading() {
  return (
    <div className="p-8">
      <div className="h-8 w-56 bg-surface-container rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-2xl bg-surface-container animate-pulse"
          />
        ))}
      </div>
      <div className="h-105 rounded-2xl bg-surface-container animate-pulse" />
    </div>
  );
}
