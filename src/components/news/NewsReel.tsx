
import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, MessageSquare, Share2, Bookmark, BookOpen, MessageCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewsArticle } from "@/data/newsData";
import { useSwipeable } from 'react-swipeable';

interface NewsReelProps {
  article: NewsArticle;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
  onSave: (id: number) => void;
  onListen?: (article: NewsArticle) => void;
  onSwipeLeft: (article: NewsArticle) => void;
  onSwipeRight: () => void;
  currentIndex: number;
  totalArticles: number;
}

const NewsReel = ({
  article,
  onLike,
  onComment,
  onShare,
  onSave,
  onListen,
  onSwipeLeft,
  onSwipeRight,
  currentIndex,
  totalArticles
}: NewsReelProps) => {
  const [progress, setProgress] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showSmartSummary, setShowSmartSummary] = useState(false);
  const progressInterval = useRef<number | null>(null);
  
  // Optimize swipe handling with useCallback
  const handleSwipeLeft = useCallback(() => onSwipeLeft(article), [article, onSwipeLeft]);
  const handleSwipeRight = useCallback(() => onSwipeRight(), [onSwipeRight]);
  const handleSwipeUp = useCallback(() => setShowSmartSummary(true), []);
  const handleSwipeDown = useCallback(() => setShowSmartSummary(false), []);
  
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
    preventScrollOnSwipe: false,
    trackMouse: true,
    delta: 10, // Increase sensitivity
    swipeDuration: 250, // Make swipes register faster
  });

  useEffect(() => {
    // Reset progress and summary on article change with optimized animation frames
    setProgress(0);
    setShowSummary(false);
    setShowSmartSummary(false);
    
    // Start progress with requestAnimationFrame for better performance
    const startTime = Date.now();
    const duration = 10000; // 10 seconds per reel
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        setProgress(newProgress);
        
        if (elapsed > 500 && !showSummary) {
          setShowSummary(true);
        }
      });
      
      if (newProgress < 100) {
        progressInterval.current = window.setTimeout(updateProgress, 30);
      }
    };
    
    updateProgress();
    
    return () => {
      if (progressInterval.current) {
        clearTimeout(progressInterval.current);
      }
    };
  }, [article.id, showSummary]);

  return (
    <div className="news-reel h-screen w-full relative snap-center reel-item will-change-transform" {...handlers}>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-full object-cover absolute inset-0 will-change-transform"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Action Buttons - Repositioned to top right */}
      <div className="action-buttons">
        <Button 
          onClick={() => onSwipeLeft(article)}
          className="action-button bg-[#0077B6]/80 hover:bg-[#0077B6] text-white border-white/10"
          aria-label="Read Full Article"
        >
          <BookOpen size={18} />
          <span className="md:inline hidden">Read Article</span>
        </Button>
        
        <Button
          onClick={() => onSwipeRight()}
          className="action-button bg-[#6C63FF]/80 hover:bg-[#6C63FF] text-white border-white/10"
          aria-label="Ask AI"
        >
          <MessageCircle size={18} />
          <span className="md:inline hidden">Ask AI</span>
        </Button>
        
        {onListen && (
          <Button
            onClick={() => onListen(article)}
            className="action-button bg-[#32AFA9]/80 hover:bg-[#32AFA9] text-white border-white/10"
            aria-label="Listen to Article"
          >
            <Headphones size={18} />
            <span className="md:inline hidden">Listen</span>
          </Button>
        )}
      </div>
      
      {/* Smart Summary Popup */}
      {showSmartSummary && (
        <div className="absolute left-4 right-4 top-1/3 z-20 bg-[#1B1E24]/70 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-fade-in">
          <h4 className="font-bold text-white text-lg mb-2">Smart Summary</h4>
          <p className="text-white/90 text-sm mb-3">
            {article.summary}
          </p>
          <p className="text-white/70 text-xs mb-3">
            This article is trending because of its relevance to current events in {article.category}.
          </p>
          <Button 
            onClick={() => onSwipeLeft(article)} 
            variant="outline" 
            className="text-xs text-white border-white/30 hover:bg-white/20 bg-[#0077B6]/40"
          >
            Expand Article
          </Button>
        </div>
      )}
      
      <div className="news-reel-content absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-20 z-10">
        <div className="mb-4 animate-fade-in">
          <div className="text-sm font-medium bg-[#0077B6]/80 text-white backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2">
            {article.category}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {article.title}
          </h1>
          <div
            className={cn(
              "text-white/90 text-base md:text-lg transition-opacity duration-500",
              showSummary ? "opacity-100 animate-fade-in" : "opacity-0"
            )}
          >
            {article.summary}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-16 animate-fade-in">
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#FFB400] hover:bg-white/10"
              onClick={() => onLike(article.id)}
            >
              <Heart size={24} className={article.liked ? "fill-[#FFB400] text-[#FFB400]" : ""} />
            </Button>
            <span className="text-white">{article.likes}</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-[#FFB400] hover:bg-white/10"
              onClick={() => onComment(article.id)}
            >
              <MessageSquare size={24} />
            </Button>
            <span className="text-white">{article.comments || 0}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#FFB400] hover:bg-white/10"
            onClick={() => onShare(article.id)}
          >
            <Share2 size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon" 
            className="text-white hover:text-[#FFB400] hover:bg-white/10"
            onClick={() => onSave(article.id)}
          >
            <Bookmark size={24} className={article.saved ? "fill-[#FFB400] text-[#FFB400]" : ""} />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-4 text-white/70 text-xs">
          By {article.author} • {article.date} • {currentIndex + 1}/{totalArticles}
        </div>
      </div>
      
      <div className="progress-bar absolute bottom-0 left-0 h-1 bg-[#32AFA9] z-20" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default NewsReel;
