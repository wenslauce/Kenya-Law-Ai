import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Mic, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Constitution", icon: <BookOpen className="w-4 h-4" />, path: "/constitution" },
    { label: "Search", icon: <Search className="w-4 h-4" />, path: "/search" },
    { label: "Ask AI", icon: <Mic className="w-4 h-4" />, path: "/ask" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm border-b" 
        : "bg-transparent"
      }`}
      >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-16 md:h-20 px-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <img 
          src="/favicon.png" 
          alt="KenyaLaw AI Logo" 
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <span className="text-lg md:text-xl font-bold">KenyaLaw AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center space-x-2 text-sm font-medium text-accent hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          </SheetTrigger>
          <SheetContent>
          <div className="flex flex-col space-y-6 mt-8">
            {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 text-lg font-medium text-accent hover:text-primary transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
            ))}
          </div>
          </SheetContent>
        </Sheet>
        </nav>
      </div>
      </header>

      <main className="flex-1 pt-16 md:pt-20">{children}</main>

      <footer className="bg-accent text-accent-foreground py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-sm md:text-base text-center">
          Made with 🧡 Wenslauce Chengo | All Rights Reserved | 2025 Kenya Law AI
        </p>
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
          >
            {item.label}
          </Link>
          ))}
        </div>
        </div>
      </div>
      </footer>
    </div>
  );
};

export default Layout;