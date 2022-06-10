/**
* User.js
*
* @description :: A model definition represents a database table/collection.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/
const bcrypt = require("bcrypt-nodejs");
module.exports = {
    attributes: {
        
        email: {
            type: "string",
            required: true,
            unique: true,
            isEmail: true,
            maxLength: 200,
        },
        
        fullName: {
            type: "string",
        },
        
        password: {
            type: "string",
            required: true,
            minLength: 6,
        },
        
        latestRefreshToken: {
            type: "string",
        },
        
    },
    
    customToJSON: function () {
        return _.omit(this, ["password"]);
    },
    
    beforeCreate: async function (user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return cb(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return cb(err);
                user.password = hash;
                return cb();
            });
        });
    },
}
