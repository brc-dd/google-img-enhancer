// @ts-check

const igPicRE = /^https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+\/?$/

function upgradeInstagramImages() {
  const images = document.querySelectorAll(
    'a[href^="https://www.instagram.com/"] img:not([src*=favicon]):not([src^="data:"])'
  )

  images.forEach((img) => {
    const postUrl = img.closest('a')?.href
    if (!postUrl || !igPicRE.test(postUrl)) return

    const hdUrl = new URL('./media/?size=l', postUrl).href

    chrome.runtime.sendMessage({ url: hdUrl }, (response) => {
      if (!response?.dataUri) return
      img.src = response.dataUri
    })
  })
}

upgradeInstagramImages()

const observer = new MutationObserver(() => upgradeInstagramImages())
observer.observe(document.body, { childList: true, subtree: true })
