require('dotenv/config');

module.exports = {
    isAuthenticated: async (req, res, next) => {
        const { apiKey } = req.query;

        if(!apiKey) 
            return res.status(401).send({
                message: 'Must be authenticated with an API Key!'
            });

        if(apiKey === process.env.API_KEY)
            return next();
        
        return res.status(401).send({
                message: 'API Key is invalid'
            });
    }

}