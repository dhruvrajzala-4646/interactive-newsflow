
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsArticle } from "@/data/newsData";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentArticle: NewsArticle | null;
}

const AiAssistant = ({ isOpen, onClose, currentArticle }: AiAssistantProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm your news assistant. What can I help you with?", isUser: false }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    
    // Mock AI response based on user input
    setTimeout(() => {
      let response = "";
      
      if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi")) {
        response = "Hello! How can I help you today?";
      } else if (input.toLowerCase().includes("summary") || input.toLowerCase().includes("summarize")) {
        response = currentArticle 
          ? `Here's a summary of "${currentArticle.title}": ${currentArticle.summary}`
          : "I don't have information about the current article. Can you ask something else?";
      } else if (input.toLowerCase().includes("author")) {
        response = currentArticle 
          ? `The article was written by ${currentArticle.author}.`
          : "I don't have information about the author of the current article.";
      } else if (input.toLowerCase().includes("more") || input.toLowerCase().includes("similar")) {
        response = "I can recommend similar articles on this topic. Would you like me to show you those?";
      } else {
        response = "I'm a simple assistant UI demonstration. In a real application, I would provide more detailed and personalized responses about the news article you're viewing. Is there anything else you'd like to know?";
      }
      
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);
    
    // Clear input
    setInput("");
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset messages when article changes
  useEffect(() => {
    if (currentArticle) {
      setMessages([
        { text: `Hi! I'm your news assistant. Ask me anything about "${currentArticle.title}"`, isUser: false }
      ]);
    }
  }, [currentArticle?.id]);

  // Fixed styling for the AI assistant to appear as a full page overlay
  return (
    <div 
      className={cn(
        "fixed inset-0 bg-background z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
          <div className="flex items-center p-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h2 className="text-lg font-bold">AI News Assistant</h2>
              <p className="text-xs text-muted-foreground">
                Ask questions about "{currentArticle?.title.substring(0, 20)}..."
              </p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex animate-fade-in",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="sticky bottom-0 bg-background p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about this news..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
