const express = require('express');
const app = express();
const PORT = process.env.PORT || 4201;

require('dotenv').config();
const client = require('./config/db');
const url = process.env.MONGODB_URI;

app.use(express.json()); 

// const cors = require('cors');
// app.use(cors(
//   
// ));
// app.use((req, res, next) => {
//     console.log('hello')
//     res.header("Content-Type", "application/json");
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST, PUT");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

app.get('/', (req, res) => { 
    res.send({kq: 1})
 });

client.connect(url, (err) => {
    if (err) {
        console.log("Unable to connect to mongodb");
        process.exit();
    } else {
        app.listen(PORT, (err) => {
            console.log(`Listening to localhost: ${PORT}`)
        })
        const control_controllers = require('./controllers/control_controllers');
        app.use('/', control_controllers);
    }
});