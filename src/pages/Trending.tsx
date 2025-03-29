
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsTicker from "@/components/news/NewsTicker";
import NewsCard from "@/components/news/NewsCard";
import FullArticle from "@/components/news/FullArticle";

const Trending = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>(newsData);
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  const featuredArticles = articles.filter(article => article.featured);
  const trendingArticles = articles.filter(article => article.trending && !article.featured);

  const handleLike = useCallback((id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, likes: article.likes + 1, liked: !article.liked }
          : article
      )
    );
    
    const article = articles.find(a => a.id === id);
    toast({
      title: article?.liked ? "Unliked" : "Liked!",
      description: article?.liked 
        ? "You've unliked this article" 
        : "You've liked this article",
    });
  }, [articles, toast]);

  const handleComment = useCallback((id: number) => {
    toast({
      title: "Comments",
      description: "Comments section would open here",
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
  
  const handleShare = useCallback((id: number) => {
    toast({
      title: "Share",
      description: "Share options would appear here",
    });
  }, [toast]);

  const handleArticleClick = useCallback((article: NewsArticle) => {
    setSelectedArticle(article);
    setShowArticle(true);
  }, []);

  const closeArticle = useCallback(() => {
    setShowArticle(false);
  }, []);

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
    <div className="min-h-screen pb-20 bg-background">
      <TopNav />
      
      {/* Breaking News Ticker */}
      <div className="mt-16">
        <NewsTicker />
      </div>
      
      <div className="container py-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Trending News</h1>
        
        {/* Featured Stories Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-primary pl-3">Featured Stories</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <div key={article.id} className={index === 0 ? "lg:col-span-2" : ""}>
                <div 
                  className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer group ${
                    index === 0 ? "h-80" : "h-64"
                  }`}
                  onClick={() => handleArticleClick(article)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <div className="text-sm font-medium text-primary bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2 w-fit">
                      {article.category}
                    </div>
                    <h3 className={`${index === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold text-white mb-2`}>
                      {article.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">{article.date}</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleLike(article.id); }}
                          className="text-white/90 hover:text-primary"
                        >
                          <Heart size={20} className={article.liked ? "fill-primary text-primary" : ""} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleComment(article.id); }}
                          className="text-white/90 hover:text-primary"
                        >
                          <MessageSquare size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleSave(article.id); }}
                          className="text-white/90 hover:text-primary"
                        >
                          <Bookmark size={20} className={article.saved ? "fill-primary text-primary" : ""} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trending Topics Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-primary pl-3">Trending Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingArticles.map((article) => (
              <div key={article.id} className="animate-fade-in" style={{animationDelay: `${trendingArticles.indexOf(article) * 0.1}s`}}>
                <NewsCard
                  article={article}
                  size="medium"
                  onLike={handleLike}
                  onComment={handleComment}
                  onSave={handleSave}
                  onClick={handleArticleClick}
                />
              </div>
            ))}
          </div>
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

// Add Heart, MessageSquare, and Bookmark imports at the top
import { Heart, MessageSquare, Bookmark } from "lucide-react";
