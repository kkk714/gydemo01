import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import xiaoyi from "@/assets/xiaoyi.png";
import luchen from "@/assets/luchen.png";
import qisili from "@/assets/qisili.png";
import chaliesu from "@/assets/chaliesu.png";
import xiamingxing from "@/assets/xiamingxing.png";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "你好，很高兴见到你。今天想和我聊些什么呢？",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const characters = [
    { id: 1, name: "萧逸", image: xiaoyi },
    { id: 2, name: "陆沉", image: luchen },
    { id: 3, name: "齐司礼", image: qisili },
    { id: 4, name: "查理苏", image: chaliesu },
    { id: 5, name: "夏鸣星", image: xiamingxing },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const apiKey = localStorage.getItem("siliconflow_api_key");
    if (!apiKey) {
      toast({
        title: "未设置API密钥",
        description: "请先在设置页面配置API密钥",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2-7B-Instruct",
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API请求失败");
      }

      const aiMessage: Message = {
        id: newMessages.length + 1,
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "发送消息失败",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />

      <div className="pt-20 px-4 pb-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
            {/* Chat Area */}
            <div className="lg:col-span-3 bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-3">
                  <img
                    src={characters.find((c) => c.id === selectedCharacter)?.image}
                    alt="Character"
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {characters.find((c) => c.id === selectedCharacter)?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">在线</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-gradient-accent text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-secondary/30">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`对${characters.find((c) => c.id === selectedCharacter)?.name}说点什么...`}
                    className="flex-1 bg-background border-input"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-gradient-accent hover:shadow-glow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Character Selection */}
              <div className="bg-card rounded-2xl border border-border p-4">
                <div className="space-y-2">
                  {characters.map((character) => (
                    <button
                      key={character.id}
                      onClick={() => setSelectedCharacter(character.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        selectedCharacter === character.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{character.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-card rounded-2xl border border-border p-4">
                <h3 className="font-semibold mb-2 text-foreground">提示</h3>
                <p className="text-sm text-muted-foreground">
                  登录后可保存所有对话记录，解锁更多功能。
                </p>
                <Button className="w-full mt-3 bg-gradient-gold">
                  立即登录
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
