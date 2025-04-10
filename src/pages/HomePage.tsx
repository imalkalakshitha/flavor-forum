import { useEffect, useState } from "react";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TrendingUp, Clock, Flame, Award, ChefHat } from "lucide-react";

// Mock data for recipes
const recipesMock = [
  {
    id: "1",
    title: "Garlic Butter Shrimp Pasta",
    description: "Creamy pasta with juicy garlic butter shrimp, ready in under 30 minutes. Perfect for a quick weeknight dinner!",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Emma Wilson",
    authorAvatar: undefined,
    likes: 124,
    comments: 32,
    cookingTime: "25 mins",
  },
  {
    id: "2",
    title: "Perfect Chocolate Chip Cookies",
    description: "Crispy on the outside, chewy on the inside - these chocolate chip cookies are simply perfect for any occasion.",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "John Baker",
    authorAvatar: undefined,
    likes: 287,
    comments: 54,
    cookingTime: "45 mins",
  },
  {
    id: "3",
    title: "Thai Green Curry with Vegetables",
    description: "Aromatic and spicy Thai curry packed with fresh vegetables and served with jasmine rice.",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Sarah Chang",
    authorAvatar: undefined,
    likes: 178,
    comments: 42,
    cookingTime: "40 mins",
  },
  {
    id: "4",
    title: "Homemade Margherita Pizza",
    description: "Classic Margherita pizza with a crispy crust, fresh mozzarella, tomatoes, and basil.",
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Marco Rossi",
    authorAvatar: undefined,
    likes: 210,
    comments: 38,
    cookingTime: "50 mins",
  },
  {
    id: "5",
    title: "Avocado Toast with Poached Egg",
    description: "The perfect breakfast - creamy avocado on toasted sourdough topped with a perfectly poached egg.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "Emily Green",
    authorAvatar: undefined,
    likes: 156,
    comments: 27,
    cookingTime: "15 mins",
  },
  {
    id: "6",
    title: "Beef and Vegetable Stir Fry",
    description: "A quick and healthy stir fry with tender beef strips and crisp vegetables in a savory sauce.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&q=75&fit=crop&w=600&h=350",
    authorName: "David Wong",
    authorAvatar: undefined,
    likes: 142,
    comments: 31,
    cookingTime: "20 mins",
  },
];

const HomePage = () => {
  const [recipes, setRecipes] = useState(recipesMock);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Home page loaded");
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setRecipes([...recipes, ...recipesMock.slice(0, 3)]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Discover Recipes</h1>
      </div>
      
      <Tabs defaultValue="trending" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center">
              <Flame className="mr-2 h-4 w-4" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Challenges
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <ChefHat className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button onClick={loadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.slice().reverse().map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-0">
          <div className="text-center py-12">
            <Award className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Active Challenges</h3>
            <p className="text-muted-foreground">
              Check back soon for new cooking challenges!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
