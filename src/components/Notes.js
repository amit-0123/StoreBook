import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../context/notes/noteContext';
import Noteiteam from './Noteiteam';
import AdNotes from './AdNotes';
import { useNavigate } from 'react-router-dom';





const Notes = (props) => {
  const context = useContext(myContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
     if(localStorage.getItem('token')){
       getNotes();
     }
     else{
      navigate("/login")
     }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
   
  }

  const ref = useRef(null);
  const refClose = useRef(null);


  const handleClick = (e) => {
    // Prevents the default form submission behavior using e.preventDefault().
    console.log("Updating the Note....", note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AdNotes showAlert = {props.showAlert}/>


      <button ref={ref} type="button" className="btn btn-primary d-none my-3 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={onChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>


                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.trim().length < 5 || note.edescription.trim().length < 5}
                onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {/* note or anything */}
        {notes.map((anything) => {
          return <Noteiteam key={notes._id} updateNote={updateNote} showAlert={props.showAlert} note={anything} />
        }
        )}
      </div>
    </>
  )
}

export default Notes
