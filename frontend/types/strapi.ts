export interface StrapiAllWrapper<TData> {
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

export interface StrapiOneWrapper<TData> {
  data: StrapiItem<TData>;
  meta: {};
}

export interface StrapiItem<TData> {
  id: number;
  attributes: TData;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}
