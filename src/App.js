
import React, { Component } from 'react'
import request from 'superagent'
import PokemonList from './PokemonList.js'
import './App.css'



export default class App extends Component {
    state = {
      pokeState: [],
      searchKeyword: '',
    }
    
    handleChange = (event) => {
      const value = event.target.value;
      this.setState({ searchKeyword: value });
    }
    
    handleClick = async () => {
      const grabData = await request.get(
        `https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&pokemon=${this.state.searchKeyword}`)

        this.setState({
          pokeState: grabData.body.results
        })

      console.log('hello world')
      console.log(grabData.body)
      
    }
    
    
    
    
  render() {
    return (
      <div>
        <h1>
          <img
            src="https://fontmeme.com/permalink/200806/d85c9c51a4999a6b7f006f8bf39965aa.png"
            alt="pokemon-font"
            border="0"

            />
        </h1>
        <div className="Input">
          <input onChange={this.handleChange} name="search" />
          <button onClick={this.handleClick}>Search</button>
        </div>
        <PokemonList renderPokemon={this.state.pokeState} />
      </div>
    );
  }
}