/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function getIdSession() {
  return Math.random().toString(36).substr(2);
}

module.exports = {

    login(req, res) {

      let userAsked = req.allParams().user;

      User
        .findOne({ mail: userAsked.mail })
        .decrypt()
        .exec(async function(err, user){

          if (err) {

            sails.log.error(`UserController - login - Erreur lors de la récupération de l'utilisateur ${userAsked.mail}. ---> ${err}`);
            return res.json({ error: `Un problème est survenu, veuillez réessayer : ${err}` });

          } else if (!user || user.password !== userAsked.password) {

            sails.log.warn(`UserController - login - Tentative de connexion de ${userAsked.mail}.`);
            return res.json({ error: 'Identifiant ou mot de passe invalide.' });

          } else {

            /* Date du jour */
            var ajd = new Date();
            ajd.setHours(0, 0, 0, 0);

            /* Création d'une ligne dans la table d'Audit */
            var connectedUser = {};
            connectedUser.date = ajd;
            connectedUser.peutSeConnecter = true;
            connectedUser.idSession = req.signedCookies['sails.sid'];
            connectedUser.user = user.id

            await Audit
                    .create(connectedUser)
                    .then(user => {
                      sails.log.info(`UserController - login - Connexion de ${userAsked.mail} (Session ${connectedUser.idSession}).`);
                      return res.json({ user: userAsked.mail });
                    })
                    .catch(error => {  
                      sails.log.error(`UserController - login - ERREUR : Impossible d'ajouter une ligne d'Audit - ${error}`); 
                      return res.json({ error: `Un problème est survenu, veuillez réessayer : ${error}` });
                    });

          }

        });
    },

    logout(req,res){
      return res.redirect('/');
    }

};
