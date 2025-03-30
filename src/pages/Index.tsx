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
import { useMemo } from "react";

// Add more mock articles to ensure we have at least 5 reels
const additionalArticles: NewsArticle[] = [
  {
    id: 101,
    title: "Breakthrough in Quantum Computing Promises New Era of Technology",
    summary: "Scientists have achieved a major breakthrough in quantum computing, developing a stable qubit that could revolutionize processing power.",
    content: "Quantum computing researchers at MIT have announced a groundbreaking development in stable qubit technology. This innovation could lead to quantum computers capable of solving complex problems in minutes that would take traditional supercomputers thousands of years to complete. Industry experts are calling this the most significant advancement in quantum computing of the past decade.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Dr. Emma Richards",
    date: "June 2, 2023",
    category: "Technology",
    trending: true,
    featured: true,
    likes: 583,
    comments: 47,
    liked: false,
    saved: false
  },
  {
    id: 102,
    title: "Global Climate Summit Reaches Historic Agreement on Emissions",
    summary: "World leaders have unanimously agreed on ambitious new targets to reduce carbon emissions by 50% before 2030.",
    content: "In a landmark decision at the Global Climate Summit, representatives from 195 countries have committed to cutting carbon emissions by 50% before the end of this decade. This unprecedented agreement includes strict enforcement mechanisms and financial support for developing nations. Environmental experts call this 'the turning point we've been waiting for' in the fight against climate change.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Marcus Chen",
    date: "May 28, 2023",
    category: "Environment",
    trending: true,
    featured: false,
    likes: 762,
    comments: 93,
    liked: false,
    saved: false
  },
  {
    id: 103,
    title: "Revolutionary AI System Can Diagnose Diseases Better Than Doctors",
    summary: "A new artificial intelligence system has demonstrated superior accuracy in diagnosing a range of medical conditions compared to human physicians.",
    content: "Healthcare technology company Medsync has unveiled an AI diagnostic system that has outperformed experienced physicians in identifying a variety of diseases from medical imaging data. In clinical trials, the AI achieved a 97% accuracy rate compared to the 86% average for human doctors. The system is especially promising for regions with limited access to medical specialists.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Dr. Sarah Patel",
    date: "June 5, 2023",
    category: "Health",
    trending: true,
    featured: true,
    likes: 891,
    comments: 104,
    liked: false,
    saved: false
  },
  {
    id: 104,
    title: "Space Tourism Company Announces First Commercial Flight to Orbit",
    summary: "After years of testing, Stellar Journeys will launch its first commercial space tourism flight next month with six civilian passengers.",
    content: "Space tourism is about to become a reality as Stellar Journeys confirms its inaugural commercial flight will launch on July 15. Six passengers, who each paid $28 million for a ticket, will experience three days in Earth orbit aboard the company's Celestial Cruiser spacecraft. This marks a major milestone in the commercialization of space travel and opens a new frontier for luxury tourism.",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "James Wilson",
    date: "June 10, 2023",
    category: "Science",
    trending: true,
    featured: false,
    likes: 723,
    comments: 86,
    liked: false,
    saved: false
  },
  {
    id: 105,
    title: "Cryptocurrency Market Rebounds as Regulatory Clarity Emerges",
    summary: "Major cryptocurrencies have seen double-digit gains as several countries announce clear regulatory frameworks for digital assets.",
    content: "The cryptocurrency market has experienced a significant recovery this week following announcements from major economies about new regulatory frameworks for digital assets. Bitcoin and Ethereum have both risen over 20% in value, while smaller altcoins have seen even larger gains. Analysts suggest this surge reflects growing confidence as regulatory uncertainty, which has long plagued the industry, begins to diminish.",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Anita Sharma",
    date: "June 8, 2023",
    category: "Finance",
    trending: true,
    featured: false,
    likes: 512,
    comments: 67,
    liked: false,
    saved: false
  }
];

const Index = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Combine original articles with additional ones to ensure we have at least 5
  const allArticles = useMemo(() => {
    return [...newsData, ...additionalArticles];
  }, []);
  
  const [articles, setArticles] = useState<NewsArticle[]>(allArticles);
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
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const isScrolling = useRef(false);

  // Smooth scrolling functions with debounce
  const smoothScrollToIndex = useCallback((index: number) => {
    if (isScrolling.current) return;
    
    const now = Date.now();
    if (now - lastScrollTime.current < 300) return; // Debounce scrolling
    
    lastScrollTime.current = now;
    isScrolling.current = true;
    
    setCurrentIndex(index);
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, []);

  // Ensure smooth scrolling using requestAnimationFrame
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default scrolling behavior

      if (isScrolling.current) return;

      requestAnimationFrame(() => {
        if (e.deltaY > 20) {
          // Scroll down
          if (currentIndex < articles.length - 1) {
            smoothScrollToIndex(currentIndex + 1);
          }
        } else if (e.deltaY < -20) {
          // Scroll up
          if (currentIndex > 0) {
            smoothScrollToIndex(currentIndex - 1);
          }
        }
      });
    };

    const reelsElement = reelsRef.current;
    if (reelsElement) {
      reelsElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (reelsElement) {
        reelsElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex, articles.length, smoothScrollToIndex]);

  // Optimized touch handling for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) < 50) return; // Require significant swipe
      
      requestAnimationFrame(() => {
        if (deltaY > 0) {
          // Swipe Up - go to next
          if (currentIndex < articles.length - 1) {
            smoothScrollToIndex(currentIndex + 1);
          }
        } else {
          // Swipe Down - go to previous
          if (currentIndex > 0) {
            smoothScrollToIndex(currentIndex - 1);
          }
        }
      });
    };
    
    // Add optimized touch listeners
    const reelsElement = reelsRef.current;
    if (reelsElement) {
      reelsElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      reelsElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    return () => {
      if (reelsElement) {
        reelsElement.removeEventListener('touchstart', handleTouchStart);
        reelsElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex, articles.length, smoothScrollToIndex]);

  // Optimized handlers with useCallback
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
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    
    return articles
      .filter(
        (article) =>
          article.id !== selectedArticle.id &&
          article.category === selectedArticle.category
      )
      .slice(0, 4);
  }, [selectedArticle, articles]);

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-hidden bg-background" ref={containerRef}>
      <TopNav />
      
      {/* Main Feed with improved scrolling */}
      <div 
        className="h-full w-full pt-16 pb-16 relative will-change-transform" 
        ref={reelsRef}
      >
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className={`w-full h-full ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: `translateY(${(index - currentIndex) * 100}vh)`,
              willChange: 'transform, opacity'
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

      {/* Navigation Indicators - more subtle design */}
      {currentIndex > 0 && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full opacity-60">
          <span>⬆️ Swipe up</span>
        </div>
      )}
      
      {currentIndex < articles.length - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full opacity-60">
          <span>⬇️ Swipe down</span>
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
