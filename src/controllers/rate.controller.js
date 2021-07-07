require('dotenv').config();
const db = require('../models');
const Rate = db.rates;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Rate.findAll({where :{status:"Active"},include: ["created",'updated']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { rate_id } = req.params;

        try {
            const rate = await Rate.findOne({
                where: { rate_id },include: ["created",'updated']
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
        created_by = req.user.id;

            /*startDate, endDate, room_id, room_type_id, */
        try{
            let newRate = await Rate.create({
                price_per_qty,
                startDate,
                endDate,
                created_by,
                updated_by
            });

            let result = await Rate.findByPk(newRate.rate_id, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Rate created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { rate_id } = req.params;
        let { price_per_qty, startDate, endDate, updated_by, status } = req.body;
        updated_by = req.user.id;


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

            let result = await Rate.findByPk(rate.rate_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Rate ${rate_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { rate_id } = req.body;

        if(!rate_id)
            return res.status(400).send(responseError(`Please provide valid Rate id that you are trying to delete.`));
        
        try {
            let rate = await Rate.findOne({
                where: {
                    rate_id
                }
            });

            if(!rate)
                return res.status(400).send(responseError(`Rate with the id ${rate_id} doesn't exist!`));

            // await user.destroy();

            rate.status = 'Inactive';
            rate.save();

            return res.send(responseSuccess(rate,`Rate ${rate_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};