import React from 'react'

const Alert= (props) => {
  const Initialze= (word)=>{
      if (word==="danger"){ word = "error"; }
      //capitalizing part
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{height:"50px"}}> {/*adding it inside a div to prevent content shifting, as before using it contents shifts whenever alert shows */}
      { props.alert && <div>
          <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong>{Initialze(props.alert.type)}:</strong>  {props.alert.message}
          </div>
      </div> }
    </div>
  )
}

export default Alert;