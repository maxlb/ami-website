var openModal = function() {
    
    // Initialisation de la modale
    let elem = document.querySelector('#modal1');
    let instance = M.Modal.init(elem);

    // On désactive le loader
    $('#btn-content-ko').hide();
    $('#btn-content-ok').show();

    // Ouverture de la modale
    instance.open();

    // Formulaire de la modale
    $("#formConnexion").submit(function( event ) {
        
        // On active le loader
        $('#btn-content-ok').hide();
        $('#btn-content-ko').show();

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
                // On désactive le loader
                $('#btn-content-ko').hide();
                $('#btn-content-ok').show();

                // On affiche un message d'erreur
                $('#error').text('Une erreur est survenue, veuillez réessayer.');
            } else {
                var msg = {
                    user: userToConnect,
                    _csrf: data._csrf
                };
                  
                // On envoie les données au serveur
                $.post( '/login', msg, function( data ) {
                    if(!data.error) {
                        // On redirige vers le dashboard
                        window.location.href = '/logged';
                    } else {
                        // On désactive le loader
                        $('#btn-content-ko').hide();
                        $('#btn-content-ok').show();

                        // On affiche un message d'erreur
                        $('#error').text(data.error);
                    }
                });
            }
        });
       
    });
}

  