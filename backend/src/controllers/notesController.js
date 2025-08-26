import Note from "../models/Note.js"

export  async function getAllNotes (req,res) {
    try {
        const notes = await Note.find() // get every note from db
         res.status(200).json(notes);
         
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"Error fetching notes"})
    }
   
}
    
export  async function createNotes (req,res){
    try {
        const {title,content} = req.body;  // get the info from the user
        const note = new Note({title,content}); // put the title, content, data from client to note 

        const savedNote = await note.save(); // save the newly created note to db
        res.status(200).json(savedNote);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"Error fetching notes"})
    }
}

export  async function updateNotes (req,res) {
    try{
        const  {title,content} = req.body;
        const id = req.params.id;

        await Note.findByIdAndUpdate(id,{title,content}) // get the id of the user and update the title and content
        res.status(200).json({message:"Note updated sucessfully"})
    }
    catch (err){

        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteNotes (req,res) {

     try{
        const  {title,content} = req.body;
        const id = req.params.id;

        await Note.findByIdAndDelete(id,{title,content}) // get the id of the user and update the title and content
        res.status(200).json({message:"Note Deleted sucessfully"})
    }
    catch (err){

        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getNotesById (req, res){
     try {
        const id = req.params.id
        const note = await Note.findById(id); // find note with the id
        if(!note){return res.status(404).json({message:"Note not found. Perhaps deleted?"})};
        res.status(200).json(note);
     }
     catch (err){
        console.log(err)
        res.status(404).json({message:"failed to find the note"})
    }
}