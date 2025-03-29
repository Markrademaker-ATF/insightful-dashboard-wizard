
import React, { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, RefreshCw, ArrowDown, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock AI responses for demo purposes
const mockResponses = [
  "Based on your analytics data, the top performing channel is Social Media with a ROAS of 4.32x. Consider increasing budget allocation to this channel.",
  "I notice your campaign 'Summer Sale Promotion' has the highest conversion rate at 2.8%. You might want to analyze what elements made it successful and apply those to other campaigns.",
  "Looking at your recent trends, there's a 12% increase in mobile conversions compared to last month. This might indicate an opportunity to optimize your mobile experience further.",
  "Your data shows that the average customer journey involves 4 touchpoints before conversion. The most effective sequence appears to be: Display Ad → Social Media → Email → Website.",
  "Based on your attribution modeling, I'd recommend shifting 15% of your Search budget to Social Media to optimize overall ROAS.",
  "Analyzing your seasonal trends, I notice your conversion rates peak in late evenings between 8-10pm. Consider scheduling your high-impact campaigns during these hours.",
];

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const ChatAIPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Analytics AI assistant. How can I help you understand your marketing data today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your Analytics AI assistant. How can I help you understand your marketing data today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "All previous messages have been removed.",
    });
  };

  return (
    <div className="animate-fade-in space-y-6 h-[calc(100vh-12rem)] flex flex-col">
      <PageHeader
        title="Analytics AI Assistant"
        description="Ask questions about your marketing data and get AI-powered insights and recommendations."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Clear chat
        </Button>
      </PageHeader>

      <div className="flex-1 flex flex-col overflow-hidden shadow-md rounded-lg bg-white">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Analytics AI</h3>
              <p className="text-xs text-white/80">Powered by machine learning</p>
            </div>
          </div>
        </div>

        {/* Chat messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white"
                    : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-white/20"
                        : "bg-[#8B5CF6]/20"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-[#8B5CF6]" />
                    )}
                  </div>
                  <span className="text-xs">
                    {message.sender === "user" ? "You" : "Analytics AI"}
                  </span>
                  <span className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-[#8B5CF6]" />
                  </div>
                  <span className="text-xs">Analytics AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="dot-flashing"></div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-gray-50">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your analytics data..."
              className="pr-14 resize-none min-h-[80px] border-[#8B5CF6]/30 focus-visible:ring-[#8B5CF6]/50"
            />
            <Button
              size="icon"
              className="absolute right-2 bottom-2 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90"
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Shift + Enter for new line</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-[#8B5CF6]"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-3 w-3 mr-1" />
              Scroll to bottom
            </Button>
          </div>
        </div>
      </div>

      {/* Example questions */}
      <div className="p-4 rounded-lg shadow-sm bg-white">
        <h3 className="text-sm font-medium mb-2 text-[#8B5CF6]">Example questions you can ask:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Which channel has the highest ROAS?",
            "What's my best performing campaign?",
            "How has my revenue changed over the past month?",
            "What's my average customer journey?",
            "How should I optimize my budget allocation?",
            "When is the best time to run my campaigns?",
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start h-auto py-2 text-left border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 hover:text-[#8B5CF6]"
              onClick={() => {
                setInput(question);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              "{question}"
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatAIPage;
