
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/data/newsData";
import { X, Facebook, Twitter, Linkedin, Mail, Link2, Copy, Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  article: NewsArticle;
  onClose: () => void;
}

export const ShareDialog = ({ article, onClose }: ShareDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const articleUrl = `https://example.com/article/${article.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    
    toast({
      title: "Link copied",
      description: "Article link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = (platform: string) => {
    toast({
      title: `Shared on ${platform}`,
      description: `Article would be shared on ${platform}`,
    });
    
    // Close dialog after sharing
    setTimeout(() => onClose(), 1000);
  };
  
  return (
    <div className="comment-overlay">
      <div className="share-dialog animate-scale-in">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Share2 size={18} />
            Share Article
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={18} />
          </Button>
        </div>
        
        <div className="p-6">
          <h4 className="font-medium text-base mb-2">{article.title}</h4>
          <p className="text-sm text-muted-foreground mb-6">Share this article with your friends and network</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center py-4 h-auto gap-2 hover:bg-blue-600/10 transition-colors" 
              onClick={() => handleShare("Facebook")}
            >
              <Facebook size={24} className="text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center py-4 h-auto gap-2 hover:bg-sky-500/10 transition-colors" 
              onClick={() => handleShare("Twitter")}
            >
              <Twitter size={24} className="text-sky-500" />
              <span className="text-xs">Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center py-4 h-auto gap-2 hover:bg-blue-800/10 transition-colors" 
              onClick={() => handleShare("LinkedIn")}
            >
              <Linkedin size={24} className="text-blue-800" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center py-4 h-auto gap-2 hover:bg-red-500/10 transition-colors" 
              onClick={() => handleShare("Email")}
            >
              <Mail size={24} className="text-red-500" />
              <span className="text-xs">Email</span>
            </Button>
          </div>
          
          <div className="border rounded-lg flex items-center p-2 mb-4">
            <div className="flex-1 truncate text-sm px-2">
              {articleUrl}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyLink}
              className="flex items-center gap-1 hover:bg-[#0077B6]/10"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            By sharing this article, you're helping spread knowledge and insights on {article.category}
          </p>
        </div>
      </div>
    </div>
  );
};
