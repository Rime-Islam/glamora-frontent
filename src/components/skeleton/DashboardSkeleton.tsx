function DashboardSkeleton() {
  const skeletonData = [
    { label: "Total Orders" },
    { label: "Total Spent" },
    { label: "Total Discounts" },
    { label: "Shops Followed" },
    { label: "Total Reviews" },
    { label: "Order Status" },
    { label: "Payment Status" },
  ];

  return (
    <div>
      {/* Header skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-4 w-32 bg-gray-200 rounded-full mb-2" />
        <div className="h-8 w-56 bg-gray-200 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {skeletonData.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-3 w-24 bg-gray-200 rounded-full" />
              <div className="w-10 h-10 bg-gray-100 rounded-xl" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded-lg" />
            <div className="h-3 w-32 bg-gray-100 rounded-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;
