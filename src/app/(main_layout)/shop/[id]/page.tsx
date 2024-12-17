
import React from "react";
import ShopDetails from "./ShopDetails";
const page = async ({ params }: { params: any }) => {
    const { id } = await params;
    return (
        <div>
 <ShopDetails id={id}></ShopDetails>
        </div>
    )
};

export default page;