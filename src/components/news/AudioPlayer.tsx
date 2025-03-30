
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioPlayerProps {
  article: NewsArticle | null;
  isOpen: boolean;
  isMinimized?: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

type VoiceType = "male" | "female" | "robotic";
type SpeedType = "slow" | "normal" | "fast";

const AudioPlayer = ({
  article,
  isOpen,
  isMinimized = false,
  onClose,
  onMinimize,
  onMaximize
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState<VoiceType>("male");
  const [speed, setSpeed] = useState<SpeedType>("normal");
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  
  const waveformInterval = useRef<number | null>(null);
  
  // Create random waveform for visual effect
  useEffect(() => {
    if (isPlaying) {
      clearInterval(waveformInterval.current || undefined);
      waveformInterval.current = window.setInterval(() => {
        const newWaveform = Array.from({ length: 20 }, () => 
          Math.floor(Math.random() * 100)
        );
        setWaveform(newWaveform);
      }, 150);
    } else {
      clearInterval(waveformInterval.current || undefined);
    }
    
    return () => {
      if (waveformInterval.current) {
        clearInterval(waveformInterval.current);
      }
    };
  }, [isPlaying]);
  
  // Mock progress update for demonstration
  useEffect(() => {
    let progressInterval: number | null = null;
    
    if (isPlaying) {
      progressInterval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const increment = speed === "slow" ? 0.2 : speed === "fast" ? 0.8 : 0.4;
          return Math.min(prev + increment, 100);
        });
      }, 100);
    }
    
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isPlaying, speed]);
  
  // Reset progress when article changes
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [article?.id]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    } else if (value[0] === 0) {
      setIsMuted(true);
    }
  };
  
  if (!article || !isOpen) return null;
  
  const VolumeIcon = isMuted || volume === 0 
    ? VolumeX 
    : volume < 50 
      ? Volume1 
      : Volume2;
  
  // Mini player at the bottom of the screen
  if (isMinimized) {
    return (
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border shadow-lg z-40 animate-slide-in-up">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </Button>
            
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{article.title}</p>
              <div className="flex space-x-2 items-center">
                <p className="text-xs text-muted-foreground">{voiceType} voice • {speed} speed</p>
                <div className="flex space-x-1">
                  {waveform.slice(0, 8).map((height, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-0.5 bg-primary rounded-full",
                        isPlaying ? "animate-pulse" : ""
                      )}
                      style={{ 
                        height: `${Math.max(3, height * 0.1)}px`,
                        opacity: isPlaying ? 1 : 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full hover:bg-muted"
              onClick={onMaximize}
            >
              <SkipForward size={14} className="rotate-90" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full hover:bg-muted text-muted-foreground"
              onClick={onClose}
            >
              <SkipForward size={14} className="-rotate-90" />
            </Button>
          </div>
        </div>
        
        <div className="h-1 bg-muted w-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }
  
  // Full player
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40 transition-all duration-300 ease-in-out",
      isOpen ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="container max-w-3xl mx-auto p-4 pb-20">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg truncate pr-4">{article.title}</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onMinimize}>
                Minimize
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center my-4">
            <div className="flex space-x-1 h-20 items-end px-2">
              {waveform.map((height, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-1.5 bg-primary rounded-full mx-0.5 transition-all duration-150",
                    isPlaying ? "animate-pulse" : ""
                  )}
                  style={{ 
                    height: `${height}%`,
                    opacity: isPlaying ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            
            <div className="flex-1">
              <Slider
                value={[progress]}
                min={0}
                max={100}
                step={0.1}
                onValueChange={handleProgressChange}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {Math.floor(progress / 100 * 60)}:{String(Math.floor((progress / 100 * 60) % 1 * 60)).padStart(2, '0')}
                </span>
                <span>
                  {Math.floor(60 * (speed === "slow" ? 1.5 : speed === "fast" ? 0.75 : 1))}:00
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-muted"
                onClick={toggleMute}
              >
                <VolumeIcon size={18} />
              </Button>
              <Slider
                value={[volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Voice</label>
              <Select value={voiceType} onValueChange={(v) => setVoiceType(v as VoiceType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="robotic">Robotic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Speed</label>
              <Select value={speed} onValueChange={(v) => setSpeed(v as SpeedType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
