require('dotenv').config();
const db = require('../models');
const Package = db.packages;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Package.findAll({where :{status:"Active"},include: ["created", "updated",'price','rooms']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { package_id } = req.params;

        try {
            const package = await Package.findOne({
                where: { package_id },
                include: ["created", "updated",'price','rooms']
            });

            if(!package)
                return res.status(400).send({
                    message: `No package found with the package_id ${package_id}`
                });

            return res.send(responseSuccess(package));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  min_guest, max_guest, title, pricing_id, room_type_id, description, created_by, updated_by } = req.body;
        created_by = req.user.id;
        if(min_guest > max_guest)
            return res.status(406).send(responseError(`Minimum guest must not be greater than Maximum Guest`));

        try{
            let newPackage = await Package.create({
                min_guest,
                max_guest,
                title,
                pricing_id,
                room_type_id,
                description,
                created_by,
                updated_by 
            });

            let result = await Package.findByPk(newPackage.package_id, {include: ["created",'price','rooms']});

            return res.status(201).send(responseSuccess(result, `Package created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { package_id } = req.params;
        let { min_guest, title, max_guest, pricing_id, room_type_id, description, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let package = await Package.findOne({
                where: {
                    package_id
                }
            });

            if(!package)
                return res.status(400).send(responseError(`Pacakage with an package_id ${package_id} doesn't exist`));
        
            if(title)
                package.title = title;

            if(max_guest)
                package.max_guest = max_guest;

            if(min_guest)
                package.min_guest = min_guest;
            
            if(description)
            package.description = description;

            if(pricing_id)
            package.pricing_id = pricing_id;

            if(room_type_id)
            package.room_type_id = room_type_id;

            if(updated_by)
                package.updated_by = updated_by;

            if(status)
                package.status = status;

            package.save();

            let result = await Package.findByPk(package.package_id, {include: ['created', 'updated']});


            return res.send(responseSuccess(result,`Package ${package_id} has been updated!`));
        } catch (err){ console.log(err);res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { package_id } = req.body;

        if(!package_id)
            return res.status(400).send(responseError(`Please provide valid Package id that you are trying to delete.`));
        
        try {
            let package = await Package.findOne({
                where: {
                    package_id
                }
            });

            if(!package)
                return res.status(400).send(responseError(`Package with the id ${package_id} doesn't exist!`));

            // await user.destroy();

            package.status = 'Inactive';
            package.save();

            return res.send(responseSuccess(package,`Package ${package_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};

// TODO FIX ROOM TYPE ASSOC = NULL