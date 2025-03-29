
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsCard from "@/components/news/NewsCard";
import FullArticle from "@/components/news/FullArticle";

const SavedNews = () => {
  const { toast } = useToast();
  const [articles] = useState<NewsArticle[]>(newsData.filter(article => article.saved));
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleLike = useCallback((id: number) => {
    toast({
      title: "Liked!",
      description: "You've liked this article",
    });
  }, [toast]);

  const handleComment = useCallback((id: number) => {
    toast({
      title: "Comments",
      description: "Comments section would open here",
    });
  }, [toast]);

  const handleSave = useCallback((id: number) => {
    toast({
      title: "Removed from saved",
      description: "Article removed from your saved list",
    });
  }, [toast]);
  
  const handleShare = useCallback((id: number) => {
    toast({
      title: "Share",
      description: "Share options would appear here",
    });
  }, []);

  const handleArticleClick = useCallback((article: NewsArticle) => {
    setSelectedArticle(article);
    setShowArticle(true);
  }, []);

  const closeArticle = useCallback(() => {
    setShowArticle(false);
  }, []);

  // Get related articles for the current selected article
  const relatedArticles = selectedArticle
    ? newsData
        .filter(
          (article) =>
            article.id !== selectedArticle.id &&
            article.category === selectedArticle.category
        )
        .slice(0, 4)
    : [];

  return (
    <div className="min-h-screen pb-20 bg-background">
      <TopNav />
      
      <div className="container py-6 mt-16">
        <h1 className="text-2xl font-bold mb-6">Saved Articles</h1>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                size="medium"
                onLike={handleLike}
                onComment={handleComment}
                onSave={handleSave}
                onClick={handleArticleClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-muted-foreground mb-4">You haven't saved any articles yet</p>
            <p className="text-muted-foreground">Save articles by tapping the bookmark icon while reading</p>
          </div>
        )}
      </div>
      
      {/* Fullscreen Article */}
      <FullArticle
        article={selectedArticle}
        isOpen={showArticle}
        onClose={closeArticle}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onSave={handleSave}
        relatedArticles={relatedArticles}
      />
      
      <BottomNav />
    </div>
  );
};

export default SavedNews;
