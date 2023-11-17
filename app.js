const express = require("express");
const bodyParser = require('body-parser')

const { authenticateUser } = require("./authenticateUser");
const { urlLogger } = require("./urlLogger");
const app = express();
const morgan = require("morgan");

app.use(express.json())

app.use(morgan((tokens, req, res) => {

    console.log([tokens.method(req, res), tokens.status(req,res), tokens['response-time'](req,res)].join(' - '))

}))

app.use(express.static('public'))

app.use((req, res, next) => {
    console.info(req.method)
    next()
})

app.get(
    "/api/cats/:id",
    (req, res, next) => {
        const { id } = req.params;

        if (id === "666") {
            next('route')
        } else next();
    },
    (req, res) => {
        res.status(200).send({ msg: "Im the first cat route" });
    }
);

app.get("/api/cats/:id", (req, res) => {
    res.status(200).send({ msg: "Im the demon cat" });
});

app.post("/api/login", authenticateUser, urlLogger, (req, res, next) => {
    console.log('blap')
    res.status(200).send({ msg: "Here are the secrets" });
});

app.post("/api/text-endpoint", bodyParser.text(), (req, res, next) => {
    const textPayload = req.body
    res.status(200).send({text : textPayload})
});

app.use((err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({ msg: "No secrets for you" });
    }
});

module.exports = app;
