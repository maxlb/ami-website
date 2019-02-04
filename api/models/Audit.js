/**
 * Cotisation.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 *
 *
 */

module.exports = {

  attributes: {

    date: { type: 'ref', columnType: 'date', required: true },
    peutSeConnecter: { type: 'boolean' },
    idSession: { type: 'string', required: true },

    /* Bénéficiaire lié  */
    user: {
      model:'User'
    }
    
  }

};

