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

    annee: { type: 'number', required: true },
    estPayee: { type: 'boolean' },
    montant: { type: 'number', required: true },
    motif: { type: 'string', maxLength: 255 },
    datePaiement: { type: 'ref', columnType: 'date', required: true },

    /* Bénéficiaire lié  */
    payeur: {
      model:'Beneficiaire'
    }
    
  }

};

