

const express = require("express")
const ExpressError = require("./expressError")
const middleware = require("./middleware")
const morgan = require("morgan")
const itemRoutes = require("./itemRoutes")


const app = express();

app.use(express.json())

// app.use(middleware.logger)
app.use(morgan('dev'))

app.use('/items', itemRoutes)






//404 handler
app.use(function (err, req, next){
    const e = new ExpressError("Not Found", 404)
    return next(e)
})


// generic error handler
app.use(function (err, req, res, next){
    // the default status is 500 Internal Server Error
    let status = err.status || 500
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error:{ message, status}    
    })
})



module.exports = app