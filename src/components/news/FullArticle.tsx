
import { useState } from "react";
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FullArticleProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
  onSave: (id: number) => void;
  relatedArticles: NewsArticle[];
}

const FullArticle = ({
  article,
  isOpen,
  onClose,
  onLike,
  onComment,
  onShare,
  onSave,
  relatedArticles
}: FullArticleProps) => {
  if (!article) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-background z-50 overflow-hidden transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="flex justify-between items-center p-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/20">
            <ArrowLeft size={24} />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onLike(article.id)}
              className="hover:bg-background/20"
              aria-label="Like"
            >
              <Heart size={20} className={article.liked ? "fill-primary text-primary" : ""} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onComment(article.id)}
              className="hover:bg-background/20"
              aria-label="Comment"
            >
              <MessageSquare size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onShare(article.id)}
              className="hover:bg-background/20"
              aria-label="Share"
            >
              <Share2 size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onSave(article.id)}
              className="hover:bg-background/20"
              aria-label="Save"
            >
              <Bookmark size={20} className={article.saved ? "fill-primary text-primary" : ""} />
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="container mx-auto max-w-4xl p-4 md:p-6 animate-fade-in">
          <div className="mb-6 text-center animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 inline-block mb-2">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {article.title}
            </h1>
            <div className="text-muted-foreground text-sm mb-6">
              By {article.author} • {article.date} • {article.likes} likes
            </div>
          </div>
          
          <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 md:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <div className="text-lg font-medium mb-8 text-center border-l-4 border-primary pl-4 py-2 bg-muted/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {article.summary}
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12 space-y-6 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {relatedArticles.length > 0 && (
            <div className="mt-10 border-t border-border pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedArticles.map((related, index) => (
                  <div 
                    key={related.id}
                    className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 card-hover animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <img 
                      src={related.imageUrl}
                      alt={related.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <div className="text-xs font-medium text-primary mb-2">
                        {related.category}
                      </div>
                      <h3 className="text-base font-bold line-clamp-2 mb-2 hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {related.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {related.date}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Heart size={12} /> {related.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FullArticle;
