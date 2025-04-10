
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Trophy, Calendar, Clock, Users, Heart, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for challenges
const challengesMock = [
  {
    id: "1",
    title: "30-Minute Meals Challenge",
    description: "Create a delicious, balanced meal in just 30 minutes using only 5 main ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&q=75&fit=crop&w=600&h=350",
    status: "active",
    startDate: "Apr 1, 2025",
    endDate: "Apr 15, 2025",
    participants: 78,
    progress: 40, // percentage completed
    prize: "Featured on homepage",
    entries: 28,
    likes: 145,
    comments: 32,
  },
  {
    id: "2",
    title: "Plant-Based Dessert Challenge",
    description: "Create a delicious dessert using only plant-based ingredients. Get creative!",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&q=75&fit=crop&w=600&h=350",
    status: "active",
    startDate: "Apr 5, 2025",
    endDate: "Apr 20, 2025",
    participants: 64,
    progress: 30, // percentage completed
    prize: "$50 Gift Card",
    entries: 19,
    likes: 112,
    comments: 27,
  },
  {
    id: "3",
    title: "Global Fusion Challenge",
    description: "Combine techniques and flavors from two different cultural cuisines to create something unique.",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&q=75&fit=crop&w=600&h=350",
    status: "upcoming",
    startDate: "Apr 20, 2025",
    endDate: "May 5, 2025",
    participants: 32,
    progress: 0, // percentage completed
    prize: "Cookbook Collection",
    entries: 0,
    likes: 67,
    comments: 14,
  },
  {
    id: "4",
    title: "Zero Waste Cooking Challenge",
    description: "Create a meal using commonly discarded food parts (stems, peels, etc.) to reduce food waste.",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&q=75&fit=crop&w=600&h=350",
    status: "completed",
    startDate: "Mar 10, 2025",
    endDate: "Mar 25, 2025",
    participants: 93,
    progress: 100, // percentage completed
    prize: "Premium Cookware Set",
    entries: 54,
    likes: 224,
    comments: 48,
  },
];

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "active" | "upcoming" | "completed";
  startDate: string;
  endDate: string;
  participants: number;
  progress: number;
  prize: string;
  entries: number;
  likes: number;
  comments: number;
}

const ChallengeCard = ({
  id,
  title,
  description,
  imageUrl,
  status,
  startDate,
  endDate,
  participants,
  progress,
  prize,
  entries,
  likes,
  comments,
}: ChallengeCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
      toast({
        description: "You unliked this challenge",
      });
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      toast({
        description: "You liked this challenge",
      });
    }
  };

  const getStatusColor = () => {
    switch(status) {
      case "active": return "bg-green-500";
      case "upcoming": return "bg-blue-500";
      case "completed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden challenge-card-hover border border-border/40">
      <Link to={`/challenges/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getStatusColor()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex justify-between items-center text-white">
              <div className="flex items-center text-xs">
                <Trophy className="h-3 w-3 mr-1" /> 
                <span>{prize}</span>
              </div>
              <div className="flex items-center text-xs">
                <Users className="h-3 w-3 mr-1" /> 
                <span>{participants}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/challenges/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{startDate} - {endDate}</span>
          </div>
          <div>
            {entries} {entries === 1 ? 'entry' : 'entries'}
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span>Challenge progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="sr-only">Like</span>
          </Button>
          <span className="text-sm text-muted-foreground">{likesCount}</span>
          
          <Link to={`/challenges/${id}#comments`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Comment</span>
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">{comments}</span>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState(challengesMock);

  const activeChallenges = challenges.filter(c => c.status === "active");
  const upcomingChallenges = challenges.filter(c => c.status === "upcoming");
  const completedChallenges = challenges.filter(c => c.status === "completed");
  
  return (
    <div className="container max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cooking Challenges</h1>
        <Link to="/create-challenge">
          <Button>
            <Trophy className="mr-2 h-4 w-4" />
            Create Challenge
          </Button>
        </Link>
      </div>
      
      {/* Active Challenges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          Active Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Challenges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          Upcoming Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
      
      {/* Completed Challenges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
          Completed Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
