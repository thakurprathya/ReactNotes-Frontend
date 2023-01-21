import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const SignUp = (props) => {
    const [credentials, setCredentials]= useState({username:"", name:"", email:"", password:"", cpassword:""});
    let navigate= useNavigate();

    const HandleSubmit= async (e)=>{
          e.preventDefault();
          const {username, name, email, password} = credentials; //destructuring 
          //API call
        //   const url=`http://localhost:4000/auth/createuser`;
          const url=`https://notesapp-backend-mm5r.onrender.com/auth/createuser`;  //for deployment
          if(credentials.cpassword !== credentials.password){
              props.showAlert("Passwords not Matched, Retry!!","warning");
          }
          else{
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({username, name, email, password})
              });
              const json= await response.json();  // parses JSON response into native JavaScript objects
              // console.log(json);
              if(json.success){  //using our backend variable success to check whether request succeed or not
                  //saving the authToken and redirecting(using useNavigate(earlier we use useHistory), hook in react-router-dom)
                  localStorage.setItem("token", json.authtoken); //storing token in localstorage (note: in backend also token sending by json should be in name authtoken)
                  props.showAlert("Account Created Successfully","success");
                  navigate("/");  //recirecting using useNavigate
              }
              else{
                  props.showAlert(json.error,"danger");
              }
          }
    }
    const onChange=(e)=>{
      //using spread operator(...), all properties of note object stays, but if extra props specified then add them or overwrite them
      setCredentials({...credentials, [e.target.name]:e.target.value})  //will update the credentials
    }

    return (
      <div className='container mt-4'>
        <h1 className='mb-4'><b>SignUp</b></h1>
        <form onSubmit={HandleSubmit}> {/*biggest advantage of using onsubmit is we can add required and other authetication feilds directly */}
          <div className="mb-3">
              <label htmlFor="username" className="form-label"><b>Username</b></label>
              <input type="text" className="form-control" id="username" name='username' onChange={onChange} required minLength={5}/>
              <div id="passwordHelpBlock" className="form-text">
              Username must be Unique, and of minLength of 5 characters
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="name" className="form-label"><b>Name</b></label>
              <input type="text" className="form-control" id="name" name='name' onChange={onChange}/>
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label"><b>Email Address</b></label>
              <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label"><b>Password</b></label>
              <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
              <div id="passwordHelpBlock" className="form-text">
              Password's should be of atleast 5 character length
              </div>
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label"><b>Confirm Password</b></label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required/>
              <div id="passwordHelpBlock" className="form-text">
              Should match with Password
              </div>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
}

export default SignUp;
