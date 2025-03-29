
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  size?: "small" | "medium" | "large";
  onLike?: (id: number) => void;
  onComment?: (id: number) => void;
  onSave?: (id: number) => void;
  onClick?: (article: NewsArticle) => void;
  showMetrics?: boolean;
}

const NewsCard = ({
  article,
  size = "medium",
  onLike,
  onComment,
  onSave,
  onClick,
  showMetrics = false
}: NewsCardProps) => {
  const handleClick = () => {
    if (onClick) onClick(article);
  };

  return (
    <div
      className={cn(
        "group bg-card rounded-lg shadow-sm overflow-hidden border border-border hover:shadow-md transition-all duration-300 cursor-pointer",
        {
          "h-64": size === "large",
          "h-60": size === "medium",
          "h-36": size === "small"
        }
      )}
      onClick={handleClick}
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
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className="text-xs font-medium bg-primary/90 text-white rounded-full px-2 py-0.5">
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3
            className={cn(
              "font-bold text-foreground line-clamp-2 mb-1",
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
              {onLike && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(article.id);
                  }}
                  className="text-muted-foreground hover:text-primary flex items-center"
                >
                  <Heart size={14} className={article.liked ? "fill-primary text-primary" : ""} />
                  {showMetrics && <span className="ml-1">{article.likes}</span>}
                </button>
              )}
              
              {onComment && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onComment(article.id);
                  }}
                  className="text-muted-foreground hover:text-primary flex items-center"
                >
                  <MessageSquare size={14} />
                  {showMetrics && <span className="ml-1">22</span>}
                </button>
              )}
              
              {onSave && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave(article.id);
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Bookmark size={14} className={article.saved ? "fill-primary text-primary" : ""} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
