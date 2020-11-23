import React, { Component } from 'react';

class ToyCard extends Component {

  localHandleDonateToy = () => {
    this.props.handleDonateToy(this.props.toy)
  }

  localHandleLike = () => {
    this.props.handleLikeToy(this.props.toy)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={this.localHandleLike} className="like-btn">Like {'<3'}</button>
        <button onClick={this.localHandleDonateToy} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
