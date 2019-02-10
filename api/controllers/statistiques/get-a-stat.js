/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
    friendlyName: 'Une statistique',

    description: 'Récupère le nombre de bénnéficiaires pour la statistique.',

    inputs: {},

    exits: {
        success: {
            responseType: 'json'
        }
    },

    fn: async function (inputs, exits) {

        /* Récupérations des statistiques */
        var nbBenef = await Beneficiaire.count();

        var monTableauDeStats = { 
            labels: ["Bénéficaires"], 
            values: [nbBenef] 
        };

        return exits.success(monTableauDeStats);
    }
};