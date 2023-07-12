'use client';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import SelectFilter from '@/app/shop/filter/select-filter';
import { Controller, useForm } from 'react-hook-form';
import { StrapiAllWrapper } from '@/types/strapi';
import { CategoryDto } from '@/types/Category.dto';
import { Button } from '@/components/ui/button';
import {
  filterSchema,
  FilterValues
} from '@/app/shop/filter/filter.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { SearchParams } from '@/app/shop/types/SearchParams';

interface FilterContainerProps {
  categories: StrapiAllWrapper<CategoryDto>;
  searchParams: SearchParams;
}

const DEFAULT_MAX_PRICE = 39999;

function FilterContainer({
  categories,
  searchParams
}: FilterContainerProps) {
  const path = usePathname();
  const router = useRouter();
  const priceFromSearchParams: number[] = searchParams.price
    ? JSON.parse(searchParams.price)
    : [0, DEFAULT_MAX_PRICE];
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FilterValues>({
    resolver: yupResolver(filterSchema()),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      'sub-categories': searchParams['sub-categories']
        ? JSON.parse(searchParams['sub-categories'])
        : [],
      price: {
        from: priceFromSearchParams[0],
        to: priceFromSearchParams[1]
      },
      sizes: []
    }
  });

  console.log(errors);

  const transformedCategories = React.useMemo(
    () =>
      categories.data.map((category) => ({
        value: category.attributes.name,
        label: category.attributes.name
      })),
    [categories]
  );

  const onFilter = (data: FilterValues) => {
    console.log(data);
    const searchParams = new URLSearchParams({
      'sub-categories': JSON.stringify(data['sub-categories']),
      price: JSON.stringify([data.price.from, data.price.to])
    });
    console.log(searchParams.toString());
    router.push(`${path}?${searchParams}`);
  };

  const watchPrice = watch('price');
  console.log(watchPrice);

  return (
    <form onSubmit={handleSubmit(onFilter)}>
      <div className="grid grid-cols-3 w-full gap-8 mb-8 border-1 border p-8 rounded-lg">
        <div>
          <Controller
            name="sub-categories"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectFilter
                onChange={onChange}
                value={value}
                options={transformedCategories}
              />
            )}
          />
        </div>
        <div>
          <h3 className="font-bold uppercase mb-4">Price</h3>
          <Controller
            name="price"
            control={control}
            render={() => {
              return (
                <Slider
                  onValueChange={(value) => {
                    setValue('price.from', value[0]);
                    setValue('price.to', value[1]);
                  }}
                  max={DEFAULT_MAX_PRICE}
                  value={[
                    watchPrice?.from ?? 0,
                    watchPrice?.to ?? DEFAULT_MAX_PRICE
                  ]}
                />
              );
            }}
          />
          <div className="flex gap-4 mt-6">
            <Controller
              name="price.from"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    type="number"
                    placeholder="from"
                    {...field}
                    value={watchPrice.from ?? 0}
                  />
                );
              }}
            />
            <Controller
              name="price.to"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    type="number"
                    placeholder="from"
                    {...field}
                    value={watchPrice.to ?? DEFAULT_MAX_PRICE}
                  />
                );
              }}
            />
          </div>
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
