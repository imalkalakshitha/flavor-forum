
import ProfileEdit from "@/components/profile/ProfileEdit";

// Mock profile data
const mockProfile = {
  id: "john-doe",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: undefined,
  bio: "Food enthusiast and home chef. I love creating simple, delicious recipes that anyone can make at home.",
  location: "San Francisco, CA",
  website: "https://johndoe-chef.com",
};

const ProfileEditPage = () => {
  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <ProfileEdit profile={mockProfile} />
    </div>
  );
};

export default ProfileEditPage;
