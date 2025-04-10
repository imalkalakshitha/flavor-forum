
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Mock profile data
const mockProfile = {
  id: "john-doe",
  name: "John Doe",
  avatar: undefined,
  bio: "Food enthusiast and home chef. I love creating simple, delicious recipes that anyone can make at home.",
  location: "San Francisco, CA",
  website: "https://johndoe-chef.com",
  joinDate: "January 2025",
  followersCount: 458,
  followingCount: 123,
  recipesCount: 42,
};

// Mock recipes data
const mockRecipes = [
  {
    id: "1",
    title: "Lemon Herb Roasted Chicken",
    description: "Juicy roasted chicken with a delicious lemon and herb flavor. Perfect for Sunday dinner!",
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "John Doe",
    likes: 189,
    comments: 45,
    cookingTime: "1h 30m",
  },
  {
    id: "2",
    title: "Classic Beef Stroganoff",
    description: "Creamy beef stroganoff with mushrooms served over egg noodles. A family favorite comfort food.",
    imageUrl: "https://images.unsplash.com/photo-1673913816586-aa75aa4bbb41?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "John Doe",
    likes: 142,
    comments: 32,
    cookingTime: "45 mins",
  },
  {
    id: "3",
    title: "Triple Chocolate Brownies",
    description: "Rich, fudgy brownies with three types of chocolate. Guaranteed to satisfy any chocolate craving!",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "John Doe",
    likes: 221,
    comments: 53,
    cookingTime: "40 mins",
  },
];

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState(mockProfile);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [isOwnProfile, setIsOwnProfile] = useState(true); // For demo, assuming it's the user's own profile
  
  useEffect(() => {
    // In a real app, you would fetch the profile data and recipes based on username
    console.log("Profile username:", username);
  }, [username]);

  return (
    <div className="container max-w-6xl mx-auto space-y-8">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
      
      <Tabs defaultValue="recipes">
        <TabsContent value="recipes" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cooking-plans" className="mt-0">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Cooking Plans Yet</h3>
            <p className="text-muted-foreground">
              Start creating cooking plans to share with others!
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground">
              When you find recipes you love, save them here!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
