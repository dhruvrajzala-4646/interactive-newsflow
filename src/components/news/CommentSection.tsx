
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/data/newsData";
import { X, Send, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentSectionProps {
  article: NewsArticle;
  onClose: () => void;
}

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  text: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export const CommentSection = ({ article, onClose }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  
  // Mock comment data
  const comments: Comment[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      authorImage: "https://i.pravatar.cc/100?img=1",
      text: "This is such an insightful article! I especially liked the part about the economic implications.",
      date: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 4,
          author: "Michael Chen",
          authorImage: "https://i.pravatar.cc/100?img=4",
          text: "I agree, that part was very well researched.",
          date: "1 hour ago",
          likes: 3,
        }
      ]
    },
    {
      id: 2,
      author: "David Rodriguez",
      authorImage: "https://i.pravatar.cc/100?img=2",
      text: "I have a different perspective on this. While the article makes good points, I think there's more to consider.",
      date: "3 hours ago",
      likes: 8,
    },
    {
      id: 3,
      author: "Emma Williams",
      authorImage: "https://i.pravatar.cc/100?img=3",
      text: "Looking forward to a follow-up article on this topic!",
      date: "5 hours ago",
      likes: 6,
    }
  ];
  
  const handleSubmitComment = () => {
    if (newComment.trim() === "") return;
    // In a real app, this would post the comment to a server
    setNewComment("");
  };
  
  return (
    <div className="comment-overlay">
      <div className="comment-dialog">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-bold">Comments ({comments.length})</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-6">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.authorImage} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{comment.author}</h4>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                  <div className="flex gap-4 mt-2 ml-2">
                    <button className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                      <ThumbsUp size={14} /> {comment.likes}
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.authorImage} alt={reply.author} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted/20 p-2 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium text-sm">{reply.author}</h4>
                            <span className="text-xs text-muted-foreground">{reply.date}</span>
                          </div>
                          <p className="text-xs">{reply.text}</p>
                        </div>
                        <div className="flex gap-4 mt-1 ml-2">
                          <button className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                            <ThumbsUp size={12} /> {reply.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/100?img=5" alt="You" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="flex items-center gap-2"
            >
              <Send size={16} />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
