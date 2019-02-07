/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login(req, res) {

      var userAsked = req.allParams().user;

      User
        .findOne({ mail: userAsked.mail })
        .decrypt()
        .then(async function(user) {

          /* Utilisteur inconnu */
          if (!user || user.password !== userAsked.password) {
            sails.log.warn(`UserController - login - Tentative de connexion de ${userAsked.mail}.`);
            return res.json({ error: 'Identifiant ou mot de passe invalide.' });

          /* Utilisteur reconnu */
          }  else {

            /* Date du jour */
            var ajd = new Date();
            ajd.setHours(0, 0, 0, 0);

            /* État du cookie */ 
            var cookie = sails.helpers.getCookie(req);
            var isConnected = await sails.helpers
                                    .isAlreadyConnected(req)
                                    .intercept( () => { 
                                      sails.log.error(`UserController - login - ERREUR : Impossible de récupérer le cookie.`); 
                                      throw 'Erreur à la lecture du cookie.'
                                    });

            /* Aucune session : création d'une ligne dans la table d'Audit */
            if (isConnected == -1) {
              
              var connectedUser = { date: ajd, 
                                    peutSeConnecter: true, 
                                    idSession: cookie, 
                                    user: user.id };
              await Audit
                      .create(connectedUser)
                      .fetch()
                      .then(audit => {
                        sails.log.info(`UserController - login - Connexion de ${userAsked.mail} (Session ${audit.idSession}).`);
                        return res.json({ user: userAsked.mail });
                      })
                      .catch(error => {  
                        sails.log.error(`UserController - login - ERREUR : Impossible d'ajouter une ligne d'Audit - ${error}`); 
                        return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                      });

            /* Une session mais déconnectée : mise à jour d'une ligne dans la table d'Audit */          
            } else if (isConnected == 0) {
              await Audit
                      .updateOne({ date: { '>=': ajd }, idSession: cookie })
                      .set({ peutSeConnecter: true })
                      .then(audit => {
                        sails.log.info(`UserController - login - Reconnexion de ${userAsked.mail} (Session ${audit.idSession}).`);
                        return res.json({ user: userAsked.mail });
                      })
                      .catch(error => {  
                        sails.log.error(`UserController - login - ERREUR : Impossible de mettre à jour une ligne d'Audit - ${error}`); 
                        return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                      });

            /* Une session connectée : rien à faire */
            } else if (isConnected == 1) {
              return res.json({ user: userAsked.mail });
            }

          }

        })
        .catch(err => {  
          sails.log.error(`UserController - login - Erreur lors de la récupération de l'utilisateur ${userAsked.mail}. ---> ${err}`);
          return res.json({ error: `Un problème est survenu, veuillez réessayer.` });
        });

    },

    logout(req, res) {
      /* Cookie */ 
      var cookie = sails.helpers.getCookie(req);

      /* Date du jour */
      var ajd = new Date();
      ajd.setHours(0, 0, 0, 0);

      Audit
        .updateOne({ date: { '>=': ajd }, idSession: cookie })
        .set({ peutSeConnecter: false })
        .then(audit => {
          sails.log.info(`UserController - login - Déconnexion de ${audit.user} (Session ${audit.idSession}).`);
          return res.redirect('/');
        })
        .catch(error => {  
          sails.log.error(`UserController - login - ERREUR : Impossible de mettre à jour une ligne d'Audit - ${error}`); 
          return res.redirect('/');
        });
    }

};
