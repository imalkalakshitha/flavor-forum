
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MinusCircle, PlusCircle, Upload, X, Clock } from "lucide-react";
import IngredientsInput from "./IngredientsInput";
import StepsInput from "./StepsInput";

interface RecipeFormProps {
  editMode?: boolean;
  recipeData?: any;
}

const RecipeForm = ({ editMode = false, recipeData }: RecipeFormProps) => {
  const [title, setTitle] = useState(editMode && recipeData ? recipeData.title : "");
  const [description, setDescription] = useState(editMode && recipeData ? recipeData.description : "");
  const [cookingTime, setCookingTime] = useState(editMode && recipeData ? recipeData.cookingTime : "");
  const [category, setCategory] = useState(editMode && recipeData ? recipeData.category : "");
  const [ingredients, setIngredients] = useState<string[]>(
    editMode && recipeData && recipeData.ingredients ? recipeData.ingredients : [""]
  );
  const [steps, setSteps] = useState<string[]>(
    editMode && recipeData && recipeData.steps ? recipeData.steps : [""]
  );
  const [tags, setTags] = useState<string[]>(
    editMode && recipeData && recipeData.tags ? recipeData.tags : []
  );
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    editMode && recipeData && recipeData.imageUrl ? recipeData.imageUrl : null
  );
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !cookingTime || !category || ingredients.length === 0 || steps.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your backend
    const recipeData = {
      title,
      description,
      cookingTime,
      category,
      ingredients: ingredients.filter((item) => item.trim() !== ""),
      steps: steps.filter((item) => item.trim() !== ""),
      tags,
      imageUrl: imagePreview,
    };
    
    console.log("Recipe data:", recipeData);
    
    toast({
      title: editMode ? "Recipe Updated" : "Recipe Created",
      description: editMode ? "Your recipe has been updated successfully." : "Your recipe has been created successfully.",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Appetizers",
    "Desserts",
    "Drinks",
    "Snacks",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Low-Carb",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <Label htmlFor="title">Recipe Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your recipe"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cooking-time">Cooking Time <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cooking-time"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    placeholder="e.g., 30 mins"
                    className="pl-8"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">Recipe Image</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md h-[calc(100%-28px)]">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-1 text-center flex flex-col justify-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80"
                    >
                      <span>Upload an image</span>
                      <Input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="ingredients">
            Ingredients <span className="text-red-500">*</span>
          </Label>
          <IngredientsInput 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
          />
        </div>
        
        <div>
          <Label htmlFor="steps">
            Cooking Steps <span className="text-red-500">*</span>
          </Label>
          <StepsInput 
            steps={steps} 
            setSteps={setSteps} 
          />
        </div>
        
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-secondary px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {tag}</span>
                </Button>
              </div>
            ))}
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags (press Enter)"
              className="w-40 flex-grow md:flex-grow-0"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          {editMode ? "Update Recipe" : "Create Recipe"}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
