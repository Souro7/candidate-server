let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let apiRoutes = require('./router');

let app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from server'));

app.listen(port, () => {
    console.log("Running server on port: "+ port);
});
//
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
