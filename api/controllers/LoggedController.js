/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  welcome(req,res){
    let data = req.session.user;
    return res.view('pages/homepage', { data });
  }

};
