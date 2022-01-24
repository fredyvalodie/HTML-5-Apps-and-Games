// manifest="manifest.appcache"
    
const urls = [
    "https://lacaza.online/test0/",
    "instructions.png",
    "index.html",
    "rapide.html",
    "style.css",
    "export.js",
    "rapide.js",
    "app.js"];


    
    // On écoute l'évènement install pour effectuer les actions de démarrage
    self.addEventListener("install", function(event) {
        // Ici on utilise waitUntil qui attends une promesse pour valider l'installation
        event.waitUntil(
        caches.open('myCache').then(cache => {
            // Cache opened adding data 
            cache.addAll(urls).then(resp => {
                //all requests were cached
                console.log("All data cached");
                console.log(resp);
            })
        })
        )
    });
    
    // On indique que pour chaque requêtes, si cela match nos URLs de cache défini plus haut, alors on servira le cache plutôt que d'effectuer la vrai requête par le réseau.
    self.addEventListener('fetch', function(event) {
        event.respondWith(
        caches.match(event.request)
            .then(function(response) {
            // Cache HIT, on retourne la réponse en cache.
            if (!navigator.online) {
                return response;
            }
            
            // Sinon on effectue la requête réellement et on retourne son contenu.
            return fetch(event.request);
            })
        );
    });


/*
// On écoute l'évènement install pour effectuer les actions de démarrage
self.addEventListener("install", function(event) {
  // Ici on utilise waitUntil qui attends une promesse pour valider l'installation
  event.waitUntil(
    caches.open('myCache').then(cache => {
        // Cache opened adding data 
        cache.addAll(urls).then(resp => {
            //all requests were cached
            console.log("All data cached");
            console.log(resp);
        })
  );
});

// On indique que pour chaque requêtes, si cela match nos URLs de cache défini plus haut, alors on servira le cache plutôt que d'effectuer la vrai requête par le réseau.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache HIT, on retourne la réponse en cache.
        if (response) {
          return response;
        }
        
        // Sinon on effectue la requête réellement et on retourne son contenu.
        return fetch(event.request);
      }
    )
  );
});
 */


// Retreive data.json from the server and store the response.
//cache.add('/data.json');

/*cache.addAll(urls).then(function(resp){
    console.log(resp);
});*/

/// retrieving data
/*
const cacheName = 'my-website-cache'
const url = '/resource'
caches.open(cacheName).then(cache => {
  cache.match(url).then(item => {
    console.log(item)
  }
})
*/
/*const options = {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true
  };

const response0 = await cache.match("https://lacaza.online/test0/index.html", options);
const response1 = await cache.match("https://lacaza.online/test0/rapide.html", options);
const response2 = await cache.match("https://lacaza.online/test0/style.css", options);
const response3 = await cache.match("https://lacaza.online/test0/app.js", options);*/