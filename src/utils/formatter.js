export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading')
  elements.forEach((el) => {
    if (calling) {
      el.style.opacity = '0.5'
      el.style.pointerEvents = 'none'
    } else {
      el.style.opacity = 'initial'
      el.style.pointerEvents = 'initial'
    }
  })
}

