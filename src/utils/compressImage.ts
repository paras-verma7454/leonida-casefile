const MAX_WIDTH = 1200
const JPEG_QUALITY = 0.8

export function compressImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      if (img.width <= MAX_WIDTH) {
        resolve(dataUrl)
        return
      }

      const scale = MAX_WIDTH / img.width
      const canvas = document.createElement('canvas')
      canvas.width = MAX_WIDTH
      canvas.height = img.height * scale

      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}
