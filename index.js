const mongoose = require('mongoose');
const app= require('./app');



app.listen(app.get('port'), ()=>{
    console.log("conected to port", app.get('port'));
});