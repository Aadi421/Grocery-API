const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose')

const app = express();

app.use(express.urlencoded());
app.use(express.json({limit: "100mb"}));

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))


app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if (err) {
        console.log(`error in starting server:${err}`);
    }
    console.log(`server is up and running at port:${port}`);
    console.log('http://localhost:8000');
});

