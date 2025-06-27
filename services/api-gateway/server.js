const path = require("path");
const gateway = require("express-gateway");

require("dotenv").config({path: path.join(__dirname, ".env")});

gateway().load(path.join(__dirname, "config")).run();
