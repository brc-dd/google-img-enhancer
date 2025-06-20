// @ts-check

/** @param {string} url */
function getShortcode(url) {
  try {
    const u = new URL(url)
    if (!/(?:^|\.)instagram\.com$/.test(u.hostname)) return null
    const match = u.pathname.match(/\/(?:p|reel)\/([^\/]+)/)
    // we can also match /tv/ for IGTV posts, but
    // 1) they always differ from the image shown in google search results
    // 2) their media dimensions are different, and look worse in results
    return match ? match[1] : null
  } catch {
    return null
  }
}

function upgradeInstagramImages() {
  const images = document.querySelectorAll(
    'a[href*="instagram.com"] img:not([src*=favicon]):not([src^="data:"])'
  )

  images.forEach((img) => {
    const postUrl = img.closest('a')?.href
    if (!postUrl) return

    const shortcode = getShortcode(postUrl)
    if (!shortcode) return

    const hdUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`

    chrome.runtime.sendMessage({ url: hdUrl }, (response) => {
      if (!response?.dataUri) return
      img.src = response.dataUri
    })
  })
}

upgradeInstagramImages()

const observer = new MutationObserver(() => upgradeInstagramImages())
observer.observe(document.body, { childList: true, subtree: true })
