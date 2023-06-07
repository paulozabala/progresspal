const mongoose = require('mongoose');
const dotenv = require('dotenv');

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
const cors = require('cors');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController.js');
const AppError = require('./utils/appError');

//import routes
//const userController = require('./controllers/userController.js');
const eventRoutes = require('./routes/eventRoutes.js');
//const authController = require('./controllers/authController.js');

//Global middlewares
//Set Security Http headers
app.use(helmet());

//Config dotenv
dotenv.config();

//Config port
app.set('port', process.env.PORT || 9000);


//middlewares
if(process.env.NODE_ENV = 'development'){
    app.use(morgan('tiny'));
}

//set conn with DB parameters
const dir = process.env.DATABASE;
const urlConn = dir.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const options = {useNewUrlParser:true, useUnifiedTopology:true};
mongoose.connect(urlConn, options).then(()=>{
    console.log("Connected to DB");
});

//Limit request form same IP
const limiter = rateLimit({
    max: 100,
    windowsMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour.',
});

app.use('/api', limiter);

//Config app
//Body parser, reading data from body into req.body and setting cors
app.use(cors());
app.use(express.json({ limit: '10kb'}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss - related html code injection
app.use(xss());

//Prevent parameter pollution
app.use(
    hpp({
        whitelist:[],
    })
);




//Routes config
app.use('/api/v1', eventRoutes);
// Añadir prefijos a rutas / Cargar rutas
app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the API'
    });
});

app.all('*', (req, res, next) =>{
  next(new AppError(`Can't find ${req.originalUrl} on this server`,400));
});
//app.use('/api/v1/users', userController);
//app.use('/api/v1/auth', authController);

//Route for handling Errors
app.use(globalErrorHandler);


module.exports = app;