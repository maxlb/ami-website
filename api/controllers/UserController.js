/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  login(req, res) {
    let params = req.allParams();

    sails.log.info(`UserController - login - Connexion de ${params.mail}.`);

    User.findOne({
      mail: params.mail
    }).decrypt().exec((err, user) => {
      if (err) {
        sails.log.error(err);
      }
      if (!user || user.password !== params.password) {
        return res.redirect('/');
      }
      req.session.user = user;
      return res.redirect('/logged');

    });
  },

  logout(req,res){
    req.session.user = null;
    return res.redirect('/');
  }

};
