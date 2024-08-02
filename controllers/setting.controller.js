import billModel from "../models/bill.model.js";
import excelJs from "exceljs";
import open from "open";


export const getTotalData = async (req, res) => {
    try {
        const workBook = new excelJs.Workbook();
        const { draw_name } = req.body;

        const bills = await billModel.find({ draw_name })

        if (bills.length < 1) {
            return res.render("noData")
        };

        const data = [];
        const drawName = bills[0].draw_name;
        const drawDate = bills[0].draw_end_date;
        let firstTotal = 0;
        let secondTotal = 0;

        bills.forEach(bill => {
            bill.data.forEach(obj => {
                data.push(obj);
            })
        })

        data.forEach(obj => {
            firstTotal += obj.first;
            secondTotal += obj.second;
        })

        let bothTotal = firstTotal + secondTotal;

        const filePath = "./files/data.xlsx";

        await workBook.xlsx.readFile(filePath);

        workBook.removeWorksheet('Bill');

        const newWorkSheet = workBook.addWorksheet('Bill');

        newWorkSheet.columns = [
            { key: "number", width: 10, alignment: { horizontal: 'left', vertical: 'middle' } },
            { key: "first", width: 10, alignment: { horizontal: 'right', vertical: 'middle' } },
            { key: "second", width: 10 },
            { key: "total", width: 10 }
        ]

        const heading = newWorkSheet.addRow({ first: "Total Sale" });
        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: drawName, total: `Draw Date: ${drawDate}` });
        const headerRow = newWorkSheet.addRow({ number: "Number", first: "1st", second: "2nd" });

        heading.eachCell(cell => {
            cell.font = { size: 24 }
        })

        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'd9dfff' }
            },
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
        })

        data.forEach(obj => {
            let row = newWorkSheet.addRow(obj);
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            })
        })

        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: "Total", first: firstTotal, second: secondTotal, total: bothTotal });

        await workBook.xlsx.writeFile(filePath)

        open(filePath);

        res.redirect("/setting/total-sale");

    } catch (error) {
        console.log("I am getTotalData function", error);
        res.redirect("/");
    }
};

export const getTotalPartyData = async (req, res) => {
    try {
        const workBook = new excelJs.Workbook();
        const { draw_name, bill_name } = req.body;

        const bill = await billModel.findOne({ customer_name: bill_name, draw_name });

        const data = [];
        const drawName = bill.draw_name;
        const drawDate = bill.draw_end_date;
        let firstTotal = 0;
        let secondTotal = 0;

        bill.data.forEach(obj => {
            data.push(obj)
        })

        data.forEach(obj => {
            firstTotal += obj.first;
            secondTotal += obj.second;
        })

        let bothTotal = firstTotal + secondTotal;

        const filePath = "./files/data.xlsx";

        await workBook.xlsx.readFile(filePath);

        workBook.removeWorksheet('Bill');

        const newWorkSheet = workBook.addWorksheet('Bill');

        newWorkSheet.columns = [
            { key: "number", width: 10, alignment: { horizontal: 'left', vertical: 'middle' } },
            { key: "first", width: 10, alignment: { horizontal: 'right', vertical: 'middle' } },
            { key: "second", width: 10 },
            { key: "total", width: 10 }
        ]

        const heading = newWorkSheet.addRow({ first: "Total Party Data" });
        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: `Customer Name: ${bill_name}` });
        newWorkSheet.addRow({ number: `Draw Name: ${drawName}`, total: `Draw Date: ${drawDate}` });
        const headerRow = newWorkSheet.addRow({ number: "Number", first: "1st", second: "2nd" });

        heading.eachCell(cell => {
            cell.font = { size: 24 }
        })

        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'd9dfff' }
            },
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
        })

        data.forEach(obj => {
            let row = newWorkSheet.addRow(obj);
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            })
        })

        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: "Total", first: firstTotal, second: secondTotal, total: bothTotal });

        await workBook.xlsx.writeFile(filePath)

        open(filePath);

        res.redirect("/setting/total-party-sale");

    } catch (error) {
        console.log("I am get Total Party Data function", error);
        res.redirect("/");
    }
}

export const getTotalBills = async (req, res) => {
    try {
        const workBook = new excelJs.Workbook();
        const { draw_name, bill_name } = req.body;

        const bills = await billModel.find({ customer_name: bill_name, draw_name });

        const data = [];
        const drawName = bills[0].draw_name;
        const drawDate = bills[0].draw_end_date;
        let firstTotal = 0;
        let secondTotal = 0;

        bills.forEach(bill => {
            bill.data.forEach(obj => {
                data.push(obj)
            })
        })

        data.forEach(obj => {
            firstTotal += obj.first;
            secondTotal += obj.second;
        })

        let bothTotal = firstTotal + secondTotal;

        const filePath = "./files/data.xlsx";

        await workBook.xlsx.readFile(filePath);

        workBook.removeWorksheet('Bill');

        const newWorkSheet = workBook.addWorksheet('Bill');

        newWorkSheet.columns = [
            { key: "number", width: 10, alignment: { horizontal: 'left', vertical: 'middle' } },
            { key: "first", width: 10, alignment: { horizontal: 'right', vertical: 'middle' } },
            { key: "second", width: 10 },
            { key: "total", width: 10 }
        ]

        const heading = newWorkSheet.addRow({ first: "Bills Report" });
        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: `Customer Name: ${ bill_name }` });
        newWorkSheet.addRow({ number: `Draw Name: ${drawName}`, total: `Draw Date: ${drawDate}` });
        const headerRow = newWorkSheet.addRow({ number: "Number", first: "1st", second: "2nd" });

        heading.eachCell(cell => {
            cell.font = { size: 24 }
        })

        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'd9dfff' }
            },
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
        })

        data.forEach(obj => {
            let row = newWorkSheet.addRow(obj);
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            })
        })

        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: "Total", first: firstTotal, second: secondTotal, total: bothTotal });

        await workBook.xlsx.writeFile(filePath)

        open(filePath);

        res.redirect("/setting/bill-sheet");

    } catch (error) {
        console.log("I am get Total Bills function", error);
        res.redirect("/");
    }
}

export const printHomeData = async (req, res) => {

    try {

        const workBook = new excelJs.Workbook();
        const { data, draw_name, draw_date, customer_name } = req.body;

        let firstTotal = 0;
        let secondTotal = 0;

        data.forEach(obj => {
            firstTotal += obj.first;
            secondTotal += obj.second;
        })

        let bothTotal = firstTotal + secondTotal;

        const filePath = "./files/data.xlsx";

        await workBook.xlsx.readFile(filePath);

        workBook.removeWorksheet('Bill');

        const newWorkSheet = workBook.addWorksheet('Bill');

        newWorkSheet.columns = [
            { key: "number", width: 10, alignment: { horizontal: 'left', vertical: 'middle' } },
            { key: "first", width: 10, alignment: { horizontal: 'right', vertical: 'middle' } },
            { key: "second", width: 10 },
            { key: "total", width: 10 }
        ]

        const heading = newWorkSheet.addRow({ first: "Bill" });
        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: `Customer Name: ${customer_name}` });
        newWorkSheet.addRow({ number: `Draw Name: ${draw_name}`, total: `Draw Date: ${draw_date}` });
        const headerRow = newWorkSheet.addRow({ number: "Number", first: "1st", second: "2nd" });

        heading.eachCell(cell => {
            cell.font = { size: 24 }
        })

        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'd9dfff' }
            },
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
        })

        data.forEach(obj => {
            let row = newWorkSheet.addRow(obj);
            row.eachCell(cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            })
        })

        newWorkSheet.addRow({ number: "", first: "", second: "", total: "" });
        newWorkSheet.addRow({ number: "Total", first: firstTotal, second: secondTotal, total: bothTotal });

        await workBook.xlsx.writeFile(filePath)

        open(filePath);

        return res.status(200).json({ message: "Success"});
    }catch(error){
        console.log(error);
        return res.redirect("/")
    }
}

export const getBills = async (req, res) => {

    const { draw } = req.body;

    const bills = await billModel.find({ draw_name: draw });

    if (bills.length < 1) {
        return res.status(400).json({ message: "No bills found! " })
    };

    const billArray = [];

    bills.forEach(obj => {
        const name = obj.customer_name;
        billArray.push(name);
    })

    const billNames = billArray.reduce((arr, current) => {
        if (!arr.includes(current)) {
            arr.push(current);
        }

        return arr;
    }, []);

    res.status(200).json({ message: "this is the data you want", billNames });
}

export const getAllBills = async (req, res) => {

    const { draw } = req.body;

    const bills = await billModel.find({ draw_name: draw });

    if (bills.length < 1) {
        return res.status(400).json({ message: "No bills found! " })
    };

    const billNames = [];

    bills.forEach(obj => {
        const name = obj.customer_name;
        billNames.push(name);
    })

    res.status(200).json({ message: "this is the data you want", billNames });
}