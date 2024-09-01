import React,{useContext,useState} from 'react'
import myContext from '../context/notes/noteContext';

const AdNotes = (props) => {
    const context = useContext(myContext);
    // Destructuring is used to extract the addNote function from the context.
    const {addNote} = context;
  
    const [note, setNote] = useState({title:"",description:"",tag:""})
  
    const handleClick = (e)=>{
      // Prevents the default form submission behavior using e.preventDefault().
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        // after adding form will clean all the field, with giving value in the field in the form
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added successfully","success");
    }
    const onChange=(e)=>{
      // {...note} is using the spread operator to create a new object that contains all the properties of the existing note state.
      // [e.target.name]: e.target.value is using computed property names to dynamically set a property on the new object.
      // e.target.name is the name attribute of the input element that triggered the change event.
      // e.target.value is the current value of that input element.
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
    <h2 className='my-5 pt-4 text-center'>Add a Note</h2>
      <div className="container">
        <form>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description"  name='description' value={note.description} onChange={onChange} minLength={5} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag"  name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
          </div>

          {/* trim() does not count the white spaces, one can give 1 char and give 4 space to use the condition*/}
          <button disabled={note.title.trim().length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
        </div>
      </>

  )
}

export default AdNotes