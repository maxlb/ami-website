$(document).ready(function(){

    //get it if InscriptionStatus key found
    if(sessionStorage.getItem("InscriptionStatus")) {
        M.toast({html: 'Inscription effectuée !'});
        sessionStorage.clear();
    }
    
});