
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsTicker from "@/components/news/NewsTicker";
import NewsCard from "@/components/news/NewsCard";
import FullArticle from "@/components/news/FullArticle";
import AudioPlayer from "@/components/news/AudioPlayer";
import { Heart, MessageSquare, Bookmark, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const Trending = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>(newsData);
  const [showArticle, setShowArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [audioPlayerMinimized, setAudioPlayerMinimized] = useState(false);
  const [playingArticle, setPlayingArticle] = useState<NewsArticle | null>(null);
  
  // Additional sections
  const featuredArticles = articles
    .filter(article => article.featured)
    .sort((a, b) => b.likes - a.likes); // Sort by likes
    
  const trendingArticles = articles
    .filter(article => article.trending && !article.featured)
    .sort((a, b) => b.likes - a.likes) // Sort by likes
    .slice(0, 4);
  
  // Latest blogs - sort by date
  const latestBlogs = [...articles]
    .sort((a, b) => {
      const dateA = new Date(a.date.split(" ")[0]);
      const dateB = new Date(b.date.split(" ")[0]);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);
  
  // Most liked blogs
  const mostLikedBlogs = [...articles]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  const handleLike = useCallback((id: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, likes: article.liked ? article.likes - 1 : article.likes + 1, liked: !article.liked }
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
  
  const handleListen = useCallback((article: NewsArticle) => {
    setPlayingArticle(article);
    setAudioPlayerOpen(true);
    setAudioPlayerMinimized(false);
    
    toast({
      title: "Now Playing",
      description: `"${article.title}" is now playing`,
    });
  }, [toast]);
  
  const closeAudioPlayer = useCallback(() => {
    setAudioPlayerOpen(false);
    setPlayingArticle(null);
  }, []);
  
  const minimizeAudioPlayer = useCallback(() => {
    setAudioPlayerMinimized(true);
  }, []);
  
  const maximizeAudioPlayer = useCallback(() => {
    setAudioPlayerMinimized(false);
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
                  className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer group hover:shadow-lg transition-all duration-300 ${
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
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-sm font-medium text-primary bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block w-fit">
                        {article.category}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListen(article);
                        }}
                      >
                        <Headphones size={14} />
                      </Button>
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
                          className="text-white/90 hover:text-primary flex items-center"
                        >
                          <Heart size={20} className={article.liked ? "fill-primary text-primary" : ""} />
                          <span className="ml-1 text-xs">{article.likes}</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleComment(article.id); }}
                          className="text-white/90 hover:text-primary flex items-center"
                        >
                          <MessageSquare size={20} />
                          <span className="ml-1 text-xs">{article.comments || 0}</span>
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
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-primary pl-3">Trending Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.map((article, index) => (
              <div key={article.id} className="animate-fade-in hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <NewsCard
                  article={article}
                  size="medium"
                  onLike={handleLike}
                  onComment={handleComment}
                  onSave={handleSave}
                  onListen={handleListen}
                  onClick={handleArticleClick}
                  showMetrics={true}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Most Liked Blogs Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-primary pl-3">Most Liked Blogs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mostLikedBlogs.map((article, index) => (
              <div key={article.id} className="animate-fade-in hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <NewsCard
                  article={article}
                  size="medium"
                  onLike={handleLike}
                  onComment={handleComment}
                  onSave={handleSave}
                  onListen={handleListen}
                  onClick={handleArticleClick}
                  showMetrics={true}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Latest Blogs Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-primary pl-3">Latest Blogs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((article, index) => (
              <div key={article.id} className="animate-fade-in hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                <NewsCard
                  article={article}
                  size="medium"
                  onLike={handleLike}
                  onComment={handleComment}
                  onSave={handleSave}
                  onListen={handleListen}
                  onClick={handleArticleClick}
                  showMetrics={true}
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
        onListen={handleListen}
        relatedArticles={relatedArticles}
      />
      
      {/* Audio Player */}
      <AudioPlayer 
        article={playingArticle}
        isOpen={audioPlayerOpen}
        isMinimized={audioPlayerMinimized}
        onClose={closeAudioPlayer}
        onMinimize={minimizeAudioPlayer}
        onMaximize={maximizeAudioPlayer}
      />
      
      <BottomNav />
    </div>
  );
};

export default Trending;
