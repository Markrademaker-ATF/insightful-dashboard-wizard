
import React from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      <div className="mb-6">
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Artefact Logo" 
          className="h-12" 
        />
      </div>
      <AnalyticsOverview />
    </>
  );
};

export default Index;
