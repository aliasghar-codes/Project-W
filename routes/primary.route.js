import express from "express";
import { userRegister, userLogin, userLogout, changeUserPassword } from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/checkAuth.js"
import { getDrawData, settingFunc } from "../controllers/draw.controller.js"
import drawModel from "../models/draw.model.js";

const router = express.Router();

router.get("", (req, res) => {
    (async function nothing(){
        const userName = req.session.username;
        const state = req.session.isLoggedIn;
        const draws = await drawModel.find({  });
        res.render("home", { state, userName, draws });
    })()
});

router.get("/login", (req, res) => {
    res.render("login", { message: "hi" });
});

router.post("/login-user", userLogin);

router.get("/register", (req, res) => {
    res.render("signup", { message: "hi" });
});

router.post("/register-user", userRegister);

router.get("/logout", authCheck, userLogout)

router.get("/search", authCheck, getDrawData);

router.get("/settings", authCheck, (req, res) => {
    const state = req.session.isLoggedIn;
    const userName = req.session.username;

    res.render("settings", { state, userName });
});

router.get("/setting/:page", authCheck, settingFunc);

router.post("/change-password", changeUserPassword)

export default router;