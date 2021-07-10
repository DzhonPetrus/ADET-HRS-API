require('dotenv').config();
const db = require('../models');
const Promo_and_Discount = db.promos_and_discounts;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const promos_and_discounts = await Promo_and_Discount.findAll({where :{status:"Active"},include: ["created",'updated','rooms','conditions']});
            res.send(responseSuccess(promos_and_discounts));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { pd_code } = req.params;

        try {
            const promo_and_discount = await Promo_and_Discount.findOne({
                where: { pd_code },
                include: ["created",'updated','rooms','conditions']
            });

            if(!promo_and_discount)
                return res.status(400).send({
                    message: `No promo_and_discount found with the pd_code ${pd_code}`
                });

            return res.send(responseSuccess(promo_and_discount));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { type, room_type_id, description, discount_percentage_amount, valid_from, valid_until, condition_code, created_by, updated_by } = req.body;
        created_by = req.user.id;

        if(valid_from > valid_until)
            return res.status(406).send(responseError(`Valid From must not be greater than Valid Until`));

        try{
            let newPromo_and_Discount = await Promo_and_Discount.create({ 
                type, 
                room_type_id, 
                description, 
                discount_percentage_amount, 
                valid_from, 
                valid_until, 
                condition_code, 
                created_by, 
                updated_by 
            });

            let result = await Promo_and_Discount.findByPk(newPromo_and_Discount.pd_code, {include: ["created","rooms","conditions"]});

            return res.status(201).send(responseSuccess(result, `Promo_and_Discount created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { pd_code } = req.params;
        let { type, room_type_id, description, discount_percentage_amount, valid_from, valid_until, condition_code, updated_by, status} = req.body;
        updated_by = req.user.id;

        if(valid_from > valid_until)
            return res.status(406).send(responseError(`Valid From must not be greater than Valid Until`));

        try {
            let promo_and_discount = await Promo_and_Discount.findOne({
                where: {
                    pd_code
                }
            });

            if(!promo_and_discount)
                return res.status(400).send(responseError(`Promo_and_Discount with an pd_code ${pd_code} doesn't exist`));
        
            if(type)
                promo_and_discount.type = type;

            if(room_type_id)
                promo_and_discount.room_type_id = room_type_id;

            if(description)
                promo_and_discount.description = description;

            if(discount_percentage_amount)
                promo_and_discount.discount_percentage_amount = discount_percentage_amount;

            if(valid_from)
                promo_and_discount.valid_from = valid_from;

            if(valid_until)
                promo_and_discount.valid_until = valid_until;

            if(condition_code)
                promo_and_discount.condition_code = condition_code;

            if(updated_by)
                promo_and_discount.updated_by = updated_by;

            if(status)
                promo_and_discount.status = status;

            promo_and_discount.save();

            let result = await Promo_and_Discount.findByPk(promo_and_discount.pd_code, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Promo_and_Discount ${pd_code} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { pd_code } = req.body;

        if(!pd_code)
            return res.status(400).send(responseError(`Please provide valid Promo/Discount id that you are trying to delete.`));
        
        try {
            let promo_discount = await Promo_and_Discount.findOne({
                where: {
                    pd_code
                }
            });

            if(!promo_discount)
                return res.status(400).send(responseError(`Promo/Discount with the id ${pd_code} doesn't exist!`));

            // await user.destroy();

            promo_discount.status = 'Inactive';
            promo_discount.save();

            return res.send(responseSuccess(promo_discount,`Promo/Discount ${pd_code} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};