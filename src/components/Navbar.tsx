import { Link, useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, Image, Users, Home, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    toast({
      title: "已退出登录",
      description: "期待您的再次光临",
    });
    navigate("/");
  };
  
  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/chat", icon: MessageSquare, label: "对话" },
    { path: "/image-gen", icon: Image, label: "图片" },
    { path: "/community", icon: Users, label: "社区" },
    { path: "/settings", icon: Settings, label: "设置" },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            光与夜之恋
          </Link>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{currentUser.email}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-gradient-gold text-accent-foreground font-medium text-sm hover:shadow-glow transition-all"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
