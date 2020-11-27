export default class Login 
{
    constructor(){
        this.view = 'views/login.html';
    }

    login(){
        let firebaseConfig = {
            apiKey: "AIzaSyDczO8Q85ws1qT2hzmmXKhJtH3PRwg0qKs",
            authDomain: "projet-paris-d925a.firebaseapp.com",
            databaseURL: "https://projet-paris-d925a.firebaseio.com",
            projectId: "projet-paris-d925a",
            storageBucket: "projet-paris-d925a.appspot.com",
            messagingSenderId: "MESSAGING_ID",
            appId: "1:1042949890026:web:db764dbb55d9d2e88f1c93"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        };

        document.getElementById('btn-google').addEventListener("click", ()=>{ 
                     
        let provider = new firebase.auth.GoogleAuthProvider()
    
           //Exemple pop-up :
            firebase.auth().signInWithPopup(provider).then((user) => {   
                // vous pouvez récupérer le nom comme ceci :             
                alert(user.additionalUserInfo.profile.name)
            }).catch(function(error) {
                console.log(error)
            });
        });

    }
  

}