export type Nullable<T> = T | null | undefined;

export type ApiResponse = {
  error: Nullable<number>;
  errorText: Nullable<string>;
  data: any;
  token: Nullable<string>;
  info: Nullable<string>;
};
