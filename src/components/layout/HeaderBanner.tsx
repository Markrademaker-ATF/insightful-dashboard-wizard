
import React from "react";
import { Link } from "react-router-dom";

export function HeaderBanner() {
  return (
    <div className="flex items-center gap-4 mb-6 animate-fade-in">
      <Link to="/">
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Artefact Logo" 
          className="h-10" 
        />
      </Link>
      <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">Marketing Analytics</h1>
        <p className="text-sm text-muted-foreground">Dashboard Overview</p>
      </div>
    </div>
  );
}
