
import { useState } from "react";
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark, Headphones, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsCard from "./NewsCard";

interface FullArticleProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
  onSave: (id: number) => void;
  onListen?: (article: NewsArticle) => void;
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
  onListen,
  relatedArticles
}: FullArticleProps) => {
  const [summaryTone, setSummaryTone] = useState<"casual" | "formal" | "fun">("casual");
  
  if (!article) return null;

  const getSummaryByTone = () => {
    switch (summaryTone) {
      case "casual":
        return article.summary;
      case "formal":
        return `This article explores the implications of ${article.title}. The author discusses key points related to ${article.category}.`;
      case "fun":
        return `Wow! Did you know about ${article.title}? It's a fascinating topic that's all the rage in ${article.category} right now!`;
      default:
        return article.summary;
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-background z-50 overflow-hidden transition-transform duration-500 ease-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10 py-2">
        <div className="flex justify-between items-center p-4 container max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/20 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onLike(article.id)}
              className="hover:bg-background/20 rounded-full"
              aria-label="Like"
            >
              <Heart size={18} className={article.liked ? "fill-primary text-primary" : ""} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onComment(article.id)}
              className="hover:bg-background/20 rounded-full"
              aria-label="Comment"
            >
              <MessageSquare size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onShare(article.id)}
              className="hover:bg-background/20 rounded-full"
              aria-label="Share"
            >
              <Share2 size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => article && onSave(article.id)}
              className="hover:bg-background/20 rounded-full"
              aria-label="Save"
            >
              <Bookmark size={18} className={article.saved ? "fill-primary text-primary" : ""} />
            </Button>
            
            {onListen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => article && onListen(article)}
                className="hover:bg-background/20 rounded-full"
                aria-label="Listen"
              >
                <Headphones size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="container mx-auto max-w-4xl p-4 md:p-6 animate-fade-in">
          <div className="mb-8 text-center animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 inline-block mb-2">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="text-muted-foreground text-sm mb-3 flex items-center justify-center gap-2">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Heart size={14} className={article.liked ? "fill-primary text-primary" : ""} />
                <span>{article.likes}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span>{article.comments || 0}</span>
              </div>
            </div>
            
            {/* Smart Summary Section */}
            <div className="bg-muted/30 rounded-lg p-4 mb-8 mx-auto max-w-2xl border border-border flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Sparkles size={18} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Smart Summary</h3>
                  <Tabs defaultValue="casual" value={summaryTone} onValueChange={(v) => setSummaryTone(v as any)}>
                    <TabsList className="bg-muted/60 h-8">
                      <TabsTrigger value="casual" className="text-xs h-6">Casual</TabsTrigger>
                      <TabsTrigger value="formal" className="text-xs h-6">Formal</TabsTrigger>
                      <TabsTrigger value="fun" className="text-xs h-6">Fun</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <p className="text-muted-foreground transition-all duration-300">
                  {getSummaryByTone()}
                </p>
              </div>
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
          >
            <p>
              {article.content || `This is the full article content for "${article.title}". In a real application, this would contain the complete text of the article, formatted with proper paragraphs, headings, and possibly images.`}
            </p>
            <p>
              The {article.category} category has been seeing increased interest lately, with more readers engaging with content like this one. According to recent trends, topics related to {article.title.toLowerCase()} have garnered significant attention.
            </p>
            <h2>Key Insights</h2>
            <p>
              As we delve deeper into this topic, it's important to note the broader implications. The author, {article.author}, brings a unique perspective based on extensive research and expertise in this field.
            </p>
            <p>
              Many readers have found this article particularly insightful, as evidenced by the {article.likes} likes and {article.comments || 0} comments it has received so far.
            </p>
            <h2>Expert Analysis</h2>
            <p>
              Industry experts have weighed in on this topic, offering varied perspectives that enrich our understanding. The discourse surrounding {article.title.toLowerCase()} continues to evolve as new information becomes available.
            </p>
            <p>
              We encourage readers to engage with the content, share their thoughts, and join the conversation about this important topic in {article.category}.
            </p>
          </div>
          
          {relatedArticles.length > 0 && (
            <div className="mt-10 border-t border-border pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Articles</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4">
                {relatedArticles.map((related, index) => (
                  <div 
                    key={related.id}
                    className="animate-fade-in hover-scale"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <NewsCard
                      article={related}
                      size="medium"
                      onLike={onLike}
                      onComment={onComment}
                      onSave={onSave}
                      onListen={onListen}
                      showMetrics={true}
                    />
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
