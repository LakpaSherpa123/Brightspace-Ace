import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 p-6 border rounded-lg">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
        <div className="space-y-4 p-6 border rounded-lg">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
           <div className="space-y-3 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
       <div className="grid gap-6 md:grid-cols-2">
         <div className="space-y-4 p-6 border rounded-lg">
           <Skeleton className="h-6 w-1/2" />
            <div className="space-y-3 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
         </div>
         <div className="space-y-4 p-6 border rounded-lg">
           <Skeleton className="h-6 w-1/2" />
            <div className="space-y-3 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
         </div>
       </div>
    </div>
  );
}
