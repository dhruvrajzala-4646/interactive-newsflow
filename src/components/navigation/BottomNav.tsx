import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Bookmark, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-40 px-2">
      <div className="flex justify-between items-center py-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-1/4 py-2 ${
            path === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/trending"
          className={`flex flex-col items-center justify-center w-1/4 py-2 ${
            path === "/trending" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <TrendingUp size={24} />
          <span className="text-xs mt-1">Trending</span>
        </Link>
        <Link
          to="/saved"
          className={`flex flex-col items-center justify-center w-1/4 py-2 ${
            path === "/saved" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Bookmark size={24} />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center w-1/4 py-2 ${
            path === "/profile" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
