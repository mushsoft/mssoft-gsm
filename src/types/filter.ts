import { ProductCondition } from './product';

export interface FilterState {
  searchQuery: string;
  selectedBrands: string[];
  selectedConditions: ProductCondition[];
  maxPriceUgx: number;
  verifiedOnly: boolean;
}