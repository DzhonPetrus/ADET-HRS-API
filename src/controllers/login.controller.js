const db = require('../models');
const User = db.users;
const User_Info = db.user_informations;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { responseError, responseSuccess } = require('../utils/responseFormat');

const generateToken = data => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: "7200s"});
}

module.exports = {
    login: async (req, res) => {
        const {email: inputEmail, password: inputPass} = req.body;
        if(inputEmail === "" || inputPass === ""){
            res.status(500).send(responseError('Username or Password is empty.'));
        }

        try {
            const user = await User.findOne({where: {email: inputEmail, status: "Active"}});

            if(user){
                const {id, email, user_type, password} = user;
                bcrypt.compare(inputPass, password, (err, result) => {

                    if(!result){
                        res.status(500).send(responseError("Invalid email and password."));
                    }else{
                        const token = generateToken({id, email, user_type});

                        User_Info.findOne({where: {user_id:id}}).then(user_info => {

                            res.status(200).send({error:false, data: {user, user_info}, token, message:"User Retrieved"});
                        })
                        .catch (err => res.status(500).send(responseError((err.errors.map(e => e.message)))) )

                    }

                });
            }
            else{
                res.status(500).send(responseError("Email does not exist"))
            }

            
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    }
};