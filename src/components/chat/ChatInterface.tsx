
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, PlusCircle } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { SuggestionChip } from "./SuggestionChip";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

// Sample suggestion questions
const sampleQueries = [
  "What are the top performing channels this month?",
  "How has the conversion rate changed over time?",
  "Where should I focus my marketing budget?",
  "What metrics are underperforming compared to last month?",
  "Identify any anomalies in our recent campaign data",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      content: "Hello! I'm your analytics assistant. How can I help you understand your marketing data today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length,
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (In a real app, this would call an API)
    setTimeout(() => {
      generateAIResponse(userMessage.content);
    }, 1000);
  };
  
  const generateAIResponse = (query: string) => {
    // Mock AI response - replace with actual AI integration
    let aiResponse = "";
    
    // Simple keyword matching for demo purposes
    if (query.toLowerCase().includes("top performing")) {
      aiResponse = "Based on the latest data, your top performing channel is Paid Search, which generated 42% of your total revenue this month. This is followed by Social Media (28%) and Email (18%).";
    } else if (query.toLowerCase().includes("conversion rate")) {
      aiResponse = "Your overall conversion rate has increased by 2.3% compared to last month. The most notable improvement was in the Mobile segment, where conversion rates went up by 3.7%.";
    } else if (query.toLowerCase().includes("budget")) {
      aiResponse = "Looking at your ROAS data, I recommend increasing budget allocation to Paid Search and Social Media campaigns, particularly those targeting the 25-34 age demographic which shows the highest conversion rates.";
    } else if (query.toLowerCase().includes("underperforming")) {
      aiResponse = "Your Display advertising campaigns are currently underperforming with a ROAS of 1.2, below your target of 2.0. Consider revising creative assets or targeting parameters for these campaigns.";
    } else if (query.toLowerCase().includes("anomalies")) {
      aiResponse = "I've detected an unusual spike in bounce rates (up 15%) for landing pages from your recent email campaign. This might indicate a mismatch between email messaging and landing page content.";
    } else {
      aiResponse = "I've analyzed your recent marketing performance data. Overall, your ROAS is 2.4 across all channels, with a 3.2% conversion rate. Your best-performing segments are the 25-34 age group in urban areas. Would you like more specific insights about any particular aspect of your marketing data?";
    }
    
    const aiMessage: Message = {
      id: messages.length + 1,
      role: "ai",
      content: aiResponse,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
  };

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Bot className="h-4 w-4" />
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="px-4 py-2 border-t">
        <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleQueries.map((query, index) => (
            <SuggestionChip 
              key={index} 
              query={query} 
              onClick={() => handleSuggestionClick(query)}
            />
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t p-4">
        <div className="relative">
          <Textarea
            placeholder="Ask a question about your analytics data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="pr-12 resize-none"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
    </div>
  );
}
