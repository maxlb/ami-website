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
    mail: { type: 'string', maxLength: 100 },

    /* Études */
    aLeBac: { type: 'boolean', defaultsTo: false },
    etudesSup: { type: 'string', maxLength: 200 },
    comprendFr: { type: 'boolean', defaultsTo: true },

    /* Permis */
    datePermis: { type: 'ref', columnType: 'date'},
    aUneVouture: { type: 'boolean' },

    /* Contacts */
    numAvocat: { type: 'string', maxLength: 10 },
    numAssistSociale: { type: 'string', maxLength: 10 },
    numAsso: { type: 'string', maxLength: 10 },
    orientePar: { type: 'string', maxLength: 200 },

    /* Situation */
    situation: { type: 'string', maxLength: 200 },
    dateSituation: { type: 'ref', columnType: 'date' },

    /* Inscription */
    dateInscription: { type: 'ref', columnType: 'date', required: true },
    inscritPar: { type: 'string', maxLength: 200 },

    /* Vie en France */
    dateEntreeFrance: { type: 'ref', columnType: 'date' },

    /* Moyens entrée */
    aVisa: { type: 'boolean' },
    dateValiditeVisa: { type: 'ref', columnType: 'date' },
    aPasseport: { type: 'boolean' },
    dateValiditePasseport: { type: 'ref', columnType: 'date' },

    /* Carte séjour */
    aCarteSejour: { type: 'boolean' },
    mentionCarteSejour: { type: 'string', maxLength: 200 },
    dateValiditeCarteSejour: { type: 'ref', columnType: 'date' },

    /* Carte Résident */
    aCarteResident: { type: 'boolean' },
    mentionCarteResident: { type: 'string', maxLength: 200 },
    dateValiditeCarteResident: { type: 'ref', columnType: 'date' },

    /* Carte EU */
    aCarteEU: { type: 'boolean' },
    paysCarteEU: { type: 'string', maxLength: 200 },
    dateValiditeCarteEU: { type: 'ref', columnType: 'date' },

    /* Protection internationale */
    aProtectionSubsidiaire: { type: 'boolean' },
    dateValiditeStatutProtectionSubsidiaire: { type: 'ref', columnType: 'date' },
    estRefugie: { type: 'boolean' },
    dateValiditeStatutRefugie: { type: 'ref', columnType: 'date' },

    /* Demande d'Asile */
    typeProcedure: { type: 'string', maxLength: 200 },
    dateProcedure: { type: 'ref', columnType: 'date' },

    /* Avocats */
    avocatCNDA:  { type: 'string', maxLength: 200 },
    avocatOQTF:  { type: 'string', maxLength: 200 },
    
    /* ------------- ASSOCIATIONS ------------- */
    
    /* Conjoint */
    conjoint: {
      collection:'Conjoint',
      via: 'beneficiaireLie'
    },

    /* Enfants */
    enfants: {
      collection: 'Enfant',
      via: 'parent'
    },

    /* Cotisations */
    cotisation: {
      collection: 'Cotisation',
      via: 'payeur'
    },

    /* Evènements */
    evenement: {
      collection: 'Evenement',
      via: 'beneficiaireConcerne'
    }


  }





};

