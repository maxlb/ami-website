/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/user/homepage', locals: { layout: false } },
  '/newBeneficiaire': { view: 'pages/addBeneficiaire' },
  'GET /listeBeneficiaires': {controller: 'Beneficiaire', action: 'getAll' },
  'POST /login': { controller: 'User', action:'login' },
  'GET /logout': { controller: 'User', action:'logout' },
  'GET /logged': { controller: 'Logged', action:'welcome' },
  'POST /inscireBeneficiaire': { controller: 'Beneficiaire', action: 'inscrire' }

};
