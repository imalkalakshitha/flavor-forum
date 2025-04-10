
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cake,
  Edit,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Settings,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileHeaderProps {
  profile: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate: string;
    followersCount: number;
    followingCount: number;
    recipesCount: number;
  };
  isOwnProfile?: boolean;
}

export const ProfileHeader = ({ profile, isOwnProfile = false }: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          
          {profile.bio && <p className="text-muted-foreground">{profile.bio}</p>}
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {profile.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {profile.location}
              </div>
            )}
            {profile.website && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="mr-1 h-4 w-4" />
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {profile.website.replace(/https?:\/\/(www\.)?/, "")}
                </a>
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <Cake className="mr-1 h-4 w-4" />
              Joined {profile.joinDate}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span className="font-semibold">{profile.recipesCount}</span>
              <span className="text-muted-foreground">recipes</span>
            </div>
            <Link to={`/profile/${profile.id}/followers`} className="flex items-center gap-1 hover:underline">
              <Users className="h-4 w-4" />
              <span className="font-semibold">{profile.followersCount}</span>
              <span className="text-muted-foreground">followers</span>
            </Link>
            <Link to={`/profile/${profile.id}/following`} className="flex items-center gap-1 hover:underline">
              <User className="h-4 w-4" />
              <span className="font-semibold">{profile.followingCount}</span>
              <span className="text-muted-foreground">following</span>
            </Link>
          </div>
        </div>
        
        <div>
          {isOwnProfile ? (
            <div className="flex gap-2">
              <Link to="/settings">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Link to="/profile/edit">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs defaultValue="recipes" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="recipes" className="flex items-center">
            <Utensils className="mr-2 h-4 w-4" />
            Recipes
          </TabsTrigger>
          <TabsTrigger value="cooking-plans" className="flex items-center">
            <Utensils className="mr-2 h-4 w-4" />
            Cooking Plans
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center">
            <Utensils className="mr-2 h-4 w-4" />
            Favorites
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
