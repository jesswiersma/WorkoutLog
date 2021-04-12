require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

app.use(Express.json());

const controllers = require('./controllers');

app.use('/log', controllers.logController);
app.use('/user', controllers.userController);

app.use(require("./middleware/validate-jwt"));

app.use('/test', (req, res) => {
    res.send("This is a message from the test endpoint on the server!")
});

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3030, () => {
        console.log(`[Server]: App is listening on 3030.`)
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});

