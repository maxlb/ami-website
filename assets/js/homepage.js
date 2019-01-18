var openModal = function(){
    
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
       
        // On envoie les données au serveur
        $.post( '/login', userToConnect, function( data ) {
            if(!data.error) {
                // Connection si ok
                window.location.href = '/logged';
            } else {
                // Message d'erreur sinon
                $('#error').text(data.error);
            }
        })
       
      });
  }

  