const mongoose = require('mongoose');

const schema = mongoose.Schema;

const gySchema = new schema({
    name: {
        type:String,
        require:[true,'El nombre es obligatorio'],
    },
    train:{
        type:String,
        required:[true,'¡Tren de entreno requerido!'],
        enum:['Superior','Inferior'],
    },
    bodyPart:{
        type:String,
        required:[true,'¡Parte del cuerpo requerida!'],
        enum:{
            values:['Espalda','Hombro','Biceps','Triceps','Antebrazo','Pierna','Gluteo','Pantorrilla'],
            message:"las partes del cuerpo son: Espalda, Hombro,Biceps,Triceps,Antebrazo,Pierna,Gluteo y Pantorrilla",
        },
    },
    Description:String,
    place:String,
    img:String,
    goal:String,
    achieved:String,
    verifiedAt:Array,
    createdAt:Date,
});

gySchema.pre('save', function(next) {
    if(!this.createdAt){
        this.createdAt = Date.now();
    }
    next();
});

module.exports = mongoose.Model('load', gySchema);