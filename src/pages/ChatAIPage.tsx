
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Bot, BarChart3, Zap, TrendingUp, Lightbulb, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatAIPage = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <PageHeader
          title="Analytics AI Assistant"
          description="Unlock deeper insights and get intelligent recommendations from your marketing data."
        >
          <Bot className="h-6 w-6 text-primary" />
        </PageHeader>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 bg-white/70 hover:bg-white/90 rounded-full px-4 py-2 transition-all shadow-sm">
              <span className="text-sm font-medium text-primary hidden md:inline">John Doe</span>
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src="https://i.pravatar.cc/100" alt="@user" />
                <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRound className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Zap className="mr-2 h-4 w-4" />
              <span>Activity</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
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
