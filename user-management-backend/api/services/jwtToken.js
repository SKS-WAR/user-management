/**
* Service to generate JWT
*/
var jwt = require("jsonwebtoken");

module.exports = {
    sign: function (payload, expiresInSecs) {
        return jwt.sign(payload, sails.config.custom.JWT_SECRET, { expiresIn: expiresInSecs });
        },
        
        verify: function (token, callback) {
            jwt.verify(token, sails.config.JWT_SECRET, callback);
        },
        
    };
    