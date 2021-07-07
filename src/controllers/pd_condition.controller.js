require('dotenv').config();
const db = require('../models');
const Pd_Condition = db.pd_conditions;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const pd_conditions = await Pd_Condition.findAll({where :{statue:"Active"},include: ["created",'updated']});
            res.send(responseSuccess(pd_conditions));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { condition_code } = req.params;

        try {
            const pd_condition = await Pd_Condition.findOne({
                where: { condition_code },
                include: ["created",'updated']
            });

            if(!pd_condition)
                return res.status(400).send({
                    message: `No pd_condition found with the condition_code ${condition_code}`
                });

            return res.send(responseSuccess(pd_condition));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { min_duration, duration, min_guest, max_guest, limit, created_by } = req.body;
        created_by = req.user.id;
        if(min_guest > max_guest)
            return res.status(406).send(responseError(`Minumum Guest must not be greater than Maximum Guest`));

        try{
            let newPd_Condition = await Pd_Condition.create({ min_duration, duration, min_guest, max_guest, limit, created_by });

            let result = await Pd_Condition.findByPk(newPd_Condition.condition_code, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Pd_Condition created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { condition_code } = req.params;
        let { min_duration, duration, min_guest, max_guest, limit, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let pd_condition = await Pd_Condition.findOne({
                where: {
                    condition_code
                }
            });

            if(!pd_condition)
                return res.status(400).send(responseError(`Pd_Condition with an condition_code ${condition_code} doesn't exist`));
        
            if(min_duration)
                pd_condition.min_duration = min_duration;

            if(duration)
                pd_condition.duration = duration;

            if(min_guest)
                pd_condition.min_guest = min_guest;

            if(max_guest)
                pd_condition.max_guest = max_guest;

            if(limit)
                pd_condition.limit = limit;

            if(updated_by)
                pd_condition.updated_by = updated_by;

            if(status)
                pd_condition.status = status;

            pd_condition.save();

            let result = await Pd_Condition.findByPk(pd_condition.condition_code, {include: ['created', 'updated']});


            return res.send(responseSuccess(result,`Pd_Condition ${condition_code} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { condition_code } = req.body;

        if(!condition_code)
            return res.status(400).send(responseError(`Please provide valid PD Condition id that you are trying to delete.`));
        
        try {
            let pd_condition = await Pd_Condition.findOne({
                where: {
                    condition_code
                }
            });

            if(!pd_condition)
                return res.status(400).send(responseError(`PD Condition with the id ${condition_code} doesn't exist!`));

            // await user.destroy();

            pd_condition.status = 'Inactive';
            pd_condition.save();

            return res.send(responseSuccess(pd_condition,`PD Condition ${condition_code} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};