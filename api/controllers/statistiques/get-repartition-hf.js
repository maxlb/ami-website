/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'Récupération du nombre d\'hommes et de femmes parmi les bénnéficiaires',

    description: 'Récupère le nombre d\'hommes et de femmes parmi les bénnéficiaires actifs.',

    inputs: {},

    exits: {
        success: {
            responseType: 'json'
        }
    },

    fn: async function (inputs, exits) {

         /* Récupérations des statistiques */
         var nbHommes = await Beneficiaire.count({ genre: 'H' });
         var nbFemmes = await Beneficiaire.count({ genre: 'F' });
 
         var repartitionHF = { 
             labels: ["Hommes", "Femmes"], 
             values: [nbHommes, nbFemmes] 
         };

        return exits.success(repartitionHF);
    }
    
};