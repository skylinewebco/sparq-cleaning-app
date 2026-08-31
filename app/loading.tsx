export default function Loading() {
  return (
    <div className="container-x pt-32">
      <div className="skeleton h-8 w-40 rounded-full" />
      <div className="skeleton mt-6 h-14 w-3/4 max-w-xl rounded-2xl" />
      <div className="skeleton mt-4 h-6 w-2/3 max-w-lg rounded-xl" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton aspect-[4/3] rounded-none" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-5 w-2/3 rounded-lg" />
              <div className="skeleton h-4 w-full rounded-lg" />
              <div className="skeleton h-4 w-1/2 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
