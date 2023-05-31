const mongoose = require('mongoose');
const app= require('./app');

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


const server = app.listen(app.get('port'), ()=>{
    console.log("conected to port", app.get('port'));
});

process.on('unhandledException', err =>{
    console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
    process.exit(1);
    });
});