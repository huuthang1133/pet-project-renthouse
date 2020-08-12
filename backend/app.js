require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true,
    useUnifiedTopology: true})

// mongoose.connection.on('connected', function(){
//     console.log('conneted')
// })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 3000

let userRoute = require('./api/routes/user.route');
let transRoute = require('./api/routes/transaction.route');
let billRoute = require('./api/routes/bill.route');
let cmtRoute = require('./api/routes/comment.route');
let supportRoute = require('./api/routes/support.route');
let logintRoute = require('./api/routes/login.route');


//Handling CORS (Cross Origin Resource Sharing)
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'https://0ph5c.csb.app/');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Content-Type, Authorization')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE')
    next()
})


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/transactions', transRoute);
app.use('/users', userRoute);
app.use('/bills', billRoute);
app.use('/comments', cmtRoute);
app.use('/supports', supportRoute);
app.use('/login', logintRoute);







// Handling Errors
app.use((req,res,next)=>{
    const error = new Error('Not Found!');
    error.status =  404;
    next(error)
})
app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

