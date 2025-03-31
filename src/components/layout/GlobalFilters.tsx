
import React from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { Package } from 'lucide-react';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();

  return (
    <div className="ml-auto flex items-center gap-3">
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
