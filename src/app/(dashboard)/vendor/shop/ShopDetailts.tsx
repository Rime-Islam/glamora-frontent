import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IShop } from "@/interface/shop.interface";
import Image from "next/image";


const ShopDetails = ({ shop }: { shop: IShop }) => {
    return(
        <div >
             <h1 className="text-2xl  text-center mb-8 font-bold text-gray-800">{shop?.name} <span className="text-sm text-gray-700">( {shop?.location} )</span> </h1>
             <div className="flex text-sm text-gray-600 justify-between px-8 mb-2">
            <p className="">Shop ID: {shop?.shopId}</p>
            <p className="">
              Followers:{" "}
              {(shop?.followers?.length as number) > 0
                ? shop?.followers?.length
                : 0}
            </p>
          </div>
              <div className="">
            <Image
              width={200}
              height={100}
              src={shop?.images[0] || "#"}
              alt={shop?.name}
              className="w-full px-8 h-full object-cover rounded-md"
            />
          </div>
       
       <div className="mt-8">
       <h1 className="text-2xl text-center mb-8 font-bold text-gray-800">products</h1>
       <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={shop?.products} />
    </div>
       
       
       </div>

        </div>
    )
};

export const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];

export default ShopDetails;