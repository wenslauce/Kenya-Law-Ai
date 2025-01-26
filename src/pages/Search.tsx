import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  title: string;
  content: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to safely render HTML content
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const prompt = `Search query about Kenya's Constitution: "${searchQuery}"\n\nPlease provide relevant information from the Constitution of Kenya, including specific articles and explanations. Format the response with proper HTML tags for formatting.`;
      
      const response = await getGeminiResponse(prompt);
      
      // Split the response into sections based on headers
      const sections = response.split('<h3>').filter(Boolean);
      const results = sections.map((section, index) => ({
        title: index === 0 ? "Overview" : section.split('</h3>')[0],
        content: index === 0 ? section : section.split('</h3>')[1],
      }));
      
      setSearchResults(results);
    } catch (error) {
        toast({
        title: "Hakuna Shida!",
        description: "It seems we're unable to fetch the details at the moment. Please try again shortly",
        variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Constitution</h1>
        
        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search the constitution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SearchIcon className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>

        <ScrollArea className="h-[60vh]">
          <div className="space-y-6">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-3">{result.title}</h3>
                <div 
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={createMarkup(result.content)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Search;