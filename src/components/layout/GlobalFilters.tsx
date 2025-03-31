
import React from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { useGeoFilter } from '@/contexts/GeoFilterContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { Package, Globe, Calendar } from 'lucide-react';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();
  const { selectedGeo, setSelectedGeo, geoOptions } = useGeoFilter();
  const { selectedDateRange, setSelectedDateRange, dateRangeOptions } = useDateRange();

  return (
    <div className="ml-auto flex items-center gap-3">
      <FilterDropdown 
        options={dateRangeOptions}
        value={selectedDateRange}
        onChange={setSelectedDateRange}
        icon={<Calendar className="h-4 w-4 mr-2" />}
        label="Period"
        className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
      />
      
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
