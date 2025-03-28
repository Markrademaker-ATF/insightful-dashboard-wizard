
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
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-5 mb-6 animate-fade-in">
      <Link to="/">
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Artefact Logo" 
          className="h-12" // Increased from h-10
        />
      </Link>
      <div className="h-12 w-px bg-gray-200 hidden md:block"></div> {/* Also increased height */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1> {/* Increased from text-xl */}
        <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
      </div>
    </div>
  );
}
