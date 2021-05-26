require('dotenv').config();
const db = require('../models');
const Loyalty_Point_History = db.loyalty_point_historys;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Loyalty_Point_History.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { lp_history_id } = req.params;

        try {
            const loyalty_point_history = await Loyalty_Point_History.findOne({
                where: { lp_history_id }
            });

            if(!loyalty_point_history)
                return res.status(400).send({
                    message: `No Loyalty Point History found with the lp history id ${lp_history_id}`
                });

            return res.send(responseSuccess(loyalty_point_history));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { loyalty_point_id, booking_id, type, points, created_by, updated_by } = req.body;

        try{
            let newTax = await Loyalty_Point_History.create({
                loyalty_point_id,
                booking_id,
                type,
                points,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newTax, `Loyalty Point History created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { lp_history_id } = req.params;
        const { loyalty_point_id, booking_id, points, type, status, updated_by } = req.body;


        try {
            let loyalty_point_history = await Loyalty_Point_History.findOne({
                where: {
                    lp_history_id
                }
            });

            if(!loyalty_point_history)
                return res.status(400).send(responseError(`Loyalty Point history with an id ${lp_history_id} doesn't exist`));
        
            if(loyalty_point_id)
                loyalty_point_history.loyalty_point_id = loyalty_point_id;
            
            if(booking_id)
                loyalty_point_history.booking_id = booking_id;

            if(points)
                loyalty_point_history.points = points;

            if(type)
                loyalty_point_history.type = type;

            if(status)
                loyalty_point_history.status = status;


            if(updated_by)
                loyalty_point_history.updated_by = updated_by;

            loyalty_point_history.save();

            return res.send(responseSuccess([],`Loyalty Point History ${lp_history_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { lp_history_id } = req.body;

        if(!lp_history_id)
            return res.status(400).send(responseError(`Please provide valid lp history id that you are trying to delete.`));
        
        try {
            let loyalty_point_history = await Loyalty_Point_History.findOne({
                where: {
                    lp_history_id
                }
            });

            if(!loyalty_point_history)
                return res.status(400).send(responseError(`Loyalty Point History with an id ${lp_history_id} doesn't exist!`));

            await loyalty_point_history.destroy();

            return res.send(responseSuccess([],`Loyalty Point History ${lp_history_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};