
import React from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { ShoppingBag } from 'lucide-react';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();

  return (
    <div className="ml-auto flex items-center gap-2">
      <FilterDropdown 
        options={productOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
        icon={<ShoppingBag className="h-4 w-4 mr-2" />}
        label="Product"
      />
    </div>
  );
}
