const Sequelize = require('sequelize')
const sequelize = require('../repository/db')
const repoDetailsSchema = require('../model/repoDetails')(sequelize, Sequelize)
const {errorGanerator} = require('../common/errorHandlar')
const status  = require('http-status')
const comCon = require('../constants/comCon')

repoDetailsSchema.sync()
const fetchGithubData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await repoDetailsSchema.findAll({ where: { id: id}})
            if (response === null) return reject(errorGanerator(status.NO_CONTENT, comCon.MSG_NO_CONTENT))
            response = JSON.parse(JSON.stringify(response))
            return resolve(response)
        }
        catch(error) {
            return reject(error)
        }
    })
}

module.exports = {
    fetchGithubData
}