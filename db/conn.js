const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/shopcart", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection with database successful")
}).catch((err) => {
    console.log("No connection with database")
})