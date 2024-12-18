import OrderDetails from "@/components/common/Order/OrderDetails";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { id } = await params;

  return (
    <div>
      <OrderDetails id={id}></OrderDetails>
    </div>
  );
};

export default page;