
import React, { useState } from 'react';
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
import { Map, LineChart, BarChartBig } from 'lucide-react';

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
        {selectedProduct !== 'all' && (
          <div className="bg-blue-50 p-4 rounded-md text-sm">
            Showing data for: <span className="font-medium">{selectedProduct === 'all' ? 'All Products' : selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)}</span>
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

              <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center">
                {loading ? (
                  <p>Loading map data...</p>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-xl font-semibold mb-2">Geographic Map View</p>
                    <p className="text-sm text-muted-foreground">
                      Interactive map showing media performance for{' '}
                      {selectedMediaType === 'all' ? 'all media types' : selectedMediaType} in {selectedRegion.replace('-', ' ')} 
                      {selectedProduct !== 'all' ? ` for ${selectedProduct}` : ''}
                    </p>
                    <p className="mt-4 text-sm text-blue-500">Interactive map visualization would appear here</p>
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

              <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center">
                {loading ? (
                  <p>Loading overview data...</p>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-xl font-semibold mb-2">Regional Overview</p>
                    <p className="text-sm text-muted-foreground">
                      Summary metrics and comparative charts for {selectedRegion.replace('-', ' ')}
                      {selectedProduct !== 'all' ? ` - ${selectedProduct}` : ''}
                    </p>
                    <p className="mt-4 text-sm text-blue-500">Regional comparison charts would appear here</p>
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

              <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center">
                {loading ? (
                  <p>Loading detailed data...</p>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-xl font-semibold mb-2">Media Type Details</p>
                    <p className="text-sm text-muted-foreground">
                      Detailed metrics for {selectedMediaType === 'all' ? 'all media types' : selectedMediaType} in {selectedRegion.replace('-', ' ')}
                      {selectedProduct !== 'all' ? ` for ${selectedProduct}` : ''}
                    </p>
                    <p className="mt-4 text-sm text-blue-500">Detailed media breakdown data would appear here</p>
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
