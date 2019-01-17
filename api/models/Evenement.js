/**
 * Evenement.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 *
 *
 */

module.exports = {

  attributes: {

    /* Détails */
    nom: { type: 'string', maxLength: 255 },
    description: { type: 'string', maxLength: 255 },
    decision: { type: 'string', maxLength: 255 },
    date: { type: 'ref', columnType: 'date', required: true },

    /* Bénéficiaire lié  */
    beneficiaireConcerne: {
      model:'Beneficiaire'
    }
    
  },

  /**
   * 
   * @param {number} idBeneficiare ID du bénéficiaire concerné
   * @param {date} date Date de l'évènement
   * @param {string} etape Étape de la demande d'asile (OFPRA, CNDA, OQTF, OQTFAppel)
   * @param {string} type Type d'évènement (enregistrement, convocation, reponse)
   * @param {string} decision Décision du jury (peut être null)
   */
  buildEvenementDA: async function(idBeneficiare, date, etape, type, decision = "") {
    var event = {
      nom: Evenement.setNomPredefini(etape, type),
      description: Evenement.setDescriptionPredefinie(etape, type),
      date: date,
      decision: decision,
      beneficiaireConcerne: idBeneficiare
    };

    await Evenement.create(event); 
    sails.log.debug(`Evenement - buildEvenementDA - Evenement inséré : ${etape} - ${type}`);
  },

  setNomPredefini: function(etape, type) {
    var nom = "";
    var motEtape = "";

    switch (etape) {
      case "OFPRA":
        motEtape = `l'${etape}`
        break;
      case "CNDA":
        motEtape = `la ${etape}`
        break;
      case "OQTF":
        motEtape = `la contestation de l'${etape}`
        break;
      case "OQTFAppel":
        motEtape = `la contestation de l'${etape} en Appel`
        break;
      default:
        break;
    }

    switch (type) {
      case "enregistrement":
        nom = `Enregistrement à ${motEtape}`
        break;
      case "convocation":
        nom = `Convocation à ${motEtape}`
        break;
      case "reponse":
        nom = `Réponse de ${motEtape}`
        break;
      default:
        break;
    }

    return nom;
  },

  setDescriptionPredefinie: function(etape, type) {
    var description = "";
    var motEtape = "";
    var descrptionEtape = "";

    switch (etape) {
      case "OFPRA":
        motEtape = `l'OFPRA`;
        descrptionEtape = `seul face a une personne qui décidera du statut du demandeur (réfugié, protection subsidiare ou rejet).`;
        break;
      case "CNDA":
        motEtape = `la CNDA`;
        descrptionEtape = `à Paris dans un tribunal qui décidera de confirmer ou pas la décision de l'OFPRA`;
        break;
      case "OQTF":
        motEtape = `la contestation de l'OQTF`;
        descrptionEtape = `au tribunal administratif qui vérifiera l'absence de vice de procédure. Il y aura alors confirmation ou annulation. Il peut y avoir condamnation de la préfecture qui amènera à un réexamen auprès de la l'OFPRA.`
        break;
      case "OQTFAppel":
        motEtape = `la contestation de l'OQTF en Appel`;
        descrptionEtape = `au tribunal administratif qui vérifiera l'absence de vice de procédure. Il y aura alors confirmation ou annulation.`
        break;
      default:
        break;
    }

    switch (type) {
      case "enregistrement":
        description = `Envoi de la lettre d'enregistrement par ${motEtape} à conserver.`
        break;
      case "convocation":
        description = `Convocation à ${motEtape} ${descrptionEtape}`
        break;
      case "reponse":
        description = `Décision de ${motEtape} prise et communiquée.`
        break;
      default:
        break;
    }

    return description;
  }



};

