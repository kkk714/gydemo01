import { useState } from "react";
import { Sparkles, Download, Share2, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageGen = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [characterPhotos, setCharacterPhotos] = useState<(string | null)[]>([null, null, null, null, null]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const characterNames = ["夏鸣星", "查理苏", "齐司礼", "陆沉", "萧逸"];
  const [textPrompt, setTextPrompt] = useState("");
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null);

  const handleUserPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCharacterPhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotos = [...characterPhotos];
        newPhotos[index] = e.target?.result as string;
        setCharacterPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userPhoto) {
      toast({
        title: "请上传您的照片",
        description: "需要上传您的照片才能生成合照",
        variant: "destructive",
      });
      return;
    }

    const uploadedCount = characterPhotos.filter(p => p !== null).length;
    if (uploadedCount === 0) {
      toast({
        title: "请至少上传一张角色照片",
        description: "需要至少一张角色照片才能生成合照",
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem("siliconflow_api_key");
    if (!apiKey) {
      toast({
        title: "未设置API密钥",
        description: "请先在设置页面配置API密钥",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const uploadedCharacters = characterPhotos
        .map((photo, index) => photo ? characterNames[index] : null)
        .filter(name => name !== null)
        .join("、");

      const prompt = `一张温馨的合照，包含用户和${uploadedCharacters}，大家站在一起微笑，背景是温暖的场景，高质量摄影，自然光线，真实感`;

      const response = await fetch("https://api.siliconflow.cn/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Kwai-Kolors/Kolors",
          prompt: prompt,
          image_size: "1024x1024",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "合照生成失败");
      }

      setGeneratedImage(data.images[0].url);
      toast({
        title: "生成成功",
        description: "合照已生成完成",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "合照生成失败",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateWithPrompt = async () => {
    if (!textPrompt.trim()) {
      toast({
        title: "请输入描述文字",
        description: "需要输入描述才能生成照片",
        variant: "destructive",
      });
      return;
    }

    if (selectedCharacterIndex === null) {
      toast({
        title: "请选择参考人物",
        description: "需要选择一个人物作为参考",
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem("siliconflow_api_key");
    if (!apiKey) {
      toast({
        title: "未设置API密钥",
        description: "请先在设置页面配置API密钥",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const characterName = characterNames[selectedCharacterIndex];
      const fullPrompt = `${textPrompt}，参考${characterName}的风格，高质量照片，专业摄影`;

      const response = await fetch("https://api.siliconflow.cn/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Kwai-Kolors/Kolors",
          prompt: fullPrompt,
          image_size: "1024x1024",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "照片生成失败");
      }

      setGeneratedImage(data.images[0].url);
      toast({
        title: "生成成功",
        description: "照片已生成完成",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "照片生成失败",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
            AI 照片生成
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Panel */}
            <div className="space-y-6">
              {/* 文字描述生成 */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  文字描述生成
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground mb-2 block">输入描述文字</Label>
                    <Textarea
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      placeholder="例如：在海边看日落，穿着白色连衣裙..."
                      className="min-h-[100px] bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground mb-2 block">选择参考人物</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {characterNames.map((name, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedCharacterIndex(index)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                            selectedCharacterIndex === index
                              ? "border-primary bg-primary/10"
                              : "border-border bg-secondary/30 hover:bg-secondary/50"
                          }`}
                        >
                          <p className="text-sm font-medium">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleGenerateWithPrompt}
                    disabled={!textPrompt.trim() || selectedCharacterIndex === null || isGenerating}
                    className="w-full bg-gradient-accent hover:shadow-glow"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGenerating ? "生成中..." : "生成照片"}
                  </Button>
                </div>
              </div>

              {/* 上传合照 */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  生成专属合照
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">上传您的照片</Label>
                    <div className="aspect-video rounded-lg bg-secondary/50 border border-border flex items-center justify-center overflow-hidden cursor-pointer hover:bg-secondary/70 transition-colors">
                      {userPhoto ? (
                        <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <label htmlFor="user-photo" className="cursor-pointer flex flex-col items-center py-4">
                          <Upload className="w-8 h-8 text-muted-foreground mb-1" />
                          <p className="text-muted-foreground text-xs">点击上传</p>
                          <input
                            id="user-photo"
                            type="file"
                            accept="image/*"
                            onChange={handleUserPhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    {userPhoto && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-xs"
                        onClick={() => setUserPhoto(null)}
                      >
                        重新上传
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">上传角色照片</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {characterNames.map((name, index) => (
                        <div key={index} className="space-y-1">
                          <p className="text-xs text-muted-foreground">{name}</p>
                          <div className="aspect-square rounded-lg bg-secondary/50 border border-border flex items-center justify-center overflow-hidden cursor-pointer hover:bg-secondary/70 transition-colors">
                            {characterPhotos[index] ? (
                              <img
                                src={characterPhotos[index]!}
                                alt={name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <label htmlFor={`character-${index}`} className="cursor-pointer flex flex-col items-center p-2">
                                <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                <p className="text-muted-foreground text-xs text-center">上传</p>
                                <input
                                  id={`character-${index}`}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleCharacterPhotoUpload(index, e)}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                          {characterPhotos[index] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs h-6"
                              onClick={() => {
                                const newPhotos = [...characterPhotos];
                                newPhotos[index] = null;
                                setCharacterPhotos(newPhotos);
                              }}
                            >
                              移除
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!userPhoto || isGenerating}
                      className="w-full mt-3 bg-gradient-accent hover:shadow-glow"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? "生成中..." : "生成合照"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  预览
                </h3>

                <div className="aspect-square rounded-xl bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center mb-4 overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-muted-foreground">正在生成中...</p>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-muted-foreground">生成的图片将在这里显示</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={isGenerating || !generatedImage}
                    onClick={() => {
                      if (generatedImage) {
                        const a = document.createElement("a");
                        a.href = generatedImage;
                        a.download = "generated-image.png";
                        a.click();
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    disabled={isGenerating || !generatedImage}
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
