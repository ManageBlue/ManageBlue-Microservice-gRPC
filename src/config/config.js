module.exports = {
    port: process.env.PORT || 5005,
    port_gRPC: process.env.PORT_GRPC || 50051,
    url: process.env.URL || "localhost",
    secret: process.env.JWT_SECRET || "local development secret"
};