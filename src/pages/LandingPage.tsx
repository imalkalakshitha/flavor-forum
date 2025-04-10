
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, ArrowRight, CheckCircle2 } from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      title: "Share Your Recipes",
      description:
        "Upload and share your favorite recipes with detailed ingredients, instructions, and beautiful photos.",
    },
    {
      title: "Track Your Progress",
      description:
        "Document your cooking journey with learning updates, track your improvements, and celebrate your successes.",
    },
    {
      title: "Join Cooking Challenges",
      description:
        "Participate in time-limited cooking challenges to test your skills and creativity with specific constraints.",
    },
    {
      title: "Create Structured Plans",
      description:
        "Design and share comprehensive cooking plans with step-by-step guides for others to follow.",
    },
    {
      title: "Build Your Community",
      description:
        "Connect with fellow food enthusiasts, follow your favorite chefs, and engage with a supportive cooking community.",
    },
    {
      title: "Get Inspired",
      description:
        "Discover new recipes, techniques, and ingredients to expand your culinary repertoire and try new flavors.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CulinaryCraft</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Ultimate Cooking Companion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                A social platform for food enthusiasts to share recipes, track cooking progress, 
                and engage with a community of passionate chefs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/home">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Recipes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-primary/20"></div>
                <img
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&q=75&fit=crop&w=600"
                  alt="Cooking"
                  className="rounded-xl shadow-lg z-10 relative"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Cook, Share & Learn</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              CulinaryCraft provides all the tools you need to document your cooking journey, share your 
              creations, and connect with a community of food enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:border-primary transition-colors">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/signup">
              <Button size="lg">
                Join CulinaryCraft Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold">CulinaryCraft</span>
              </Link>
              <p className="mt-2 text-muted-foreground">
                Your ultimate cooking companion
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold">Product</h4>
                <ul className="space-y-1">
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Recipes</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Challenges</Link></li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Company</h4>
                <ul className="space-y-1">
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Team</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Legal</h4>
                <ul className="space-y-1">
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
            <p>&copy; 2025 CulinaryCraft. All rights reserved.</p>
            <p className="mt-2 text-sm">A project by IT_WE_27 | Sri Lanka Institute of Information Technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
