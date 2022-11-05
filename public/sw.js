const cacheName = "v1.1";

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          /* images */
          '/wp-content/uploads/sites/4/2020/07/msg91_logo.svg',

          /* fonts */
          '/wp-content/themes/muteweb/assets/fonts/ProximaNovaT-Thin.woff2',
          '/wp-content/themes/muteweb/assets/fonts/ProximaNova-Regular.woff2',
          '/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans.woff2',
          '/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Medium.woff2',
          '/wp-content/themes/muteweb/assets/fonts/SamsungSharpSans-Bold.woff',
          '/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.eot',
          '/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.woff2',
          '/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.woff',
          '/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.ttf',
          '/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.svg',
          
          /* css */
          '/wp-content/plugins/elementor/assets/lib/font-awesome/css/fontawesome.min.css'
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