const { addgitDetailsValidation } = require('../common/validation')
const {errorGanerator} = require('../common/errorHandlar')
const status  = require('http-status')
const requestPromise = require('request-promise')
const Sequelize = require('sequelize')
const sequelize = require('../repository/db')
const repoDetailsSchema = require('../model/repoDetails')(sequelize, Sequelize)
const comCon = require('../constants/comCon')

repoDetailsSchema.sync()
const addGithubData = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = addgitDetailsValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))
            const gitHubDetails = await callExternalApi(body.url)

            const modifiedResponse = await generateDataForInsert(gitHubDetails)
            const insertedData = await addDataInDatabase(modifiedResponse)
            return resolve(insertedData)
        }
        catch(error) {
            return reject(error)
        }
    })
}

function  addDataInDatabase(gitHubData) {
    return new Promise(async (resolve, reject) => {
    try {
        const responseArray = []
        for (const details of gitHubData) {
            const response = await repoDetailsSchema.create(details)
            responseArray.push(response)
        }
        return resolve(responseArray)
    } catch (error) {
        return reject(error)
    }
})
}

function generateDataForInsert(gitHubDetails) {
    gitHubDetails = JSON.parse(gitHubDetails)

    const newResponse = []
    gitHubDetails.forEach(details => {
        const tempJson = {}
        tempJson[comCon.FIELD_ID] = details.id
        tempJson[comCon.FIELD_NAME] = details.name
        tempJson[comCon.FIELD_HTML_URL] = details.html_url
        tempJson[comCon.FIELD_DESCRIPTION] = details.description
        tempJson[comCon.FIELD_CREATED_AT] = new Date(details.created_at)
        tempJson[comCon.FIELD_OPEN_ISSUES] = details.open_issues
        tempJson[comCon.FIELD_WATCHERS] = details.watchers
        tempJson[comCon.FIELD_OWNER] = {}
        tempJson[comCon.FIELD_OWNER][comCon.FIELD_ID] = details.owner.id
        tempJson[comCon.FIELD_OWNER][comCon.FIELD_AVTAR_URL] = details.owner.avatar_url
        tempJson[comCon.FIELD_OWNER][comCon.FIELD_HTML_URL] = details.owner.html_url
        tempJson[comCon.FIELD_OWNER][comCon.FIELD_TYPE] = details.owner.type
        tempJson[comCon.FIELD_OWNER][comCon.FIELD_SITE_ADMIN] = details.owner.site_admin
        newResponse.push(tempJson)
    })
    return newResponse
}

async function callExternalApi(api) {
    let apiOptions = {
        method: 'get',
        url: api,
        headers: {'user-agent': 'node.js'}
    }
    try {
        const response = await requestPromise(apiOptions)
        return response
    } catch(error) {
        throw error
    }
}

module.exports = {
    addGithubData
}