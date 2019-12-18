/**
 * Contacts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:"string",
      required:true,
    },
    number:{
      type:"string",
      required:true,
      unique: true,
    },
    email:{
      type:"string",
      required:true,
      isEmail:true,
      unique: true,
    },
    owner:{
      model: 'users',
      required:true,
    },
    image:{
      type:"string",
    }
  },

};

