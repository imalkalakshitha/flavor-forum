
import { useState } from "react";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, ChefHat } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for recipes
const recipesMock = [
  {
    id: "1",
    title: "Garlic Butter Shrimp Pasta",
    description: "A creamy garlic butter shrimp pasta that's quick and easy to make, perfect for weeknight dinners.",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&q=75&fit=crop",
    authorName: "Emma Wilson",
    authorAvatar: undefined,
    likes: 124,
    comments: 32,
    cookingTime: "25 mins",
  },
  {
    id: "2",
    title: "Classic Beef Lasagna",
    description: "Layers of pasta, rich meat sauce, and creamy cheese make this lasagna a family favorite.",
    imageUrl: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&q=75&fit=crop",
    authorName: "Mark Johnson",
    authorAvatar: undefined,
    likes: 98,
    comments: 24,
    cookingTime: "1 hr 15 mins",
  },
  {
    id: "3",
    title: "Vegetarian Buddha Bowl",
    description: "A nourishing bowl filled with roasted vegetables, grains, and a delicious tahini dressing.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&q=75&fit=crop",
    authorName: "Sarah Chen",
    authorAvatar: undefined,
    likes: 156,
    comments: 41,
    cookingTime: "35 mins",
  },
  {
    id: "4",
    title: "Fluffy Blueberry Pancakes",
    description: "Start your day right with these light and fluffy pancakes loaded with fresh blueberries.",
    imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&q=75&fit=crop",
    authorName: "David Kim",
    authorAvatar: undefined,
    likes: 87,
    comments: 19,
    cookingTime: "20 mins",
  },
  {
    id: "5",
    title: "Crispy Baked Chicken Wings",
    description: "Perfectly crispy chicken wings baked in the oven and tossed in your favorite sauce.",
    imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&q=75&fit=crop",
    authorName: "Alex Rodriguez",
    authorAvatar: undefined,
    likes: 112,
    comments: 27,
    cookingTime: "45 mins",
  },
  {
    id: "6",
    title: "Homemade Margherita Pizza",
    description: "A classic Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&q=75&fit=crop",
    authorName: "Sophia Martinez",
    authorAvatar: undefined,
    likes: 143,
    comments: 38,
    cookingTime: "30 mins",
  },
  {
    id: "7",
    title: "Chocolate Lava Cake",
    description: "Decadent chocolate cake with a warm, gooey center, perfect for chocolate lovers.",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&q=75&fit=crop",
    authorName: "Michael Thompson",
    authorAvatar: undefined,
    likes: 178,
    comments: 45,
    cookingTime: "25 mins",
  },
  {
    id: "8",
    title: "Fresh Spring Rolls",
    description: "Light and healthy spring rolls filled with vegetables, herbs, and your choice of protein.",
    imageUrl: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&q=75&fit=crop",
    authorName: "Jennifer Lee",
    authorAvatar: undefined,
    likes: 92,
    comments: 21,
    cookingTime: "30 mins",
  },
];

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const { toast } = useToast();
  
  // Filter recipes based on search query and filters
  const filteredRecipes = recipesMock.filter(recipe => {
    // Search filter
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter (mock implementation - in a real app, recipes would have categories)
    const matchesCategory = categoryFilter === "all" ? true : 
      (categoryFilter === "quick" ? parseInt(recipe.cookingTime) < 30 : true);
    
    // Time filter
    const cookingTimeMinutes = parseInt(recipe.cookingTime);
    const matchesTime = 
      timeFilter === "all" ? true :
      timeFilter === "under15" ? cookingTimeMinutes <= 15 :
      timeFilter === "under30" ? cookingTimeMinutes <= 30 :
      timeFilter === "under60" ? cookingTimeMinutes <= 60 : true;
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  const handleLike = (id: string) => {
    toast({
      title: "Recipe liked",
      description: "This recipe has been added to your favorites.",
    });
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center">
          <ChefHat className="mr-2 h-8 w-8 text-primary" /> 
          Explore Recipes
        </h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="dessert">Desserts</SelectItem>
              <SelectItem value="quick">Quick Meals</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Cooking Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="under15">Under 15 minutes</SelectItem>
              <SelectItem value="under30">Under 30 minutes</SelectItem>
              <SelectItem value="under60">Under 1 hour</SelectItem>
              <SelectItem value="over60">Over 1 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
              authorName={recipe.authorName}
              authorAvatar={recipe.authorAvatar}
              likes={recipe.likes}
              comments={recipe.comments}
              cookingTime={recipe.cookingTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No recipes found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
