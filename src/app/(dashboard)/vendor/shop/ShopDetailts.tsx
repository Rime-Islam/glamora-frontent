import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IShop } from "@/interface/shop.interface";
import Image from "next/image";


const ShopDetails = ({ shop }: { shop: IShop }) => {
    return(
        <div >
             <h1 className="text-2xl  text-center mb-8 font-bold text-gray-800">{shop?.name} <span className="text-sm text-gray-700">( {shop?.location} )</span> </h1>
             <div className="flex text-sm text-gray-600 justify-evenly px-8 mb-2">
            <p className="">Shop ID: {shop?.shopId}</p>
            <p className="">
              Followers:
              {(shop?.followers?.length as number) > 0
                ? shop?.followers?.length
                : 0}
            </p>
          </div>
              <div className="flex justify-center">
            <img
              src={shop?.images[0] || "#"}
              alt={shop?.name}
              className="w-2/3 px-8 h-full object-cover rounded-md"
            />
          </div>
       
       <div className="mt-8">
       <h1 className="text-2xl text-center mb-8 font-bold text-gray-800">products</h1>
       <div className=" mx-auto px-8">
       <HoverEffect items={shop?.products as { productId: string; images: string; name: string; description: string; price: number; }[] || []} />

    </div>
       
       
       </div>

        </div>
    )
};

export default ShopDetails;