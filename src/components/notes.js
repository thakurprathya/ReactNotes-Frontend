import React, {useContext, useEffect, useRef, useState} from 'react';  //useRef is used for referencing any element
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/notescontext';
import AddNote from './AddNote';
import NoteItem from './noteitem';

const Notes = (props) => {
    const context= useContext(NoteContext);
    let navigate= useNavigate();  //hook from react-router-dom used to quickly navigate
    const {notes, GetNotes, EditNote}= context; //using destructuring
    useEffect(()=>{  //adding side effect (fetching server notes)
        if(localStorage.getItem("token")){  //if token is not null, and present in localstorage
            GetNotes();
        }
        else{
            navigate("/login");  //redirecting to login page
        }
        // below line disable warning because of its next line
        // eslint-disable-next-line
    },[]);

    const [note, setNote]= useState({id:"", edittitle:"", editdescription:"", edittag:"General"});  //defining a state
    const updateNote= (currentnote)=>{
        ref.current.click();  //creating toggle button according to useRef documentation
        setNote({id: currentnote._id, edittitle: currentnote.title, editdescription: currentnote.description, edittag: currentnote.tag});
    }
    const ref= useRef(null);  //initializing reference
    const refClose= useRef(null);

    const onChange=(e)=>{
        //using spread operator(...), all properties of note object stays, but if extra props specified then add them or overwrite them
        setNote({...note, [e.target.name]:e.target.value})  //will update the note
    }
    const HandleUpdate= (e)=>{
        e.preventDefault();
        // console.log(note);
        EditNote(note.id, note.edittitle, note.editdescription, note.edittag); //calling function
        refClose.current.click();  //closing the modal after pressing update
        props.showAlert("Note Updated Successfully","success");  //showing alert
    }

    return (
        <div>
            <AddNote showAlert={props.showAlert}/>  {/*or we can destructure showalert from props as did in home.js */}
            {/* using bootstrap modal of updating the note */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal</button> {/*d-none class of bootstrap = display none */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><b>Edit Note</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <label htmlFor="edittitle" className="form-label"><b>Title :</b></label>
                        <input type="text" className="form-control" id="edittitle" name='edittitle' onChange={onChange}
                         style={{width:"25vw"}} value={note.edittitle} minLength={3} required/>
                        </div>
                        <div className="mb-3" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <label htmlFor="editdescription" className="form-label"><b>Description :</b></label>
                        <input type="text" className="form-control" id="editdescription" name='editdescription' onChange={onChange} 
                         style={{width:"25vw"}} value={note.editdescription} minLength={5} required/>
                        </div>
                        <div className="mb-3" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <label htmlFor="edittag" className="form-label"><b>Tag :</b></label>
                        <input type="text" className="form-control" id="edittag" name='edittag' onChange={onChange} style={{width:"25vw"}} value={note.edittag}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={HandleUpdate} type="button" className="btn btn-primary" 
                     disabled={note.edittitle.length<3 || note.editdescription.length<5}>Update Note</button> {/*here using disabled attribute for using length required validations */}
                </div>
                </div>
            </div>
            </div>

            <h2 className='mt-5 mb-3'><b>Your Notes</b></h2>
            {notes.length===0 && "Add a Note to Display"}  {/*if no notes present */}
            { notes.map((note)=>{  //inside map function(used for arrays) paasing a arrow function
                return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
            }) }
        </div>
    )
}

export default Notes;
