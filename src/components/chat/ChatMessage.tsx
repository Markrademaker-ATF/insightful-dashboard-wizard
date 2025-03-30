
import React from "react";
import { Bot, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "ai";
  
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg p-4 transition-all duration-300",
        isAI ? "bg-accent/60 border border-accent/30 shadow-sm" : ""
      )}
    >
      <div className={cn(
        "rounded-full p-2 w-9 h-9 flex items-center justify-center flex-shrink-0 shadow-sm",
        isAI ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
      )}>
        {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      
      <div className="flex-1">
        <div className="text-sm font-medium mb-1 flex items-center gap-2">
          {isAI ? "Analytics Assistant" : "You"}
          <span className="text-xs text-muted-foreground font-normal">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
        {isAI && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3" />
            <span>AI-generated response</span>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
