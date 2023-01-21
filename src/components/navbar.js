import React from 'react';
import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'; //will use link instead of anchor tag for connecting it with router dom, it will go to link without reloading

const Navbar = () => {
    let location= useLocation();
    let navigate= useNavigate();  //hook used for redirecting
    // useEffect(()=>{
    //   console.log(location.pathname);  //it will print page endpoint /, /about which we can use
    // },[]);

    const HandleLogout= ()=>{
        localStorage.removeItem("token");
        navigate("/login");  //redirecting to login page
        // window.location.reload();  //reloading page for refreshing components
    }

    return (
      <div>
        {/* including bootstrap navbar and making changes to it for acceptance in jsx */}
        <nav className={`navbar navbar-expand-lg bg-black`}> {/*including js that's why use backticks, black is more dark than dark that's why using it */}
              <Link className={`navbar-brand text-light mx-3`} to="/" style={{fontWeight:"bold", fontSize:"25px", marginRight:"15px"
                ,display:"inline-block"}}>Quick Notes</Link> {/*now have to pass title to navbar*/}
              <button className="navbar-toggler bg-light mx-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon bg-light"></span>
              </button>
              <div className="collapse navbar-collapse mx-3" id="navbarSupportedContent">
                  <Link className={`nav-item nav-link mx-2 mb-1 mt-1 text-${location.pathname==="/"?"light":"muted"}`} to="/">Home</Link>
                  <Link className={`nav-item nav-link mx-2 mb-1 mt-1 text-${location.pathname==="/about"?"light":"muted"}`} to="/about">About</Link>
                  <div id="spacer"></div>
                  {/* using bootstrap buttons for login and signup part, using ternary opreator for checking if token present
                  in localstorage of browser if present then showing logout if not then showing login and signup*/}
                  { !localStorage.getItem("token") ?
                  <form className='d-flex' style={{justifyContent:"center"}}>
                    <Link to="/login" className="btn btn-primary" role="button" style={{width:"100px"}}>Login</Link>
                    <Link to="/signup" className="btn btn-primary mx-3" role="button" style={{width:"100px"}}>Sign Up</Link>
                  </form>  :
                  <Link onClick={HandleLogout} className="btn btn-primary mx-3" style={{width:"100px"}}>Logout</Link> }
              </div>
          </nav>
      </div>
    )
}

export default Navbar;
