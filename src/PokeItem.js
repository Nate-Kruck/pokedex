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
          <Link to={`/detail/${pokemon}`}>
            <h3>{pokemon.pokemon}</h3>
            <img className="pokemon-image"src={url_image} alt={pokemon} />
            <p className="Height">Height: {height}ft</p>
            <p className="Weight">Weight: {weight}lbs</p>
            <p className="Attack">Attack: {attack}</p>
            <p className="Defense">Defense: {defense}</p>
          </Link>
        );
            
    }
}
