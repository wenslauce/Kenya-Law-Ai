import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Constitution from "./pages/Constitution";
import Search from "./pages/Search";
import Ask from "./pages/Ask";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set Gemini API key on app load
    localStorage.setItem("GEMINI_API_KEY", "AIzaSyD700ZbCWlohEA62p3zHZfLmQmBKmk_cwg");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/constitution" element={<Constitution />} />
            <Route path="/search" element={<Search />} />
            <Route path="/ask" element={<Ask />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;