const status  = require('http-status')
const router = require('express').Router()
const {addGithubData} = require('../services/addGithubDetails')
const { fetchGithubData } = require('../services/getGitHubDetails')
const urlCon = require('../constants/urlCon')
const comCon = require('../constants/comCon')

router.post(urlCon.URL_ADD_GITHUB_DATA, async(req,res) => {
    try {
        const response = await addGithubData(req.body)
        res.status(status.OK).send(response)
    }
    catch(error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.get(urlCon.URL_FETCH_GITHUB_REPO_DETAILS, async(req,res) => {
    try {
        const id = Number(req.params[comCon.FIELD_ID])
        const response = await fetchGithubData(id)
        res.status(status.OK).send(response)
    } 
    catch(error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

module.exports = router