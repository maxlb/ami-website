/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  welcome(req, res){

    var cookie = req.signedCookies['sails.sid'];

    Audit
      .findOne({ idSession: cookie })
      .populate('user')
      .exec(function(err, audit) {
        if(!err) {
          var connectedUser = audit.user;
          return res.view('pages/dashboard', { connectedUser });
        }
    });

  }

};
