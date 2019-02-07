module.exports = {

    friendlyName: 'Vérification de la présence d\'une session active pour le cookie actuel',
    description: 'Renvoie 1 si une session est acive pour le cookie en cours, 0 si un session est inactive et -1 sinon.',
  
    inputs: {
  
        req: {
            type: 'ref',
            description: 'La requête entrante courante (req).',
            required: true
          }
  
    },
  
    fn: async function (inputs, exits) {
        /* Cookie de session */
        var cookie = sails.helpers.getCookie(inputs.req);

        /* Date du jour */
        var ajd = new Date();
        ajd.setHours(0, 0, 0, 0);

        await Audit
                .findOne({  date: { '>=': ajd }, idSession: cookie })               // Entrée Audit pour ce cookie aujourd'hui
                .then(audit => {
                    if (!audit) {
                        return exits.success(-1);                                   // -1 : Pas de session pour ce cookie aujourd'hui
                    } else {
                        if (audit.peutSeConnecter) {
                            return exits.success(1);                                // 1 : Une session active pour ce cookie aujourd'hui
                        } else {
                            return exits.success(0);                                // 0 : Une session inactive pour ce cookie aujourd'hui
                        }
                    }
                })
                .catch(error => {  
                    return exits.error(error);
                });
    }
  
  };