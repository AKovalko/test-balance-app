const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const { Umzug, SequelizeStorage } = require("umzug");

const routes = require("./routes");
const sequelizeInstance = require("./common/database/config");
const errorMiddleware = require("./middlewares/error.middleware");
const logMiddleware = require("./middlewares/log.middleware");

class App {
    APP_PREFIX = "/";
    app = express();
    sequelize;
    constructor() {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.sequelize = sequelizeInstance;
        this.connectToDatabase();
        this.initializeMigrations();
    }

    async initializeMigrations() {
        console.log("🚀 Running migrations...");
        const umzug = new Umzug({
            migrations: { glob: "src/common/database/migrations/*.js" },
            context: this.sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ sequelize: this.sequelize }),
            logger: console,
        });
        // await umzug.down();
        await umzug.up();
    }

    initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    initializeRoutes() {
        this.app.use(this.APP_PREFIX, routes);
    }

    initializeErrorHandling() {
        this.app.use(logMiddleware.logRequests);
        this.app.use(logMiddleware.logErrors);
        this.app.use(errorMiddleware);
    }

    listen(port) {
        this.app.listen(+port, () => {
            console.log(`🚀 Server started on ${port.toString()} port.`);
        });
    }

    async connectToDatabase() {
        console.log("🚀 Connecting to the database...");
        try {
            await this.sequelize.authenticate();
            // await this.sequelize.sync();
            console.log("✅ Connection has been established successfully.");
        } catch (e) {
            console.error("❌ Unable to connect to the database:", e);
        }
    }
}

module.exports = new App();
