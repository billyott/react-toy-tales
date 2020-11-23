import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const rendertoys = () => {
    return props.toys.map(toy => <ToyCard key={toy.id} toy={toy} handleDonateToy={props.handleDonateToy} handleLikeToy={props.handleLikeToy}/>)
  } 

  return(
    <div id="toy-collection">
      {rendertoys()}
    </div>
  );
}

export default ToyContainer;
