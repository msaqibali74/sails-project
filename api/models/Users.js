module.exports = {

    // please add comments in each model
    // about the working of model
    attributes: {
        username: {
            type: "string",
            required: true,
            unique: true,
        },
        name: {
            type: "string",
            required: true,
        },
        title: {
            type: "string",
        },
        email: {
            type: "string",
            isEmail: true,
            required: true,
            unique: true,
        },
        password: {
            type: "string",
            minLength: 6
        },
    },
    customToJSON: function ()
    {
        return _.omit(this, ['password', 'id'])
    },
    Contact: {
        collection: 'contacts',
        via: 'owner'
    },
    Page:{
        collection: 'pages',
        via: 'owner'
    },
    beforeCreate: function (values, cb) {
        const bcrypt = require('bcrypt');
        bcrypt.hash(values.password, null, null, function (err, hash) {
            values.password = hash;
            cb();
        });
    }
};
