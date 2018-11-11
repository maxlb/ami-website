/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nom: {
      type: 'string'
    },
    prenom: {
      type: 'string'
    },
    mail: {
      type: 'string',
      unique: 'true'
    },
    password: {
      type: 'string',
      encrypt: true
    }

  }

};

