
import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsReel from "@/components/news/NewsReel";
import FullArticle from "@/components/news/FullArticle";
import AiAssistant from "@/components/news/AiAssistant";
import AudioPlayer from "@/components/news/AudioPlayer";
import { CommentSection } from "@/components/news/CommentSection";
import { ShareDialog } from "@/components/news/ShareDialog";

const Index = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Make sure we have at least 5 articles by duplicating if needed
  const [articles, setArticles] = useState<NewsArticle[]>(
    newsData.length >= 5
      ? newsData
      : [
          ...newsData,
          ...newsData.slice(0, Math.max(0, 5 - newsData.length))
        ]
  );
  const [showArticle, setShowArticle] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [audioPlayerMinimized, setAudioPlayerMinimized] = useState(false);
  const [playingArticle, setPlayingArticle] = useState<NewsArticle | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  // Detect scroll direction for better UX
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Scrolling down
        if (currentIndex < articles.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    // Add scroll listener to window for better scroll detection
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex, articles.length]);

  // Optimized touch handling for mobile with improved performance
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) < 50) return; // Require more significant swipe
      
      if (deltaY > 0) {
        // Swipe Up - go to next
        if (currentIndex < articles.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else {
        // Swipe Down - go to previous
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };
    
    // Add touch listeners to window for better touch detection
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, articles.length]);

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
    const article = articles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      setShowComments(true);
    }
  }, [articles]);

  const handleShare = useCallback((id: number) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      setShowShare(true);
    }
  }, [articles]);

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
    <div className="h-screen w-screen overflow-hidden bg-background" ref={containerRef}>
      <TopNav />
      
      {/* Main Feed with improved scrolling */}
      <div className="h-full w-full pt-16 pb-16 reel-container" ref={reelsRef}>
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className={`w-full h-full ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: `translateY(${(index - currentIndex) * 100}%)`,
              zIndex: index === currentIndex ? 10 : 0
            }}
          >
            <NewsReel
              article={article}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onSave={handleSave}
              onListen={handleListen}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              currentIndex={index}
              totalArticles={articles.length}
            />
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      {currentIndex > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-16 z-20 opacity-30 text-white text-sm font-medium">
          <span>⬆️ Swipe up for previous story</span>
        </div>
      )}
      
      {currentIndex < articles.length - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 opacity-30 text-white text-sm font-medium">
          <span>⬇️ Swipe down for next story</span>
        </div>
      )}
      
      {/* Comments Dialog */}
      {showComments && selectedArticle && (
        <CommentSection 
          article={selectedArticle}
          onClose={() => setShowComments(false)}
        />
      )}
      
      {/* Share Dialog */}
      {showShare && selectedArticle && (
        <ShareDialog
          article={selectedArticle}
          onClose={() => setShowShare(false)}
        />
      )}
      
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
      
      {/* AI Assistant */}
      <AiAssistant
        isOpen={showAssistant}
        onClose={closeAssistant}
        currentArticle={articles[currentIndex]}
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

export default Index;
