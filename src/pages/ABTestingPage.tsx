
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTestResultsTable } from "@/components/ab-testing/ABTestResultsTable";
import { ABTestComparisonChart } from "@/components/ab-testing/ABTestComparisonChart";
import { ABTestMetricsCards } from "@/components/ab-testing/ABTestMetricsCards";
import { ABTestScenarioSelector } from "@/components/ab-testing/ABTestScenarioSelector";
import { useMockABTestData } from "@/hooks/useMockABTestData";

const ABTestingPage = () => {
  const { testScenarios, activeTests, completedTests, loading } = useMockABTestData();
  const [selectedTest, setSelectedTest] = useState<string>(completedTests[0]?.id || "");

  // Get the currently selected test data
  const selectedTestData = completedTests.find(test => test.id === selectedTest) || completedTests[0];

  return (
    <div>
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
          <ABTestMetricsCards test={selectedTestData} loading={loading} />
          
          <Tabs defaultValue="comparison" className="mt-8">
            <TabsList>
              <TabsTrigger value="comparison">Results Comparison</TabsTrigger>
              <TabsTrigger value="details">Details & Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ABTestComparisonChart test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ABTestResultsTable test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Test Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Description</h3>
                      <p className="text-muted-foreground">{selectedTestData.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Hypothesis</h3>
                      <p className="text-muted-foreground">{selectedTestData.hypothesis}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Analysis & Insights</h3>
                      <p className="text-muted-foreground">{selectedTestData.analysis}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Next Steps</h3>
                      <p className="text-muted-foreground">{selectedTestData.nextSteps}</p>
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
