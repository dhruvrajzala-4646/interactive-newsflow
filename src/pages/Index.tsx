
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsReel from "@/components/news/NewsReel";
import FullArticle from "@/components/news/FullArticle";
import AiAssistant from "@/components/news/AiAssistant";

const Index = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState<NewsArticle[]>(newsData);
  const [showArticle, setShowArticle] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = useCallback((id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
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

  const handleShare = useCallback((id: number) => {
    toast({
      title: "Share",
      description: "Share options would appear here",
    });
  }, [toast]);

  const handleSave = useCallback((id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, saved: !article.saved }
          : article
      )
    );
    
    const article = articles.find(a => a.id === id);
    toast({
      title: article?.saved ? "Removed from saved" : "Saved!",
      description: article?.saved 
        ? "Article removed from your saved list" 
        : "Article added to your saved list",
    });
  }, [articles, toast]);

  const handleSwipeLeft = useCallback((article: NewsArticle) => {
    setSelectedArticle(article);
    setShowArticle(true);
  }, []);

  const handleSwipeRight = useCallback(() => {
    setShowAssistant(true);
  }, []);

  const closeArticle = useCallback(() => {
    setShowArticle(false);
  }, []);

  const closeAssistant = useCallback(() => {
    setShowAssistant(false);
  }, []);

  const scrollToNext = useCallback(() => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, articles.length]);

  const scrollToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Get related articles for the current selected article
  const relatedArticles = selectedArticle
    ? articles
        .filter(
          (article) =>
            article.id !== selectedArticle.id &&
            article.category === selectedArticle.category
        )
        .slice(0, 4)
    : [];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background" ref={containerRef}>
      <TopNav />
      
      {/* Main Feed */}
      <div className="h-full w-full">
        <NewsReel
          article={articles[currentIndex]}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onSave={handleSave}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          currentIndex={currentIndex}
          totalArticles={articles.length}
        />
      </div>
      
      {/* Fullscreen Article (slide from right) */}
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
      
      {/* AI Assistant (slide from left) */}
      <AiAssistant
        isOpen={showAssistant}
        onClose={closeAssistant}
        currentArticle={articles[currentIndex]}
      />
      
      <BottomNav />
    </div>
  );
};

export default Index;
