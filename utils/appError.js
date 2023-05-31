class AppError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name.status = `${statusCode}`.startsWith("4") ? 'fail' : 'error';
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;