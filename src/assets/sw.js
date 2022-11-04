const cacheName = "v1";

// Install a service worker
window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    // service workers not supported 😣
    return
  }

  navigator.serviceWorker.register('/sw.js').then(
    () => {
      // registered! 👍🏼
    },
    err => {
      console.error('SW registration failed! 😱', err)
    }
  )
})

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/ProximaNovaT-Thin.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/ProximaNova-Regular.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Medium.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Bold.woff'          
        ])
      )
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        //we found an entry in the cache!
        return response
      }
      return fetch(event.request)
    })
  )
})