const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const back = require("./src/back/VehiclesAPI");

const port = process.env.PORT || 1234;

const app = express();
app.use(bodyParser.json());

back(app);

app.use("/", express.static("./public"));

// SERVER READY

app.listen(port, () => {
		console.log("server ready");
});

console.log("Starting server...");