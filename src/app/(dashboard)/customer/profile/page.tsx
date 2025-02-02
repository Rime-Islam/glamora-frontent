"use client";
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { useGetUserDashboard } from "@/hooks/dashboard";


const Profile = () => {
    const { data: { data } = {}, isLoading, error } = useGetUserDashboard();
    if (isLoading) {
        return  <CardSkeleton />;
      }
    const user = data?.data?.user;
    return (
        <div>
                      <ProfilePage
        name={user?.name}
        email={user?.email}
        role="user" // Assuming a static role; adjust as necessary
        phone={user?.phone || "N/A"} // Optional chaining for missing data
        address={user?.address}
        profilePhoto={user?.image || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"} // Fallback if no image
      />
<div className="mt-[10vh]"><ChangePassword /></div>
        </div>
    )
};

export default Profile;