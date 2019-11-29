/**
 * Pages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:"string",
      required:true,
      unique:true
    },
    title:{
      type:"String",
      required:true,
    },
    displaytop:{
      type: 'boolean', 
    },
    displaydown:{
      type: 'boolean', 
    },
    displayleft:{
      type: 'boolean', 
    },
    displayright:{
      type: 'boolean', 
    },
    order:{
      type: 'boolean', 
    },
    content:{
      type: "string",
    },
    metatitle:{
      type:"string",
    },
    metadescription:{
      type:"string",
    },
    owner:{
      model: 'users',
      required:true,
    }
  },

};

