module.exports = async function (req, res, proceed) {

    /* Cookie de session */
    var cookie = req.signedCookies['sails.sid'];

    /* Date du jour */
    var ajd = new Date();
    ajd.setHours(0, 0, 0, 0);

    await Audit
      .findOne({  date: { '>=': ajd }, 
                  peutSeConnecter: true, 
                  idSession: cookie })
      .then(audit => {
        if(!audit) {
          /* Pas de connexion active ajd, on redirige */
          return res.redirect('/');
        } else {
          /* Une connexion active ajd, on poursuit */
          return proceed();
        }
      })
      .catch(error => {  
        return res.redirect('/');
      });

    

};
