
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function HeaderBanner() {
  const location = useLocation();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/analytics":
        return "Analytics Overview";
      case "/data":
        return "Data Overview";
      case "/channels":
        return "Channel Analysis";
      case "/channel-details":
        return "Campaign Analysis";
      case "/metrics":
        return "Exploratory Data Analysis";
      case "/methodologies":
        return "Analytics Methodologies";
      case "/incremental":
        return "Incremental Analysis";
      case "/budget":
        return "Budget Optimizer";
      case "/ab-testing":
        return "A/B Testing";
      case "/guide":
        return "Guide";
      case "/settings":
        return "Settings";
      case "/chat-ai":
        return "Analytics AI Assistant";
      case "/recommendations":
        return "Recommendations";
      default:
        return "Dashboard";
    }
  };
  
  // Function to get page description based on current route
  const getPageDescription = () => {
    switch (location.pathname) {
      case "/analytics":
        return "Analytics Dashboard";
      case "/channels":
        return "Analyze campaign performance by channel";
      case "/metrics":
        return "Explore data patterns and distributions";
      case "/data":
        return "Data sources and processing";
      case "/channel-details":
        return "Detailed campaign performance";
      case "/incremental":
        return "Measure incremental impact";
      case "/budget":
        return "Optimize budget allocation";
      case "/ab-testing":
        return "Test and experiment analysis";
      case "/chat-ai":
        return "AI-powered insights and assistance";
      case "/recommendations":
        return "Actionable marketing recommendations";
      case "/methodologies":
        return "Understand analytics methodologies";
      case "/guide":
        return "Platform documentation and help";
      case "/settings":
        return "Configure application settings";
      default:
        return "";
    }
  };

  // Option to display only the logo box or full name based on preference
  const displayLogoOnly = false; // Set to true to show only the logo box

  return (
    <div className="flex items-center gap-5 mb-6 animate-fade-in">
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className="bg-gradient-to-r from-primary to-purple-600 p-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center">
          <img 
            src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
            alt="Artefact Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        {!displayLogoOnly && (
          <div className="flex items-baseline gap-1">
            <h2 className="font-bold text-xl text-gray-800 hidden md:block">ARTEFACT</h2>
            <Sparkles className="h-4 w-4 text-primary animate-pulse hidden md:block" />
          </div>
        )}
      </Link>
      
      <div className="h-12 w-px bg-gradient-to-b from-gray-200 to-gray-100 hidden md:block"></div>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
          <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse hidden sm:block"></div>
        </div>
        <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
      </div>
    </div>
  );
}
