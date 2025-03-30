
import { useState, useEffect, useRef } from "react";
import { Heart, MessageSquare, Share2, Bookmark, ChevronLeft, ChevronRight, BookOpen, MessageCircle, Headphones, ArrowLeft } from "lucide-react";
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
  
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(article),
    onSwipedRight: () => onSwipeRight(),
    onSwipedUp: () => setShowSmartSummary(true),
    onSwipedDown: () => setShowSmartSummary(false),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    // Reset progress and summary on article change
    setProgress(0);
    setShowSummary(false);
    setShowSmartSummary(false);
    
    // Start progress
    const startTime = Date.now();
    const duration = 10000; // 10 seconds per reel
    
    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed > 500 && !showSummary) {
        setShowSummary(true);
      }
      
      if (newProgress >= 100) {
        clearInterval(progressInterval.current!);
      }
    }, 100);
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [article.id]);

  return (
    <div className="news-reel h-screen w-full relative snap-center" {...handlers}>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Action Buttons - Permanently visible */}
      <div className="fixed-action-buttons absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4 z-30">
        <Button 
          onClick={() => onSwipeLeft(article)}
          className="action-button flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full px-4 py-6 transition-all duration-300"
          aria-label="Read Full Article"
        >
          <BookOpen size={18} />
          <span className="text-sm font-medium">Read Article</span>
        </Button>
        
        <Button
          onClick={() => onSwipeRight()}
          className="action-button flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full px-4 py-6 transition-all duration-300"
          aria-label="Ask AI"
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">Ask AI</span>
        </Button>
        
        {onListen && (
          <Button
            onClick={() => onListen(article)}
            className="action-button flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full px-4 py-6 transition-all duration-300"
            aria-label="Listen to Article"
          >
            <Headphones size={18} />
            <span className="text-sm font-medium">Listen</span>
          </Button>
        )}
      </div>
      
      {/* Swipe Indicators */}
      <div className="swipe-indicator swipe-left absolute left-4 bottom-20 transform bg-white/20 backdrop-blur-sm p-2 rounded-full transition-opacity opacity-70 hover:opacity-100 flex items-center gap-2">
        <ChevronLeft size={20} className="text-white" />
        <span className="text-white text-xs">Read Full Article</span>
      </div>
      
      <div className="swipe-indicator swipe-right absolute right-4 bottom-20 transform bg-white/20 backdrop-blur-sm p-2 rounded-full transition-opacity opacity-70 hover:opacity-100 flex items-center gap-2">
        <span className="text-white text-xs">Ask AI</span>
        <ChevronRight size={20} className="text-white" />
      </div>
      
      {showSmartSummary && (
        <div className="absolute left-4 right-4 top-1/3 z-20 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-fade-in">
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
            className="text-xs text-white border-white/30 hover:bg-white/20"
          >
            Expand Article
          </Button>
        </div>
      )}
      
      <div className="news-reel-content absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-20 z-10">
        <div className="mb-4 animate-fade-in">
          <div className="text-sm font-medium text-primary bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2">
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
              className="text-white hover:text-primary hover:bg-white/10"
              onClick={() => onLike(article.id)}
            >
              <Heart size={24} className={article.liked ? "fill-primary text-primary" : ""} />
            </Button>
            <span className="text-white">{article.likes}</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary hover:bg-white/10"
              onClick={() => onComment(article.id)}
            >
              <MessageSquare size={24} />
            </Button>
            <span className="text-white">{article.comments || 0}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary hover:bg-white/10"
            onClick={() => onShare(article.id)}
          >
            <Share2 size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon" 
            className="text-white hover:text-primary hover:bg-white/10"
            onClick={() => onSave(article.id)}
          >
            <Bookmark size={24} className={article.saved ? "fill-primary text-primary" : ""} />
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-4 text-white/70 text-xs">
          By {article.author} • {article.date} • {currentIndex + 1}/{totalArticles}
        </div>
      </div>
      
      <div className="progress-bar absolute bottom-0 left-0 h-1 bg-primary z-20" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default NewsReel;
