require('dotenv').config();
const db = require('../models');
const Housekeeping = db.housekeepings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const housekeepings = await Housekeeping.findAll();
            res.send(responseSuccess(housekeepings));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { housekeeping_id } = req.params;

        try {
            const housekeeping = await Housekeeping.findOne({
                where: { housekeeping_id }
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

        try{
            let newHousekeeping = await Housekeeping.create({
                room_id,
                room_status,
                created_by,
                updated_by,
                status
            });

            return res.status(201).send(responseSuccess(newHousekeeping, `Housekeeping created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { housekeeping_id } = req.params;
        const { room_id, room_status, updated_by, status } = req.body;


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

            return res.send(responseSuccess([],`Housekeeping ${housekeeping_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { housekeeping_id } = req.body;

        if(!housekeeping_id)
            return res.status(400).send(responseError(`Please provide valid housekeeping_id that you are trying to delete.`));
        
        try {
            let housekeeping = await Housekeeping.findOne({
                where: {
                    housekeeping_id
                }
            });

            if(!housekeeping)
                return res.status(400).send(responseError(`Housekeeping with the housekeeping_id ${housekeeping_id} doesn't exist!`));

            await housekeeping.destroy();

            return res.send(responseSuccess([],`Housekeeping ${housekeeping_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};