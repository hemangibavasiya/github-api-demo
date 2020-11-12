const Sequelize = require('sequelize')

    const sequelize = new Sequelize('githubDemo', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })

module.exports = sequelize