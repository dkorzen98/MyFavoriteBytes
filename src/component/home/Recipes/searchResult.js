import React from 'react';
import Gallery from 'react-grid-gallery';


const searchResult =(props)=>{
  return( props.items.map((item, index) => <li key ={index}>

    <h1 src={ "data:image/png;base64" + item.something}/>

  </li>

  )
  )
}

export default searchResult;