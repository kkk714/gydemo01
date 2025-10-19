import { Heart, MessageCircle, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const posts = [
    {
      id: 1,
      type: "chat",
      user: "梦幻旅人",
      content: "今天和角色一聊了好久，真的太温柔了...",
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      type: "image",
      user: "星空守望",
      content: "生成的这张图太美了！",
      likes: 456,
      comments: 89,
    },
    {
      id: 3,
      type: "chat",
      user: "时光旅者",
      content: "分享一段精彩对话...",
      likes: 178,
      comments: 32,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
            同好社区
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 bg-card border border-border">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="chat">对话分享</TabsTrigger>
                  <TabsTrigger value="image">生成图片</TabsTrigger>
                  <TabsTrigger value="hot">热门</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-accent" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {post.user}
                          </h4>
                          <p className="text-sm text-muted-foreground">2小时前</p>
                        </div>
                      </div>

                      <p className="text-foreground mb-4">{post.content}</p>

                      {post.type === "image" && (
                        <div className="aspect-video rounded-lg bg-secondary/50 mb-4" />
                      )}

                      <div className="flex items-center gap-6 text-muted-foreground">
                        <button className="flex items-center gap-2 hover:text-accent transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-accent transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-accent transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-4">
                <h3 className="font-semibold mb-4 text-foreground">热门话题</h3>
                <div className="space-y-3">
                  {["#今日互动", "#最佳对话", "#精彩瞬间"].map((tag) => (
                    <button
                      key={tag}
                      className="w-full text-left px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-4">
                <h3 className="font-semibold mb-4 text-foreground">推荐用户</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-accent" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          用户 {i}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        关注
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
