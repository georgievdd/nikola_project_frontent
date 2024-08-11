export interface ApiError {
  detail: string
}

export const ApiErrorNotFound: ApiError = {
  detail: 'Not found.',
}
