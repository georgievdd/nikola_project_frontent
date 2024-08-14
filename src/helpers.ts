import {ApiError} from 'entity/Error'

export function getDateFromKey(key: string) {
  const from = key.split('-').map((e) => +e)
  return new Date(from[2], from[1] - 1, from[0])
}
export const getImageUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`
}

export function waitForNextTask() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

export class JSONCookie {
  private data: Record<string, string> = {}
  constructor(str: string) {
    str.split(';').forEach((pair) => {
      const [key, value] = pair.trim().split('=')
      this.data[key] = value
    })
  }
  get(key: string) {
    return this.data[key]
  }
}

export const normalize = (v: number) => (v > 1 ? 1 / v : v)

export const importStyles =
  (styles: Record<string, string>) => (strings: TemplateStringsArray) =>
    strings[0]
      .split(' ')
      .map((e) => styles[e] || '')
      .join(' ')

export const isApiError = (data: any): data is ApiError => {
  return 'detail' in data
}

export type Setter<T> = (v: T) => void

export const scrollToCenter = (
  element: HTMLElement,
  container: HTMLElement,
) => {
  const containerHeight = container.clientHeight
  const elementHeight = element.clientHeight
  const elementTop = element.offsetTop
  const scrollPosition = elementTop - containerHeight / 2 + elementHeight / 2

  container.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  })
}

export const getVisibleElements = (
  container: HTMLElement,
  elements: NodeListOf<Element>,
  e: number = 100,
) => {
  const containerRect = container.getBoundingClientRect()
  const visibleElements: HTMLElement[] = []
  elements.forEach((element) => {
    const elementRect = element.getBoundingClientRect()
    if (
      elementRect.top + e >= containerRect.top &&
      elementRect.bottom - e <= containerRect.bottom
    ) {
      visibleElements.push(element as HTMLElement)
    }
  })
  return visibleElements
}
