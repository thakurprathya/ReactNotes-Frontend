import React, {useContext} from 'react';
import NoteContext from '../context/notes/notescontext';

const NoteItem = (props) => {
    const context= useContext(NoteContext);
    const {DeleteNote}= context; //destructuring
    const {note, updateNote}= props; //destructuring
    return (
        <div style={{display:"inline-block", marginRight:"2vw", marginBottom:"2vh"}}>
            <div className="card" style={{width:"18rem"}}>
            <div className="card-body">
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                        <i className="fa-regular fa-trash-can mt-1" onClick={()=>{
                            DeleteNote(note._id);
                            props.showAlert("Note Deleted Successfully", "success");
                        }}></i>  {/*for delete icon , also included linking file in html, _id represents id for each note*/}
                        <i className="fa-regular fa-pen-to-square mx-3 mt-1" onClick={()=>{updateNote(note)}}></i> {/*for edit icon */}
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
                <div>
                    <p className="mx-3" style={{fontSize:"11px", color:'rgb(116, 116, 119)', float:"inline-end"}}> {note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
