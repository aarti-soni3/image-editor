module.exports.errorMiddlware = (err, req, res, next) => {

    const statusCode = err.statusCode;
    const message = err.message;
    console.log('in err middlware : ', statusCode, message)

    res.status(statusCode).json({ message: message });
}