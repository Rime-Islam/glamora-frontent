import ChangePassword from "@/components/common/ChangePassword/ChangePassword";
import ProfilePage from "@/components/design/ProfilePage";
import { useGetVendorDashboard } from "@/hooks/dashboard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

const Profile = () => {
    const { data, isLoading, error } = useGetVendorDashboard();
    
      if (isLoading) {
        return  <CardSkeleton />;
      }
    const vendor = data?.data?.vendor;
    return (
        <div>
              <ProfilePage
        name={vendor.name}
        email={vendor.email}
        role="Vendor" // Assuming a static role; adjust as necessary
        phone={vendor.phone || "N/A"} // Optional chaining for missing data
        address={vendor.address}
        profilePhoto={vendor.image || "https://via.placeholder.com/150"} // Fallback if no image
      />
<div className="mt-[10vh]"><ChangePassword /></div>
        </div>
    )
};

export default Profile;