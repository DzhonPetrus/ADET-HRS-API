require('dotenv').config();
const db = require('../models');
const Housekeeping = db.housekeepings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const housekeepings = await Housekeeping.findAll({include: ["created", "updated",'room']});
            res.send(responseSuccess(housekeepings));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { housekeeping_id } = req.params;

        try {
            const housekeeping = await Housekeeping.findOne({
                where: { housekeeping_id },
                include: ["created", "updated",'room']
            });

            if(!housekeeping)
                return res.status(400).send({
                    message: `No housekeeping found with the housekeeping_id ${housekeeping_id}`
                });

            return res.send(responseSuccess(housekeeping));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  room_id, room_status, created_by, updated_by, status } = req.body;
        created_by = req.user.id;

        try{
            let newHousekeeping = await Housekeeping.create({
                room_id,
                room_status,
                created_by,
                updated_by,
                status
            });

            let result = await Housekeeping.findByPk(newHousekeeping.housekeeping_id, {include: ['created','room']});

            return res.status(201).send(responseSuccess(result, `Housekeeping created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { housekeeping_id } = req.params;
        let { room_id, room_status, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let housekeeping = await Housekeeping.findOne({
                where: {
                    housekeeping_id
                }
            });

            if(!housekeeping)
                return res.status(400).send(responseError(`Housekeeping with an housekeeping_id ${housekeeping_id} doesn't exist`));
        
            if(room_id)
                housekeeping.room_id = room_id;

            if(room_status)
                housekeeping.room_status = room_status;

            if(updated_by)
                housekeeping.updated_by = updated_by;

            if(status)
                housekeeping.status = status;

            housekeeping.save();

            let result = await Housekeeping.findByPk(housekeeping.housekeeping_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Housekeeping ${housekeeping_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { housekeeping_id } = req.body;
        console.log(housekeeping_id);
        if(!housekeeping_id)
            return res.status(400).send(responseError(`Please provide valid HouseKeeping id that you are trying to delete.`));
        
        try {
            let house_keeping = await Housekeeping.findOne({
                where: {
                    housekeeping_id
                }
            });

            if(!house_keeping)
                return res.status(400).send(responseError(`HouseKeeping with the id ${housekeeping_id} doesn't exist!`));

            // await user.destroy();

            house_keeping.status = 'Inactive';
            house_keeping.save();

            return res.send(responseSuccess(house_keeping,`HouseKeeping ${housekeeping_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};