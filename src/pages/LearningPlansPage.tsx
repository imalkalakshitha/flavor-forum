
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Share2, BookmarkPlus, GraduationCap, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Mock data for learning plans
const learningPlansMock = [
  {
    id: "1",
    title: "Master Italian Cuisine",
    description: "A comprehensive 4-week plan to learn the fundamentals of Italian cooking, from pasta making to perfecting sauces.",
    imageUrl: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Marco Rossi",
    authorId: "marco-rossi",
    authorAvatar: undefined,
    duration: "4 weeks",
    difficulty: "Intermediate",
    participants: 54,
    likes: 187,
    comments: 29,
  },
  {
    id: "2",
    title: "Baking Fundamentals",
    description: "Learn the science behind baking perfect bread, cakes, and pastries with this step-by-step learning plan.",
    imageUrl: "https://images.unsplash.com/photo-1549118060-48932f6c5dfd?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Emily Green",
    authorId: "emily-green",
    authorAvatar: undefined,
    duration: "3 weeks",
    difficulty: "Beginner",
    participants: 72,
    likes: 231,
    comments: 47,
  },
  {
    id: "3",
    title: "Plant-Based Cooking Mastery",
    description: "Transform vegetables into delicious, satisfying meals with this comprehensive plant-based cooking course.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Alex Rivera",
    authorId: "alex-rivera",
    authorAvatar: undefined,
    duration: "4 weeks",
    difficulty: "Intermediate",
    participants: 41,
    likes: 162,
    comments: 35,
  },
];

interface LearningPlanCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorId: string;
  authorAvatar?: string;
  duration: string;
  difficulty: string;
  participants: number;
  likes: number;
  comments: number;
}

const LearningPlanCard = ({
  id,
  title,
  description,
  imageUrl,
  authorName,
  authorId,
  authorAvatar,
  duration,
  difficulty,
  participants,
  likes,
  comments,
}: LearningPlanCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
      toast({
        description: "You unliked this learning plan",
      });
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      toast({
        description: "You liked this learning plan",
      });
    }
  };

  return (
    <Card className="overflow-hidden learning-plan-card-hover border border-border/40">
      <Link to={`/learning-plans/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-medium text-white">
                {duration} • {difficulty}
              </p>
              <div className="flex items-center text-white">
                <Users className="h-3 w-3 mr-1" />
                <span className="text-xs">{participants}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/learning-plans/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex items-center mt-3">
          <Link to={`/profile/${authorId}`} className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{authorName}</span>
          </Link>
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
          
          <Link to={`/learning-plans/${id}#comments`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Comment</span>
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">{comments}</span>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookmarkPlus className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const LearningPlansPage = () => {
  const [learningPlans, setLearningPlans] = useState(learningPlansMock);
  
  return (
    <div className="container max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Learning Plans</h1>
        <Link to="/create-learning-plan">
          <Button>
            <GraduationCap className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex items-center">
              All Plans
            </TabsTrigger>
            <TabsTrigger value="beginner" className="flex items-center">
              Beginner
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="flex items-center">
              Intermediate
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center">
              Advanced
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPlans.map((plan) => (
              <LearningPlanCard key={plan.id} {...plan} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beginner" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPlans
              .filter((plan) => plan.difficulty === "Beginner")
              .map((plan) => (
                <LearningPlanCard key={plan.id} {...plan} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="intermediate" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPlans
              .filter((plan) => plan.difficulty === "Intermediate")
              .map((plan) => (
                <LearningPlanCard key={plan.id} {...plan} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPlans
              .filter((plan) => plan.difficulty === "Advanced")
              .map((plan) => (
                <LearningPlanCard key={plan.id} {...plan} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPlansPage;
