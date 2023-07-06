export interface StrapiWrapper<TData> {
  data: StrapiItem<TData>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem<TData> {
  id: string;
  attributes: TData;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}
