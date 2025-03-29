
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle, breakingNews } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsTicker from "@/components/news/NewsTicker";
import NewsCard from "@/components/news/NewsCard";
import FullArticle from "@/components/news/FullArticle";

const Trending = () => {
  const { toast } = useToast();
  const [articles] = useState<NewsArticle[]>(newsData.filter(article => article.trending));
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  const featuredArticle = newsData.find(article => article.featured && article.trending);

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
      title: "Saved!",
      description: "Article saved to your list",
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
      
      {/* Breaking News Ticker */}
      <div className="mt-16">
        <NewsTicker />
      </div>
      
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Trending News</h1>
        
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Featured Story</h2>
            <div className="h-64 md:h-80 bg-card rounded-lg shadow-sm overflow-hidden relative">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                <div className="text-sm font-medium text-primary bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2 w-fit">
                  {featuredArticle.category}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-3 line-clamp-2">
                  {featuredArticle.summary}
                </p>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md w-fit"
                  onClick={() => handleArticleClick(featuredArticle)}
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Trending Articles Grid */}
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

export default Trending;
