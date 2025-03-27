
import React from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Artefact</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <img 
          src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
          alt="Artefact Logo" 
          className="h-12" 
        />
        
        <Card className="inline-flex items-center px-4 py-2 bg-accent/50 border-none">
          <span className="text-sm font-medium text-primary mr-3">Your analytics journey</span>
          <Progress value={33} className="w-24 h-2" />
        </Card>
      </div>

      <Card className="mb-8 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Your 7-Step Analytics Journey</h2>
          <p className="text-muted-foreground mb-4">
            Follow this guided path to understand your marketing performance, from high-level metrics to optimization opportunities
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium">1</div>
              <span className="text-sm">ROI Summary</span>
            </div>
            <div className="flex items-center">
              <Separator orientation="vertical" className="h-4 mx-2" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium">2</div>
              <span className="text-sm">Revenue Trends</span>
            </div>
            <div className="flex items-center">
              <Separator orientation="vertical" className="h-4 mx-2" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">3</div>
              <span className="text-sm">Channel Performance</span>
            </div>
            <span className="text-sm text-muted-foreground">and 4 more steps...</span>
          </div>
        </CardContent>
      </Card>

      <AnalyticsOverview />
    </>
  );
};

export default Index;
