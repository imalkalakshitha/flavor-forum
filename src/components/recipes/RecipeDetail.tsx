
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookmarkPlus,
  Clock,
  Edit,
  Heart,
  MessageSquare,
  Share2,
  Utensils,
  Users,
} from "lucide-react";
import { CommentSection } from "@/components/comments/CommentSection";

interface RecipeDetailProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    authorName: string;
    authorAvatar?: string;
    authorId: string;
    createdAt: string;
    cookingTime: string;
    servings: number;
    ingredients: string[];
    steps: string[];
    tags: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    isSaved: boolean;
  };
  isOwner?: boolean;
}

export const RecipeDetail = ({ recipe, isOwner = false }: RecipeDetailProps) => {
  const [liked, setLiked] = useState(recipe.isLiked);
  const [likesCount, setLikesCount] = useState(recipe.likes);
  const [saved, setSaved] = useState(recipe.isSaved);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="container max-w-4xl mx-auto space-y-6">
      {/* Header with image */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Title and actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4 text-sm">{recipe.cookingTime}</span>
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isOwner && (
            <Link to={`/recipes/edit/${recipe.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleSave}
            className={saved ? "text-primary" : ""}
          >
            <BookmarkPlus className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </Button>
          
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>
      
      {/* Author info */}
      <div className="flex items-center space-x-3 py-3 border-b">
        <Link to={`/profile/${recipe.authorId}`}>
          <Avatar>
            <AvatarImage src={recipe.authorAvatar} />
            <AvatarFallback>{recipe.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link to={`/profile/${recipe.authorId}`} className="font-medium hover:underline">
            {recipe.authorName}
          </Link>
          <p className="text-sm text-muted-foreground">
            Posted on {recipe.createdAt}
          </p>
        </div>
      </div>
      
      {/* Description */}
      <div>
        <p className="text-lg leading-relaxed">{recipe.description}</p>
      </div>
      
      {/* Ingredients */}
      <div className="space-y-3">
        <h2 className="flex items-center text-xl font-semibold">
          <Utensils className="mr-2 h-5 w-5" />
          Ingredients
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ol className="space-y-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="space-y-2">
              <h3 className="font-medium">Step {index + 1}</h3>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {recipe.tags.map((tag) => (
          <Link key={tag} to={`/tag/${tag}`}>
            <Button variant="secondary" size="sm">
              #{tag}
            </Button>
          </Link>
        ))}
      </div>
      
      {/* Like and comment section */}
      <div className="flex items-center justify-between py-4 border-t">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className={`flex items-center ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`mr-2 h-5 w-5 ${liked ? "fill-current" : ""}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            <span>{recipe.comments}</span>
          </Button>
        </div>
      </div>
      
      {/* Comments */}
      <CommentSection recipeId={recipe.id} />
    </div>
  );
};
