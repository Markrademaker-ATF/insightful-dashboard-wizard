
import React from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";

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
      
      <Card className="mb-8 border-l-4 border-l-blue-500 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <LightbulbIcon className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Analytics Journey</h2>
              <p className="text-muted-foreground mb-2">
                Welcome to your marketing performance dashboard. Follow the 7-step journey to get a complete understanding of your marketing performance:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                <li><span className="font-medium text-foreground">ROI Summary</span> - Get a high-level view of your marketing return on investment</li>
                <li><span className="font-medium text-foreground">Revenue Trends</span> - Analyze how your revenue has been evolving over time</li>
                <li><span className="font-medium text-foreground">Channel Performance</span> - See which marketing channels are driving results</li>
                <li><span className="font-medium text-foreground">Channel Analysis</span> - Dive deeper into the performance of each channel</li>
                <li><span className="font-medium text-foreground">Campaign Analysis</span> - Examine your top-performing campaigns</li>
                <li><span className="font-medium text-foreground">Budget Allocation</span> - Review how your budget is distributed</li>
                <li><span className="font-medium text-foreground">Continue Analysis</span> - Explore additional insights and analytics tools</li>
              </ol>
              <p className="text-muted-foreground mt-2">
                Use the numbered navigation at the top to quickly jump between sections as you analyze your marketing data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AnalyticsOverview />
    </>
  );
};

export default Index;
