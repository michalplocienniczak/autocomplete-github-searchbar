const LoadingSkeleton = () => (
  <ul className="animate-pulse overflow-y-auto flex flex-col gap-1">
    {Array.from({ length: 10 }).map((_, index) => (
      <li key={index} className="w-full min-h-7 bg-slate-700 rounded" />
    ))}
  </ul>
)

export default LoadingSkeleton
