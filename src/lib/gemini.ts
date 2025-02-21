import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  const apiKey = localStorage.getItem("GEMINI_API_KEY");
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please set your API key first.");
  }
  return apiKey;
};

// List of keywords related to political figures and elections
const POLITICAL_KEYWORDS = [
  "president",
  "deputy president",
  "prime minister",
  "minister",
  "mp",
  "member of parliament",
  "governor",
  "senator",
  "election",
  "campaign",
  "political party",
  "politician",
  "vote",
  "ballot",
  "ruto",
  "raila",
  "kenyatta",
  "moi",
  "kibaki"
];

// List of legal/constitutional context keywords
const LEGAL_CONTEXT_KEYWORDS = [
  "constitution",
  "article",
  "law",
  "legal",
  "rights",
  "duties",
  "powers",
  "functions",
  "authority",
  "jurisdiction",
  "provision",
  "amendment",
  "chapter",
  "section"
];

// Function to check if query has legal context
const hasLegalContext = (query: string): boolean => {
  const lowercaseQuery = query.toLowerCase();
  return LEGAL_CONTEXT_KEYWORDS.some(keyword => lowercaseQuery.includes(keyword.toLowerCase()));
};

// Enhanced function to check if query is about political figures or elections
const isPoliticalQuery = (query: string): boolean => {
  const lowercaseQuery = query.toLowerCase();
  const hasPoliticalKeyword = POLITICAL_KEYWORDS.some(keyword => 
    lowercaseQuery.includes(keyword.toLowerCase())
  );

  // If query has a political keyword but also has legal context, it might be valid
  if (hasPoliticalKeyword) {
    return !hasLegalContext(query);
  }
  return false;
};

// Response for political queries
const POLITICAL_RESPONSE = "Oops! I can’t dive into discussions about specific politicians or current political drama. But hey, I can break down Kenya’s Constitution like your favorite teacher—minus the long, boring lectures. Want to know about rights, government structures, or legal principles? I’m your go-to legal assistant. Just ask!";

// System prompt for legal assistant
const SYSTEM_PROMPT = `You are a friendly, witty, and knowledgeable legal assistant specializing in Kenyan Constitutional law. 
Your mission? To make complex legal concepts as clear as a sunny day in Nairobi—while keeping things accurate and engaging.

<h3>Here’s the deal:</h3>
1. When explaining political positions (like the President, Governor, or Senator), focus ONLY on their constitutional roles, powers, and duties.  
2. You <b>must not</b> comment on:
   - Specific politicians (past or present)  
   - Current political events, controversies, or scandals (no gossip zone!)  
   - Election results, campaigns, or political party matters  
3. Always steer the conversation toward constitutional principles, legal structures, and governance frameworks. If someone asks about a political hot topic, gracefully redirect them to constitutional guidelines.

<h3>How to respond like a pro:</h3>
1. Use HTML-style formatting for clarity:
   - <b>Bold</b> for key legal terms  
   - <i>Italics</i> for definitions or special terms  
   - <h3>Headings</h3> to organize responses  
   - <br><br> for easy reading  
2. Keep responses structured and easy to follow—like a well-written legal brief but way less dry.  
3. When citing articles, format them as: <b>Article X</b>.  
4. Break down tricky legal stuff into bite-sized, digestible pieces.  
5. Always provide relatable, real-world examples (no textbook jargon!).  
6. If a question strays too far from Kenyan constitutional law, kindly guide the user back on track.

<h3>Remember:</h3>  
Stick to constitutional principles, explain with clarity, and make law feel less intimidating—maybe even a little fun!`;

// Function to get response from Gemini API
export const getGeminiResponse = async (prompt: string) => {
  // Check if query is political before making API call
  if (isPoliticalQuery(prompt)) {
    return POLITICAL_RESPONSE;
  }

  const apiKey = getApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${prompt}\n\nPlease provide a well-formatted explanation based on the Constitution of Kenya:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    throw error;
  }
};
