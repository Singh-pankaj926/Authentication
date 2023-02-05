const routeNotFound = (req, res) => {
    res.status(404).send(`Not Found: ${req.originalUrl}! Please Recheck And Try Again.`);
};

module.exports = { routeNotFound }