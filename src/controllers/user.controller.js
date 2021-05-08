require('dotenv').config();
const db = require('../models');
const User = db.users;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await User.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findOne({
                where: { id }
            });

            if(!user)
                return res.status(400).send({
                    message: `No user found with the id ${id}`
                });

            return res.send(responseSuccess(user));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { email, password, user_type, created_by, updated_by } = req.body;

        password = await bcrypt.hash(
            password,
            SALT_ROUNDS
        );

        try{
            let userExist = await User.findOne({
                where: {
                    email
                }
            });

            if(userExist)
                return res.status(400).send(responseError(`User with the email ${email} already exist!`));


            let newUser = await User.create({
                email,
                password,
                user_type,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newUser, `User created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { email, password, user_type, is_active, created_by, updated_by } = req.body;


        try {
            let user = await User.findOne({
                where: {
                    id
                }
            });

            if(!user)
                return res.status(400).send(responseError(`User with an id ${id} doesn't exist`));
        
            if(email)
                user.email = email;

            if(password)
                user.password = await bcrypt.hash( password, SALT_ROUNDS);

            if(user_type)
                user.user_type = user_type;

            if(is_active)
                user.is_active = is_active;

            if(created_by)
                user.created_by = created_by;

            if(updated_by)
                user.updated_by = updated_by;

            user.save();

            return res.send(responseSuccess([],`User ${id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { id } = req.body;

        if(!id)
            return res.status(400).send(responseError(`Please provide valid user id that you are trying to delete.`));
        
        try {
            let user = await User.findOne({
                where: {
                    id
                }
            });

            if(!user)
                return res.status(400).send(responseError(`User with the id ${id} doesn't exist!`));

            await user.destroy();

            return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};