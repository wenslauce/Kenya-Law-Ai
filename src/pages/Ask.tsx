import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Ask = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Add initial system message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm your Kenyan Constitution AI assistant. I can help you understand Kenya's constitutional framework, legal principles, and specific articles. What would you like to know about the Constitution of Kenya?"
      }
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input);
      const assistantMessage = { role: "assistant" as const, content: response };
      setMessages((prev) => [...prev, assistantMessage]);
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
        <h1 className="text-3xl font-bold mb-6">Ask About Kenya's Constitution</h1>
        <p className="text-muted-foreground mb-6">
          Get expert answers about Kenya's Constitution, legal framework, and constitutional principles.
          I'll provide responses based on official constitutional documents with relevant article citations.
        </p>
        
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
          <ScrollArea className="h-[60vh] p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg prose prose-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-4"
                        : "bg-muted mr-4 prose-headings:text-accent prose-headings:font-semibold prose-b:text-accent prose-b:font-semibold prose-i:text-muted-foreground"
                    }`}
                  >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: message.content }} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg mr-4">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the constitution..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ask;
