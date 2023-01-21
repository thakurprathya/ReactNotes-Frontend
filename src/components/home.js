import React from 'react';
import Notes from './notes';

const Home = (props) => {
  const {showAlert}= props;  //destructuring getting showalert from props 
  return (
    <div className='container'>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;
