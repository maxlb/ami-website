/**
 * Beneficiaire.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 *
 *
 */

module.exports = {

  attributes: {

    genre: {
      type: 'string',
      required: true,
      maxLength: 1,
      isIn: ['H', 'F', 'X']
    },

    nom: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    nomJeuneFille: {
      type: 'string',
      required: false,
      maxLength: 200
    },

    prenom: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    nationalite: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    paysNaissance: {
      required: true,
      type: 'string',
      maxLength: 200
    },

    dateNaissance: {
      type: 'ref',
      columnType: 'date',
      required: true
    },

    adresse: {
      type: 'string',
      required: false,
      maxLength: 500
    },

    codePostal: {
      type: 'number',
      isInteger: true,
      required: false
    },

    ville: {
      type: 'string',
      required: false,
      maxLength: 200
    },

    telephone: {
      type: 'string',
      required: false,
      maxLength: 10
    },

    mail: {
      type: 'string',
      isEmail: true,
      required: false,
      maxLength: 100
    },

    dateInscription: {
      type: 'ref',
      columnType: 'date',
      required: true
    },

    aLeBac: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    },

    typeEtudesSup: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    comprendFr: {
      type: 'boolean',
      required: false,
      defaultsTo: true
    },

    numAvocat: {
      type: 'string',
      required: false,
      maxLength: 10
    },

    numAssistSociale: {
      type: 'string',
      required: false,
      maxLength: 10
    },

    numAsso: {
      type: 'string',
      required: false,
      maxLength: 10
    },

    orientePar: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    dateEntreeFrance: {
      type: 'ref',
      columnType: 'date',
      required: false
    },

    estEuropeen: {
      type: 'boolean',
      required: true
    },

    paysRessortissant: {
      type: 'string',
      required: false,
      maxLength: 200
    },

    dateValiditeCarteEU: {
      type: 'ref',
      columnType: 'date',
      required: false
    },

    estRegularisePref: {
      type: 'boolean',
      required: false
    },

    dateDemandeRegPref: {
      type: 'ref',
      columnType: 'date',
      required: false
    },

    dateRepRegPref: {
      type: 'ref',
      columnType: 'date',
      required: false
    }

  }

};

