import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import heroBackground from "@/assets/hero-background.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/chat");
    }
  }, [navigate]);

  const benefits = [
    "永久保存对话记录",
    "生成更多风格图片",
    "加入温暖社区",
    "解锁专属功能",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify({ email: user.email }));
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
        navigate("/chat");
      } else {
        toast({
          title: "登录失败",
          description: "邮箱或密码错误",
          variant: "destructive",
        });
      }
    } else {
      // Signup logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        toast({
          title: "注册失败",
          description: "该邮箱已被注册",
          variant: "destructive",
        });
      } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify({ email }));
        toast({
          title: "注册成功",
          description: "欢迎加入！",
        });
        navigate("/chat");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(23, 23, 60, 0.9), rgba(23, 23, 60, 0.95)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Form Section */}
        <div className="bg-card/90 backdrop-blur-lg rounded-2xl border border-border p-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {isLogin ? "欢迎回来" : "加入我们"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "继续你的奇妙旅程" : "开启你的专属故事"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground">
                邮箱
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                密码
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-background"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-accent hover:shadow-glow">
              {isLogin ? "登录" : "注册"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-accent hover:underline"
            >
              {isLogin ? "还没有账户？立即注册" : "已有账户？立即登录"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/chat"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              稍后注册，继续体验 →
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            解锁完整功能
          </h3>
          <p className="text-xl text-foreground/80 mb-8">
            注册后享受更多专属特权
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-lg text-foreground"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
