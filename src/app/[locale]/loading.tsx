import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="content-shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-36" aria-label="Loading portfolio">
      <div className="space-y-6">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-32 w-full max-w-3xl" />
        <Skeleton className="h-20 w-full max-w-2xl" />
        <Skeleton className="h-12 w-40" />
      </div>
      <Skeleton className="aspect-[4/5] w-full max-w-md lg:ml-auto" />
    </section>
  );
}
