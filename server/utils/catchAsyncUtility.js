module.exports.catchAsync = (fn) => {
    return ((req, res, next) => {
        const promise = fn(req, res, next)

        if (promise && promise.catch)
            promise.catch(next);
    })
}