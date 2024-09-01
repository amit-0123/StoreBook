import React, {useContext} from 'react'
import myContext from '../context/notes/noteContext';
// to show delete note and edit note on hovering delete and edit fonts
// "npm i react-tooltip" for it have completed
import { Tooltip } from 'react-tooltip';


const Noteiteam = (props) => {
    const context = useContext(myContext);
    const  {deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3 '>
            {/* card */}
            <div className="card my-2 d-flex">
                <div className="card-body ">
                    <div className="d-flex justify-content-between ">
                        <h6 className="card-title">Title: {note.title}</h6>
                        <div>
                            <i className="fa-regular fa-trash-can" data-tooltip-id="delete-tooltip" data-tooltip-content="Delete Note" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","success");}}></i>

                            <i className="fa-solid fa-pen-to-square" data-tooltip-id="edit-tooltip" data-tooltip-content="Edit Note" onClick={()=>{updateNote(note)}}></i>

                            <Tooltip id="delete-tooltip" />
                            <Tooltip id="edit-tooltip" />

                        </div>
                    </div>

                    <p className="card-text">Description:{note.description}</p>

                </div>
            </div>

        </div>
    )
}

export default Noteiteam
