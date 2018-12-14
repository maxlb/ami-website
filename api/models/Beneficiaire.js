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

    /* Identité */
    prenom: { type: 'string', required: true, maxLength: 200 },
    nom: { type: 'string', required: true, maxLength: 200 },
    nomJeuneFille: { type: 'string', maxLength: 200 },
    genre: { type: 'string', required: true, maxLength: 1, isIn: ['H', 'F'] },
    dateNaissance: { type: 'ref', columnType: 'date', required: true },
    nationalite: { type: 'string', required: true, maxLength: 200 },
    paysNaissance: { required: true, type: 'string', maxLength: 200 },

    /* Coordonnées */
    adresse: { type: 'string', maxLength: 500 },
    codePostal: { type: 'number', isInteger: true },
    ville: { type: 'string', maxLength: 200 },
    telephone: { type: 'string', maxLength: 10 },
    mail: { type: 'string', isEmail: true, maxLength: 100 },

    /* Études */
    aLeBac: { type: 'boolean', defaultsTo: false },
    typeEtudesSup: { type: 'string', maxLength: 200 },
    comprendFr: { type: 'boolean', defaultsTo: true },

    /* Contacts */
    numAvocat: { type: 'string', maxLength: 10 },
    numAssistSociale: { type: 'string', maxLength: 10 },
    numAsso: { type: 'string', maxLength: 10 },
    orientePar: { type: 'string', maxLength: 200 },

    /* Inscription */
    dateInscription: { type: 'ref', columnType: 'date', required: true },
    inscritPar: { type: 'string', maxLength: 200 },

    /* Vie en France */
    dateEntreeFrance: { type: 'ref', columnType: 'date' },

    /* Titres de séjour */
    /* Carte EU */
    estEuropeen: { type: 'boolean' },
    paysRessortissant: { type: 'string', maxLength: 200 },
    dateValiditeCarteEU: { type: 'ref', columnType: 'date' }

  }

};

