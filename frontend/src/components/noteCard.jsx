import { Link } from "react-router-dom"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function NoteCard ({note, updateNote}){

    async function handleDelete (event, id){
        event.preventDefault();

        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note deleted!")
            
            updateNote((prev=> prev.filter((note)=> note._id !== id))) // filter the notes with id that does not exist
        }
        catch (err){
            console.log(err);
            toast.error("Failed to delete note :(")
        }
        
    }
    return(
      
        <Link to = {`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 
            border-t-4 border-solid border-[#ffae00] ">

            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3"> {note.content} </p>
                    <span className="text-sm text-base-content/60">{note.createdAt}</span>

                    <div className="flex items-center gap-1">
                        <button><PenSquareIcon className="size-4"/></button>
                        <button className="btn btn-ghost btn-xs text-error" onClick={(event)=> handleDelete(event, note._id )}><Trash2Icon className="size-4"/></button>
                    </div>
            </div>
      </Link>
    )
}