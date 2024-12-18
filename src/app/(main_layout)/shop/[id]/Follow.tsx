"use client";
import { Button } from "@/components/ui/button";
import { useFollowShop, useUnfollowShop } from "@/hooks/follow.hook";
import { IFollower, IShop } from "@/interface/shop.interface";
import { AuthContext } from "@/providers/AuthProvider";
import { HeartCrackIcon, HeartIcon } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

const FollowAction = ({ id, data }: { id: string; data: IShop }) => {
  const authData = useContext(AuthContext);

  const isEmailMatched = data?.followers?.some(
    (follower: IFollower) =>
      follower.customer.email === authData?.user?.userEmail
  );

  const { mutate: addFollow } = useFollowShop();
  const { mutate: unFollow } = useUnfollowShop();
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
    unFollow(id, {
      onSuccess: () => {
        toast.success("You have unfollowed this shop.");
      },
      onError: () => {
        toast.error("Try again!");
      },
    });
  };
  return (
    <div className="">
      {authData?.user?.role == "CUSTOMER" && (
        <>
          {isEmailMatched ? (
            <Button size={"lg"} className="font-semibold" variant='destructive' onClick={() => removeFollow(id)}>
              <span className="mb-0.5"> Unfollow</span>
            
            </Button>
          ) : (
            <Button size={"lg"} variant='secondary' className="bg-blue-500 text-white font-semibold" onClick={() => newFollow(id)}>
              <span className="mb-0.5"> Follow</span>
         
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FollowAction;