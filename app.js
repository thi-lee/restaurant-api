const express = require('express');
const app = express();
const PORT = process.env.PORT || 4201;

const client = require('./config/db');

const url = process.env.MONGODB_URI;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
  });

app.get('/', (req, res) => { res.send("hello this is app.get()") });

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