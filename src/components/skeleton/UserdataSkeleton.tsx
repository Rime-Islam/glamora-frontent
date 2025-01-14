import { Skeleton } from "../ui/skeleton";

const UserDataSkeleton = () => {
    return (
        <div className="p-4 dark:bg-slate-500 bg-slate-200 mt-5 flex flex-col md:flex-row justify-between items-center rounded-xl">
        {/* Left Section */}
        <div className="flex gap-4 flex-col md:flex-row">
          <Skeleton className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        </div>
  
        {/* Status Section */}
        <Skeleton className="px-4 py-2 text-sm rounded-full bg-gray-300 w-24 h-8 mt-4 md:mt-0" />
  
        {/* Buttons Section */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <Skeleton className="w-20 h-10 rounded-md" />
          <Skeleton className="w-20 h-10 rounded-md" />
        </div>
      </div>
    )
}
export default UserDataSkeleton;