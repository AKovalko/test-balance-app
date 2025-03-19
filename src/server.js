const dotenv = require("dotenv");
dotenv.config();
const app = require("./app.js");

const port = process.env.PORT ?? 9000;
app.listen(+port);
