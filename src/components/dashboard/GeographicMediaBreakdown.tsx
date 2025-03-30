
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";
import { Globe, Map, PieChart, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for geographic breakdown - in a real app, this would come from props or an API
const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"];

interface GeographicBreakdownProps {
  loading: boolean;
}

export function GeographicMediaBreakdown({ loading }: GeographicBreakdownProps) {
  const [selectedRegion, setSelectedRegion] = useState("North America");
  const [selectedMediaType, setSelectedMediaType] = useState("all");
  
  // Mock data for media groups by region
  const mediaGroupsByRegion = {
    "North America": {
      paid: { value: 980000, growth: 15.3 },
      organic: { value: 720000, growth: 8.7 },
      nonPaid: { value: 650000, growth: 5.2 },
      baseline: { value: 420000, growth: 2.1 },
    },
    "Europe": {
      paid: { value: 780000, growth: 12.8 },
      organic: { value: 620000, growth: 9.3 },
      nonPaid: { value: 580000, growth: 7.4 },
      baseline: { value: 380000, growth: 1.8 },
    },
    "Asia Pacific": {
      paid: { value: 850000, growth: 18.6 },
      organic: { value: 590000, growth: 10.2 },
      nonPaid: { value: 510000, growth: 8.9 },
      baseline: { value: 410000, growth: 3.2 },
    },
    "Latin America": {
      paid: { value: 420000, growth: 22.4 },
      organic: { value: 310000, growth: 15.7 },
      nonPaid: { value: 280000, growth: 12.3 },
      baseline: { value: 180000, growth: 4.5 },
    },
    "Middle East & Africa": {
      paid: { value: 350000, growth: 25.8 },
      organic: { value: 280000, growth: 17.3 },
      nonPaid: { value: 230000, growth: 14.1 },
      baseline: { value: 150000, growth: 5.2 },
    },
  };
  
  // Mock channel breakdown data for each media group
  const channelBreakdownByMediaType = {
    paid: [
      { name: "Search", value: 380000, growth: 16.7 },
      { name: "Social", value: 290000, growth: 21.3 },
      { name: "Display", value: 210000, growth: 12.4 },
      { name: "Video", value: 100000, growth: 18.9 },
    ],
    organic: [
      { name: "SEO", value: 320000, growth: 9.8 },
      { name: "Content", value: 250000, growth: 11.2 },
      { name: "Referral", value: 150000, growth: 7.3 },
    ],
    nonPaid: [
      { name: "Email", value: 280000, growth: 6.1 },
      { name: "Affiliate", value: 230000, growth: 8.4 },
      { name: "PR", value: 140000, growth: 4.2 },
    ],
    baseline: [
      { name: "Brand", value: 180000, growth: 2.7 },
      { name: "Seasonal", value: 150000, growth: 1.5 },
      { name: "Market", value: 90000, growth: 2.2 },
    ],
  };

  // Get the data for the selected region
  const selectedRegionData = mediaGroupsByRegion[selectedRegion as keyof typeof mediaGroupsByRegion] || mediaGroupsByRegion["North America"];
  
  // Function to get total value for a region
  const getRegionTotal = (region: string) => {
    const data = mediaGroupsByRegion[region as keyof typeof mediaGroupsByRegion];
    return data ? Object.values(data).reduce((sum, item) => sum + item.value, 0) : 0;
  };
  
  // Get channels for the selected media type
  const getChannelsForMediaType = (mediaType: string) => {
    return channelBreakdownByMediaType[mediaType as keyof typeof channelBreakdownByMediaType] || [];
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Geographic Media Breakdown
            </CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedMediaType} onValueChange={setSelectedMediaType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Media Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Media Types</SelectItem>
                <SelectItem value="paid">Paid Media</SelectItem>
                <SelectItem value="organic">Organic Media</SelectItem>
                <SelectItem value="nonPaid">Non-Paid Media</SelectItem>
                <SelectItem value="baseline">Baseline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs defaultValue="map" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Map View
            </TabsTrigger>
            <TabsTrigger value="regions" className="flex items-center gap-2">
              <Map className="h-4 w-4" /> Regions
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Media Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <div className="bg-muted/30 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
              <Globe className="h-20 w-20 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                Interactive map visualization would display here, showing geographic distribution of 
                {selectedMediaType === "all" ? " all media types" : ` ${selectedMediaType} media`} across regions.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((region) => {
                const regionData = mediaGroupsByRegion[region as keyof typeof mediaGroupsByRegion];
                const totalValue = getRegionTotal(region);
                const isSelected = region === selectedRegion;
                
                return (
                  <div 
                    key={region} 
                    className={`border rounded-lg p-4 transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-lg">{region}</h3>
                      {isSelected && (
                        <Badge variant="outline" className="bg-primary/10">Selected</Badge>
                      )}
                    </div>
                    
                    <div className="text-2xl font-bold mb-2">${totalValue.toLocaleString()}</div>
                    
                    {/* Media type bars */}
                    <div className="space-y-2">
                      {Object.entries(regionData).map(([mediaType, data]) => (
                        <div key={mediaType} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{mediaType === "paid" ? "Paid Media" : 
                                   mediaType === "organic" ? "Organic Media" : 
                                   mediaType === "nonPaid" ? "Non-Paid Media" : 
                                   "Baseline"}</span>
                            <span className="font-medium">${data.value.toLocaleString()}</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full" 
                              style={{ 
                                width: `${(data.value / totalValue) * 100}%`,
                                backgroundColor: mediaGroupColors[mediaType as keyof typeof mediaGroupColors]
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={() => setSelectedRegion(region)}
                    >
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-0">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">{selectedRegion}</h3>
              <p className="text-muted-foreground">
                Breakdown of media types contribution to revenue in {selectedRegion}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(selectedRegionData).map(([mediaType, data]) => {
                const mediaTypeName = mediaType === "paid" ? "Paid Media" : 
                                     mediaType === "organic" ? "Organic Media" : 
                                     mediaType === "nonPaid" ? "Non-Paid Media" : "Baseline";
                                     
                return (
                  <Card 
                    key={mediaType} 
                    className={`overflow-hidden ${selectedMediaType === mediaType ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedMediaType(mediaType)}
                  >
                    <div 
                      className="h-1" 
                      style={{ backgroundColor: mediaGroupColors[mediaType as keyof typeof mediaGroupColors] }}
                    ></div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{mediaTypeName}</h4>
                      <div className="text-2xl font-bold mt-1">
                        ${data.value.toLocaleString()}
                      </div>
                      <div className={`text-sm mt-1 flex items-center ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.growth > 0 ? '↑' : '↓'} {Math.abs(data.growth)}% YoY
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {selectedMediaType !== 'all' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">
                    {selectedMediaType === "paid" ? "Paid Media Channels" : 
                     selectedMediaType === "organic" ? "Organic Media Channels" : 
                     selectedMediaType === "nonPaid" ? "Non-Paid Media Channels" : 
                     "Baseline Components"} in {selectedRegion}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1"
                    style={{ borderColor: mediaGroupColors[selectedMediaType as keyof typeof mediaGroupColors] }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: mediaGroupColors[selectedMediaType as keyof typeof mediaGroupColors] }}
                    ></div>
                    {selectedMediaType === "paid" ? "Paid Media" : 
                     selectedMediaType === "organic" ? "Organic Media" : 
                     selectedMediaType === "nonPaid" ? "Non-Paid Media" : "Baseline"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getChannelsForMediaType(selectedMediaType).map((channel) => (
                    <div key={channel.name} className="border rounded-lg p-4">
                      <h4 className="font-medium">{channel.name}</h4>
                      <div className="text-xl font-bold mt-1">
                        ${channel.value.toLocaleString()}
                      </div>
                      <div className={`text-sm mt-1 flex items-center ${channel.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {channel.growth > 0 ? '↑' : '↓'} {Math.abs(channel.growth)}% YoY
                      </div>
                      <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${(channel.value / selectedRegionData[selectedMediaType as keyof typeof selectedRegionData].value) * 100}%`,
                            backgroundColor: mediaGroupColors[selectedMediaType as keyof typeof mediaGroupColors]
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((channel.value / selectedRegionData[selectedMediaType as keyof typeof selectedRegionData].value) * 100)}% of {selectedMediaType === "paid" ? "Paid Media" : 
                          selectedMediaType === "organic" ? "Organic Media" : 
                          selectedMediaType === "nonPaid" ? "Non-Paid Media" : "Baseline"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
