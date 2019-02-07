module.exports = {

    friendlyName: 'Récupération du cookie de session',
    description: 'Renvoie le cookie de la session en cours.',
    sync: true,
  
    inputs: {
  
        req: {
            type: 'ref',
            description: 'La requête entrante courante (req).',
            required: true
          }
  
    },
  
    fn: function (inputs, exits) {
        var cookie = inputs.req.signedCookies['sails.sid'];
        return exits.success(cookie);
    }
  
  };