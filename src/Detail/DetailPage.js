import React, { Component } from 'react';
import request from 'superagent';



export default class DetailPage extends Component {
    state = { pokemon: null }


componentDidMount = async () => {
    const name = this.props.match.params.myPokemonId;

    const grabData = await request.get(
      `https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${name}`
    );

    console.log(grabData)
    const pokemon = grabData.body.results[0];
    console.log(pokemon)
    this.setState({ pokemon: pokemon})
}

render() {
    const { pokemon } = this.state;

    return (
        <div>
            {
                pokemon ? <div>
                    <p>{pokemon.pokemon}</p><br/>
                    <p>Defense: {pokemon.defense}</p>
                    <p>Attack: {pokemon.attack}</p>
                    <img src={pokemon.url_image} alt={pokemon.pokemon}/>
                    </div>
                    : <h1>loading</h1>
            }
        </div>
    )
}}