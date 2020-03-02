const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const {migrate,data} = require('./controllerMigrate/index')

const port = process.env.PORT ? process.env.PORT : 4334
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//cors

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, key, id");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//main routing
app.get('/migrate', migrate)
app.use('/postupdate', data.postupdate)
app.use('/memberupdate', data.memberupdate)

app.listen(port, () => { console.log(`server running on ${port}`) })