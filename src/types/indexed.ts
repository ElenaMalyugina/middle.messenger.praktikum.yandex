export interface Indexed<T = unknown>{
  [key: string]: T | Indexed<T>;
};
