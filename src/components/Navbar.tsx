import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Image, Users, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/chat", icon: MessageSquare, label: "对话" },
    { path: "/image-gen", icon: Image, label: "图片" },
    { path: "/community", icon: Users, label: "社区" },
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
            
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg bg-gradient-gold text-accent-foreground font-medium text-sm hover:shadow-glow transition-all"
            >
              登录
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
