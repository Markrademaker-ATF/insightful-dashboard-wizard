
import React, { useState } from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { useGeoFilter } from '@/contexts/GeoFilterContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { Package, Globe, Calendar } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();
  const { selectedGeo, setSelectedGeo, geoOptions } = useGeoFilter();
  const { selectedDateRange, setSelectedDateRange, dateRangeOptions } = useDateRange();

  // Map date range options to numerical values for the slider
  const dateRangeValues = {
    '7d': 0,
    '30d': 1,
    '90d': 2,
    '6m': 3,
    '1y': 4
  };

  // Get label for the current date range
  const getCurrentDateRangeLabel = () => {
    const option = dateRangeOptions.find(option => option.value === selectedDateRange);
    return option ? option.label : 'Select Period';
  };

  // Handle slider value change
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    const dateRangeKey = Object.keys(dateRangeValues).find(
      key => dateRangeValues[key as keyof typeof dateRangeValues] === newValue
    );
    
    if (dateRangeKey) {
      setSelectedDateRange(dateRangeKey);
    }
  };

  return (
    <div className="ml-auto flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {getCurrentDateRangeLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Select Time Period</h4>
            <div className="pt-4">
              <Slider
                defaultValue={[dateRangeValues[selectedDateRange as keyof typeof dateRangeValues]]}
                max={4}
                step={1}
                onValueChange={handleSliderChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>7 Days</span>
              <span>30 Days</span>
              <span>90 Days</span>
              <span>6 Months</span>
              <span>1 Year</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <FilterDropdown 
        options={geoOptions}
        value={selectedGeo}
        onChange={setSelectedGeo}
        icon={<Globe className="h-4 w-4 mr-2" />}
        label="Region"
        className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
      />
      
      <FilterDropdown 
        options={productOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
        icon={<Package className="h-4 w-4 mr-2" />}
        label="Product"
        className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white border-none shadow-sm"
      />
    </div>
  );
}
