import React, { Component } from 'react';
import '../App.css';
import request from 'superagent';
// import PokemonList from '../PokemonList.js'
import PokeItem from '../PokeItem';

export default class SearchPage extends Component {
    state = {
        search: '',
        searchBy: 'pokemon',
        pokeState: [],
        isLoading: false
    }

    handleClick = async () => {
        // grabbing data from API

      const grabData = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&${this.state.searchBy}=${this.state.search}`)

        this.setState({
          pokeState: grabData.body.results
        })
        
        console.log('hello world')
        console.log(grabData.body)
}
      
        handleChange = (event) => {
            const type = event.target.value;
            this.setState({ filter: type });
}

    render() {
        const { isLoading, pokeState } = this.state;
        return (
          <>
            <input className="text-input"
              onChange={(event) =>
                this.setState({ search: event.target.value })
              }
              placeholder="Enter Pokemon Name"
            />
            <select onChange={(event) => {this.setState({ searchBy: event.target.value })} }>
                <option value='pokemon'>name</option>
                <option value='type'>type</option>
                <option value='attack'>attack</option>
                <option value='defense'>defense</option>
            </select>
            <button onClick={this.handleClick}>Catch 'em All!</button>
            {/* <PokemonList renderPokemon={this.state.pokeState} /> */}
            {
                isLoading
                    ? <p>Loading</p>
                    : pokeState.map(poke => <PokeItem key={poke.id} pokemon={poke} />)
            }
          </>
        );
        
    }
}

