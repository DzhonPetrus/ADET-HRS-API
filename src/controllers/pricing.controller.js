require('dotenv').config();
const db = require('../models');
const Pricing = db.pricings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    list: async (req, res) => {
        try{
            const users = await Pricing.findAll({include: ["created",'updated']});
            res.send(responseSuccess(users));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findAll: async (req, res) => {
        try{
            const users = await Pricing.findAll({where :{statue:"Active"},include: ["created",'updated']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { pricing_id } = req.params;

        try {
            const pricing = await Pricing.findOne({
                where: { pricing_id },include:["created", "updated"]
            });

            if(!pricing)
                return res.status(400).send({
                    message: `No pricing found with the pricing_id ${pricing_id}`
                });

            return res.send(responseSuccess(pricing));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {price_per_qty, date_start, date_end, created_by, updated_by, status } = req.body;
        created_by = req.user.id;
        
        if(date_start > date_end)
            return res.status(406).send(responseError(`Start Date must not be greater than Date End`));
        


        try{
            let newPricing = await Pricing.create({
                price_per_qty,
                date_start,
                date_end,
                created_by,
                updated_by,
                status
            });

            let result = await Pricing.findByPk(newPricing.pricing_id, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Pricing created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { pricing_id } = req.params;
        let { price_per_qty, date_start, date_end,updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let pricing = await Pricing.findOne({
                where: {
                    pricing_id
                }
            });

            if(!pricing)
                return res.status(400).send(responseError(`Pricing with an pricing_id ${pricing_id} doesn't exist`));
        
            if(price_per_qty)
                pricing.price_per_qty = price_per_qty;

            if(date_start)
                pricing.description = date_start;

            if(date_end)
            pricing.description = date_end;

            if(updated_by)
                pricing.updated_by = updated_by;

            if(status)
                pricing.status = status;

            pricing.save();

            let result = await Pricing.findByPk(pricing.pricing_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Pricing ${pricing_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { pricing_id } = req.body;

        if(!pricing_id)
            return res.status(400).send(responseError(`Please provide valid Pricing id that you are trying to delete.`));
        
        try {
            let pricing = await Pricing.findOne({
                where: {
                    pricing_id
                }
            });

            if(!pricing)
                return res.status(400).send(responseError(`Pricing with the id ${pricing_id} doesn't exist!`));

            // await user.destroy();

            pricing.status = 'Inactive';
            pricing.save();

            return res.send(responseSuccess(pricing,`Pricing ${pricing_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};