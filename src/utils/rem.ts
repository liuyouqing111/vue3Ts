const baseSize = 100
const minClient = 1440
;(() => {
  const setRem = () => {
    const clientWidth = document.documentElement.clientWidth
    let scale = clientWidth / 1920
    if (scale < minClient / 1920) {
      scale = minClient / 1920
    }
    document.documentElement.style.fontSize = baseSize * scale + 'px'
  }
  setRem()
  window.onresize = setRem
})()

export {}
