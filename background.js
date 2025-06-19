// @ts-check

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch(request.url, {
    credentials: 'omit',
    mode: 'cors',
    headers: {
      'User-Agent': navigator.userAgent,
      Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Language': navigator.language,
      Referer: 'https://www.instagram.com/'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetch failed')
      }
      if (!response.headers.get('Content-Type')?.startsWith('image/')) {
        throw new Error('Not an image')
      }
      if (response.headers.get('Content-Length') === '0') {
        throw new Error('Empty image')
      }
      return response.blob()
    })
    .then((blob) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        sendResponse({ dataUri: reader.result })
      }
      reader.readAsDataURL(blob)
    })
    .catch(() => {
      sendResponse({ dataUri: null })
    })

  return true
})
