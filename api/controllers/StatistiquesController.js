/**
 * StatistiquesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
    async getStats(req, res) {

        var data = {}

        return res.view('pages/stats', { data });
    }
};