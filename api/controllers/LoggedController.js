/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  welcome(req, res){

    var cookie = sails.helpers.getCookie(req);

    Audit
      .findOne({ idSession: cookie })
      .populate('user')
      .then(audit => {
        var connectedUser = audit.user;
        return res.view('pages/dashboard', { connectedUser });
      })
      .catch(error => {  
        return res.view('/');
      });

  }

};
