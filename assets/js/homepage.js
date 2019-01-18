var openModal = function() {
    
    // Initialisation de la modale
    let elem = document.querySelector('#modal1');
    let instance = M.Modal.init(elem);

    // Ouverture de la modale
    instance.open();

    // Formulaire de la modale
    $("#formConnexion").submit(function( event ) {
    
        // On stop la soumission habituelle
        event.preventDefault();
       
        // On récupère l'utilisateur
        var userToConnect = {
            mail: $('#mail')[0].value,
            password: $('#password')[0].value
        }
       
        // Récupération du token CSRF
        $.get("/csrfToken", function (data, jwres) {
            if (jwres != 'success') { 
                $('#error').text('Une erreur est survenue, veuillez réessayer.');
            } else {
                var msg = {
                    user: userToConnect,
                    _csrf: data._csrf
                };
                  
                // On envoie les données au serveur
                $.post( '/login', msg, function( data ) {
                    if(!data.error) {
                        // Connection si ok
                        window.location.href = '/logged';
                    } else {
                        // Message d'erreur sinon
                        $('#error').text(data.error);
                    }
                });
            }
        });
       
    });
}

  