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

  /* ---- Site externe ---- */
  '/': { view: 'pages/user/homepage', locals: { layout: false } },

  /* ---- Utilisateur ---- */
  'POST /login': 'user.login',
  'GET /logout': 'user.logout',
  'GET /logged': 'logged.welcome',

  /* ---- Bénéficiaires ---- */
  'POST /inscireBeneficiaire':                'beneficiaire/inscrire',
  'POST /beneficiaires/updateIdentite':       'beneficiaire/update-identite',
  'POST /beneficiaires/updateCoordonnees':    'beneficiaire/update-coordonnees',
  'POST /beneficiaires/updatePermisConduire': 'beneficiaire/update-permis-conduire',
  'POST /beneficiaires/updateNiveauEtudes':   'beneficiaire/update-niveau-etudes',
  'GET /newBeneficiaire':                     { view: 'pages/addBeneficiaire' },
  'GET /listeBeneficiaires':                  'beneficiaire/get-all',
  'GET /profile/:id':                         'beneficiaire/get-by-id',

  /* ---- Statistiques ---- */
  'GET /statistiques':          { view: 'pages/stats' },
  'GET /statistiques/repCont':  'statistiques/get-repartition-continent',
  'GET /statistiques/repHF':    'statistiques/get-repartition-hf',
  'GET /statistiques/nbInscr':  'statistiques/get-inscrits-par-mois',
  
  /* ---- Sécurité ---- */
  'GET /csrfToken': 'security/grant-csrf-token'

};
