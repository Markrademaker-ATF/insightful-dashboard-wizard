
import React from "react";
import { Bot, User } from "lucide-react";
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
        "flex items-start gap-3 rounded-lg p-4",
        isAI ? "bg-accent/50" : ""
      )}
    >
      <div className={cn(
        "rounded-full p-2 w-8 h-8 flex items-center justify-center flex-shrink-0",
        isAI ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
      )}>
        {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      
      <div className="flex-1">
        <div className="text-sm font-medium mb-1">
          {isAI ? "Analytics Assistant" : "You"}
        </div>
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs text-muted-foreground mt-2">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
