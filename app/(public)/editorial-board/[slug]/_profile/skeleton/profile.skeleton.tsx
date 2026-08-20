import { Container } from "@/app/components/containers/common/Container";
import { Skeleton } from "@/app/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <>
      <div className="bg-surface-2 border-b border-brand">
        <Container className="py-12 md:py-20">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="mt-6 h-4 w-24" />
          <Skeleton className="mt-3 h-10 w-3/4 md:w-1/2" />
          <Skeleton className="mt-3 h-4 w-2/3" />
        </Container>
      </div>
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <Skeleton className="h-28 w-28 rounded-full sm:h-32 sm:w-32" />
              <div className="w-full space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="mt-10 space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="mt-10 space-y-3">
              <Skeleton className="h-6 w-48" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-56 rounded-xl" />
          </div>
        </div>
      </Container>
    </>
  );
}
