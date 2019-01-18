/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login(req, res) {

      let userAsked = req.allParams().user;

      User
        .findOne({ mail: userAsked.mail })
        .decrypt()
        .exec((err, user) => {
          if (err) {
            sails.log.error(`UserController - login - Erreur lors de la récupération de l'utilisateur ${userAsked.mail}. ---> ${err}`);
            return res.json({ error: `Un problème est intervenu, veuillez réessayer : ${err}` });
          } else if (!user || user.password !== userAsked.password) {
            sails.log.warn(`UserController - login - Tentative de connexion de ${userAsked.mail}.`);
            return res.json({ error: 'Identifiant ou mot de passe invalide.' });
          } else {
            sails.log.info(`UserController - login - Connexion de ${userAsked.mail}.`);
            req.session.user = user;
            return res.json({ user: userAsked.mail });
          }
        });
    },

    logout(req,res){
      req.session.user = null;
      return res.redirect('/');
    }

};
