import { FaDollarSign, FaUsers, FaBox, FaStore, FaShoppingCart, FaStar } from "react-icons/fa";

function DashboardSkeleton() {
  const skeletonData = [
    {  label: "Total Earnings" },
    {  label: "Total Users" },
    { label: "Total Products" },
    {  label: "Total Customers" },
    {  label: "Total Vendors" },
    { label: "Total Orders" },
    {  label: "Total Reviews" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {skeletonData.map((item) => (
        <div
          key={item?.label}
          className="flex items-center bg-white border rounded-sm overflow-hidden shadow animate-pulse"
        >
          <div className="p-10 bg-slate-300 flex items-center justify-center">
            
          </div>
          <div className="px-4 text-gray-700">
            <h2 className="text-xl font-semibold"></h2>
            <div className="mt-2 h-8 w-24 bg-gray-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardSkeleton;
