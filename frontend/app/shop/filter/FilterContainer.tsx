'use client';
import React from 'react';
import { Combobox } from '@/components/ui/combobox';
import { Slider } from '@/components/ui/slider';

function FilterContainer() {
  return (
    <>
      <div className="flex-1">
        <h3 className="font-bold uppercase mb-4">Subcategory</h3>
        <Combobox
          options={[
            { value: 'test', label: 'test' },
            { value: 'test2', label: 'test2' }
          ]}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-bold uppercase mb-4">Price</h3>
        <Slider defaultValue={[25, 75]} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold uppercase mb-4">Size</h3>
        <Combobox
          options={[
            { value: 'test', label: 'test' },
            { value: 'test2', label: 'test2' }
          ]}
        />
      </div>
    </>
  );
}

export default FilterContainer;
