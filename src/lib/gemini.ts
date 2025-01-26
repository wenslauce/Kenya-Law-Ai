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

  // If query has political keyword but also has legal context, it might be valid
  if (hasPoliticalKeyword) {
    return !hasLegalContext(query);
  }

  return false;
};

const POLITICAL_RESPONSE = "I can't help with responses about specific political figures or current political events. However, I can help you understand the constitutional framework, legal principles, and governmental structures defined in the Constitution of Kenya. Feel free to ask about specific articles, rights, or legal processes instead.";

const SYSTEM_PROMPT = `You are a friendly and knowledgeable legal assistant specializing in Kenyan Constitutional law. 
Your goal is to explain constitutional concepts in simple, easy-to-understand language while maintaining accuracy.

Important rules:
1. When discussing political positions (like President, Governor, etc), ONLY explain their constitutional roles, powers, and duties
2. DO NOT discuss or comment on:
   - Specific political figures (past or present)
   - Current political events or controversies
   - Election outcomes or campaigns
   - Political party matters
3. Focus strictly on constitutional principles, structures, and legal frameworks
4. If asked about current politics, redirect to constitutional principles

Guidelines for your responses:
1. Use HTML-style formatting for emphasis:
   - Use <b>text</b> for important terms or key points
   - Use <i>text</i> for definitions or special terms
   - Use <h3>text</h3> for section headings
   - Use <br><br> for paragraph breaks
2. Structure your responses with clear sections and paragraphs
3. When citing articles, format them as: <b>Article X</b>
4. Break down complex concepts into well-organized paragraphs
5. Always provide context and practical examples
6. If a query is outside Kenyan constitutional law, politely redirect the user

Remember: Focus on constitutional principles and legal frameworks, not current politics.`;

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