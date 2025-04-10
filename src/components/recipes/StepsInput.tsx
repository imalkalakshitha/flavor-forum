
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MinusCircle, PlusCircle } from "lucide-react";

interface StepsInputProps {
  steps: string[];
  setSteps: (steps: string[]) => void;
}

const StepsInput = ({
  steps,
  setSteps,
}: StepsInputProps) => {
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter((_, i) => i !== index);
      setSteps(updatedSteps);
    }
  };

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-2">
          <div className="pt-2 font-medium text-muted-foreground">
            {index + 1}.
          </div>
          <Textarea
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            placeholder={`Step ${index + 1} description`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveStep(index)}
            disabled={steps.length === 1}
          >
            <MinusCircle className="h-5 w-5" />
            <span className="sr-only">Remove step</span>
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddStep}
        className="flex w-full justify-center"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add step
      </Button>
    </div>
  );
};

export default StepsInput;
