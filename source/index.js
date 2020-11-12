const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')



dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT, () => console.log('server is up now'))

const gitRoutes = require('./routes/git')
app.use('', gitRoutes)

