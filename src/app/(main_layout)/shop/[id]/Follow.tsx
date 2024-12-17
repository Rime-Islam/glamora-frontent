"use client";
import { Button } from "@/components/ui/button";
import { useFollowShop } from "@/hooks/follow.hook";
import { IFollower, IShop } from "@/interface/shop.interface";
import { AuthContext } from "@/providers/AuthProvider";
import { HeartCrackIcon, HeartIcon } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

const FollowAction = ({ id, data }: { id: string; data: IShop }) => {
  const authData = useContext(AuthContext);

  const isEmailMatched = data?.followers?.some(
    (follower: IFollower) =>
        follower?.customer?.email &&
    follower.customer.email === authData?.user?.userEmail
  );

  const { mutate: addFollow } = useFollowShop();
  const { mutate: unFollow } = useFollowShop();
  const newFollow = (id: string) => {
    addFollow(id, {
      onSuccess: () => {
        toast.success("You started following this shop.");
      },
      onError: () => {
        toast.error("Try again!");
      },
    });
  };

  const removeFollow = (id: string) => {
    console.log(id);
    // unFollow(id, {
    //   onSuccess: () => {
    //     toast.success("You have unfollowed this shop.");
    //   },
    //   onError: () => {
    //     toast.error("Try again!");
    //   },
    // });
  };
  return (
    <div className="">
      {authData?.user?.role == "CUSTOMER" && (
        <>
          {isEmailMatched ? (
            <Button className="" size={"sm"} onClick={() => removeFollow(id)}>
              <span className="mb-0.5"> Unfollow</span>{" "}
              <HeartCrackIcon className="text-yellow-500 " />
            </Button>
          ) : (
            <Button size={"sm"} onClick={() => newFollow(id)}>
              <span className="mb-0.5"> Follow</span>{" "}
              <HeartIcon className="text-red-500" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FollowAction;