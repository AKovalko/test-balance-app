module.exports = function errorHandler(err, req, res, next) {
    res.status(400);
    res.json({
        error: err.message,
    });
};
