
import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import NewsReel from "@/components/news/NewsReel";
import FullArticle from "@/components/news/FullArticle";
import AiAssistant from "@/components/news/AiAssistant";
import AudioPlayer from "@/components/news/AudioPlayer";

const Index = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState<NewsArticle[]>(newsData);
  const [showArticle, setShowArticle] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [audioPlayerMinimized, setAudioPlayerMinimized] = useState(false);
  const [playingArticle, setPlayingArticle] = useState<NewsArticle | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle wheel scrolling for desktop with improved smooth animation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const delta = Math.abs(e.deltaY);
      if (delta < 10) return; // Ignore small scrolls for better user experience
      
      setIsScrolling(true);
      
      if (e.deltaY > 0) {
        if (currentIndex < articles.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
      
      // Add a delay before allowing another scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Longer timeout for smoother scrolling experience
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex, articles.length, isScrolling]);

  // Smooth scroll to current reel when index changes
  useEffect(() => {
    if (reelsRef.current) {
      const targetReel = reelsRef.current.children[currentIndex] as HTMLElement;
      if (targetReel) {
        targetReel.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }
  }, [currentIndex]);

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

  // Handle touch events for mobile swipe with smoother animation
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) < 50) return; // Require more significant swipe
      
      setIsScrolling(true);
      
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
      
      // Add a delay before allowing another swipe
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex, articles.length, isScrolling]);

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
      <div className="h-full w-full pt-16 pb-16" ref={reelsRef}>
        <div className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className={`h-full w-full snap-start ${index === currentIndex ? 'block' : 'hidden md:block'}`}
              style={{
                transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.4s ease',
                transform: `translateY(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0.5
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
        onListen={handleListen}
        relatedArticles={relatedArticles}
      />
      
      {/* AI Assistant (popup modal) */}
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
