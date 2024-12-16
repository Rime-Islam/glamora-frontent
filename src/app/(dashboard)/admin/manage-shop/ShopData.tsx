import { useBlockShop } from "@/hooks/shop.hook";
import { IShop } from "@/interface/shop.interface";
import Image from "next/image";
import { toast } from "sonner";


const ShopData = ({ Data }: { Data: IShop[] }) => {
    const { mutate } = useBlockShop();

    const blockShop = (id: string) => {
      mutate(id, {
        onSuccess: () => {
          toast.success("User Shop Status Changed");
        },
        onError: () => {
          toast.error("Something went wrong! Try again.");
        },
      });
    };
    
return (
    <div>
<table className="min-w-full divide-y bg-slate-300 dark:bg-gray-200  divide-gray-200">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Index
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Shop Image
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Shop Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Location
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Vendor Email
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Action
      </th>
    </tr>
  </thead>
    {
        Data.map((shop, index) => (
            <tbody key={shop?.shopId} className=" divide-y divide-gray-200">
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap">
      <Image
                width={100}
                height={100}
                src={shop?.images[0]}
                alt={shop?.name}
                className="h-10 w-20 object-cover rounded"
              />
      </td>
      <td className=" py-4 whitespace-nowrap">{shop?.name}</td>
      <td className=" py-4 whitespace-nowrap">
        <span className="px-6 py-4 whitespace-nowrap">
        {shop?.location}
        </span>
      </td>
      <td className=" py-4 whitespace-nowrap">
        <span className="px-6 py-4 whitespace-nowrap">
        {shop?.vendor?.email}
        </span>
      </td>
      <td className=" py-4 whitespace-nowrap">
        <span className="px-6 py-4 whitespace-nowrap">
        {shop?.isBlackListed ? (
                <span className="text-red-500">Blacklisted</span>
              ) : (
                <span className="text-green-500">Active</span>
              )}
        </span>
      </td>
      <td className=" py-4 whitespace-nowrap">
    
        <button onClick={() => blockShop(shop.shopId)} className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
          Block Shop
        </button>
      </td>
    </tr>
 
  </tbody>
        ))
    }
</table>

    </div>
)
};

export default ShopData;