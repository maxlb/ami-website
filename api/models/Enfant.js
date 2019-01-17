/**
 * Enfant.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 *
 *
 */

module.exports = {

  attributes: {

    /* Identité */
    prenom: { type: 'string', required: true, maxLength: 200 },
    nom: { type: 'string', required: true, maxLength: 200 },
    dateNaissance: { type: 'ref', columnType: 'date', required: true },
    nationalite: { type: 'string', required: true, maxLength: 200 },
    paysNaissance: { required: true, type: 'string', maxLength: 200 },

    /* Vie en France */
    resideEnFrance:  { type: 'boolean', defaultsTo: false },
    dateEntreeFrance: { type: 'ref', columnType: 'date' },

    /* Bénéficiaire lié  */
    parent: {
      model:'Beneficiaire'
    }
    
  }

};

