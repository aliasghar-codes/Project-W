import mongoose from "mongoose";

const dataItemSchema = new mongoose.Schema({
    sNo: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    first: {
        type: Number,
        required: true
    },
    second: {
        type: Number,
        required: true
    }
});

const billSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    draw_name: {
        type: String,
        required: true
    },
    draw_end_date: {
        type: String,
        required: true
    },
    bill_creation_date: {
        type: String,
        required: true
    },
    data: {
        type: [dataItemSchema],
        required: true
    }
});

const billModel = mongoose.model("Bills", billSchema);

export default billModel;