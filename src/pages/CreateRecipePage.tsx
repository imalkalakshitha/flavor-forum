
import RecipeForm from "@/components/recipes/RecipeForm";

const CreateRecipePage = () => {
  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateRecipePage;
