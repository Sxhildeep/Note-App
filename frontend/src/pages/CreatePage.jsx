import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

export default function CreatePage(){
   // user content
  const [title,setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [loading, setLoading] = React.useState(false);

  // send user to home
  const navigate = useNavigate();

  //let user post
  async function handleSubmit (event){
    event.preventDefault();

    // if title/content is empty kill the function before fetching
    if (!title || !content) {
      toast.error("Please provide all fields.")
      return
    }
    setLoading(true)
    try {

      await api.post ("/notes", { title, content});
      toast.success("Note added!");
      navigate("/");

    }
    catch (err) {
      console.log(err);
      if (err.response.status ===429) {
        toast.error("Slow Down! >:(")
      }
      else{
        toast.error("Failed to create note :(")
      }
      

    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container max-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to= {"/"} className = "btn btn-ghost mb-6"> {/* send back to homepage*/}
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>
        
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"
                  placeholder='Add Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)} /> 
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <input type="text"
                  placeholder='Add Content'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(event)=> setContent(event.target.value)} />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled= {loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

