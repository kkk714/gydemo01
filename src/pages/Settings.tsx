import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem("siliconflow_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "错误",
        description: "请输入API密钥",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("siliconflow_api_key", apiKey);
    toast({
      title: "保存成功",
      description: "API密钥已保存",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h1 className="text-2xl font-bold mb-6 text-foreground">设置</h1>

            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey" className="text-foreground">
                  SiliconFlow API 密钥
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="输入你的 API 密钥"
                  className="mt-2 bg-background"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  在{" "}
                  <a
                    href="https://cloud.siliconflow.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    SiliconFlow
                  </a>{" "}
                  获取你的 API 密钥
                </p>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gradient-accent hover:shadow-glow"
              >
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
