
import React, { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useToast } from "@/components/ui/use-toast";
import { Bot, BarChart3, ArrowRight } from "lucide-react";

const ChatAIPage = () => {
  const { toast } = useToast();
  
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics Assistant"
        description="Chat with our AI assistant to get insights and analysis from your marketing data."
      >
        <Bot className="h-6 w-6 text-primary" />
      </PageHeader>
      
      <div className="dashboard-card relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">How can the AI assistant help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              icon={BarChart3} 
              title="Analyze Trends" 
              description="Ask about trends in your data across channels and timeframes."
            />
            <FeatureCard 
              icon={ArrowRight} 
              title="Actionable Insights" 
              description="Get recommendations based on your analytics data."
            />
            <FeatureCard 
              icon={Bot} 
              title="Technical Support" 
              description="Get help understanding metrics and methodologies."
            />
          </div>
        </div>
      </div>

      <div className="dashboard-card relative overflow-hidden" style={{minHeight: "500px"}}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <ChatInterface />
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-3 rounded-xl hover:shadow-md transition-all">
      <div className="bg-accent rounded-lg p-2 w-10 h-10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ChatAIPage;
