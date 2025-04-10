
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, BookmarkPlus } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  comments: number;
  cookingTime: string;
}

export const RecipeCard = ({
  id,
  title,
  description,
  imageUrl,
  authorName,
  authorAvatar,
  likes,
  comments,
  cookingTime,
}: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden recipe-card-hover border border-border/40">
      <Link to={`/recipes/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-xs font-medium text-white">
              {cookingTime}
            </p>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/recipes/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex items-center mt-3">
          <Link to={`/profile/${authorName.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Like</span>
          </Button>
          <span className="text-sm text-muted-foreground">{likes}</span>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Comment</span>
          </Button>
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
