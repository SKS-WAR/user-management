const bcrypt = require("bcryptjs");
const jwtToken = require("../services/jwtToken");
module.exports = {
    login: async (req, res) => {
        console.log("CHECKING..", req.body)
        
        if (!req.body.email || !req.body.password) {
            return res.badRequest("Email and password are required.");
        }

        let loginUser = await  User.find({ email: req.body.email });
        console.log(loginUser);
        if (!loginUser || loginUser.length === 0) {
            return res.badRequest("Email or password is incorrect.");
        }

        bcrypt.compare(req.body.password, loginUser[0].password, function (err, valid) {
            if (err) {
                return res.badRequest("Email or password is incorrect.");
            }
            if (!valid) {
                return res.badRequest("Email or password is incorrect.");
            }
            let token = jwtToken.sign(loginUser[0], sails.config.custom.JWT_EXPIRY_SECS);
            return res.ok({ user:loginUser[0], token: token });
        });

    }
}