import app from './app.js';

import Home from '/controller/home.js';
import About from '/controller/about.js';
import Login from '/controller/login.js';
import Search from '/controller/search.js';



import config from './config.js';

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
   app.mvc.router =  new Router({
        mode: 'hash',
        page404: function (path) {
            console.log('"/' + path + '" Page not found');
        }
    });
     
    app.mvc.router.add('', () => app.mvc.dispatchRoute(new Home()));

    app.mvc.router.add('search', () => app.mvc.dispatchRoute(new Search()));

    app.mvc.router.add('about', () => app.mvc.dispatchRoute(new About()));

    app.mvc.router.add('login', () => app.mvc.dispatchRoute(new Login()));
    
     
    app.mvc.router.addUriListener();
    app.mvc.router.check();
}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
});

// --------------------------------------------------------------------------------------------------------------------
//  PWS
// --------------------------------------------------------------------------------------------------------------------
if (navigator.serviceWorker !== undefined) {
    // Installation du service worker 
    navigator.serviceWorker.register('../service-worker.js').then(() => console.log('Service Worker Enregistré'));

    let deferredPrompt;
    let btnPWA = document.getElementById('btnPWA');

    /*
        Écoute de l'événement "beforeinstallprompt" :
        Cet événément est déclanché automatiquement par le navigateur lorsqu'il détecte
        que l'utilisateur est suffisamment engagé avec cette application et qu'il pourrait
        être tenté de vouloir l'installer sur son écran d'accueil.
        (En mode développement, on peut déclancher manuellement cet événement en cliquant sur "Add to homescreen" dans l'onglet "Application > Manifest" de l'inspecteur d'éléments)

        À l'origine, cette bannière (ou prompt en Anglais) pouvait s'afficher nativement dans le navigateur,
        mais depuis Chrome 67, il faut le faire manuellement et créer sa propre bannière en HTML.
        Ici, nous afficherons un bouton dans la navbar (c.f. le "index.html" modifié)
    */

    window.addEventListener('beforeinstallprompt', (e) => {
        // Empêche Chrome 67 et les versions précédentes d'afficher la bannière native
        e.preventDefault();
        // Sauvegarde de l'événement dans une variable, afin de pouvoir l'utiliser plus tard
        deferredPrompt = e;
        // Affichage du bouton dans la navbar
        btnPWA.classList.add('appear'); // Ajoute la classe CSS "appear" définie dans 'main.css' pour afficher le bouton de la navbar
    });
        

    /*
        Si le visiteur clique sur le bouton d'ajout à l'écran d'accueil,
        on utilise l'événement stocké précédemment dans la variable "deferredPrompt"
        afin d'afficher la boîte de dialogue qui lui permettra de créer un raccourci
        sur son écran d'accueil
    */
    btnPWA.addEventListener('click', (e) => {
        
        // Affiche la boîte de dialogue.
        deferredPrompt.prompt();

        // On peut réagir au choix du visiteur...
        deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('L\'utilisateur a accepté d\'ajouter cette application sur son écran d\'accueil!');
            } else {
                console.warn('L\'utilisateur a refusé l\'ajout de cette application sur son écran d\'accueil.');
            }

            // Efface l'événement précédemment stocké (à ce stade, il ne sert plus à rien)
            deferredPrompt = null;
            
            // Et ici, quelque-soit le cas, on choisit de supprimer le bouton d'ajout du DOM, supposant qu'il n'aura plus d'utilité dans l'interface
            btnPWA.parentNode.removeChild(btnPWA);
        });
    });
}
