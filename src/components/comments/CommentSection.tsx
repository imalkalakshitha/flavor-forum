
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MoreHorizontal, Reply, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  text: string;
  authorName: string;
  authorAvatar?: string;
  authorId: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  recipeId: string;
}

export const CommentSection = ({ recipeId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "This recipe is amazing! I made it last weekend and my family loved it. Will definitely make it again.",
      authorName: "Jane Smith",
      authorId: "jane-smith",
      createdAt: "2 days ago",
      likes: 5,
      isLiked: false,
    },
    {
      id: "2",
      text: "I substituted some ingredients and it still turned out great. Very versatile recipe!",
      authorName: "Mike Johnson",
      authorId: "mike-johnson",
      createdAt: "3 days ago",
      likes: 3,
      isLiked: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        description: "Please write something before posting a comment.",
      });
      return;
    }

    const comment: Comment = {
      id: `temp-${Date.now()}`,
      text: newComment,
      authorName: "Current User",
      authorId: "current-user",
      createdAt: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    toast({
      description: "Comment posted successfully!",
    });
  };

  const handleLikeComment = (id: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const isLiked = !comment.isLiked;
        return {
          ...comment,
          isLiked,
          likes: isLiked ? comment.likes + 1 : comment.likes - 1,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast({
      description: "Comment deleted successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
      
      {/* Add comment */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleAddComment}>Post</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Link to={`/profile/${comment.authorId}`}>
              <Avatar>
                <AvatarImage src={comment.authorAvatar} />
                <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link to={`/profile/${comment.authorId}`} className="font-medium hover:underline">
                    {comment.authorName}
                  </Link>
                  <span className="text-xs text-muted-foreground ml-2">
                    {comment.createdAt}
                  </span>
                </div>
                
                {comment.authorId === "current-user" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              <p className="text-sm">{comment.text}</p>
              
              <div className="flex items-center gap-4 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center p-0 h-auto ${comment.isLiked ? "text-red-500" : ""}`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <Heart className={`mr-1 h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                  <span className="text-xs">{comment.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center p-0 h-auto"
                >
                  <Reply className="mr-1 h-4 w-4" />
                  <span className="text-xs">Reply</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
