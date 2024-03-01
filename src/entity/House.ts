export interface House {
    id: number;
    name: string;
    description: string;
    features: Feature[];
    pictures: Picture[];
    base_price: number;
    total_price?: any;
    base_persons_amount: number;
    max_persons_amount: number;
    price_per_extra_person: number;
}

export interface Picture {
    picture_path: string
}
  
export interface Feature {
    id:   number
    name: string
    icon: string
}
  