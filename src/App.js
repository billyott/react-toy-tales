import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => this.setState({toys: toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleAddNewToy = (newToy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(toyObj => this.setState(prevState => {
      return ({toys: [...prevState.toys, toyObj]})
    }))
    .catch(err => console.log(err))
  }

  handleDonateToy = (donatedToy) => {
    fetch(`http://localhost:3000/toys/${donatedToy.id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => {
      console.log("success", data)
      this.setState(prevState => {
        const matchedToyIndex = prevState.toys.findIndex(toy => toy.id === donatedToy.id)
        prevState.toys.splice(matchedToyIndex, 1)
        return ({toys: prevState.toys})
      })
    })
    .catch(err => console.log(err))
  }

  handleLikeToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({likes: toy.likes+1})
    })
    .then(resp => resp.json())
    .then(updatedToy => this.setState(prevState => {
      const matchedToy = prevState.toys.find(toy => toy.id === updatedToy.id)
      matchedToy.likes = updatedToy.likes
      return({toys: prevState.toys}) 
    }))
    .catch(err => console.log(err))
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleAddNewToy={this.handleAddNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDonateToy={this.handleDonateToy} handleLikeToy={this.handleLikeToy}/>
      </>
    );
  }

}

export default App;
