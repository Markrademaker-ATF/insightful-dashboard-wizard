
import React, { useState } from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { ChevronRight, BarChart, TrendingUp, Layers } from "lucide-react";

const journeySections = [
  { id: "roi", title: "ROI Summary" },
  { id: "revenue", title: "Revenue Trends" },
  { id: "channel", title: "Channel Performance" },
  { id: "attribution", title: "Attribution" },
  { id: "optimization", title: "Optimization" },
  { id: "forecasting", title: "Forecasting" },
  { id: "insights", title: "Insights" }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("roi");
  
  // Calculate progress based on active section
  const progress = ((journeySections.findIndex(s => s.id === activeSection) + 1) / journeySections.length) * 100;
  
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
          <span className="text-sm font-medium text-primary mr-3">Analytics Journey Progress</span>
          <Progress value={progress} className="w-24 h-2" />
        </Card>
      </div>

      {/* Introduction to Analytics Methodologies */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Marketing Analytics Intelligence</CardTitle>
          <CardDescription>
            Comprehensive data-driven insights to optimize your marketing strategy and maximize ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Marketing Mix Modeling (MMM)</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Analyzes historical marketing data to reveal the impact of different marketing channels on business outcomes.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Measure ROI across all marketing channels</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Quantify impact of non-digital factors (seasonality, pricing)</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Optimize budget allocation across channels</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Incrementality Testing</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Measures the true causal impact of marketing activities by isolating their effect from other factors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Determine if marketing drives additional conversions</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Eliminate attribution bias with controlled experiments</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Test new channels or targeting strategies scientifically</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-lg border bg-card shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Multi-Touch Attribution (MTA)</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Tracks individual customer journeys to assign credit to each touchpoint in the conversion path.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Understand customer journey across channels</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Identify most effective touchpoints for conversion</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Optimize tactical campaign decisions in real-time</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-5 rounded-lg border bg-card/50 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">How These Methods Work Together</h3>
            <p className="text-muted-foreground mb-4">
              Our dashboard combines these complementary approaches to provide a complete view of your marketing performance:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">1</div>
                <div>
                  <span className="font-medium">Strategic Planning (MMM)</span>
                  <p className="text-sm text-muted-foreground">Optimize long-term budget allocation across channels</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">2</div>
                <div>
                  <span className="font-medium">Validation (Incrementality)</span>
                  <p className="text-sm text-muted-foreground">Verify causal impact of specific marketing activities</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">3</div>
                <div>
                  <span className="font-medium">Tactical Execution (MTA)</span>
                  <p className="text-sm text-muted-foreground">Fine-tune campaigns and customer journey touchpoints</p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Marketing Performance Insights</h2>
          <p className="text-muted-foreground mb-4">
            Dive deep into your marketing strategy with a comprehensive analytics journey. Uncover insights from ROI metrics to channel optimization.
          </p>
          
          <div className="p-4 bg-accent/30 rounded-lg space-y-6">
            <div className="text-sm">
              <p className="font-medium mb-3">Your Analytics Journey Path:</p>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="font-medium text-primary">
                  <span>ROI Summary</span>
                  <p className="ml-6 text-muted-foreground font-normal">Begin with a high-level overview of your overall marketing return on investment</p>
                </li>
                <li>
                  <span>Revenue Trends</span>
                  <p className="ml-6 text-muted-foreground font-normal">Analyze revenue patterns and growth trajectories over time</p>
                </li>
                <li>
                  <span>Channel Performance</span>
                  <p className="ml-6 text-muted-foreground font-normal">Compare effectiveness across different marketing channels</p>
                </li>
                <li>
                  <span>Attribution</span>
                  <p className="ml-6 text-muted-foreground font-normal">Understand which touchpoints drive conversions in the customer journey</p>
                </li>
                <li>
                  <span>Optimization</span>
                  <p className="ml-6 text-muted-foreground font-normal">Discover opportunities to improve campaign efficiency and effectiveness</p>
                </li>
                <li>
                  <span>Forecasting</span>
                  <p className="ml-6 text-muted-foreground font-normal">Project future performance based on historical data and trends</p>
                </li>
                <li>
                  <span>Insights</span>
                  <p className="ml-6 text-muted-foreground font-normal">Extract actionable recommendations to enhance marketing strategy</p>
                </li>
              </ol>
            </div>
            
            <SectionNav 
              sections={journeySections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </CardContent>
      </Card>

      <AnalyticsOverview />
    </>
  );
};

export default Index;
