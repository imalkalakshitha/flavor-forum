
import { Link } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";
import { ChefHat } from "lucide-react";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 bg-muted">
          <div className="h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507048331197-7d4c21882c86?auto=format&q=75&fit=crop&w=1000"
              alt="Cooking"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background md:from-background/80 md:via-transparent md:to-transparent"></div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <Link to="/" className="flex items-center mb-8">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold">CulinaryCraft</span>
          </Link>
          
          <SignupForm />
        </div>
      </div>
      
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>&copy; 2025 CulinaryCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignupPage;
