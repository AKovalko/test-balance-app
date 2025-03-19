const logRequests = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const logErrors = (err, req, res, next) => {
    if (err) {
        console.error(err.stack);
    }
    next(err);
};

module.exports = {
    logRequests,
    logErrors,
};
