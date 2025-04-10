
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { ChefHat } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <Link to="/" className="flex items-center mb-8">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold">CulinaryCraft</span>
          </Link>
          
          <LoginForm />
        </div>
        
        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-muted">
          <div className="h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&q=75&fit=crop&w=1000"
              alt="Cooking"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:from-transparent md:via-transparent md:to-background/80"></div>
          </div>
        </div>
      </div>
      
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>&copy; 2025 CulinaryCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
