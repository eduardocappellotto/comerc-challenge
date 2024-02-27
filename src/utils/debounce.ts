export const debounce = (func: (...args: any[]) => any, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
