const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./models/deadlines.proto";
const config = require("./config/config")

// demonstration of gRPC client call

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const DeadlineService = grpc.loadPackageDefinition(packageDefinition).DeadlineService;

const client = new DeadlineService(
    `${config.url}:${config.port}`,
    grpc.credentials.createInsecure()
);

client.getProjectDeadlines(
    {
        projectId: "TODO",
    },
    (error, deadline) => {
        if (error) throw error;
        else console.log(deadline);
    }
);


/*client.getAllDeadlines({}, (error, deadlines) => {
    if (error) throw error
    else console.log(deadlines);
});*/