const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./models/deadlines.proto";
let protoLoader = require("@grpc/proto-loader");
const config = require("./config/config")

//----------------------------------------------------------------------------------------------------------------------
//express

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const express_server = express();

// cors settings
let corsOptions = {
    //origin: url + ":" + 8080
    origin: '*'
};
express_server.use(cors(corsOptions));

// parse requests of content-type - application/json
express_server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
express_server.use(bodyParser.urlencoded({ extended: true }));

express_server.listen(config.port, () => {
    console.log(`Express_Server running on port ${config.port}!`);
});

express_server.get("/", (req, res) => {
    res.json({ message: "Express_Server server is running!" });
});

//----------------------------------------------------------------------------------------------------------------------


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
    {id: "1", name: "RSO zagovor 1", start: "2022-01-04 14:15", projectId: "61c4580b87283c4e5b3a01cb"},
    {id: "2", name: "RSO zagovor 2", start: "2022-01-11 14:45", projectId: "61c4580b87283c4e5b3a01cb"},
    {id: "3", name: "RSO kolokvij", start: "2022-01-11 12:00", projectId: "61c4580b87283c4e5b3a01cb"},
    {id: "4", name: "MAT kolokvij", start: "2022-01-13 19:00", projectId: "61c4617a87283c4e5b3a01f3"},
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
    `${config.url}:${config.port_gRPC}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log(`Server running at http://${config.url}:${port}`);
        server.start();
    }
);
