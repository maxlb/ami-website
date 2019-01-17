/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login(req, res) {

      let params = req.allParams();

      User
        .findOne({ mail: params.mail })
        .decrypt()
        .exec((err, user) => {
          if (err) {
            sails.log.error(err);
          } else if (!user || user.password !== params.password) {
            sails.log.warn(`UserController - login - Tentative de connexion de ${params.mail}.`);
            return res.json({ error: 'Identifiant ou mot de passe invalide.' });
          } else {
            sails.log.info(`UserController - login - Connexion de ${params.mail}.`);
            req.session.user = user;
            return res.json({ user: params.mail });
          }
        });
    },

    logout(req,res){
      req.session.user = null;
      return res.redirect('/');
    }

};
