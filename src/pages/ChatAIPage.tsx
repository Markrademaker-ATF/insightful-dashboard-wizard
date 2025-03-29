
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Bot, BarChart3, Zap, TrendingUp, Lightbulb } from "lucide-react";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

const ChatAIPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics AI Assistant"
        description="Unlock deeper insights and get intelligent recommendations from your marketing data."
      >
        <FilterExportControls
          filterOptions={{ channels: false, metrics: false }}
          exportFileName="ai-conversation"
          contentId="chat-content"
        />
      </PageHeader>
      
      <div className="dashboard-card relative overflow-hidden mb-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">How can the AI assistant help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              icon={BarChart3} 
              title="Analyze Trends" 
              description="Dive deep into data trends across channels and timeframes."
              color="bg-purple-100 text-purple-600"
            />
            <FeatureCard 
              icon={Zap} 
              title="Actionable Insights" 
              description="Get smart recommendations to optimize your marketing strategy."
              color="bg-orange-100 text-orange-600"
            />
            <FeatureCard 
              icon={Lightbulb} 
              title="Intelligent Support" 
              description="Get expert guidance on metrics and performance analysis."
              color="bg-green-100 text-green-600"
            />
          </div>
        </div>
      </div>

      <div id="chat-content" className="dashboard-card relative overflow-hidden" style={{minHeight: "500px"}}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <ChatInterface />
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  color
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color?: string;
}) => {
  return (
    <div className={`glass-card p-4 flex flex-col gap-3 rounded-xl hover:shadow-md transition-all ${color}`}>
      <div className="bg-white/50 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ChatAIPage;
