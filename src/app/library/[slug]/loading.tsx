import { Skeleton } from "@/components/ui/skeleton";

export default function SummaryLoading() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-background shrink-0">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-9 w-24" />
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 p-12 space-y-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="pt-12">
              <Skeleton className="h-[600px] w-full rounded-xl" />
            </div>
          </div>
        </div>
        <aside className="w-80 border-l border-border p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-full w-full" />
        </aside>
      </div>
    </div>
  );
}
