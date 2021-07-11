const express = require('express')
const app = express()
require('./db/conn')
const router = require('./routes/route')
const port = 3000

app.use(express.json())
app.use('/', router)



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

