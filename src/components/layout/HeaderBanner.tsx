
import React from "react";
import { Link, useLocation } from "react-router-dom";

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
      case "/campaign":
        return "Campaign Performance";
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
      case "/getting-started":
        return "Getting Started";
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
      case "/campaign":
        return "Track and analyze your marketing campaign results";
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
      case "/getting-started":
        return "Welcome to the Artefact Marketing Intelligence Platform";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-5 mb-6 animate-fade-in">
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center">
          {/* Redesigned logo - simplified modern "A" mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L25 26H3L14 2Z" fill="white"/>
            <path d="M14 12L18 22H10L14 12Z" fill="#9b87f5"/>
          </svg>
        </div>
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
