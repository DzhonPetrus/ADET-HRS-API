const db = require('../models');
const User = db.users;

module.exports = {
    findAll: async (req, res) => {
        res.send({'msg': "test"});
    },
    findOne: async (req, res) => {
        const { id } = req.params;

        console.log(db.users)
        const user = await User.findOne({
            where: { id }
        });

        if(!user)
            return res.status(400).send({
                message: `No user found with the id ${id}`
            });

        return res.send(user);
    },
    create: async (req, res) => {
        const { email, password, userType, created_by, updated_by } = req.body;

        console.log(req.body);

        let userExist = await User.findOne({
            where: {
                email
            }
        });

        if(userExist)
            return res.status(400).send({
                message: `User with the email ${email} already exist!`
            })

        try {
            let newUser = await User.create({
                email,
                password,
                userType,
                created_by,
                updated_by 
            });

            return res.send(newUser);
        } catch (err) {
            return res.status(500).send({
                message: `Error: ${err}`
            });
        }

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { email, password, userType, isActive, created_by, updated_by } = req.body;


        let user = await User.findOne({
            where: {
                id
            }
        });

        if(!user)
            return res.status(400).send({
                message: `User with an id ${id} doesn't exist`
            })
        
        try {
            if(email)
                user.email = email;

            if(password)
                user.password = password;

            if(userType)
                user.userType = userType;

            if(isActive)
                user.isActive = isActive;

            if(created_by)
                user.created_by = created_by;

            if(updated_by)
                user.updated_by = updated_by;

            user.save();

            return res.send({
                message: `User ${id} has been updated!`
            });
        } catch (err) {
            return res.status(500).send({
                message: `Error: ${err}`
            });
        }
    },
    destroy: async (req, res) => {
        const { id } = req.body;

        if(!id)
            return res.status(400).send({
                message: `Please provide valid user id that you are trying to delete.`
            })
        
        let user = await User.findOne({
            where: {
                id
            }
        });

        if(!user)
            return res.status(400).send({
                message: `User with the id ${id} doesn't exist!`
            })
        try {
            await user.destroy();

            return res.send({
                message: `User ${id} has been deleted!`
            });

        } catch (err) {
            return res.status(500).send({
                message: `Error: ${err}`
            });
        }
    },

};