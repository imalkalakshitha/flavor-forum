
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Home,
  Layers,
  Trophy,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { name: "Home", icon: <Home className="h-5 w-5" />, path: "/home" },
    { name: "Recipes", icon: <Utensils className="h-5 w-5" />, path: "/recipes" },
    { name: "Learning Plans", icon: <FileText className="h-5 w-5" />, path: "/learning-plans" },
    { name: "Cooking Challenges", icon: <Trophy className="h-5 w-5" />, path: "/challenges" },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out md:sticky md:top-16 md:h-[calc(100vh-4rem)]",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          TRENDING TAGS
        </p>
        <div className="flex flex-wrap gap-1">
          <Link to="/tag/breakfast">
            <Button variant="outline" size="sm" className="text-xs h-7">
              #breakfast
            </Button>
          </Link>
          <Link to="/tag/quickmeals">
            <Button variant="outline" size="sm" className="text-xs h-7">
              #quickmeals
            </Button>
          </Link>
          <Link to="/tag/desserts">
            <Button variant="outline" size="sm" className="text-xs h-7">
              #desserts
            </Button>
          </Link>
          <Link to="/tag/healthy">
            <Button variant="outline" size="sm" className="text-xs h-7">
              #healthy
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};
