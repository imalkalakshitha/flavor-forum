
import { useParams } from "react-router-dom";
import { RecipeDetail } from "@/components/recipes/RecipeDetail";

// Mock data for a recipe
const mockRecipe = {
  id: "1",
  title: "Garlic Butter Shrimp Pasta",
  description: "This creamy garlic butter shrimp pasta is one of my favorite dinners because it's so quick and easy, taking only 20 minutes to make. It's perfect for date night, a quick weeknight dinner, or entertaining guests because it's impressive yet simple. The garlic butter sauce is to die for!",
  imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&q=75&fit=crop",
  authorName: "Emma Wilson",
  authorId: "emma-wilson",
  authorAvatar: undefined,
  createdAt: "March 15, 2025",
  cookingTime: "25 mins",
  servings: 4,
  ingredients: [
    "8 oz (225g) linguine or fettuccine pasta",
    "1 lb (450g) large shrimp, peeled and deveined",
    "4 tablespoons butter, divided",
    "5 cloves garlic, minced",
    "1/4 teaspoon red pepper flakes (optional)",
    "1/4 cup white wine or chicken broth",
    "1/2 cup heavy cream",
    "1/4 cup freshly grated Parmesan cheese",
    "2 tablespoons fresh parsley, chopped",
    "1 tablespoon fresh lemon juice",
    "Salt and pepper, to taste"
  ],
  steps: [
    "Bring a large pot of salted water to a boil. Add pasta and cook according to package instructions until al dente. Reserve 1/2 cup of pasta water before draining.",
    "While pasta is cooking, pat the shrimp dry with paper towels and season with salt and pepper.",
    "In a large skillet over medium-high heat, melt 2 tablespoons of butter. Add shrimp and cook for 1-2 minutes per side until pink and opaque. Remove shrimp from the pan and set aside.",
    "In the same skillet, reduce heat to medium and add the remaining 2 tablespoons of butter. Add garlic and red pepper flakes (if using) and cook for about 1 minute until fragrant, being careful not to burn the garlic.",
    "Pour in the white wine or chicken broth and simmer for 2-3 minutes until slightly reduced, scraping up any browned bits from the bottom of the pan.",
    "Add the heavy cream and bring to a gentle simmer. Cook for 2-3 minutes until it starts to thicken slightly.",
    "Add the Parmesan cheese and stir until melted and smooth. If sauce is too thick, add some of the reserved pasta water to reach desired consistency.",
    "Return the cooked shrimp to the pan along with the drained pasta, tossing to coat everything in the sauce.",
    "Remove from heat and stir in the lemon juice and parsley. Taste and adjust seasoning with salt and pepper if needed.",
    "Serve immediately, garnished with additional Parmesan cheese and parsley if desired."
  ],
  tags: ["pasta", "seafood", "dinner", "quick", "garlic"],
  likes: 124,
  comments: 32,
  isLiked: false,
  isSaved: false
};

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the recipe data based on the ID
  // For now, we'll just use our mock data
  console.log("Recipe ID:", id);
  
  return (
    <RecipeDetail recipe={mockRecipe} />
  );
};

export default RecipePage;
