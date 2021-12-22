const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./models/deadlines.proto";
let protoLoader = require("@grpc/proto-loader");
const config = require("./config/config")


const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

let packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const deadlinesProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let deadlines = [
    {id: "1", title: "RSO zagovor 1", date: "2021-01-04 14:15", projectId: "TODO"},
    {id: "2", title: "RSO zagovor 2", date: "2021-01-11 14:45", projectId: "TODO"},
    {id: "3", title: "RSO kolokvij", date: "2021-01-11 12:00", projectId: "TODO"},
    {id: "4", title: "MAT kolokvij", date: "2021-01-13 19:00", projectId: "TODO2"},
];

server.addService(deadlinesProto.DeadlineService.service, {
    getAllDeadlines: (_, callback) => {
        callback(null, {deadlines: deadlines});
    },
    getProjectDeadlines: (_, callback) => {

        const reqId = _.request.projectId;
        const deadlineItem = deadlines.filter(({projectId}) => projectId === reqId);
        console.log(deadlineItem)

        callback(null, {deadlines: deadlineItem});

    },
});

server.bindAsync(
    `${config.url}:${config.port}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log(`Server running at http://${config.url}:${port}`);
        server.start();
    }
);
