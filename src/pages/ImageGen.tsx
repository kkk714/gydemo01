import { useState } from "react";
import { Sparkles, Download, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageGen = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("romantic");
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = [
    { value: "romantic", label: "浪漫" },
    { value: "daily", label: "日常" },
    { value: "fantasy", label: "梦幻" },
    { value: "formal", label: "正式" },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
            AI 图片生成工作台
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  创作参数
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt" className="text-foreground">
                      描述你想要的画面
                    </Label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="例如：在星空下的浪漫约会，两个人坐在长椅上..."
                      className="mt-2 min-h-[120px] bg-background"
                    />
                  </div>

                  <div>
                    <Label htmlFor="style" className="text-foreground">
                      画面风格
                    </Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger className="mt-2 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full bg-gradient-accent hover:shadow-glow"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGenerating ? "生成中..." : "开始生成"}
                  </Button>
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  已生成作品
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-secondary/50 border border-border"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  预览
                </h3>

                <div className="aspect-square rounded-xl bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center mb-4">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-muted-foreground">正在生成中...</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">生成的图片将在这里显示</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={isGenerating}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={isGenerating}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </div>

              {/* Community Showcase */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  社区作品
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="w-16 h-16 rounded-lg bg-secondary/50" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium mb-1">
                          用户作品 {i}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          获得 128 个赞
                        </p>
                      </div>
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

export default ImageGen;
