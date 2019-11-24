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
>>>>>>> 40f04cca9e449e3bd2d4b42b34ce60b788e1c029
    },
    customToJSON: function ()
    {
        return _.omit(this, ['password', 'id'])
    },
    Contact: {
        collection: 'contacts',
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
