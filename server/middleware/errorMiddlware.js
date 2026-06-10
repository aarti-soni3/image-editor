module.exports.errorMiddlware = (err, req, res, next) => {

    const statusCode = err.statusCode|| 500;
    const message = err.message;
    console.log('in err middlware : ', statusCode, message)

    return res.status(statusCode).json({ message: message });
}