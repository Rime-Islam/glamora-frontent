interface ProfilePageProps {
    name: string;
    email: string;
    role: string;
    phone: string;
    address: string;
    profilePhoto: string;
  }
  
  const ProfilePage: React.FC<ProfilePageProps> = ({
    name,
    email,
    role,
    phone,
    address,
    profilePhoto,
  }) =>{

    return (
        <div className="  py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Profile Photo Section */}
            <div className="flex justify-center md:justify-start bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:w-1/3">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
              />
            </div>
  
            {/* User Details Section */}
            <div className="p-6 md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500 mb-4">{role}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-20 font-medium text-gray-600">Email:</span>
                  <span className="text-gray-800">{email}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 font-medium text-gray-600">Phone:</span>
                  <span className="text-gray-800">{phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 font-medium text-gray-600">Address:</span>
                  <span className="text-gray-800">{address}</span>
                </div>
              </div>
  
              {/* Edit and Settings Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded shadow">
                  Edit Profile
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded shadow">
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  