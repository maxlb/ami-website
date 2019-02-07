/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
    async getStats(req, res) {
        return res.view('pages/stats');
    },

    async getInscritsParMois(req, res) {

        var inscritsParMois = {
            labels: ["Janvier", "Février", "Mars", "Avril", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"], 
            values: [60, 10, 65, 20, 71, 28, 56, 37, 42, 25, 48] 
        };

        return res.json(inscritsParMois);
    },

    async getRepartitionHF(req, res) {

        var repartitionHF = { 
            labels: ["Hommes", "Femme"], 
            values: [90, 10] 
        };

        return res.json(repartitionHF);
    },

    async getRepartitionContinent(req, res) {

        var repartitionContinent = { 
            labels: ["Europe", "Afrique", "Asie", "Amérique", "Océanie", "Antartique"], 
            values: [12, 19, 3, 5, 2, 3] 
        };

        return res.json(repartitionContinent);
    },
};