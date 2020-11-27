const cachedFiles = [
	'/',
    'index.html',
    'app/app.js',
    'app/config.js',
    'app/main.js',
    'controllers/About.js',
    'controllers/Home.js',
    'controllers/Login.js',
    'controllers/Search.js',
    'models/ParisEvents.js',
    'static/css/main.css',
    'static/images/subtle-grey.png',
    'views/about.html',
    'views/home.html',
    'views/login.html',
    'views/search.html',
    'node_modules/vanilla-router/dist/vanilla-router.js',
];

// ajoutez les différentes librairies que vous utilisez (jquery, bootstrap, firebase, ...)
const cachedLibs = [
    "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js",
    "https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js",
    "https://www.gstatic.com/firebasejs/5.9.0/firebase.js",
    "https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js",
    "https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js",
    "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/flat-ui/2.3.0/css/flat-ui.min.css",
    "https://fonts.googleapis.com/css?family=Poiret+One",
];

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open('events-cache-static').then(cache => {
            return cache.addAll(cachedFiles)
                        .then(() => Promise.all(cachedLibs.map(libUrl => {
                            const req = new Request(libUrl, { mode: 'no-cors' });
                            fetch(req).then(res => cache.put(req, res));
                        })))
                        .then(() => self.skipWaiting())
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .delete('events-cache-dynamic') // Efface le cache dynamique
            .then(() => self.clients.claim()) // On force ce service worker à devenir le service worker actif chez le client (assez généralement, c'est ce qu'on voudra faire dans une PWA)
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
    	caches.match(event.request)
        	.then(response => {
                // Si la "response" contient quelque-chose, on la retourne, sinon on va la fetch() sur le réseau
                return response || fetch(event.request)
                                    .then(responseFetch => {
                                        caches.open('events-cache-dynamic')
                                                .then(cache => cache.put(event.request, responseFetch));
                                        return responseFetch.clone()
                                    });
            })
            .catch(console.error)
    );
});






