import mongoose from "mongoose";


// creating a model for the notes

const noteSchema = new mongoose.Schema({
    // every notes has a title and its content
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true,
    },
     
},{timestamps:true})

// Note-  uses above model
const Note = mongoose.model("Note", noteSchema);

export default Note;
