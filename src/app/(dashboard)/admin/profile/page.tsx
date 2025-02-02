"use client";
import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { useGetAdminDashboard } from "@/hooks/dashboard";


const Profile = () => {
    const { data: { data } = {}, isLoading, error } = useGetAdminDashboard();
    if (isLoading) {
        return  <CardSkeleton />;
      }
    const admin = data?.data?.admin;
    console.log(admin)
    return (
        <div>
            <div className="mt-[10vh]"><ChangePassword /></div>
                      <ProfilePage
        name={admin?.name}
        email={admin?.email}
        role="admin" // Assuming a static role; adjust as necessary
        phone={admin?.phone || "N/A"} // Optional chaining for missing data
        address={admin?.address}
        profilePhoto={admin?.image || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"} // Fallback if no image
      />

        </div>
    )
};

export default Profile;