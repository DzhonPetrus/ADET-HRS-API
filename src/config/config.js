require('dotenv/config');
module.exports = {
    development: {
        databases: {
            adet_hrs: {
                database: process.env.DB,
                username: process.env.USER,
                password: process.env.PASSWORD,
                host: process.env.HOST,
                port: process.env.PORT,
                dialect: process.env.DIALECT
            }
        }
    },
    production: {
        databases: {
            adet_hrs: {
                database: process.env.DB,
                username: process.env.USER,
                password: process.env.PASSWORD,
                host: process.env.HOST,
                port: process.env.PORT,
                dialect: process.env.DIALECT
            }
        }
    }
}