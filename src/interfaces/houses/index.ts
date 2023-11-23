export interface IHouse {
  id: number;
  name: string;
  description: string;
  features: IFeature[];
  pictures: string[];
  base_price: number;
  total_price?: any;
  base_persons_amount: number;
  max_persons_amount: number;
  price_per_extra_person: number;
}

export interface IFeature {
  id: number;
  name: string;
  icon: string;
}

export interface IHouseQueryRequest {
  max_persons_amount?: number;
  check_in_date?: string;
  check_out_date?: string;
}