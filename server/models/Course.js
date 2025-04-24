import mongoose, { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema({
    user:{
        type : Schema.Types.ObjectId,
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: Strin
    },
    date:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Course", CourseSchema);


//idk what to do cuz the courses from API like udemy
