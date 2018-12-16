/**
 * Conjoint.js
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

    /* Vie en France */
    resideEnFrance:  { type: 'boolean' },
    dateEntreeFrance: { type: 'ref', columnType: 'date' },
    situationAdlinistrative : { type: 'string', required: true, maxLength: 255 },

    /* Bénéficiaire lié  */
    beneficiaireLie:{
      model:'Beneficiaire',
      unique: true
    }

  }

};

