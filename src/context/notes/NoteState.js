import React, {useState} from "react";

import NoteContext from "./noteContext";

// create a function to make state
const MyState = (props)=>{

  const host = "http://localhost:5000"

               // lecture  use context hook by harry
//     const s1 = {
//         "name":"Amit",
//         "class":"5th b"
//     }

//     const [state,setState] = useState(s1); 
//     const update = ()=>{
//         setTimeout(()=>{
//            setState({
//             "name":"Yadav",
//             "class":"10th b"
//         })
//         }, 1000);
//     }

               // hard cored at later we will 
     const notesInitial =[]
      
      const [notes, setNotes] = useState(notesInitial)

    // Backend API Endpoint: When you call fetch, it sends an HTTP POST request to the specified endpoint.

// Server-Side Handling: On the server-side, there would be a corresponding route handler for /api/notes/addnote. This handler would:
// Authenticate the user using the auth-token.
// Extract the title, description, and tag from the request body.
// Create a new note in the database with these values.
// Save the note to the database and return a response.
    //   add a note
    const addNote = async(title,description,tag)=>{
        //   API call
        //  header fetch from google
        const response = await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers:{
            'Content-Type':"application/json",
            "auth-token":localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });

        const note = await response.json();
    //     console.log(json);
 

    //     console.log("Adding a new note")
    //  const  note={  
    //     "_id": "667e88d74e5cffd831b95667",
    //     "user": "667d2732c34d1b0ec59efde8",
    //     "title": title,
    //     "description":description,
    //     "tag": tag,
    //     "date": "2024-06-28T09:56:39.272Z",
    //     "__v": 0
    //   };
       setNotes(notes.concat(note));
    }


    //   get all note
    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':"application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const json = await response.json()
      console.log(json);
      setNotes(json);
  }



    // delete a note
    const deleteNote =async(id)=>{
      // todo: API call
      try{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':"application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const json =  await response.json()
      console.log(json);

        console.log("Deleting the note with id" + id);
       const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }
        catch(error){
              console.error("Error deleting the note with:",error);
        }
    }


    // edit a note
    const editNote = async(id,title,description,tag)=>{
      // API call
       await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',   // Use PUT or PATCH for updating
        headers:{
          'Content-Type':"application/json",
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
    //  const json = await response.json();    // Wait for the response to be converted to JSON
  //    console.log(json);

     // logic to edit in client
  // const newNotes = notes.map((note) => {
  //   if (note._id === id) {
  //     return { ...note, title, description, tag };
  //   }
  //   return note;
  // });

  // setNotes(newNotes);
        let newNotes = JSON.parse(JSON.stringify(notes))
          for(let index=0;index<newNotes.length;index++){
            const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
                }
                // console.log(notes);
              setNotes(newNotes);
    }



    return (
         <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
         </NoteContext.Provider>
    )
}

export default MyState;

