import os from "os";

export class ApiError extends Error {
    constructor(message, statusCode= 404) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500
    if (err instanceof ApiError) {
        res.status(statusCode).json({
            message: err.message,
        });
        return;
    }
    res.status(statusCode).json({
        message:err.message,
    });
}