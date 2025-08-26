import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon, EllipsisVertical } from 'lucide-react';

function NoteDetails() {

  const [note, setNote] = React.useState(null);
  const [loading,setLoading] = React.useState(true);
  const [saving, setSaving]  = useState(false);

    const {id} = useParams(); // get the id defined in routes
    const navigate = useNavigate();

    useEffect(()=> {

      async function fetchNote () {
        try {
          const response = await api.get(`/notes/${id}`);
          setNote(response.data);
          
        }
        catch(err){
          console.log(err);
          if (err.response.status === 429) {
            navigate("/");
          }
          toast.error("Failed to fetch notes");
          
        }
        finally{
          setLoading(false);

        }
      }
      fetchNote();
    },[id])

     async function handleDelete (){
        try {
            await api.delete(`/notes/${id}`);
            toast.success('Note deleted!');
            navigate("/");

        }
        catch(err) {
          console.log(err);
          toast.error('Failed to delete note');
        }
    }
    async function handleSave (){
        try {
          await api.put (`/notes/${id}`,note);
          toast.success('Note updated!');
          navigate('/');

        }
        catch (err) {
          console.log(err)
          toast.error('Failed to update note');
        }

    }

    function bulletPoints (){
      setNote(prev=> {
        const lines = prev.content.split("\n"); // split each content with a new line
        const bulletLines = lines.map(line => line.trim() ? `• ${line}` : "").join("\n");
        return ({...prev, content: bulletLines})
      })
    }



  return (
      <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className="max-w-2xl mx-auto">
            <div className='flex items-center justify-between mb-6'>
              <Link to= {"/"} className = "btn btn-ghost "> {/* send back to homepage*/}
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
              </Link>
              <button className="btn btn-error btn-outline" onClick={ handleDelete}>
                <Trash2Icon className="size-5"/>
              </button>
              </div> 
            { !loading ? 
               <div className='card bg-base-100'>
                <div className='card-body'>
                    {/*title */}  
                    <div className='form-control mb-4'>
                      <label className='label'>
                        <span className='label-text'>Tittle</span>
                      </label>
                      <input type="text"
                      placeholder='Note title'
                      className='input input-bordered' 
                      value={note.title}
                      onChange={(e)=> setNote((prev)=> ({...prev, title:e.target.value}))}
                      />
                    </div>

                     {/*content */}
                    <div className='form-control mb-4'>
                      <label className='label'>
                        <span className='label-text'>Content</span>
                      </label>

                     
                      <textarea
                      placeholder='Note content'
                      className='textarea textarea-bordered h-32' 
                      value={note.content}
                      onChange={(e)=> setNote((prev)=> ({...prev, content:e.target.value}))}
                      />
                    </div>

                    <div className="card-actions justify-between">
                     <button className='btn' onClick={bulletPoints}><EllipsisVertical/></button>
                      <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                          {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    
                    </div>
                </div>
              </div> : 'Loading....'
            }
             
          </div>
        </div>
      </div>
  )
}

export default NoteDetails