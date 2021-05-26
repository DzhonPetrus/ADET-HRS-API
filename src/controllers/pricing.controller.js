require('dotenv').config();
const db = require('../models');
const Pricing = db.pricings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Pricing.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { pricing_id } = req.params;

        try {
            const pricing = await Pricing.findOne({
                where: { pricing_id }
            });

            if(!pricing)
                return res.status(400).send({
                    message: `No pricing found with the pricing_id ${pricing_id}`
                });

            return res.send(responseSuccess(pricing));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { pricing_id, pricing_per_qty, date_start, date_end, room_id, 
            room_type_id, created_by, updated_by, status } = req.body;

        try{
            let newPricing = await Pricing.create({
                pricing_id,
                pricing_per_qty,
                date_start,
                date_end,
                room_id,
                room_type_id,
                created_by,
                updated_by,
                status
            });

            return res.status(201).send(responseSuccess(newPricing, `Pricing created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { pricing_id } = req.params;
        const { pricing_per_qty, date_start, date_end, room_id, 
            room_type_id, created_by, updated_by, status } = req.body;


        try {
            let pricing = await Pricing.findOne({
                where: {
                    pricing_id
                }
            });

            if(!pricing)
                return res.status(400).send(responseError(`Pricing with an pricing_id ${pricing_id} doesn't exist`));
        
            if(type)
                pricing.type = type;

            if(description)
                pricing.description = description;

            if(updated_by)
                pricing.updated_by = updated_by;

            if(status)
                pricing.status = status;

            pricing.save();

            return res.send(responseSuccess([],`Pricing ${pricing_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { pricing_id } = req.body;

        if(!pricing_id)
            return res.status(400).send(responseError(`Please provide valid pricing_id that you are trying to delete.`));
        
        try {
            let pricing = await Pricing.findOne({
                where: {
                    pricing_id
                }
            });

            if(!amenity)
                return res.status(400).send(responseError(`Pricing with the pricing_id ${pricing_id} doesn't exist!`));

            await amenity.destroy();

            return res.send(responseSuccess([],`Pricing ${pricing_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};