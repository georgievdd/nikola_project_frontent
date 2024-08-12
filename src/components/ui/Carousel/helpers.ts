export const scrollToCenter = (
  element: HTMLLIElement,
  container: HTMLUListElement,
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
