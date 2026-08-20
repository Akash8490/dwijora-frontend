import { Skeleton } from "@/app/components/ui/skeleton";
import { Container } from "@/app/components/containers/common/Container";

export function HomeSkeleton() {
  return (
    <>
      <section className="bg-surface-2">
        <Container className="py-16 md:py-28">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-16 w-72" />
          <Skeleton className="mt-6 h-10 w-3/4 max-w-2xl" />
          <Skeleton className="mt-3 h-6 w-2/3 max-w-xl" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container>
          <Skeleton className="mb-8 h-8 w-64" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
