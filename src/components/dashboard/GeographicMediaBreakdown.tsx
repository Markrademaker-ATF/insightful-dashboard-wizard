
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
import { Map, LineChart, BarChartBig, Info, TrendingUp, Globe, Target, Zap, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProductFilter } from '@/contexts/ProductFilterContext';

// Mock data for the map visualization
const regionPerformanceData = {
  'north-america': {
    totalRevenue: 2450000,
    growth: 12.5,
    topCountry: 'United States',
    topMediaType: 'Paid',
    roas: 4.2,
    cac: 42.5,
    conversionRate: 3.8,
    marketPenetration: 68,
    seasonality: 'Q4 strongest, Q2 weakest',
    topChannels: ['Paid Search', 'Social Media', 'Display'],
    growthOpportunities: ['Increase video ad spend in Canada', 'Optimize search campaigns for Mexico'],
    countries: [
      { 
        name: 'United States', 
        revenue: 1850000, 
        growth: 11.2, 
        flagEmoji: '🇺🇸',
        mediaBreakdown: {
          paid: 825000,
          organic: 490000,
          nonPaid: 385000,
          baseline: 150000
        },
        roas: 4.1,
        cpa: 38.50,
        topChannel: 'Paid Search',
        insight: 'Mobile conversion rates 32% higher than desktop'
      },
      { 
        name: 'Canada', 
        revenue: 420000, 
        growth: 15.7, 
        flagEmoji: '🇨🇦',
        mediaBreakdown: {
          paid: 210000,
          organic: 95000,
          nonPaid: 75000,
          baseline: 40000
        },
        roas: 4.7,
        cpa: 35.20,
        topChannel: 'Social Media',
        insight: 'Video ads outperforming static by 27%'
      },
      { 
        name: 'Mexico', 
        revenue: 180000, 
        growth: -2.3, 
        flagEmoji: '🇲🇽',
        mediaBreakdown: {
          paid: 75000,
          organic: 45000,
          nonPaid: 35000,
          baseline: 25000
        },
        roas: 3.2,
        cpa: 48.60,
        topChannel: 'Display',
        insight: 'High potential for email marketing optimization'
      }
    ]
  },
  'europe': {
    totalRevenue: 1980000,
    growth: 9.8,
    topCountry: 'Germany',
    topMediaType: 'Paid',
    roas: 3.8,
    cac: 45.2,
    conversionRate: 3.2,
    marketPenetration: 62,
    seasonality: 'Q4 and Q1 strongest',
    topChannels: ['Paid Search', 'Display', 'Social Media'],
    growthOpportunities: ['Expand content marketing in UK', 'Increase social presence in Spain'],
    countries: [
      { 
        name: 'Germany', 
        revenue: 580000, 
        growth: 8.9, 
        flagEmoji: '🇩🇪',
        mediaBreakdown: {
          paid: 290000,
          organic: 145000,
          nonPaid: 85000,
          baseline: 60000
        },
        roas: 3.9,
        cpa: 43.70,
        topChannel: 'Paid Search',
        insight: 'Highest display ad CTR in the region'
      },
      { 
        name: 'United Kingdom', 
        revenue: 520000, 
        growth: 7.5, 
        flagEmoji: '🇬🇧',
        mediaBreakdown: {
          paid: 250000,
          organic: 135000,
          nonPaid: 90000,
          baseline: 45000
        },
        roas: 3.7,
        cpa: 46.20,
        topChannel: 'Paid Social',
        insight: 'Content marketing shows 22% higher engagement'
      },
      { 
        name: 'France', 
        revenue: 410000, 
        growth: 12.1, 
        flagEmoji: '🇫🇷',
        mediaBreakdown: {
          paid: 205000,
          organic: 105000,
          nonPaid: 65000,
          baseline: 35000
        },
        roas: 3.8,
        cpa: 44.50,
        topChannel: 'Display',
        insight: 'Video consumption 35% above average'
      },
      { 
        name: 'Italy', 
        revenue: 290000, 
        growth: 5.4, 
        flagEmoji: '🇮🇹',
        mediaBreakdown: {
          paid: 145000,
          organic: 75000,
          nonPaid: 40000,
          baseline: 30000
        },
        roas: 3.5,
        cpa: 48.90,
        topChannel: 'Social Media',
        insight: 'Mobile traffic increasing 18% YoY'
      },
      { 
        name: 'Spain', 
        revenue: 180000, 
        growth: 14.7, 
        flagEmoji: '🇪🇸',
        mediaBreakdown: {
          paid: 90000,
          organic: 45000,
          nonPaid: 30000,
          baseline: 15000
        },
        roas: 4.3,
        cpa: 39.80,
        topChannel: 'Paid Social',
        insight: 'Highest social engagement rates in Europe'
      }
    ]
  },
  'asia-pacific': {
    totalRevenue: 2250000,
    growth: 18.5,
    topCountry: 'China',
    topMediaType: 'Organic',
    roas: 4.5,
    cac: 38.6,
    conversionRate: 4.2,
    marketPenetration: 45,
    seasonality: 'Consistent with peaks in Q1',
    topChannels: ['Social Media', 'Content Marketing', 'Search'],
    growthOpportunities: ['Expand mobile presence in India', 'Increase content marketing in Japan'],
    countries: [
      { 
        name: 'China', 
        revenue: 980000, 
        growth: 22.4, 
        flagEmoji: '🇨🇳',
        mediaBreakdown: {
          paid: 390000,
          organic: 350000,
          nonPaid: 140000,
          baseline: 100000
        },
        roas: 4.6,
        cpa: 36.80,
        topChannel: 'Social Media',
        insight: 'Local platforms delivering 48% higher ROI'
      },
      { 
        name: 'Japan', 
        revenue: 560000, 
        growth: 9.8, 
        flagEmoji: '🇯🇵',
        mediaBreakdown: {
          paid: 230000,
          organic: 180000,
          nonPaid: 95000,
          baseline: 55000
        },
        roas: 4.2,
        cpa: 42.30,
        topChannel: 'Search',
        insight: 'Desktop conversion still dominates at 65%'
      },
      { 
        name: 'South Korea', 
        revenue: 340000, 
        growth: 17.2, 
        flagEmoji: '🇰🇷',
        mediaBreakdown: {
          paid: 135000,
          organic: 120000,
          nonPaid: 55000,
          baseline: 30000
        },
        roas: 4.8,
        cpa: 34.70,
        topChannel: 'Mobile Search',
        insight: '92% of traffic comes from mobile devices'
      },
      { 
        name: 'Australia', 
        revenue: 240000, 
        growth: 11.5, 
        flagEmoji: '🇦🇺',
        mediaBreakdown: {
          paid: 110000,
          organic: 70000,
          nonPaid: 40000,
          baseline: 20000
        },
        roas: 4.1,
        cpa: 43.50,
        topChannel: 'Display',
        insight: 'Highest email engagement rates in region'
      },
      { 
        name: 'India', 
        revenue: 130000, 
        growth: 31.4, 
        flagEmoji: '🇮🇳',
        mediaBreakdown: {
          paid: 50000,
          organic: 45000,
          nonPaid: 25000,
          baseline: 10000
        },
        roas: 5.2,
        cpa: 28.90,
        topChannel: 'Mobile Search',
        insight: 'Fastest growing market, 85% via mobile'
      }
    ]
  },
  'latin-america': {
    totalRevenue: 680000,
    growth: 14.2,
    topCountry: 'Brazil',
    topMediaType: 'Non-Paid',
    roas: 4.7,
    cac: 36.4,
    conversionRate: 2.7,
    marketPenetration: 38,
    seasonality: 'Q1 and Q4 strongest',
    topChannels: ['Email', 'Social Media', 'Organic Search'],
    growthOpportunities: ['Expand affiliate program in Brazil', 'Scale email campaigns in Colombia'],
    countries: [
      { 
        name: 'Brazil', 
        revenue: 320000, 
        growth: 15.8, 
        flagEmoji: '🇧🇷',
        mediaBreakdown: {
          paid: 125000,
          organic: 85000,
          nonPaid: 90000,
          baseline: 20000
        },
        roas: 4.8,
        cpa: 35.40,
        topChannel: 'Email',
        insight: 'Affiliate marketing drives 28% of conversions'
      },
      { 
        name: 'Argentina', 
        revenue: 150000, 
        growth: 7.5, 
        flagEmoji: '🇦🇷',
        mediaBreakdown: {
          paid: 60000,
          organic: 40000,
          nonPaid: 38000,
          baseline: 12000
        },
        roas: 4.2,
        cpa: 39.80,
        topChannel: 'Social Media',
        insight: 'Highest customer loyalty rates in region'
      },
      { 
        name: 'Colombia', 
        revenue: 110000, 
        growth: 19.7, 
        flagEmoji: '🇨🇴',
        mediaBreakdown: {
          paid: 40000,
          organic: 30000,
          nonPaid: 32000,
          baseline: 8000
        },
        roas: 5.1,
        cpa: 32.60,
        topChannel: 'Email',
        insight: 'Email campaigns have 34% higher open rates'
      },
      { 
        name: 'Chile', 
        revenue: 100000, 
        growth: 13.4, 
        flagEmoji: '🇨🇱',
        mediaBreakdown: {
          paid: 38000,
          organic: 27000,
          nonPaid: 28000,
          baseline: 7000
        },
        roas: 4.5,
        cpa: 37.20,
        topChannel: 'Organic Search',
        insight: 'SEO driving 42% of new customer acquisition'
      }
    ]
  },
  'middle-east': {
    totalRevenue: 540000,
    growth: 11.9,
    topCountry: 'UAE',
    topMediaType: 'Paid',
    roas: 3.9,
    cac: 49.8,
    conversionRate: 2.5,
    marketPenetration: 32,
    seasonality: 'Strong Q2 and Q3 performance',
    topChannels: ['Paid Search', 'Display', 'Video'],
    growthOpportunities: ['Expand video advertising in UAE', 'Test content marketing in Saudi Arabia'],
    countries: [
      { 
        name: 'UAE', 
        revenue: 180000, 
        growth: 14.3, 
        flagEmoji: '🇦🇪',
        mediaBreakdown: {
          paid: 95000,
          organic: 35000,
          nonPaid: 30000,
          baseline: 20000
        },
        roas: 4.1,
        cpa: 45.80,
        topChannel: 'Paid Search',
        insight: 'Luxury segment drives 58% of revenue'
      },
      { 
        name: 'Saudi Arabia', 
        revenue: 160000, 
        growth: 12.8, 
        flagEmoji: '🇸🇦',
        mediaBreakdown: {
          paid: 85000,
          organic: 30000,
          nonPaid: 25000,
          baseline: 20000
        },
        roas: 3.8,
        cpa: 48.30,
        topChannel: 'Display',
        insight: 'Mobile traffic increasing 25% YoY'
      },
      { 
        name: 'Israel', 
        revenue: 120000, 
        growth: 9.2, 
        flagEmoji: '🇮🇱',
        mediaBreakdown: {
          paid: 55000,
          organic: 30000,
          nonPaid: 25000,
          baseline: 10000
        },
        roas: 4.2,
        cpa: 43.50,
        topChannel: 'Video',
        insight: 'Highest tech audience engagement rate'
      },
      { 
        name: 'Egypt', 
        revenue: 80000, 
        growth: 5.7, 
        flagEmoji: '🇪🇬',
        mediaBreakdown: {
          paid: 35000,
          organic: 20000,
          nonPaid: 15000,
          baseline: 10000
        },
        roas: 3.4,
        cpa: 52.70,
        topChannel: 'Social Media',
        insight: 'Growing mobile-first market, 72% mobile traffic'
      }
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

  // Get ROAS quality descriptor
  const getRoasQuality = (roas: number) => {
    if (roas >= 4.5) return 'Excellent';
    if (roas >= 3.5) return 'Good';
    if (roas >= 2.5) return 'Average';
    return 'Below Average';
  };

  // Get color for ROAS badge
  const getRoasColor = (roas: number) => {
    if (roas >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (roas >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (roas >= 2.5) return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
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
                <p className="text-sm text-muted-foreground mb-1">ROAS</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{regionData.roas.toFixed(1)}x</p>
                  <Badge className={getRoasColor(regionData.roas)}>
                    {getRoasQuality(regionData.roas)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg. return on ad spend
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Top Media Type</p>
                <p className="text-2xl font-bold">{regionData.topMediaType}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Best performing channel: {regionData.topChannels[0]}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Market Penetration</p>
                <p className="text-2xl font-bold">{regionData.marketPenetration}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {regionData.countries.length} active markets
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
                              
                              {/* Additional country metrics - shown when country is selected */}
                              {selectedCountry === country.name && (
                                <div className="mt-3 space-y-3">
                                  <div className="pt-3 border-t">
                                    <div className="flex justify-between mb-1 text-sm font-medium">
                                      <span>Media Breakdown</span>
                                      <span>% of Revenue</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <div className="flex justify-between mb-1 text-muted-foreground">
                                          <span>Paid Media:</span>
                                          <span className="font-medium">${(country.mediaBreakdown.paid / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5">
                                          <div 
                                            className="bg-blue-500 h-1.5 rounded-full" 
                                            style={{ width: `${(country.mediaBreakdown.paid / country.revenue) * 100}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1 text-muted-foreground">
                                          <span>Organic Media:</span>
                                          <span className="font-medium">${(country.mediaBreakdown.organic / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5">
                                          <div 
                                            className="bg-green-500 h-1.5 rounded-full" 
                                            style={{ width: `${(country.mediaBreakdown.organic / country.revenue) * 100}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1 text-muted-foreground">
                                          <span>Non-Paid Media:</span>
                                          <span className="font-medium">${(country.mediaBreakdown.nonPaid / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5">
                                          <div 
                                            className="bg-purple-500 h-1.5 rounded-full" 
                                            style={{ width: `${(country.mediaBreakdown.nonPaid / country.revenue) * 100}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1 text-muted-foreground">
                                          <span>Baseline:</span>
                                          <span className="font-medium">${(country.mediaBreakdown.baseline / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5">
                                          <div 
                                            className="bg-gray-500 h-1.5 rounded-full" 
                                            style={{ width: `${(country.mediaBreakdown.baseline / country.revenue) * 100}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-3 border-t space-y-2">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                        <Target className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">Top Channel:</span>
                                      </div>
                                      <span className="text-sm">{country.topChannel}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">ROAS:</span>
                                      </div>
                                      <span className="text-sm">{country.roas.toFixed(1)}x</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                        <BarChart3 className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">CPA:</span>
                                      </div>
                                      <span className="text-sm">${country.cpa.toFixed(2)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-3 border-t">
                                    <div className="flex items-start gap-1.5">
                                      <Zap className="h-4 w-4 text-primary mt-0.5" />
                                      <div>
                                        <span className="text-sm font-medium">Key Insight:</span>
                                        <p className="text-sm text-muted-foreground mt-0.5">{country.insight}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg mt-4 flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div className="text-sm text-left">
                            <p className="font-medium mb-1">Regional Strategic Insights</p>
                            <p className="text-muted-foreground">
                              {selectedRegion === 'north-america' && "North America shows strong performance with the US leading revenue generation. The region demonstrates a balanced mix of paid and organic media, with a ROAS of 4.2x. Canada shows the highest growth rate at 15.7% with particular strength in social media campaigns."}
                              {selectedRegion === 'europe' && "European markets demonstrate steady growth averaging 9.8%, with Germany as the top performer. The region has a healthy ROAS of 3.8x with paid search being particularly effective. Spain shows exceptional growth potential with a 14.7% increase and the highest ROAS in the region at 4.3x."}
                              {selectedRegion === 'asia-pacific' && "Asia Pacific is the fastest growing region at 18.5%, led by China and India. This region uniquely excels with organic media approaches, achieving a collective ROAS of 4.5x. India stands out with explosive growth (31.4%) and the highest regional ROAS at 5.2x, particularly through mobile-first strategies."}
                              {selectedRegion === 'latin-america' && "Latin America demonstrates promising growth of 14.2%, with a strong preference for non-paid media channels. The region achieves an impressive 4.7x ROAS, with Colombia showing particularly strong performance at 5.1x ROAS through highly effective email marketing campaigns."}
                              {selectedRegion === 'middle-east' && "Middle East markets are steadily expanding with an 11.9% growth rate. The region relies heavily on paid media channels with a 3.9x ROAS overall. The UAE leads with 14.3% growth and particularly strong performance in the luxury segment, which drives 58% of regional revenue."}
                            </p>
                            
                            <div className="mt-3 space-y-2">
                              <p className="font-medium">Top Growth Opportunities:</p>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {regionData.growthOpportunities.map((opportunity, idx) => (
                                  <li key={idx}>{opportunity}</li>
                                ))}
                              </ul>
                            </div>
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
                        <h4 className="text-lg font-medium mb-3">Media Mix Performance</h4>
                        <div className="h-60 bg-muted/30 rounded-md p-4">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">Revenue by Media Type</span>
                                <span>${(regionData.totalRevenue / 1000000).toFixed(2)}M Total</span>
                              </div>
                              <div className="w-full flex h-8 rounded-md overflow-hidden">
                                <div 
                                  className="bg-blue-500" 
                                  style={{ width: '45%' }}
                                  title="Paid Media: $1.10M"
                                ></div>
                                <div 
                                  className="bg-green-500" 
                                  style={{ width: '30%' }}
                                  title="Organic Media: $0.74M"
                                ></div>
                                <div 
                                  className="bg-purple-500" 
                                  style={{ width: '15%' }}
                                  title="Non-Paid Media: $0.37M"
                                ></div>
                                <div 
                                  className="bg-gray-400" 
                                  style={{ width: '10%' }}
                                  title="Baseline: $0.25M"
                                ></div>
                              </div>
                              <div className="flex text-xs mt-2 justify-between">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-500 mr-1 rounded-sm"></div>
                                  <span>Paid (45%)</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
                                  <span>Organic (30%)</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-500 mr-1 rounded-sm"></div>
                                  <span>Non-Paid (15%)</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-gray-400 mr-1 rounded-sm"></div>
                                  <span>Baseline (10%)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h5 className="text-sm font-medium mb-2">Key Performance Indicators</h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <div className="text-xs text-muted-foreground">ROAS</div>
                                  <div className="text-lg font-bold">{regionData.roas.toFixed(1)}x</div>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <div className="text-xs text-muted-foreground">CAC</div>
                                  <div className="text-lg font-bold">${regionData.cac.toFixed(2)}</div>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <div className="text-xs text-muted-foreground">Conversion Rate</div>
                                  <div className="text-lg font-bold">{regionData.conversionRate.toFixed(1)}%</div>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <div className="text-xs text-muted-foreground">Seasonality</div>
                                  <div className="text-sm font-bold">{regionData.seasonality}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3">Media Performance</h4>
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
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {selectedRegion === 'latin-america' ? '↑ 5% vs global average' : '↓ 2% vs global average'}
                            </div>
                          </div>

                          <div className="p-4 bg-muted/30 rounded-md">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Baseline</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-3">
                              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ↓ 1% vs global average
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
                          {selectedRegion === 'north-america' && "North America has a balanced media mix with a slight emphasis on paid media channels (45% of revenue). Search advertising delivers the highest ROI across the region at 4.7x, with social and display ads providing strong secondary support. The region's incremental contribution is 32% above the global average, indicating efficient media allocation."}
                          {selectedRegion === 'europe' && "European markets demonstrate a preference for paid media (45% of revenue) with solid organic channel support (30%). Germany and UK lead in paid search performance, while southern European markets show stronger engagement with social media and content marketing. The region's blended ROAS of 3.8x is slightly below the global average but shows consistent improvement quarter-over-quarter."}
                          {selectedRegion === 'asia-pacific' && "Asia Pacific uniquely prioritizes organic media strategies, which comprise 37% of total regional revenue (7% above global average). This approach yields the highest regional ROAS at 4.5x. China's market shows exceptional content engagement metrics, while India demonstrates explosive growth through mobile-first strategies. The region's digital maturity varies significantly by country, requiring tailored approaches."}
                          {selectedRegion === 'latin-america' && "Latin America demonstrates the strongest performance in non-paid media channels (20% of revenue, 5% above global average), particularly email marketing and affiliate programs. Brazil leads the region with a 4.8x ROAS, while Colombia shows the highest growth potential with a 19.7% YoY increase. The region's overall conversion rate of 2.7% is below global benchmarks but shows consistent improvement."}
                          {selectedRegion === 'middle-east' && "Middle East markets rely heavily on paid media channels (48% of revenue), particularly search and display advertising. The UAE leads with luxury segment campaigns delivering a 4.1x ROAS, while Saudi Arabia shows strong growth in mobile engagement. The region has the highest CAC at $49.80 but demonstrates strong customer lifetime value metrics that justify the acquisition costs."}
                        </p>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium mb-1">Top Performing Channels</p>
                            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                              {regionData.topChannels.map((channel, idx) => (
                                <li key={idx}>{channel}</li>
                              ))}
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium mb-1">Seasonality Insights</p>
                            <p className="text-muted-foreground">
                              {regionData.seasonality}. 
                              {selectedRegion === 'north-america' && " Holiday season shows 45% higher conversion rates."}
                              {selectedRegion === 'europe' && " Winter campaigns yield 32% higher ROAS."}
                              {selectedRegion === 'asia-pacific' && " New Year promotions drive 28% revenue spike."}
                              {selectedRegion === 'latin-america' && " Summer campaigns underperform by 18%."}
                              {selectedRegion === 'middle-east' && " Ramadan period shows 37% higher engagement."}
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
                              <th className="text-right py-3 px-4">ROAS</th>
                              <th className="text-right py-3 px-4">CPA</th>
                              <th className="text-right py-3 px-4">Top Channel</th>
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
                                  <Badge className={getRoasColor(country.roas)}>
                                    {country.roas.toFixed(1)}x
                                  </Badge>
                                </td>
                                <td className="text-right py-3 px-4">
                                  ${country.cpa.toFixed(2)}
                                </td>
                                <td className="text-right py-3 px-4">
                                  {country.topChannel}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Media Performance Analysis */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" /> Channel Performance Analysis
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {selectedRegion === 'north-america' && "In North America, search advertising demonstrates the strongest performance with a 4.7x average ROAS across the region. Social media campaigns in Canada show exceptional growth of 15.7% YoY with video ads outperforming static ads by 27%. The US market continues to lead in mobile optimization with 32% higher conversion rates on mobile versus desktop."}
                            {selectedRegion === 'europe' && "Across Europe, channel performance varies significantly by country. Germany and UK excel with search and display ads generating 3.9x and 3.7x ROAS respectively. Southern European countries, particularly Spain, show stronger engagement with social media (4.3x ROAS) and content marketing initiatives. Video consumption metrics are 35% higher in France, suggesting potential for expanded video advertising."}
                            {selectedRegion === 'asia-pacific' && "Asia Pacific demonstrates strong divergence in channel effectiveness by country. China leads with social media campaigns yielding a 4.6x ROAS, while Japan shows exceptional search performance. South Korea's market is heavily mobile-focused with 92% of traffic from mobile devices. India represents the highest growth opportunity with a 5.2x ROAS and 31.4% YoY revenue growth."}
                            {selectedRegion === 'latin-america' && "Latin American markets demonstrate particular strength in email and affiliate marketing. Brazil's affiliate program drives 28% of conversions with a 4.8x ROAS, while Colombia shows 34% higher email open rates than global averages. Organic search is particularly effective in Chile, driving 42% of new customer acquisitions at a highly efficient cost structure."}
                            {selectedRegion === 'middle-east' && "Middle Eastern markets respond most effectively to search and display advertising. UAE's luxury segment campaigns deliver exceptional results, driving 58% of regional revenue. Video advertising in Israel shows strong engagement metrics, while Egypt represents an emerging opportunity for optimization with mobile traffic increasing 25% YoY despite lower overall conversion rates."}
                          </p>
                          
                          <h5 className="text-sm font-medium mb-2">Top Channel Performance</h5>
                          <div className="space-y-3">
                            {regionData.topChannels.map((channel, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`h-3 w-3 rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-blue-400' : 'bg-blue-300'}`}></div>
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm">
                                    <span>{channel}</span>
                                    <span className="font-medium">{idx === 0 ? '4.6x' : idx === 1 ? '4.2x' : '3.9x'} ROAS</span>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                    <div 
                                      className={`h-1.5 rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-blue-400' : 'bg-blue-300'}`}
                                      style={{ width: idx === 0 ? '85%' : idx === 1 ? '75%' : '65%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="text-base font-medium mb-3 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-primary" /> Geographic Insights
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {selectedRegion === 'north-america' && "North America represents a mature market with 68% market penetration, dominated by the US which contributes 75% of regional revenue. Consumer behavior varies significantly between the US, Canada, and Mexico, with the US showing the strongest preference for search advertising and Canada demonstrating exceptional social media engagement metrics."}
                            {selectedRegion === 'europe' && "European markets demonstrate 62% overall market penetration with significant variance between countries. Northern and Western European countries show higher digital maturity, while Southern and Eastern regions present greater growth opportunities. Germany, UK, and France collectively generate 76% of regional revenue, with emerging opportunities in Spain showing 14.7% growth."}
                            {selectedRegion === 'asia-pacific' && "The Asia Pacific region shows the highest growth rate globally at 18.5%, but with only 45% market penetration, indicating substantial opportunity for expansion. China dominates with 43% of regional revenue, while India represents the fastest-growing market at 31.4%. Mobile-first strategies are essential across the region, particularly in India (85% mobile traffic) and South Korea (92%)."}
                            {selectedRegion === 'latin-america' && "Latin America demonstrates 38% market penetration with 14.2% growth, highlighting significant expansion potential. Brazil accounts for 47% of regional revenue, with emerging opportunities in Colombia showing 19.7% growth. The region shows particular strength in email and affiliate marketing performance, with conversion rates improving steadily year-over-year."}
                            {selectedRegion === 'middle-east' && "Middle Eastern markets show 32% penetration with 11.9% growth and substantial opportunity for expansion. The UAE and Saudi Arabia dominate with 63% of regional revenue, with luxury segments driving 58% of UAE revenue. Mobile engagement is rapidly increasing region-wide with particular strength in emerging markets like Egypt where mobile traffic is growing 25% YoY."}
                          </p>
                          
                          <h5 className="text-sm font-medium mb-2">Revenue Distribution</h5>
                          <div className="w-full bg-muted rounded-full h-4 mb-3">
                            {regionData.countries.map((country, idx) => (
                              <div 
                                key={idx} 
                                className="h-4 inline-block"
                                style={{ 
                                  width: `${(country.revenue / regionData.totalRevenue) * 100}%`,
                                  backgroundColor: idx === 0 ? '#4361ee' : 
                                                  idx === 1 ? '#3a0ca3' : 
                                                  idx === 2 ? '#7209b7' : 
                                                  idx === 3 ? '#f72585' : '#4cc9f0'
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs">
                            {regionData.countries.map((country, idx) => (
                              <div key={idx} className="flex items-center">
                                <div 
                                  className="h-3 w-3 mr-1 rounded-sm"
                                  style={{ 
                                    backgroundColor: idx === 0 ? '#4361ee' : 
                                                    idx === 1 ? '#3a0ca3' : 
                                                    idx === 2 ? '#7209b7' : 
                                                    idx === 3 ? '#f72585' : '#4cc9f0'
                                  }}
                                ></div>
                                <span>{country.name} ({Math.round((country.revenue / regionData.totalRevenue) * 100)}%)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Strategic Recommendations */}
                      <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Strategic Recommendations</p>
                          <div className="mt-3 space-y-3">
                            <div>
                              <h5 className="text-sm font-medium mb-1 flex items-center gap-1.5">
                                <Target className="h-4 w-4 text-primary" /> Short-Term Opportunities (0-3 months)
                              </h5>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {selectedRegion === 'north-america' && (
                                  <>
                                    <li>Increase investment in search advertising in the US market with focus on mobile optimization</li>
                                    <li>Test expanded video ad formats in Canada to capitalize on 27% higher performance</li>
                                    <li>Develop specialized Spanish-language campaigns for the growing Mexican market</li>
                                  </>
                                )}
                                {selectedRegion === 'europe' && (
                                  <>
                                    <li>Optimize display advertising targeting for German and UK markets</li>
                                    <li>Expand social media presence in Spain to leverage 14.7% growth rate</li>
                                    <li>Test increased allocation to content marketing across Southern Europe</li>
                                  </>
                                )}
                                {selectedRegion === 'asia-pacific' && (
                                  <>
                                    <li>Prioritize mobile-first strategies across all markets, particularly India</li>
                                    <li>Expand organic content development for China with focus on local platforms</li>
                                    <li>Increase investment in South Korean mobile search campaigns</li>
                                  </>
                                )}
                                {selectedRegion === 'latin-america' && (
                                  <>
                                    <li>Expand affiliate program in Brazil to build on 28% conversion contribution</li>
                                    <li>Optimize email campaign segmentation for Colombian market</li>
                                    <li>Increase SEO investment in Chile to support 42% new customer acquisition</li>
                                  </>
                                )}
                                {selectedRegion === 'middle-east' && (
                                  <>
                                    <li>Increase video ad spend in UAE with focus on luxury segment</li>
                                    <li>Develop mobile-optimized campaigns for Saudi Arabian market</li>
                                    <li>Test expanded search advertising in Egyptian market</li>
                                  </>
                                )}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-1 flex items-center gap-1.5">
                                <TrendingUp className="h-4 w-4 text-primary" /> Long-Term Strategic Initiatives (3-12 months)
                              </h5>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {selectedRegion === 'north-america' && (
                                  <>
                                    <li>Develop comprehensive cross-device attribution model for US market</li>
                                    <li>Establish regional content hub to support Canadian social growth</li>
                                    <li>Implement advanced marketing automation for Mexican market to reverse negative growth trend</li>
                                  </>
                                )}
                                {selectedRegion === 'europe' && (
                                  <>
                                    <li>Create localized content strategy for each major European market</li>
                                    <li>Develop specialized video production capabilities for French market</li>
                                    <li>Build comprehensive mobile engagement strategy for Southern European markets</li>
                                  </>
                                )}
                                {selectedRegion === 'asia-pacific' && (
                                  <>
                                    <li>Establish specialized teams for Chinese platform optimization</li>
                                    <li>Develop comprehensive mobile app strategy for Indian market</li>
                                    <li>Create regionally-optimized content hubs for each major market</li>
                                  </>
                                )}
                                {selectedRegion === 'latin-america' && (
                                  <>
                                    <li>Build integrated affiliate and influencer platform for Brazilian market</li>
                                    <li>Develop advanced email personalization system for regional deployment</li>
                                    <li>Create comprehensive Spanish and Portuguese content strategy</li>
                                  </>
                                )}
                                {selectedRegion === 'middle-east' && (
                                  <>
                                    <li>Establish specialized luxury segment marketing division for UAE</li>
                                    <li>Develop comprehensive mobile strategy for emerging Egyptian market</li>
                                    <li>Create specialized content strategy for Saudi Arabian customer journey</li>
                                  </>
                                )}
                              </ul>
                            </div>
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
