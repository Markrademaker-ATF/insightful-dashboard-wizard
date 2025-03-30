
import React from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { Package } from 'lucide-react';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();

  return (
    <div className="ml-auto flex items-center gap-2">
      <FilterDropdown 
        options={productOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
        icon={<Package className="h-5 w-5 mr-2 text-primary" />}
        label="Product"
        className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary-foreground"
      />
    </div>
  );
}
