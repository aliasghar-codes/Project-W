import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./database/dbConnection.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import MongoDBStore from 'connect-mongodb-session';
import routes from "./routes/primary.route.js";
import drawRoutes from "./routes/draw.route.js";
import settingRoutes from "./routes/setting.route.js";

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
    uri: process.env.MONGO_URL,
    collection: 'sessions'
});

const app = express();
config({ path: "./config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "Right now don't have secret key",
    resave: false,
    saveUninitialized: true,
    store: store
}))

app.use("/", routes);
app.use("/draw", drawRoutes);
app.use("/setting", settingRoutes);

connectDB();

export default app