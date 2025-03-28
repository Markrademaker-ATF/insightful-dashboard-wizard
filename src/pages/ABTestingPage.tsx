
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABTestResultsTable } from "@/components/ab-testing/ABTestResultsTable";
import { ABTestComparisonChart } from "@/components/ab-testing/ABTestComparisonChart";
import { ABTestMetricsCards } from "@/components/ab-testing/ABTestMetricsCards";
import { ABTestScenarioSelector } from "@/components/ab-testing/ABTestScenarioSelector";
import { useMockABTestData } from "@/hooks/useMockABTestData";
import { BarChart2, Calendar, Clock, ArrowRight, Beaker, Trophy, GitCompare, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ABTestingPage = () => {
  const { testScenarios, activeTests, completedTests, loading } = useMockABTestData();
  const [selectedTest, setSelectedTest] = useState<string>(completedTests[0]?.id || "");

  // Get the currently selected test data
  const selectedTestData = completedTests.find(test => test.id === selectedTest) || completedTests[0];

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="A/B Test Analysis"
        description="Compare test results and analyze the performance of different variants to optimize your marketing strategy."
      />

      <div className="mb-6 transition-all duration-300 hover:shadow-md">
        <ABTestScenarioSelector 
          tests={completedTests} 
          selectedTestId={selectedTest}
          onSelectTest={setSelectedTest}
          loading={loading}
        />
      </div>

      {selectedTestData && (
        <>
          {/* Test summary section with enhanced styling */}
          <Card className="mb-8 overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-primary/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary/30"></div>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="animate-entry" style={{ '--entry-delay': '0' } as React.CSSProperties}>
                  <h2 className="text-2xl font-bold">{selectedTestData.name}</h2>
                  <p className="text-muted-foreground mt-1">{selectedTestData.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Badge variant="outline" className="flex items-center gap-1 bg-primary/5 hover:bg-primary/10 text-foreground/80 transition-colors">
                      <Calendar className="h-3 w-3" />
                      {formatDate(selectedTestData.startDate)} - {selectedTestData.endDate ? formatDate(selectedTestData.endDate) : 'Present'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 bg-primary/5 hover:bg-primary/10 text-foreground/80 transition-colors">
                      <Clock className="h-3 w-3" />
                      {selectedTestData.endDate ? 
                        `${Math.round((new Date(selectedTestData.endDate).getTime() - new Date(selectedTestData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                        'Ongoing'}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 text-foreground/80 transition-colors">
                      {selectedTestData.channel}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 text-foreground/80 transition-colors">
                      {selectedTestData.audience}
                    </Badge>
                  </div>
                </div>
                
                {selectedTestData.winner && (
                  <div className="animate-entry bg-gradient-to-br from-green-50 to-green-100/50 p-5 rounded-lg border border-green-100 flex items-start gap-3 shadow-sm transition-all duration-300 hover:shadow-md" style={{ '--entry-delay': '1' } as React.CSSProperties}>
                    <div className="rounded-full bg-green-100 p-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Winner: {selectedTestData.variants.find(v => v.id === selectedTestData.winner)?.name}</h3>
                      <p className="text-green-600 text-sm">
                        {selectedTestData.confidenceLevel}% confidence level
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
                        <AlertCircle className="h-3 w-3" />
                        Statistical significance reached
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <ABTestMetricsCards test={selectedTestData} loading={loading} />
          
          <Tabs defaultValue="comparison" className="mt-8">
            <TabsList className="mb-4 p-1 bg-muted/70 border">
              <TabsTrigger 
                value="comparison" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <GitCompare className="h-4 w-4" />
                Results Comparison
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <FileText className="h-4 w-4" />
                Details & Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="animate-entry" style={{ '--entry-delay': '2' } as React.CSSProperties}>
              <div className="grid grid-cols-1 gap-8">
                <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-none bg-gradient-to-br from-white to-primary/5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary/30"></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-primary" />
                      Performance Metrics Comparison
                    </CardTitle>
                    <CardDescription>
                      Comparing key metrics between the control and variant groups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ABTestComparisonChart test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-none bg-gradient-to-br from-white to-primary/5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary/30"></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-primary" />
                      Detailed Results
                    </CardTitle>
                    <CardDescription>
                      Complete performance data for all test variants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ABTestResultsTable test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="animate-entry" style={{ '--entry-delay': '2' } as React.CSSProperties}>
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-none bg-gradient-to-br from-white to-primary/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary/30"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-primary" />
                    Test Details & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="animate-entry" style={{ '--entry-delay': '3' } as React.CSSProperties}>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        Hypothesis
                      </h3>
                      <p className="text-muted-foreground bg-muted/50 p-5 rounded-md border border-border/40 italic">"{selectedTestData.hypothesis}"</p>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="animate-entry" style={{ '--entry-delay': '4' } as React.CSSProperties}>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-primary" />
                        Analysis & Insights
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedTestData.analysis}</p>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="animate-entry" style={{ '--entry-delay': '5' } as React.CSSProperties}>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        Recommended Next Steps
                      </h3>
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-md border border-primary/20">
                        <p className="text-muted-foreground">{selectedTestData.nextSteps}</p>
                      </div>
                      
                      {selectedTestData.winner && (
                        <div className="flex items-center gap-2 mt-4 text-primary bg-primary/5 p-3 rounded-md border border-primary/10 transition-all hover:bg-primary/10">
                          <Trophy className="h-4 w-4" />
                          <span className="font-medium">Implement winning variant: {selectedTestData.variants.find(v => v.id === selectedTestData.winner)?.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ABTestingPage;
