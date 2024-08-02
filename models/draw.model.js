import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const drawModel = mongoose.model("Draw", drawSchema)

export default drawModel;