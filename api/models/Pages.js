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
      unique:true,
    },
    title:{
      type:"string",
      required:true,
    },
    displaytop:{
      type: 'string', 
    },
    displaydown:{
      type: 'string', 
    },
    displayleft:{
      type: 'string', 
    },
    displayright:{
      type: 'string', 
    },
    order:{
      type: 'string', 
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

