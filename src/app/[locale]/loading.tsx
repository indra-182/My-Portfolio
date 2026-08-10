import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section
      className="content-shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:py-36"
      aria-label="Loading portfolio"
    >
      <div className="space-y-6">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-32 w-full max-w-3xl" />
        <Skeleton className="h-20 w-full max-w-2xl" />
        <Skeleton className="h-12 w-40" />
      </div>
      <Skeleton className="mt-0 aspect-[1116/1409] w-full max-w-md lg:ml-auto lg:mt-10 lg:max-w-[22rem]" />
    </section>
  );
}
