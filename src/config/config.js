module.exports = {
    port: process.env.PORT || 5005,
    url: process.env.URL || "localhost",
    secret: process.env.JWT_SECRET || "local development secret"
};