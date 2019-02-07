module.exports = async function (req, res, proceed) {

  var isConnected = await sails.helpers
                                    .isAlreadyConnected(req)
                                    .intercept( () => { return res.redirect('/') });
  
  if(isConnected == 1) {
    return proceed();                             // Une session ouverte ajd, on poursuit
  } else {
    return res.redirect('/');                     // Pas de session ouverte ajd, on redirige
  }

};
