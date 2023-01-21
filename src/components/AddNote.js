import React, {useContext, useState} from 'react';
import NoteContext from '../context/notes/notescontext';

const AddNote = (props) => {
    const context= useContext(NoteContext);
    const {AddNote}= context; //using destructuring
    const [note, setNote]= useState({title:"", description:"", tag:"General"});  //defining a state
    const handleFormSubmit=(e)=>{
        e.preventDefault();  //preventing default reloading action of button
        AddNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});  //for reinitialzing form after submission
        props.showAlert("Note Added Successfully","success");
    }
    const onChange=(e)=>{
        //using spread operator(...), all properties of note object stays, but if extra props specified then add them or overwrite them
        setNote({...note, [e.target.name]:e.target.value})  //will update the note
    }
    return (
        <div>
            <h1 className='mt-3 mb-4'><b>Add Notes</b></h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><b>Title :</b></label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} minLength={3} required value={note.title}/>
                    <div id="passwordHelpBlock" className="form-text">Title should be of Min length 3</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><b>Description :</b></label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required value={note.description}/>
                    <div id="passwordHelpBlock" className="form-text">Description should be of Min length 5</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><b>Tag :</b></label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleFormSubmit} 
                disabled={note.title.length<3 || note.description.length<5}>Add Note</button>  {/*here using disabled attribute for using length required validations */}
            </form>
        </div>
    )
}

export default AddNote;
