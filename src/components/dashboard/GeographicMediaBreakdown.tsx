
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Info, Maximize2, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for European regions with ROAS and incremental values
const europeRegionsData = [
  { region: "United Kingdom", roas: 4.2, incremental: 850000, flag: "🇬🇧", channels: {
    paid: 380000, organic: 220000, nonPaid: 150000, baseline: 100000
  }},
  { region: "Germany", roas: 3.9, incremental: 720000, flag: "🇩🇪", channels: {
    paid: 320000, organic: 190000, nonPaid: 130000, baseline: 80000
  }},
  { region: "France", roas: 3.5, incremental: 580000, flag: "🇫🇷", channels: {
    paid: 250000, organic: 150000, nonPaid: 100000, baseline: 80000
  }},
  { region: "Italy", roas: 2.8, incremental: 420000, flag: "🇮🇹", channels: {
    paid: 180000, organic: 100000, nonPaid: 80000, baseline: 60000
  }},
  { region: "Spain", roas: 3.1, incremental: 480000, flag: "🇪🇸", channels: {
    paid: 210000, organic: 120000, nonPaid: 90000, baseline: 60000
  }},
  { region: "Netherlands", roas: 4.5, incremental: 380000, flag: "🇳🇱", channels: {
    paid: 180000, organic: 90000, nonPaid: 70000, baseline: 40000
  }},
  { region: "Belgium", roas: 3.2, incremental: 280000, flag: "🇧🇪", channels: {
    paid: 130000, organic: 70000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Sweden", roas: 5.1, incremental: 320000, flag: "🇸🇪", channels: {
    paid: 160000, organic: 80000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Norway", roas: 4.8, incremental: 290000, flag: "🇳🇴", channels: {
    paid: 140000, organic: 70000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Denmark", roas: 4.3, incremental: 250000, flag: "🇩🇰", channels: {
    paid: 120000, organic: 60000, nonPaid: 40000, baseline: 30000
  }},
  { region: "Finland", roas: 4.0, incremental: 220000, flag: "🇫🇮", channels: {
    paid: 100000, organic: 60000, nonPaid: 35000, baseline: 25000
  }},
  { region: "Poland", roas: 2.5, incremental: 380000, flag: "🇵🇱", channels: {
    paid: 160000, organic: 100000, nonPaid: 70000, baseline: 50000
  }},
  { region: "Switzerland", roas: 4.7, incremental: 310000, flag: "🇨🇭", channels: {
    paid: 150000, organic: 80000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Austria", roas: 3.6, incremental: 240000, flag: "🇦🇹", channels: {
    paid: 110000, organic: 60000, nonPaid: 40000, baseline: 30000
  }},
];

// Define channel names for display
const channelNames = {
  paid: "Paid Media",
  organic: "Organic Media",
  nonPaid: "Non-Paid Media",
  baseline: "Baseline"
};

// Get colors for the heatmap based on ROAS value
const getRoasColor = (roas: number) => {
  if (roas >= 5.0) return "bg-green-600 text-white";
  if (roas >= 4.0) return "bg-green-500 text-white";
  if (roas >= 3.5) return "bg-green-400";
  if (roas >= 3.0) return "bg-green-300";
  if (roas >= 2.5) return "bg-yellow-300";
  if (roas >= 2.0) return "bg-yellow-400";
  if (roas >= 1.5) return "bg-orange-400";
  if (roas >= 1.0) return "bg-orange-500 text-white";
  return "bg-red-500 text-white";
};

// Function to get emoji indicators for ROAS trend
const getTrendIndicator = (value: number) => {
  if (value >= 4.0) return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (value >= 3.0) return <ArrowUp className="h-4 w-4 text-green-400" />;
  if (value >= 2.0) return <ArrowDown className="h-4 w-4 text-yellow-500" />;
  return <ArrowDown className="h-4 w-4 text-red-500" />;
};

const getIncrementalColor = (contribution: number, total: number) => {
  const percentage = (contribution / total) * 100;
  if (percentage >= 20) return "bg-blue-600 text-white";
  if (percentage >= 15) return "bg-blue-500 text-white";
  if (percentage >= 10) return "bg-blue-400";
  if (percentage >= 5) return "bg-blue-300";
  return "bg-blue-200";
};

interface GeographicMediaBreakdownProps {
  loading?: boolean;
  selectedProduct: string;
}

export function GeographicMediaBreakdown({ loading = false, selectedProduct }: GeographicMediaBreakdownProps) {
  // Sort regions by ROAS
  const sortedRegions = [...europeRegionsData].sort((a, b) => b.roas - a.roas);

  // Calculate total incremental contribution
  const totalIncremental = sortedRegions.reduce((sum, region) => sum + region.incremental, 0);

  // Calculate summary stats
  const averageRoas = sortedRegions.reduce((sum, region) => sum + region.roas, 0) / sortedRegions.length;
  const bestRegion = sortedRegions[0];
  const worstRegion = sortedRegions[sortedRegions.length - 1];
  const totalRevenue = sortedRegions.reduce((sum, region) => sum + region.incremental, 0);

  // State for selected region for detailed view
  const [selectedRegion, setSelectedRegion] = useState<typeof europeRegionsData[0] | null>(null);
  const [activeView, setActiveView] = useState<"roas" | "incremental">("roas");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <Skeleton className="h-24 w-[30%]" />
          <Skeleton className="h-24 w-[30%]" />
          <Skeleton className="h-24 w-[30%]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Info className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Info className="h-4 w-4" /> Detailed View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Average ROAS</div>
                  <div className="text-2xl font-bold">{averageRoas.toFixed(2)}x</div>
                  <div className="text-xs text-muted-foreground mt-2">Across all European regions</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Top Performing Region</div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{bestRegion.flag} {bestRegion.region}</span>
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">ROAS: {bestRegion.roas.toFixed(2)}x</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Total Incremental Revenue</div>
                  <div className="text-2xl font-bold">${(totalRevenue/1000000).toFixed(1)}M</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Product: {selectedProduct || "All Products"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Regional Analysis</CardTitle>
              <CardDescription>
                Insights into incremental revenue and media performance by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Regional Breakdown</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sortedRegions.slice(0, 6).map((region) => (
                        <Card key={region.region} className="overflow-hidden">
                          <div className={`h-1 ${getRoasColor(region.roas)}`}></div>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="text-lg mr-1">{region.flag}</span>
                                <span className="font-medium text-sm">{region.region}</span>
                              </div>
                              <Badge className={getRoasColor(region.roas)}>
                                {region.roas.toFixed(1)}x
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Incremental: ${(region.incremental/1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              {getTrendIndicator(region.roas)}
                              <span className="ml-1">
                                {region.roas >= 4.0 ? "Excellent" : 
                                region.roas >= 3.0 ? "Good" : 
                                region.roas >= 2.0 ? "Average" : "Poor"}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <button 
                        className="text-primary hover:underline" 
                        onClick={() => setActiveView("incremental")}
                      >
                        View all regions
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Performance Insights</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-primary mt-1" />
                            <div>
                              <h3 className="text-sm font-medium mb-1">Key Findings</h3>
                              <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Northern European regions consistently show higher ROAS (4.0+)</li>
                                <li>• Southern European markets require optimization (ROAS below 3.0)</li>
                                <li>• Paid media delivers strongest incremental returns in UK and Nordics</li>
                                <li>• Organic media shows promising growth in Germany and Netherlands</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <h3 className="text-sm font-medium mb-1">Media Mix by Region</h3>
                            <div className="space-y-3 mt-3">
                              {Object.entries(channelNames).map(([key, name]) => (
                                <div key={key} className="flex items-center">
                                  <div className="w-24 text-xs text-muted-foreground">{name}</div>
                                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-2 ${key === 'paid' ? 'bg-blue-500' : key === 'organic' ? 'bg-green-500' : key === 'nonPaid' ? 'bg-amber-500' : 'bg-gray-500'}`}
                                      style={{ width: `${key === 'paid' ? '45%' : key === 'organic' ? '25%' : key === 'nonPaid' ? '15%' : '15%'}` }}
                                    ></div>
                                  </div>
                                  <div className="w-12 text-xs text-right text-muted-foreground">
                                    {key === 'paid' ? '45%' : key === 'organic' ? '25%' : key === 'nonPaid' ? '15%' : '15%'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-1">Strategic Recommendations</h3>
                            <p className="text-sm text-muted-foreground">
                              Focus budget allocation on Nordic and Western European markets where ROAS exceeds 4.0.
                              Consider reallocating budget from Southern European markets to higher-performing regions.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Regional Performance Data</CardTitle>
                  <CardDescription>
                    Detailed breakdown of incremental performance by region
                  </CardDescription>
                </div>
                <div>
                  <Tabs 
                    value={activeView} 
                    onValueChange={(v) => setActiveView(v as "roas" | "incremental")}
                    className="w-[400px]"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="roas">ROAS View</TabsTrigger>
                      <TabsTrigger value="incremental">Incremental View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      {activeView === "roas" ? (
                        <>
                          <TableHead>ROAS</TableHead>
                          <TableHead>Performance</TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead>Incremental Revenue</TableHead>
                          <TableHead>Contribution</TableHead>
                        </>
                      )}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(activeView === "roas" ? [...sortedRegions] : [...sortedRegions].sort((a, b) => b.incremental - a.incremental)).map((region) => (
                      <TableRow 
                        key={region.region} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedRegion(region)}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{region.flag}</span>
                            <span className="font-medium">{region.region}</span>
                          </div>
                        </TableCell>
                        
                        {activeView === "roas" ? (
                          <>
                            <TableCell>
                              <Badge className={`${getRoasColor(region.roas)}`}>
                                {region.roas.toFixed(2)}x
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getTrendIndicator(region.roas)}
                                <span className="ml-1">
                                  {region.roas >= 4.0 ? "Excellent" : 
                                  region.roas >= 3.0 ? "Good" : 
                                  region.roas >= 2.0 ? "Average" : "Poor"}
                                </span>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <Badge className={`${getIncrementalColor(region.incremental, totalIncremental)}`}>
                                ${(region.incremental/1000).toFixed(0)}K
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {((region.incremental / totalIncremental) * 100).toFixed(1)}% of total
                            </TableCell>
                          </>
                        )}
                        
                        <TableCell className="text-right">
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRegion(region);
                            }}
                          >
                            <Maximize2 className="h-3 w-3 mr-1" />
                            Details
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Channel breakdown sheet that appears when a region is clicked */}
      <Sheet open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <span className="text-xl mr-2">{selectedRegion?.flag}</span>
              {selectedRegion?.region} - Performance Analysis
            </SheetTitle>
            <SheetDescription>
              Incremental and baseline contribution for {selectedRegion?.region}
            </SheetDescription>
          </SheetHeader>
          
          {selectedRegion && (
            <div className="py-6">
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Overall ROAS</div>
                <div className="flex items-center">
                  <Badge className={`text-lg ${getRoasColor(selectedRegion.roas)}`}>
                    {selectedRegion.roas.toFixed(2)}x
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedRegion.roas >= 4.0 ? "Excellent performance" : 
                     selectedRegion.roas >= 3.0 ? "Good performance" : 
                     selectedRegion.roas >= 2.0 ? "Average performance" : "Needs improvement"}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">Incremental Contribution</div>
                <div className="text-2xl font-bold">
                  ${selectedRegion.incremental.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {((selectedRegion.incremental / totalIncremental) * 100).toFixed(1)}% of total incremental revenue
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg mb-6">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      The breakdown below shows how different media types contribute to 
                      the incremental revenue in {selectedRegion.region}. 
                      These insights can help optimize your regional media mix strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">Media Type Breakdown</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Media Type</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Contribution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(selectedRegion.channels).map(([channel, revenue]) => (
                      <TableRow key={channel}>
                        <TableCell className="font-medium">
                          {channelNames[channel as keyof typeof channelNames]}
                        </TableCell>
                        <TableCell>
                          ${(revenue as number).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {((revenue as number / selectedRegion.incremental) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1 text-primary" />
                    Region Insights
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRegion.roas >= 4.0 
                      ? `${selectedRegion.region} shows excellent ROAS performance with strong incremental contribution from paid media. Consider increasing investment in this high-performing region.`
                      : selectedRegion.roas >= 3.0
                      ? `${selectedRegion.region} shows good overall performance. Continue to monitor channel mix to optimize results further.`
                      : `${selectedRegion.region} has below-average performance. Consider strategic reassessment of media mix or creative assets for this region.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <SheetClose asChild>
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4" />
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
