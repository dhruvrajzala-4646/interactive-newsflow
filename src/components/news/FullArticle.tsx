
import { useState } from "react";
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";

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
        "news-full-article",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="flex justify-between items-center p-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft size={24} />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onLike(article.id)}
            >
              <Heart size={20} className={article.saved ? "fill-primary text-primary" : ""} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onComment(article.id)}
            >
              <MessageSquare size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onShare(article.id)}
            >
              <Share2 size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onSave(article.id)}
            >
              <Bookmark size={20} className={article.saved ? "fill-primary text-primary" : ""} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-4">
          <div className="text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 inline-block mb-2">
            {article.category}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {article.title}
          </h1>
          <div className="text-muted-foreground text-sm mb-4">
            By {article.author} • {article.date}
          </div>
        </div>
        
        <img 
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 md:h-72 object-cover rounded-lg mb-6"
        />
        
        <div className="text-lg font-medium mb-6">
          {article.summary}
        </div>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {relatedArticles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-auto pb-4">
              {relatedArticles.map((related) => (
                <div 
                  key={related.id}
                  className="flex flex-col min-w-[250px] border border-border rounded-lg overflow-hidden"
                >
                  <img 
                    src={related.imageUrl}
                    alt={related.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <div className="text-xs font-medium text-primary mb-1">
                      {related.category}
                    </div>
                    <h3 className="text-sm font-bold line-clamp-2 mb-1">
                      {related.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      {related.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullArticle;
