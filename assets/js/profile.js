$(document).ready(function() {

    // Initialisations
    $('.tabs').tabs();
    $('.collapsible').collapsible();

    // Toaster d'incription
    if(sessionStorage.getItem("InscriptionStatus")) {
        M.toast({html: 'Inscription effectuée !'});
        sessionStorage.clear();
    }
        

});