
import { Link } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-40 px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu size={24} />
          </Button>
          {!isMobile && (
            <Link to="/" className="text-xl font-bold text-primary">
              NewsReel
            </Link>
          )}
        </div>
        
        {isMobile ? (
          <Link to="/" className="text-xl font-bold text-primary">
            NewsFlow
          </Link>
        ) : (
          <div className="hidden md:flex gap-6">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/trending" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              Trending
            </Link>
            <Link to="/saved" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              Saved
            </Link>
            <Link to="/profile" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
          <Button variant="ghost" size="icon">
            <Search size={24} />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
