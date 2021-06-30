require('dotenv').config();
const db = require('../models');
const Tax = db.taxes;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Tax.findAll({include: ["created",'updated']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { taxCode } = req.params;

        try {
            const tax = await Tax.findOne({
                where: { taxCode }, include:["created", "updated"]
            });

            if(!tax)
                return res.status(400).send({
                    message: `No tax found with the tax code ${taxCode}`
                });

            return res.send(responseSuccess(tax));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { percentage, created_by } = req.body;
        created_by = req.user.id;

        try{
            let newTax = await Tax.create({
                percentage,
                created_by
            });

            let result = await Tax.findByPk(newTax.taxCode, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Tax created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { taxCode } = req.params;
        let { percentage, updated_by, status } = req.body;
        updated_by = req.user.id;



        try {
            let tax = await Tax.findOne({
                where: {
                    taxCode
                }
            });

            if(!tax)
                return res.status(400).send(responseError(`Tax with a tax code ${taxCode} doesn't exist`));
        
            if(percentage)
                tax.percentage = percentage;

            if(status)
                tax.status = status;


            if(updated_by)
                tax.updated_by = updated_by;

            tax.save();

            let result = await Tax.findByPk(tax.taxCode, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Tax ${taxCode} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { taxCode } = req.body;

        if(!taxCode)
            return res.status(400).send(responseError(`Please provide valid tax id that you are trying to delete.`));
        
        try {
            let tax = await Tax.findOne({
                where: {
                    taxCode
                }
            });

            if(!tax)
                return res.status(400).send(responseError(`Tax with the id ${taxCode} doesn't exist!`));

            // await user.destroy();

            tax.status = 'Inactive';
            tax.save();

            return res.send(responseSuccess(tax,`Tax ${taxCode} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};