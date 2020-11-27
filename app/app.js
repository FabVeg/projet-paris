let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
       router: null,
       dispatchRoute : (controller) => {
           if(typeof controller.view == 'undefined')
            {
                throw new Error('Aucune vue de déclarée !')
            }
            fetch(controller.view)
            .then(response => response.text())
            .then((html) => {
                document.querySelector('main.container').innerHTML = html;

                if(typeof controller.executeHttpRequest == "function"){
                    controller.executeHttpRequest();
                }

                if(typeof controller.login == "function"){
                    controller.login();
                }
             }); 
       }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;