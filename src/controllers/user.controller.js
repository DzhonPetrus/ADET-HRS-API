require('dotenv').config();
const db = require('../models');
const User = db.users;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const datatable = require('sequelize-datatables');

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findDataTable: async(req,res) => {
        req.body = {
            draw: "1",
            columns: [
                {
                    data: "email",
                    name: "",
                    searchable: "true",
                    orderable: "true",
                    search: {
                        value: "",
                        regex: "false",
                    },
                },
            ],
            order: [
                {
                    column: "0",
                    dir: "asc",
                },
            ],
            start: "0",
            length: "10",
            search: {
                value: "",
                regex: "false",
            },
            _: "1478912938246",
        };

        try{
            const dataTable = await datatable(User, req.body);
            res.json(dataTable);
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    findAll: async (req, res) => {
        try{
            const users = await User.findAll({include: ["created", "updated"]});
            res.send(responseSuccess(users, "Users Retrieved"));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findOne({
                where: { id },
                include: ["created", "updated"]
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
        created_by = req.user.id;

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

            const result = await User.findByPk(newUser.id, {include: ["created"]});

            return res.status(201).send(responseSuccess(result, `User created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { email, password, user_type, is_active } = req.body;
        const updated_by = req.user.id;


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

            if(updated_by)
                user.updated_by = updated_by;

            user.save();

            const result = await User.findByPk(user.id, {include: ["created","updated"]});
            return res.send(responseSuccess(result,`User ${id} has been updated!`));
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

            // await user.destroy();

            user.status = 'Inactive';
            user.save();

            return res.send(responseSuccess(user,`User ${id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};