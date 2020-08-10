import React, { Component } from 'react'
import { Link } from 'react-router-dom'



export default class PokeItem extends Component {
    render() {
        const {
            pokemon: {
                pokemon,
                url_image,
                height,
                weight,
                attack,
                defense
            }
        } = this.props;
        return (
          <div className="container">
          <Link to={`./detail/${pokemon}`}>
            <h3>{pokemon}</h3>
            <div className="pokemon-box">
            <img height="150" width="150" className="pokemon-image" src={url_image} alt={pokemon} />
            <p className="attribute">Height: {height}ft</p>
            <p className="attribute">Weight: {weight}lbs</p>
            <p className="attribute">Attack: {attack}</p>
            <p className="attribute">Defense: {defense}</p>
            </div>
          </Link>
          </div>
        );
  
    }
}
