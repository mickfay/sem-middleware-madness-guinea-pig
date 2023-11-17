exports.urlLogger = (req, res, next) => {
    const { originalUrl } = req;
    console.info(originalUrl)
    next()
};
