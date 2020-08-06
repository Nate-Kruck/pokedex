import React, { Component } from 'react'



export default class PokemonList extends Component {
    render() {
        return (
            <ul>
            {this.props.renderPokemon.map((pokemon) => (
              <li key={pokemon.id}>
                <h3>{pokemon.pokemon}</h3>
                <img className="PokemonImage" src={pokemon.url_image} alt={pokemon.pokemon}/>
                <p className="Height">Height: {pokemon.height}ft</p>
                <p className="Weight">Weight: {pokemon.weight}lbs</p>
              </li>
            ))}
          </ul>
        );}
             }

