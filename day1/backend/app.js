import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import router from "./server/routes/users";

const port = 3000;

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.get("*", (req, res) => {
    res.status(200).json({
        message: `Welcome to learn PREN tutorial`
    });
});

app.listen(port, () => {
    console.log(`The server has started through port ${port}`);
});