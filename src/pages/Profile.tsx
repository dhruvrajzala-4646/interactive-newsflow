
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import { newsData, NewsArticle } from "@/data/newsData";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import NewsCard from "@/components/news/NewsCard";

const Profile = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [savedArticles] = useState<NewsArticle[]>(
    newsData.filter((article) => article.saved)
  );
  
  const [categories] = useState([
    { id: 1, name: "Politics", enabled: true },
    { id: 2, name: "Technology", enabled: true },
    { id: 3, name: "Business", enabled: false },
    { id: 4, name: "Sports", enabled: true },
    { id: 5, name: "Entertainment", enabled: false },
    { id: 6, name: "Science", enabled: true },
    { id: 7, name: "Health", enabled: false },
  ]);
  
  const [notifications] = useState([
    { id: 1, name: "Breaking News", enabled: true },
    { id: 2, name: "Daily Digest", enabled: true },
    { id: 3, name: "Topic Updates", enabled: false },
    { id: 4, name: "Trending Stories", enabled: true },
  ]);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: theme === "dark" ? "Light mode enabled" : "Dark mode enabled",
      description: "Your theme preference has been updated",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <TopNav />
      
      <div className="container py-6 mt-16">
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary mb-4">
            U
          </div>
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-muted-foreground">user@example.com</p>
        </div>
        
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
            <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>
            {savedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    size="medium"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-xl text-muted-foreground mb-4">
                  You haven't saved any articles yet
                </p>
                <p className="text-muted-foreground">
                  Save articles by tapping the bookmark icon while reading
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <p className="text-muted-foreground mb-4">
                  Select the news categories you're interested in
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                      <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                        {category.name}
                      </Label>
                      <Switch
                        id={`category-${category.id}`}
                        checked={category.enabled}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
                <div className="flex items-center justify-between border border-border rounded-lg p-4">
                  <div>
                    <Label htmlFor="dark-mode" className="block cursor-pointer">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="grid grid-cols-1 gap-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                      <Label htmlFor={`notification-${notification.id}`} className="cursor-pointer">
                        {notification.name}
                      </Label>
                      <Switch
                        id={`notification-${notification.id}`}
                        checked={notification.enabled}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
