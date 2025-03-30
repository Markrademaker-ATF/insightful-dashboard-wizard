
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterDropdown } from './FilterDropdown';
import { Map, LineChart, BarChartBig, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProductFilter } from '@/contexts/ProductFilterContext';

// Mock data for the map visualization
const regionPerformanceData = {
  'north-america': {
    totalRevenue: 2450000,
    growth: 12.5,
    topCountry: 'United States',
    topMediaType: 'Paid',
    countries: [
      { name: 'United States', revenue: 1850000, growth: 11.2, flagEmoji: '🇺🇸' },
      { name: 'Canada', revenue: 420000, growth: 15.7, flagEmoji: '🇨🇦' },
      { name: 'Mexico', revenue: 180000, growth: -2.3, flagEmoji: '🇲🇽' }
    ]
  },
  'europe': {
    totalRevenue: 1980000,
    growth: 9.8,
    topCountry: 'Germany',
    topMediaType: 'Paid',
    countries: [
      { name: 'Germany', revenue: 580000, growth: 8.9, flagEmoji: '🇩🇪' },
      { name: 'United Kingdom', revenue: 520000, growth: 7.5, flagEmoji: '🇬🇧' },
      { name: 'France', revenue: 410000, growth: 12.1, flagEmoji: '🇫🇷' },
      { name: 'Italy', revenue: 290000, growth: 5.4, flagEmoji: '🇮🇹' },
      { name: 'Spain', revenue: 180000, growth: 14.7, flagEmoji: '🇪🇸' }
    ]
  },
  'asia-pacific': {
    totalRevenue: 2250000,
    growth: 18.5,
    topCountry: 'China',
    topMediaType: 'Organic',
    countries: [
      { name: 'China', revenue: 980000, growth: 22.4, flagEmoji: '🇨🇳' },
      { name: 'Japan', revenue: 560000, growth: 9.8, flagEmoji: '🇯🇵' },
      { name: 'South Korea', revenue: 340000, growth: 17.2, flagEmoji: '🇰🇷' },
      { name: 'Australia', revenue: 240000, growth: 11.5, flagEmoji: '🇦🇺' },
      { name: 'India', revenue: 130000, growth: 31.4, flagEmoji: '🇮🇳' }
    ]
  },
  'latin-america': {
    totalRevenue: 680000,
    growth: 14.2,
    topCountry: 'Brazil',
    topMediaType: 'Non-Paid',
    countries: [
      { name: 'Brazil', revenue: 320000, growth: 15.8, flagEmoji: '🇧🇷' },
      { name: 'Argentina', revenue: 150000, growth: 7.5, flagEmoji: '🇦🇷' },
      { name: 'Colombia', revenue: 110000, growth: 19.7, flagEmoji: '🇨🇴' },
      { name: 'Chile', revenue: 100000, growth: 13.4, flagEmoji: '🇨🇱' }
    ]
  },
  'middle-east': {
    totalRevenue: 540000,
    growth: 11.9,
    topCountry: 'UAE',
    topMediaType: 'Paid',
    countries: [
      { name: 'UAE', revenue: 180000, growth: 14.3, flagEmoji: '🇦🇪' },
      { name: 'Saudi Arabia', revenue: 160000, growth: 12.8, flagEmoji: '🇸🇦' },
      { name: 'Israel', revenue: 120000, growth: 9.2, flagEmoji: '🇮🇱' },
      { name: 'Egypt', revenue: 80000, growth: 5.7, flagEmoji: '🇪🇬' }
    ]
  }
};

interface GeographicMediaBreakdownProps {
  loading: boolean;
  selectedProduct?: string;
}

export function GeographicMediaBreakdown({ 
  loading, 
  selectedProduct = 'all' 
}: GeographicMediaBreakdownProps) {
  const [selectedRegion, setSelectedRegion] = useState('north-america');
  const [selectedMediaType, setSelectedMediaType] = useState('all');
  const [selectedView, setSelectedView] = useState('map');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { selectedProduct: globalSelectedProduct } = useProductFilter();
  
  // Use the globally selected product if no local product is passed
  const activeProduct = selectedProduct || globalSelectedProduct;

  const regionOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East & Africa' }
  ];

  const mediaTypeOptions = [
    { value: 'all', label: 'All Media Types' },
    { value: 'paid', label: 'Paid Media' },
    { value: 'organic', label: 'Organic Media' },
    { value: 'non-paid', label: 'Non-Paid Media' },
    { value: 'baseline', label: 'Baseline' }
  ];

  const regionData = regionPerformanceData[selectedRegion as keyof typeof regionPerformanceData];
  
  // Get color based on growth rate
  const getGrowthColor = (growth: number) => {
    if (growth >= 15) return 'text-green-600';
    if (growth >= 5) return 'text-green-500';
    if (growth >= 0) return 'text-green-400';
    if (growth >= -5) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Controls for filtering and visualization selection */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-auto">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <FilterDropdown
            options={mediaTypeOptions}
            value={selectedMediaType}
            onChange={setSelectedMediaType}
            label="Media Type"
          />
        </div>
        
        <Tabs value={selectedView} onValueChange={setSelectedView} className="w-auto">
          <TabsList className="grid grid-cols-3 h-9 w-auto">
            <TabsTrigger value="map" className="flex items-center gap-1 px-3">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-1 px-3">
              <BarChartBig className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-1 px-3">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-6">
        {/* Show selected product */}
        {activeProduct !== 'all' && (
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md text-sm">
            Showing data for: <span className="font-medium">{activeProduct === 'all' ? 'All Products' : activeProduct.charAt(0).toUpperCase() + activeProduct.slice(1)}</span>
          </div>
        )}

        {/* Region Summary Statistics */}
        {!loading && regionData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${(regionData.totalRevenue / 1000000).toFixed(2)}M</p>
                <div className={`text-xs mt-1 flex items-center ${getGrowthColor(regionData.growth)}`}>
                  {regionData.growth >= 0 ? '↑' : '↓'} {Math.abs(regionData.growth)}% vs. last period
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Top Country</p>
                <p className="text-2xl font-bold flex items-center">
                  {regionData.countries[0].flagEmoji} {regionData.topCountry}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ${(regionData.countries[0].revenue / 1000000).toFixed(2)}M in revenue
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Top Media Type</p>
                <p className="text-2xl font-bold">{regionData.topMediaType}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Best performing channel
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Countries</p>
                <p className="text-2xl font-bold">{regionData.countries.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active markets
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map View */}
        <TabsContent value="map" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">
                    Geographic Media Distribution
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRegion === 'north-america' ? 'North America' : 
                     selectedRegion === 'europe' ? 'Europe' : 
                     selectedRegion === 'asia-pacific' ? 'Asia Pacific' :
                     selectedRegion === 'latin-america' ? 'Latin America' : 'Middle East & Africa'} media performance by country
                  </p>
                </div>
              </div>

              <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/20 rounded-md flex flex-col items-center justify-center p-4">
                {loading ? (
                  <p>Loading map data...</p>
                ) : (
                  <div className="w-full h-full">
                    {/* Interactive Region Map Visualization */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center max-w-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {regionData.countries.map(country => (
                            <div 
                              key={country.name}
                              className={`p-4 rounded-lg border transition-all cursor-pointer
                                ${selectedCountry === country.name ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                              `}
                              onClick={() => setSelectedCountry(country.name !== selectedCountry ? country.name : null)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-2xl mr-2">{country.flagEmoji}</span>
                                  <span className="font-medium">{country.name}</span>
                                </div>
                                <Badge className={`${getGrowthColor(country.growth)}`}>
                                  {country.growth > 0 ? '+' : ''}{country.growth}%
                                </Badge>
                              </div>
                              <p className="text-lg font-bold mt-2">${(country.revenue / 1000000).toFixed(2)}M</p>
                              
                              {selectedCountry === country.name && (
                                <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                                  <div className="flex justify-between mb-1">
                                    <span>Paid Media:</span>
                                    <span className="font-medium">${(country.revenue * 0.45 / 1000000).toFixed(2)}M</span>
                                  </div>
                                  <div className="flex justify-between mb-1">
                                    <span>Organic Media:</span>
                                    <span className="font-medium">${(country.revenue * 0.3 / 1000000).toFixed(2)}M</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Non-Paid Media:</span>
                                    <span className="font-medium">${(country.revenue * 0.25 / 1000000).toFixed(2)}M</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg mt-4 flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div className="text-sm text-left">
                            <p className="font-medium mb-1">Geographic Insights</p>
                            <p className="text-muted-foreground">
                              {selectedRegion === 'north-america' && "North America shows strong performance with the US leading revenue generation. Canada shows the highest growth rate in the region."}
                              {selectedRegion === 'europe' && "European markets show steady growth, with Germany as the top performer. Spain has the highest growth potential with a 14.7% increase."}
                              {selectedRegion === 'asia-pacific' && "Asia Pacific is the fastest growing region led by China and India. Organic media performs exceptionally well in this region."}
                              {selectedRegion === 'latin-america' && "Latin America shows promising growth, particularly in Brazil and Colombia. Non-paid media channels are especially effective here."}
                              {selectedRegion === 'middle-east' && "Middle East markets are steadily expanding with UAE and Saudi Arabia leading the growth. Paid media dominates in this region."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">Regional Media Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Media type breakdown by region
                  </p>
                </div>
              </div>

              <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/20 rounded-md flex items-center justify-center">
                {loading ? (
                  <p>Loading overview data...</p>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                      <div className="col-span-1 md:col-span-2">
                        <h4 className="text-lg font-medium mb-3">Revenue by Media Type</h4>
                        <div className="h-60 bg-muted/30 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <p>Media type distribution chart would appear here</p>
                            <p className="text-sm text-muted-foreground mt-2">Shows breakdown of revenue by media type in {regionOptions.find(r => r.value === selectedRegion)?.label}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3">Media Mix</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/30 rounded-md">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Paid Media</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {selectedRegion === 'asia-pacific' ? '↓ 3% vs global average' : '↑ 2% vs global average'}
                            </div>
                          </div>
                          
                          <div className="p-4 bg-muted/30 rounded-md">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Organic Media</span>
                              <span className="font-medium">30%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {selectedRegion === 'asia-pacific' ? '↑ 7% vs global average' : '↑ 1% vs global average'}
                            </div>
                          </div>
                          
                          <div className="p-4 bg-muted/30 rounded-md">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Non-Paid Media</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {selectedRegion === 'latin-america' ? '↑ 5% vs global average' : '↓ 2% vs global average'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg mt-6 w-full flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="text-sm text-left">
                        <p className="font-medium mb-1">Regional Media Strategy Insights</p>
                        <p className="text-muted-foreground">
                          {selectedRegion === 'north-america' && "North America has a balanced media mix with a slight emphasis on paid media. Search and social platforms deliver the highest ROI."}
                          {selectedRegion === 'europe' && "European markets respond well to paid media, particularly display and video ads. Consider increasing organic media allocation for better long-term results."}
                          {selectedRegion === 'asia-pacific' && "Asia Pacific shows stronger response to organic media than other regions. Content marketing and SEO deliver exceptional results here."}
                          {selectedRegion === 'latin-america' && "Latin America has the highest non-paid media effectiveness. Email marketing and referral programs perform particularly well in this region."}
                          {selectedRegion === 'middle-east' && "Middle East markets are primarily driven by paid media campaigns. Video and social ads have the highest conversion rates in the region."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">Detailed Media Breakdown</h3>
                  <p className="text-sm text-muted-foreground">
                    Media performance metrics by country in {selectedRegion.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/20 rounded-md">
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <p>Loading detailed data...</p>
                  </div>
                ) : (
                  <div className="p-6 h-full overflow-auto">
                    <div className="space-y-6">
                      {/* Country Performance Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Country</th>
                              <th className="text-right py-3 px-4">Revenue</th>
                              <th className="text-right py-3 px-4">Growth</th>
                              <th className="text-right py-3 px-4">Paid Media</th>
                              <th className="text-right py-3 px-4">Organic Media</th>
                              <th className="text-right py-3 px-4">Non-Paid Media</th>
                            </tr>
                          </thead>
                          <tbody>
                            {regionData.countries.map(country => (
                              <tr key={country.name} className="border-b hover:bg-muted/30 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <span className="text-xl mr-2">{country.flagEmoji}</span>
                                    <span>{country.name}</span>
                                  </div>
                                </td>
                                <td className="text-right py-3 px-4 font-medium">
                                  ${(country.revenue / 1000000).toFixed(2)}M
                                </td>
                                <td className={`text-right py-3 px-4 font-medium ${getGrowthColor(country.growth)}`}>
                                  {country.growth > 0 ? '+' : ''}{country.growth}%
                                </td>
                                <td className="text-right py-3 px-4">
                                  ${(country.revenue * 0.45 / 1000000).toFixed(2)}M
                                </td>
                                <td className="text-right py-3 px-4">
                                  ${(country.revenue * 0.3 / 1000000).toFixed(2)}M
                                </td>
                                <td className="text-right py-3 px-4">
                                  ${(country.revenue * 0.25 / 1000000).toFixed(2)}M
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Insights Section */}
                      <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Channel Performance Insights</p>
                          <p className="text-muted-foreground">
                            {selectedRegion === 'north-america' && "In North America, search advertising delivers the highest ROI in the US, while Canada shows stronger performance in social media. Mexico's market responds best to video advertising and email marketing."}
                            {selectedRegion === 'europe' && "Across Europe, performance varies significantly by country. Germany and UK excel with search and display ads, while southern European countries show better engagement with social media and content marketing."}
                            {selectedRegion === 'asia-pacific' && "China and India demonstrate exceptional growth in organic search and social media engagement. Japan shows strong email marketing performance, while Australia leads in display advertising effectiveness."}
                            {selectedRegion === 'latin-america' && "Brazil's market responds well to social media and content marketing. Argentina shows highest ROI in email campaigns, while Colombia demonstrates strong growth potential in paid social advertising."}
                            {selectedRegion === 'middle-east' && "UAE and Saudi Arabia show robust performance across paid media channels, particularly in social and video. Email marketing effectiveness is highest in Israel, while Egypt shows growing potential in organic search."}
                          </p>
                          
                          <div className="mt-4">
                            <p className="font-medium mb-1">Recommendations</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>
                                {selectedRegion === 'north-america' && "Increase investment in search advertising in the US market"}
                                {selectedRegion === 'europe' && "Focus on localized content strategies for Southern European markets"}
                                {selectedRegion === 'asia-pacific' && "Prioritize organic content development for China and India"}
                                {selectedRegion === 'latin-america' && "Expand social media campaigns in Brazil and Colombia"}
                                {selectedRegion === 'middle-east' && "Increase video ad spend in UAE and Saudi Arabia"}
                              </li>
                              <li>
                                {selectedRegion === 'north-america' && "Test increased social media spend in Canada to capitalize on high growth"}
                                {selectedRegion === 'europe' && "Optimize display advertising targeting for German and UK markets"}
                                {selectedRegion === 'asia-pacific' && "Improve email marketing strategies in Japan to boost engagement"}
                                {selectedRegion === 'latin-america' && "Develop more robust email marketing campaigns for Argentina"}
                                {selectedRegion === 'middle-east' && "Invest in SEO and organic search optimization for Egypt"}
                              </li>
                              <li>
                                {selectedRegion === 'north-america' && "Develop specialized content for Mexican market to improve performance"}
                                {selectedRegion === 'europe' && "Test increased allocation to content marketing across Southern Europe"}
                                {selectedRegion === 'asia-pacific' && "Expand display advertising in the Australian market"}
                                {selectedRegion === 'latin-america' && "Optimize referral programs across all Latin American markets"}
                                {selectedRegion === 'middle-east' && "Enhance email marketing segmentation for Israeli market"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
}
