import express from "express";
import bodyParser from "body-parser";
import { corsManager } from "./cors-manager.js";
import { ASSETS_FOLDER } from "./globals.js";
import { router } from "./routes.js";

const PORT = process.env.PORT;
init();

function init() {
    const app = express();

    app.use(
        bodyParser.json(),
        corsManager,
    );
    app.use(express.static(ASSETS_FOLDER))

    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`);
        router(app);
    });
}
