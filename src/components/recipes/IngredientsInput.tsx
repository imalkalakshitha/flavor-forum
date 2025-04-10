
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, PlusCircle } from "lucide-react";

interface IngredientsInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

const IngredientsInput = ({
  ingredients,
  setIngredients,
}: IngredientsInputProps) => {
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(updatedIngredients);
    }
  };

  return (
    <div className="space-y-2">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder={`Ingredient ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveIngredient(index)}
            disabled={ingredients.length === 1}
          >
            <MinusCircle className="h-5 w-5" />
            <span className="sr-only">Remove ingredient</span>
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddIngredient}
        className="flex w-full justify-center"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add ingredient
      </Button>
    </div>
  );
};

export default IngredientsInput;
