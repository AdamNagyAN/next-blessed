import * as yup from 'yup';

export interface FilterValues {
  'sub-categories': string[];
  price: {
    from?: number;
    to?: number;
  };
  sizes: string[];
}

export const filterSchema = (): yup.ObjectSchema<FilterValues> => {
  return yup.object().shape({
    'sub-categories': yup
      .array()
      .of(yup.string().required())
      .required(),
    price: yup
      .object()
      .shape({
        from: yup.number().optional(),
        to: yup.number().optional()
      })
      .required(),
    sizes: yup.array().of(yup.string().required()).required()
  });
};
