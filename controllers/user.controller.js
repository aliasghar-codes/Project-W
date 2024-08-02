import userModel from "../models/user.model.js"

export const userRegister = async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.render("signup", { message: "Please fill full form" });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.render("signup", { message: "User Already Registered" });
        }

        const newUser = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });

        auth(req, res, newUser);
    } catch (error) {
        console.log("I am register function", error);
        res.redirect("/");
    }
}

export const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", { message: "Please fill full form" })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.render("login", { message: "User not registered" });
        }

        if (user.password === password) {
            auth(req, res, user);
        } else {
            return res.render("login", { message: "Email or Password is Incorrect" });
        }

    } catch (error) {
        console.log("I am login function", error);
        res.redirect("/");
    }
}

const auth = (req, res, user) => {
    req.session.isLoggedIn = true;
    req.session.username = user.first_name;
    return res.redirect("/");
}

export const userLogout = async (req, res) => {
    try {
        req.session.destroy();

        setTimeout(() => {
            res.redirect("/");
        }, 1000);

    } catch (error) {
        console.log("I am logout function", error);
        res.redirect("/");
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;
        const state = req.session.isLoggedIn;
        const userName = req.session.username;

        if(!email || !password || !cpassword){
            return res.render("changePassword", { message: "Please fill full form ", state, userName });
        }

        if(password !== cpassword){
            return res.render("changePassword", { message: "Password and confirm password is not same", state, userName });
        }

        const user = await userModel.findOne({ email });

        if(!user){
            return res.render("changePassword", { message: "check your email and try again! ", state, userName });
        }

        await userModel.findOneAndUpdate({ email }, { password: password })

        res.redirect("/");

    } catch (error) {
        console.log("I am change user password function: ", error);
        res.redirect("/");
    }
}