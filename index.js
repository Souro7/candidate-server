let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const ws = require('ws');

let apiRoutes = require('./router');

let app = express();

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => console.log(message));
});

var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from server'));

const server = app.listen(port, () => {
    console.log("Running server on port: "+ port);
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

//connect to mongoose
const dbPath = 'mongodb://localhost/airtelx';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected to db');
}, error => {
    console.log(error, 'error connecting to db');
});
