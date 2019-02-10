/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'Récupération du nombre de bénéficiares inscrits par mois',

    description: 'Récupère le nombre de nouvelles insccriptions au cours des 12 derniers mois.',

    inputs: {},

    exits: {
        success: {
            responseType: 'json'
        }
    },

    fn: async function (inputs, exits) {

        var mois = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Aout", "Sept.", "Oct.", "Nov.", "Déc."];
        var indexMoisEnCours = new Date().getMonth();
        var anneeEnCours = new Date().getFullYear()
        var labelsMois = [];
        var valeursMois = [];

        for (let i = 0 ; i < 12 ; i++) {
            /* Mois à afficher */
            var anneeGraph = anneeEnCours;
            var indexMoisGraph = indexMoisEnCours - i;
            if (indexMoisGraph < 0) {
                indexMoisGraph += 12;
                anneeGraph = anneeEnCours - 1
            }
            var debutMois = new Date(anneeGraph, indexMoisGraph, 1)
            var finMois = new Date(anneeGraph, indexMoisGraph + 1, 1)
            var nbBenefs = await Beneficiaire.count({ dateInscription: { '>=': debutMois }, dateInscription: { '<': finMois } });

            /* Ajout du mois dans le labels */
            labelsMois.push(mois[indexMoisGraph] + " " +  anneeGraph);
            valeursMois.push(nbBenefs);
        }

        /* On inverse l'ordre pour que ça soit chronologique */
        var labelsMoisChrono = [];
        var valeursMoisChrono = [];
        for (let j = 11; j >= 0; j--) {
            labelsMoisChrono.push(labelsMois[j]);
            valeursMoisChrono.push(valeursMois[j]);
        }

        var inscritsParMois = {
            labels: labelsMoisChrono, 
            values: valeursMoisChrono
        };

        return exits.success(inscritsParMois);
    }

};