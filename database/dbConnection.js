import mongoose from "mongoose"

const connectDB = () => {

    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch(error => console.log("Error occured while connecting to database whichis: ", error))

};

export default connectDB;