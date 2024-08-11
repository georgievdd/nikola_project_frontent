import {Service} from 'entity/Service'

import {FETCH_SERVICES} from '../endpoints'

export async function getServices(): Promise<Service[]> {
  return fetch(FETCH_SERVICES, {
    next: {
      revalidate: 10,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((e) => [])
}
