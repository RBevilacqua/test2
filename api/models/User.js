/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    //schema: true,

    attributes: {

        username : { type: 'string',
                    required: true },

        userEmail : { type: 'string' },

        userPassword : { type: 'string' },

        toJSON: function(){
            var obj = this.toObject();
            delete obj.userPassword;
            delete obj._csrf;
            return obj;
        }
    },


    beforeCreate: function (values, next) {
        require('bcrypt').hash(values.userPassword, 10, function passwordEncrypted(err, encryptedPassword) {
            if (err) return next(err);
            values.userPassword = encryptedPassword;
            next();
        });
    }
};

