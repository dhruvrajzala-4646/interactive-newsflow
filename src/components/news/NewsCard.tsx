
import { Heart, MessageSquare, Bookmark, Headphones, ArrowLeft } from "lucide-react";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NewsCardProps {
  article: NewsArticle;
  size?: "small" | "medium" | "large";
  onLike?: (id: number) => void;
  onComment?: (id: number) => void;
  onSave?: (id: number) => void;
  onListen?: (article: NewsArticle) => void;
  onClick?: (article: NewsArticle) => void;
  showMetrics?: boolean;
}

const NewsCard = ({
  article,
  size = "medium",
  onLike,
  onComment,
  onSave,
  onListen,
  onClick,
  showMetrics = false
}: NewsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (onClick) onClick(article);
  };

  return (
    <div
      className={cn(
        "group bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1",
        {
          "h-[280px]": size === "large",
          "h-[240px]": size === "medium",
          "h-36": size === "small"
        }
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex flex-col">
        <div
          className={cn(
            "relative overflow-hidden",
            {
              "h-1/2": size === "large",
              "h-2/5": size === "medium",
              "h-1/3": size === "small"
            }
          )}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex gap-1 items-center">
            <span className="text-xs font-medium bg-primary/90 text-white rounded-full px-2 py-0.5">
              {article.category}
            </span>
            {onListen && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white/60 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onListen(article);
                }}
              >
                <Headphones size={12} className="text-white" />
              </Button>
            )}
          </div>
          
          {/* Hover overlay with action buttons */}
          <div className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {onLike && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(article.id);
                }}
              >
                <Heart size={14} className={article.liked ? "fill-primary text-primary" : ""} />
              </Button>
            )}
            
            {onComment && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onComment(article.id);
                }}
              >
                <MessageSquare size={14} />
              </Button>
            )}
            
            {onSave && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(article.id);
                }}
              >
                <Bookmark size={14} className={article.saved ? "fill-primary text-primary" : ""} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3
            className={cn(
              "font-bold text-foreground line-clamp-2 mb-1 transition-colors group-hover:text-primary",
              {
                "text-base": size === "large",
                "text-sm": size === "medium",
                "text-xs": size === "small"
              }
            )}
          >
            {article.title}
          </h3>
          
          {size !== "small" && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {article.summary}
            </p>
          )}
          
          <div className="mt-auto flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {article.date}
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              {onLike && showMetrics && (
                <div className="text-muted-foreground flex items-center">
                  <Heart size={12} className={article.liked ? "fill-primary text-primary mr-1" : "mr-1"} />
                  <span>{article.likes}</span>
                </div>
              )}
              
              {onComment && showMetrics && (
                <div className="text-muted-foreground flex items-center">
                  <MessageSquare size={12} className="mr-1" />
                  <span>{article.comments || 0}</span>
                </div>
              )}
              
              {onSave && article.saved && (
                <Bookmark size={12} className="fill-primary text-primary" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
