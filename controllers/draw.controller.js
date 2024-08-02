import drawModel from "../models/draw.model.js";
import billModel from "../models/bill.model.js"

export const createDraw = async (req, res) => {
    try {

        const { name, date, time } = req.body;
        const state = req.session.isLoggedIn;
        const userName = req.session.username;
        const draws = await drawModel.find({});

        if (!name || !date || !time) {
            return res.render("customDraw", { state, userName, message: "Please Fill Full Form", draws: draws });
        }

        const currentDate = new Date();

        const userDate = new Date(date);

        if (userDate < currentDate) {
            return res.render("customDraw", { state, userName, message: "Please input Valid Date", draws: draws });
        }

        const draw = await drawModel.findOne({ name });

        if (draw) {
            return res.render("customDraw", { state, userName, message: "Draw with this name already exists", draws: draws });
        }

        await drawModel.create({
            name: name,
            date: date,
            time: time
        })

        res.redirect("/");
    } catch (error) {
        console.log("I am create draw function", error);
        res.redirect("/settings");
    }
}

export const deleteDraw = async (req, res) => {
    try {

        const { draw } = req.body;
        const draws = await drawModel.find({});
        const state = req.session.isLoggedIn;
        const userName = req.session.username;

        if (draw == "None") {
            return res.render("customDraw", { state, userName, message: "Please select Draw", draws: draws });
        }
        await drawModel.findOneAndDelete({ name: draw });

        res.redirect("/");
    } catch (error) {
        console.log("I am delete draw function", error);
        res.redirect("/settings");
    }
}

export const settingFunc = async (req, res) => {
    const state = req.session.isLoggedIn;
    const userName = req.session.username;
    const url = req.params.page;

    const bills = await billModel.find({});

        const filteredBills = [];
        const drawNames = [];

        bills.forEach(bill => {
            if (!filteredBills.some(item => item.draw_name === bill.draw_name)) {
                filteredBills.push(bill);
            }
        })

        filteredBills.forEach(bill => {
            drawNames.push(`${bill.draw_name}`);
        })

    if (url === "total-sale") {
        res.render("totalSale", { state, userName, drawNames });
    } else if (url === "total-party-sale") {
        res.render("totalPartySale", { state, userName, drawNames });
    } else if (url === "bill-sheet") {
        res.render("billSheet", { state, userName, drawNames });
    } else if (url === "client-prize-invoice") {
        res.render("clientPrizeInvoice", { state, userName });
    } else if (url === "custom-draw") {
        (async function nothing() {
            const draws = await drawModel.find({});
            res.render("customDraw", { state, userName, message: "hi", draws: draws });
        })()
    } else if (url === "change-password") {
        res.render("changePassword", { state, userName, message: "hi" });
    } else {
        res.render("settings", { state, userName });
    }
}

export const saveBill = async (req, res) => {
    try {
        const { customer_name, draw_name, draw_end_date, bill_creation_date, data } = req.body;

        await billModel.create({ customer_name, draw_name, draw_end_date, bill_creation_date, data });

        return res.json({ message: "Data saved Successfully" });

    } catch (error) {
        console.log("I am save bill function", error);
        res.redirect("/");
    }
}

export const getDrawData = async (req, res) => {
    try {

        const state = req.session.isLoggedIn;
        const userName = req.session.username;

        const bills = await billModel.find({});

        const filteredBills = [];
        const drawNames = [];

        bills.forEach(bill => {
            if (!filteredBills.some(item => item.draw_name === bill.draw_name)) {
                filteredBills.push(bill);
            }
        })

        filteredBills.forEach(bill => {
            drawNames.push(`${bill.draw_name}`);
        })

        res.render("search", { state, userName, drawNames, data: false });
    }catch(error){
        console.log("I am get draw data function", error);
        res.redirect("/");
    }
}

export const getNumberInfo = async (req, res) => {
    try{
        const state = req.session.isLoggedIn;
        const userName = req.session.username;
        const { number, draw_name } = req.body;

        const oldBills = await billModel.find({});

        const filteredBills = [];
        const drawNames = [];

        oldBills.forEach(bill => {
            if (!filteredBills.some(item => item.draw_name === bill.draw_name)) {
                filteredBills.push(bill);
            }
        })

        filteredBills.forEach(bill => {
            drawNames.push(`${bill.draw_name}`);
        })

        const bills = await billModel.find({
            draw_name, data: {
                $elemMatch: {
                    number: number
                }
            }
        })
        
        if(bills.length === 0 || bills.length < 1){
            return res.render("search", { state, userName, drawNames, data: [] });
        }
        
        const data = [];

        bills.forEach(bill => {
            const numbersArray = [];

            bill.data.forEach(data => {
                if(data.number == number){
                    numbersArray.push(data)
                }
            })

            if(numbersArray.length > 0){
                const numberNew = {
                    customer_name: bill.customer_name,
                    first: bill.data[0].first,
                    second: bill.data[0].second,
                    sNo: numbersArray.length,
                    number: number
                }

                data.push(numberNew);
            }
        })

        return res.render("search", { state, userName, drawNames, data: data });
        
    }catch(error){
        console.log("I am get number info function", error);
        res.redirect("/");
    }
}