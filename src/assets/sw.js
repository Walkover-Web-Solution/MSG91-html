const cacheName = "v1";

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          /* images */
          'https://msg91.com/wp-content/uploads/sites/4/2020/07/msg91_logo.svg',

          /* fonts */
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/ProximaNovaT-Thin.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/ProximaNova-Regular.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Medium.woff2',
          'https://msg91.com/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Bold.woff',
          
          /* css */
          '/wp-content/plugins/elementor/assets/lib/font-awesome/css/fontawesome.min.css?ver=5.15.3'
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