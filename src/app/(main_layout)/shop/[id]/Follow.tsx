"use client";
import { useFollowShop, useUnfollowShop } from "@/hooks/follow.hook";
import { IFollower, IShop } from "@/interface/shop.interface";
import { AuthContext } from "@/providers/AuthProvider";
import { Heart, HeartOff } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

const FollowAction = ({ id, data }: { id: string; data: IShop }) => {
  const authData = useContext(AuthContext);

  const isEmailMatched = data?.followers?.some(
    (follower: IFollower) =>
      follower.customer.email === authData?.user?.userEmail
  );

  const { mutate: addFollow, isPending: followPending } = useFollowShop();
  const { mutate: unFollow, isPending: unfollowPending } = useUnfollowShop();

  const newFollow = (id: string) => {
    addFollow(id, {
      onSuccess: () => {
        toast.success("You started following this shop! 💖");
      },
      onError: () => {
        toast.error("Something went wrong. Try again!");
      },
    });
  };

  const removeFollow = (id: string) => {
    unFollow(id, {
      onSuccess: () => {
        toast.success("You have unfollowed this shop.");
      },
      onError: () => {
        toast.error("Something went wrong. Try again!");
      },
    });
  };

  if (authData?.user?.role !== "CUSTOMER") return null;

  return (
    <div>
      {isEmailMatched ? (
        <button
          onClick={() => removeFollow(id)}
          disabled={unfollowPending}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white text-sm font-semibold hover:bg-red-500/80 hover:border-red-400 transition-all duration-300 disabled:opacity-50"
        >
          <HeartOff className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => newFollow(id)}
          disabled={followPending}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-rose-300/40 disabled:opacity-50"
        >
          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Follow Shop
        </button>
      )}
    </div>
  );
};

export default FollowAction;