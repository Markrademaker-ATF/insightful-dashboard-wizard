
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ABTestResultsTable } from "@/components/ab-testing/ABTestResultsTable";
import { ABTestComparisonChart } from "@/components/ab-testing/ABTestComparisonChart";
import { ABTestMetricsCards } from "@/components/ab-testing/ABTestMetricsCards";
import { ABTestScenarioSelector } from "@/components/ab-testing/ABTestScenarioSelector";
import { ABTestGeoDistribution } from "@/components/ab-testing/ABTestGeoDistribution";
import { useMockABTestData } from "@/hooks/useMockABTestData";
import { Input } from "@/components/ui/input";
import { Search, BarChart3, LineChart, PieChart, FileSpreadsheet, TrendingUp, Globe, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GlobalFilters } from "@/components/layout/GlobalFilters";

const IncrementalityTestPage = () => {
  const { testScenarios, activeTests, completedTests, loading } = useMockABTestData();
  const [selectedTest, setSelectedTest] = useState<string>(completedTests[0]?.id || "");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tests by name
  const filteredTests = completedTests.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the currently selected test data
  const selectedTestData = filteredTests.find(test => test.id === selectedTest) || filteredTests[0];

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
        title="Incrementality Test Analysis"
        description="Analyze the incremental impact of your marketing activities through controlled experiments"
      />

      <div className="mb-6 space-y-4">
        {/* Search and filter section */}
        <Card className="glass-card premium-shadow border-white/30">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tests by name..."
                  className="w-full pl-9 bg-white/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <ABTestScenarioSelector 
                tests={filteredTests.length > 0 ? filteredTests : completedTests}
                selectedTestId={selectedTest}
                onSelectTest={setSelectedTest}
                loading={loading}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTestData && (
        <>
          {/* Test summary section */}
          <Card className="mb-6 border-l-4 border-l-primary glass-card premium-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTestData.name}</h2>
                  <p className="text-muted-foreground mt-1">{selectedTestData.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1 bg-white/50">
                      {formatDate(selectedTestData.startDate)} - {selectedTestData.endDate ? formatDate(selectedTestData.endDate) : 'Present'}
                    </Badge>
                    <Badge variant="outline" className="bg-white/50">{selectedTestData.channel}</Badge>
                    <Badge variant="outline" className="bg-white/50">{selectedTestData.audience}</Badge>
                    <Badge variant="outline" className="bg-white/50">
                      {selectedTestData.endDate ? 
                        `${Math.round((new Date(selectedTestData.endDate).getTime() - new Date(selectedTestData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                        'Ongoing'}
                    </Badge>
                  </div>
                </div>
                
                {selectedTestData.winner && (
                  <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-lg border border-green-100 flex items-start gap-3 premium-shadow">
                    <div className="mt-0.5">
                      <PieChart className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Incremental Lift: {selectedTestData.variants.find(v => v.id === selectedTestData.winner)?.name}</h3>
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
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="mb-4 bg-white/70 backdrop-blur-sm border border-white/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-primary/20">
                <TrendingUp className="h-4 w-4 mr-2" />
                Timeline Analysis
              </TabsTrigger>
              <TabsTrigger value="geo" className="data-[state=active]:bg-primary/20">
                <Globe className="h-4 w-4 mr-2" />
                Geographic Analysis
              </TabsTrigger>
              <TabsTrigger value="methodologies" className="data-[state=active]:bg-primary/20">
                <Calculator className="h-4 w-4 mr-2" />
                Methodology Comparison
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card premium-shadow border-white/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Incrementality Results
                    </CardTitle>
                    <CardDescription>
                      Comparing test and control groups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ABTestComparisonChart test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
                
                <Card className="glass-card premium-shadow border-white/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                      Results Summary
                    </CardTitle>
                    <CardDescription>
                      Comparison between test variants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ABTestResultsTable test={selectedTestData} loading={loading} />
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 glass-card premium-shadow border-white/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    Test Details & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Hypothesis</h3>
                      <p className="text-muted-foreground bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
                        "{selectedTestData.hypothesis}"
                      </p>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Analysis & Insights</h3>
                      <p className="text-muted-foreground">{selectedTestData.analysis}</p>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Incremental Impact</h3>
                      <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
                        <p className="text-muted-foreground">
                          {selectedTestData.nextSteps}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="animate-fade-in">
              <Card className="glass-card premium-shadow border-white/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Incrementality Over Time
                  </CardTitle>
                  <CardDescription>
                    How the test and control groups performed throughout the test duration
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex items-center justify-center">
                  <div className="text-muted-foreground">Timeline visualization will be displayed here</div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="geo" className="animate-fade-in">
              <ABTestGeoDistribution test={selectedTestData} loading={loading} />
            </TabsContent>
            
            <TabsContent value="methodologies" className="animate-fade-in">
              <Card className="glass-card premium-shadow border-white/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Incrementality Methodology
                  </CardTitle>
                  <CardDescription>
                    How incremental lift was measured in this test
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px] flex items-center justify-center">
                  <div className="text-muted-foreground">Methodology details will be displayed here</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default IncrementalityTestPage;
