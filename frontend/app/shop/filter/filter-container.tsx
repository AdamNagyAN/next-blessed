'use client';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import SelectFilter from '@/app/shop/filter/select-filter';
import { Controller, useForm } from 'react-hook-form';
import { StrapiAllWrapper } from '@/types/strapi';
import { CategoryDto } from '@/types/Category.dto';
import { Button } from '@/components/ui/button';

interface FilterContainerProps {
  categories: StrapiAllWrapper<CategoryDto>;
}

function FilterContainer({ categories }: FilterContainerProps) {
  const { control, handleSubmit } = useForm();

  const transformdCategories = React.useMemo(
    () =>
      categories.data.map((category) => ({
        value: category.attributes.name,
        label: category.attributes.name
      })),
    [categories]
  );

  const onFilter = () => {};

  return (
    <form onSubmit={handleSubmit(onFilter)}>
      <div className="grid grid-cols-3 w-full gap-8 mb-8 border-1 border p-8 rounded-lg">
        <div>
          <Controller
            name="subcategory"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectFilter onChange={onChange} value={value} options={transformdCategories} />
            )}
          />
        </div>
        <div>
          <h3 className="font-bold uppercase mb-4">Price</h3>
          <Slider defaultValue={[25, 75]} />
        </div>
        <div>
          <h3 className="font-bold uppercase mb-4">Size</h3>
        </div>
        <div className={'col-span-3 flex justify-end'}>
          <Button type="submit">Filter</Button>
        </div>
      </div>
    </form>
  );
}

export default FilterContainer;
