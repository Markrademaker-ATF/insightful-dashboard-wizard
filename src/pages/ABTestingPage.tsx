
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABTestResultsTable } from "@/components/ab-testing/ABTestResultsTable";
import { ABTestComparisonChart } from "@/components/ab-testing/ABTestComparisonChart";
import { ABTestMetricsCards } from "@/components/ab-testing/ABTestMetricsCards";
import { ABTestScenarioSelector } from "@/components/ab-testing/ABTestScenarioSelector";
import { useMockABTestData } from "@/hooks/useMockABTestData";
import { BarChart2, Calendar, Clock, ArrowRight } from "lucide-react";
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
    <div className="animate-fade-in">
      <PageHeader
        title="A/B Test Analysis"
        description="Compare test results and analyze the performance of different variants to optimize your marketing strategy."
      />

      <div className="mb-6">
        <ABTestScenarioSelector 
          tests={completedTests} 
          selectedTestId={selectedTest}
          onSelectTest={setSelectedTest}
          loading={loading}
        />
      </div>

      {selectedTestData && (
        <>
          {/* Test summary section */}
          <Card className="mb-6 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTestData.name}</h2>
                  <p className="text-muted-foreground mt-1">{selectedTestData.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(selectedTestData.startDate)} - {selectedTestData.endDate ? formatDate(selectedTestData.endDate) : 'Present'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedTestData.endDate ? 
                        `${Math.round((new Date(selectedTestData.endDate).getTime() - new Date(selectedTestData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                        'Ongoing'}
                    </Badge>
                    <Badge variant="outline">{selectedTestData.channel}</Badge>
                    <Badge variant="outline">{selectedTestData.audience}</Badge>
                  </div>
                </div>
                
                {selectedTestData.winner && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3">
                    <div className="mt-0.5">
                      <BarChart2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Winner: {selectedTestData.variants.find(v => v.id === selectedTestData.winner)?.name}</h3>
                      <p className="text-green-600 text-sm">
                        {selectedTestData.confidenceLevel}% confidence level
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <ABTestMetricsCards test={selectedTestData} loading={loading} />
          
          <Tabs defaultValue="comparison" className="mt-8">
            <TabsList className="mb-4">
              <TabsTrigger value="comparison">Results Comparison</TabsTrigger>
              <TabsTrigger value="details">Details & Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison">
              <div className="grid grid-cols-1 gap-6">
                <Card>
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
                
                <Card>
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
            
            <TabsContent value="details">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Test Details & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Hypothesis</h3>
                      <p className="text-muted-foreground bg-muted p-4 rounded-md">"{selectedTestData.hypothesis}"</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Analysis & Insights</h3>
                      <p className="text-muted-foreground">{selectedTestData.analysis}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recommended Next Steps</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-muted-foreground">{selectedTestData.nextSteps}</p>
                      </div>
                      
                      {selectedTestData.winner && (
                        <div className="flex items-center gap-2 mt-4 text-primary">
                          <ArrowRight className="h-4 w-4" />
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
