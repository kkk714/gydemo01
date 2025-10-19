import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Image as ImageIcon, Users as UsersIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroBackground from "@/assets/hero-background.jpg";
import characterPlaceholder from "@/assets/character-placeholder.png";

const Index = () => {
  const characters = [
    { id: 1, name: "角色一", image: characterPlaceholder },
    { id: 2, name: "角色二", image: characterPlaceholder },
    { id: 3, name: "角色三", image: characterPlaceholder },
    { id: 4, name: "角色四", image: characterPlaceholder },
    { id: 5, name: "角色五", image: characterPlaceholder },
  ];

  const features = [
    {
      icon: MessageCircle,
      title: "无需注册，立即体验",
      description: "无门槛开始与角色对话",
    },
    {
      icon: Sparkles,
      title: "与5位角色自由对话",
      description: "深度互动，真实情感",
    },
    {
      icon: ImageIcon,
      title: "生成专属回忆图片",
      description: "AI创作你的专属时刻",
    },
    {
      icon: UsersIcon,
      title: "加入同好社区",
      description: "分享交流，结识同好",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(23, 23, 60, 0.8), rgba(23, 23, 60, 0.9)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-80" />
        
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 animate-fade-in">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              与你的他相遇
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-center text-foreground/80 mb-16 animate-fade-in">
            从对话开始，编织属于你们的故事
          </p>

          {/* Character Grid */}
          <div className="flex justify-center items-center gap-8 mb-16 flex-wrap animate-slide-up">
            {characters.map((character, index) => (
              <div
                key={character.id}
                className="flex flex-col items-center gap-3 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/50 group-hover:border-accent transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm md:text-base font-medium text-foreground group-hover:text-accent transition-colors">
                  {character.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link
              to="/chat"
              className="px-8 py-4 rounded-xl bg-gradient-accent text-primary-foreground font-bold text-lg hover:scale-105 transition-transform shadow-glow flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              立即开始对话（无需注册）
            </Link>
            <Link
              to="/auth"
              className="px-8 py-4 rounded-xl border-2 border-accent text-accent font-medium text-lg hover:bg-accent/10 transition-all flex items-center gap-2"
            >
              注册/登录
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            为什么选择我们
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-card group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
