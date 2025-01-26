import { useState } from "react";
import Layout from "@/components/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";

const constitutionChapters = [
  {
    id: "chapter1",
    title: "Chapter One - Sovereignty of The People and Supremacy of This Constitution",
    summary: "This chapter establishes that all sovereign power belongs to the people of Kenya. It outlines how this power is exercised through democratic representation and delegated to state organs including Parliament, Executive, and Judiciary at both national and county levels.",
    content: `1. (1) All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.
    (2) The people may exercise their sovereign power either directly or through their democratically elected representatives.
    (3) Sovereign power under this Constitution is delegated to the following State organs, which shall perform their functions in accordance with this Constitution–
    (a) Parliament and the legislative assemblies in the county governments;
    (b) the national executive and the executive structures in the county governments; and
    (c) the Judiciary and independent tribunals.
    (4) The sovereign power of the people is exercised at–
    (a) the national level; and
    (b) the county level.`
  },
  {
    id: "chapter2",
    title: "Chapter Two - The Republic",
    summary: "Defines Kenya as a sovereign, multi-party democratic state. It establishes the territory of Kenya and outlines the fundamental principles of governance and national values.",
    content: `2. (1) Kenya is a sovereign Republic.
    (2) The Republic of Kenya shall be a multi-party democratic State founded on the national values and principles of governance referred to in Article 10.
    (3) The territory of Kenya consists of the territory and territorial waters comprising Kenya on the effective date, and any additional territory and territorial waters as defined by an Act of Parliament.`
  },
  {
    id: "chapter3",
    title: "Chapter Three - Citizenship",
    content: `13. (1) Every person who was a citizen immediately before the effective date retains the same citizenship status as of that date.
    (2) Citizenship may be acquired by birth or registration.
    (3) Citizenship is not lost through marriage or the dissolution of marriage.
    
    14. A person is a citizen by birth if on the day of the person's birth, whether or not the person is born in Kenya, either the mother or father of the person is a citizen.`
  },
  {
    id: "chapter4",
    title: "Chapter Four - The Bill of Rights",
    content: `19. (1) The Bill of Rights is an integral part of Kenya's democratic state and is the framework for social, economic and cultural policies.
    (2) The purpose of recognising and protecting human rights and fundamental freedoms is to preserve the dignity of individuals and communities and to promote social justice and the realisation of the potential of all human beings.
    
    20. (1) The Bill of Rights applies to all law and binds all State organs and all persons.
    (2) Every person shall enjoy the rights and fundamental freedoms in the Bill of Rights to the greatest extent consistent with the nature of the right or fundamental freedom.`
  },
  {
    id: "chapter5",
    title: "Chapter Five - Land and Environment",
    content: `60. (1) Land in Kenya shall be held, used and managed in a manner that is equitable, efficient, productive and sustainable, and in accordance with the following principles—
    (a) equitable access to land;
    (b) security of land rights;
    (c) sustainable and productive management of land resources;
    (d) transparent and cost effective administration of land;
    (e) sound conservation and protection of ecologically sensitive areas;
    (f) elimination of gender discrimination in law, customs and practices related to land and property in land; and
    (g) encouragement of communities to settle land disputes through recognised local community initiatives consistent with this Constitution.`
  },
  {
    id: "chapter6",
    title: "Chapter Six - Leadership and Integrity",
    content: `73. (1) Authority assigned to a State officer—
    (a) is a public trust to be exercised in a manner that—
    (i) is consistent with the purposes and objects of this Constitution;
    (ii) demonstrates respect for the people;
    (iii) brings honour to the nation and dignity to the office; and
    (iv) promotes public confidence in the integrity of the office; and
    (b) vests in the State officer the responsibility to serve the people, rather than the power to rule them.`
  }
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const Constitution = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  
  // Function to safely render HTML content
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const [chapterChats, setChapterChats] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleSendMessage = async (chapterId: string) => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setChapterChats(prev => ({
      ...prev,
      [chapterId]: [...(prev[chapterId] || []), userMessage]
    }));
    setInput("");

    try {
      const chapter = constitutionChapters.find(c => c.id === chapterId);
      const prompt = `Regarding this chapter of the Kenyan Constitution: "${chapter?.title}"\n\nQuestion: ${input}\n\nPlease provide information specifically in the context of Kenya's legal framework and this chapter.`;
      
      const response = await getGeminiResponse(prompt);
      const assistantMessage: ChatMessage = { role: "assistant", content: response };
      
      setChapterChats(prev => ({
        ...prev,
        [chapterId]: [...(prev[chapterId] || []), assistantMessage]
      }));
    } catch (error) {
      toast({
        title: "Hakuna Shida!",
        description: " It seems we’re unable to fetch the details at the moment. Please try again shortly",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-kai font-bold mb-6">Constitution of Kenya</h1>
        
        <Accordion type="single" collapsible>
          {constitutionChapters.map((chapter) => (
          <AccordionItem key={chapter.id} value={chapter.id}>
            <AccordionTrigger className="text-xl font-kai font-semibold">
            {chapter.title}
            </AccordionTrigger>
            <AccordionContent>
            <div className="space-y-4">
                {/* Chapter Summary */}
                <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-muted-foreground">{chapter.summary}</p>
                </div>

                {/* Chapter Content */}
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="whitespace-pre-wrap">{chapter.content}</div>
                </ScrollArea>
              
              <div className="mt-4 space-y-4">
              <div className="border rounded-lg p-4">
                <div className="space-y-4 mb-4">
                {chapterChats[chapter.id]?.map((message, index) => (
                  <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg prose prose-sm ${
                      message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted mr-4"
                    }`}
                    >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <div dangerouslySetInnerHTML={createMarkup(message.content)} />
                    )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={`Ask about ${chapter.title}...`}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(chapter.id)}
                        />
                        <Button onClick={() => handleSendMessage(chapter.id)}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default Constitution;