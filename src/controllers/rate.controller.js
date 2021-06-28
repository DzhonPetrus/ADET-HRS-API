require('dotenv').config();
const db = require('../models');
const Rate = db.rates;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Rate.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { rate_id } = req.params;

        try {
            const rate = await Rate.findOne({
                where: { rate_id }
            });

            if(!rate)
                return res.status(400).send({
                    message: `No rates found with the rate_id ${rate_id}`
                });

            return res.send(responseSuccess(rate));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { price_per_qty,startDate, endDate, created_by, updated_by } = req.body;
            /*startDate, endDate, room_id, room_type_id, */
        try{
            let newRate = await Rate.create({
                price_per_qty,
                startDate,
                endDate,
                created_by,
                updated_by
            });

            return res.status(201).send(responseSuccess(newRate, `Rate created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { rate_id } = req.params;
        const { price_per_qty, startDate, endDate, updated_by, status } = req.body;


        try {
            let rate = await Rate.findOne({
                where: {
                    rate_id
                }
            });

            if(!rate)
                return res.status(400).send(responseError(`Rate with an rate_id ${rate_id} doesn't exist`));
        
            if(price_per_qty)
                rate.price_per_qty = price_per_qty;

            if(startDate)
                rate.startDate = startDate;

            if(endDate)
            rate.endDate = endDate;

            if(updated_by)
                rate.updated_by = updated_by;

            if(status)
                rate.status = status;

            rate.save();

            return res.send(responseSuccess([],`Rate ${rate_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { rate_id } = req.body;

        if(!rate_id)
            return res.status(400).send(responseError(`Please provide valid rate_id that you are trying to delete.`));
        
        try {
            let rate = await Rate.findOne({
                where: {
                    rate_id
                }
            });

            if(!rate)
                return res.status(400).send(responseError(`Rate with the rate_id ${rate_id} doesn't exist!`));

            await rate.destroy();

            return res.send(responseSuccess([],`Rate ${rate_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};