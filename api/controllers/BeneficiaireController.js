/**
 * BeneficiaireController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    inscrire(req, res) {
        let params = req.allParams();
    
        console.log(params);
    
        return res.redirect('/logged');
      }

};

