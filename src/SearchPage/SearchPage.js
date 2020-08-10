import React, { Component } from 'react';
import './Search.css';
import request from 'superagent';
import PokemonList from './PokemonList.js';
// import PokeItem from '../PokeItem';

export default class SearchPage extends Component {
    state = {
        search: '',
        searchBy: 'pokemon',
        pokeState: [],
        isLoading: false,
        currentPage: 1,
        totalPages: 1
    }

    componentDidMount = async () => {
        const params = new URLSearchParams(this.props.location.search);

        const searchBy = params.get('searchBy');
        const page = params.get('page');
        const search = params.get('search');


        if (searchBy && page & search) {
          await this.setState({
            searchBy: searchBy,
            currentPage: page,
            search: search
          });
        }

        await this.makeRequest()
    }

    makeRequest = async () => {
        this.setState({ isLoading: true });

        const grabData = await request.get(
          `https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchBy}=${this.state.search}`);

          console.log(grabData)

        await this.setState({
          pokeState: grabData.body.results,
          totalPages: Math.ceil(grabData.body.count / 25),
          isLoading: false,
        })

        const params = new URLSearchParams(this.props.location.search);

        params.set('search', this.state.search);
        params.set('searchBy', this.state.searchBy);
        params.set('page', this.state.currentPage);

        this.props.history.push('?' + params.toString())
    }

    handleSubmit = async (event) => {
      event.preventDefault();

      await this.setState({
        currentPage: 1
      })
      await this.makeRequest();
    }

    handleNextClick = async () => {
      await this.setState({ currentPage: Number(this.state.currentPage) +1 })

      await this.makeRequest();
    }

    handlePrevClick = async () => {
      await this.setState({ currentPage: Number(this.state.currentPage) -1 })

      await this.makeRequest();
    }
      
      handleChange = (event) => {
          const type = event.target.value;
          this.setState({ filter: type });
      }

    render() {
        const {
          isLoading,
          pokeState,
          currentPage,
          totalPages
        } = this.state;

        return (
          <>
          <div className="user-input">
            <form>
            <input className="text-input"
              onChange={(event) =>
                this.setState({ search: event.target.value })
              } value={this.state.search}
              placeholder="Enter Pokemon Name"
            />
            <select value={this.state.searchBy} onChange={(event) => {this.setState({ searchBy: event.target.value })} }>
                <option value='pokemon'>name</option>
                <option value='type'>type</option>
                <option value='attack'>attack</option>
                <option value='defense'>defense</option>
            </select>
            <button onClick={this.handleSubmit}>Catch 'em All!</button>
            </form>
          </div>
            {/* <PokemonList renderPokemon={this.state.pokeState} /> */}
          <div className="searchDiv">
            {
                isLoading
                    ? <p>Loading</p>
                    : <PokemonList handleNextClick={this.handleNextClick} handlePrevClick={this.handlePrevClick} currentPage={currentPage} pokeState={pokeState} totalPages={totalPages} />
            }
          </div>
          </>
        );
        
    }
}

