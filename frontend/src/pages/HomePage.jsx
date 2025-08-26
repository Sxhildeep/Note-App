
import Navbar from "../components/Navbar";
import React, { useEffect } from "react"
import RateLimiter from "../components/ratelimiter"

import NoteCard from "../components/noteCard";
import toast from "react-hot-toast";
import api from "../lib/axios";

export default function Home(){

    const [rateLimit, setRateLimit] = React.useState(false);
    const [notes, setNotes] = React.useState([]);
    const [loading,setLoading] = React.useState(true)


    useEffect(()=> {
        
        const fetchNotes = async()=> {
            try {
                const response = await api.get("/notes")
                const data= response.data;

                setNotes(data) // add notes data to the array
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                if(err.response?.status === 429) { // rate limit status code
                    setRateLimit(true); // if err code 429 render ratelimit box;
                }
                else {
                    toast.error("failed fetching notes")
                }
            }
            finally {
                setLoading(false);
            }

        } 
        fetchNotes();  
    },[])

    return(
        
        <div className="min-h-screen">
            <Navbar/>
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary">Loading notes....</div>}

                {notes.length> 0 && !rateLimit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(eachNote => <NoteCard note = {eachNote} key={eachNote._id} updateNote= {setNotes}></NoteCard> )}
                    </div>
                )}

            </div>
            {rateLimit ? <RateLimiter/>: null}
        </div>
        
    )
}