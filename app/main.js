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



/* 
 */