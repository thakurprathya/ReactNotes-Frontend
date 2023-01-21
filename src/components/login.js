import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""});
    let navigate= useNavigate();
    
    const HandleSubmit= async (e)=>{  //submit button click function
        e.preventDefault();
        //API call
        const url=`http://localhost:4000/auth/login`;
        // const url=`https://react-notes-backend.onrender.com/auth/login`;  //for deployment
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json= await response.json();  // parses JSON response into native JavaScript objects
        // console.log(json);
        if(json.success){  //using our backend variable success to check whether request succeed or not
            //saving the authToken and redirecting(using useNavigate(earlier we use useHistory), hook in react-router-dom)
            localStorage.setItem("token",json.authtoken); //storing token in localstorage (note: in backend also token sending by json should be in name authtoken)
            props.showAlert("Account Logged in Successfully","success");
            navigate("/");  //redirecting using useNavigate
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange=(e)=>{
        //using spread operator(...), all properties of note object stays, but if extra props specified then add them or overwrite them
        setCredentials({...credentials, [e.target.name]:e.target.value})  //will update the credentials
    }

    return (
      <div className='container mt-4'>
          <h1 className='mb-4'><b>Login</b></h1>
          <form  onSubmit={HandleSubmit}>  {/*onsubmit is used on forms which will execute whenever clicking form submit button */}
              <div className="mb-3">
                  <label htmlFor="email" className="form-label"><b>Email Address</b></label>
                  <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" 
                  value={credentials.email} onChange={onChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label"><b>Password</b></label>
                  <input type="password" className="form-control" id="password" name='password' value={credentials.password}
                  onChange={onChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    )
};

export default Login;
