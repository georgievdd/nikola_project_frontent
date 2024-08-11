export interface House {
  id: number
  name: string
  description: string
  features: Feature[]
  pictures: Picture[]
  base_price: number
  total_price?: any
  base_persons_amount: number
  max_persons_amount: number
  price_per_extra_person: number
}

export interface Picture {
  picture: string
  width: number
  height: number
}

export interface Feature {
  id: number
  name: string
  withoutPrefix?: boolean
  picture: string
}

export interface HouseOptions {
  base_persons_amount: number
  max_persons_amount: number
  price_per_extra_person: number
  check_in_times: {
    default: string
    times: string[]
  }
  check_out_times: {
    default: string
    times: string[]
  }
}
