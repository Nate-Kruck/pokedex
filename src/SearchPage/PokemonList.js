import React, { Component } from 'react'
import PokeItem from '../PokeItem.js'

export default class PokemonList extends Component {
    render() {
        const {
            pokeState,
            handleNextClick,
            handlePrevClick,
            currentPage,
            totalPages
        } = this.props;

        return (
            <div>
             {
                pokeState.length > 0 && 
                <div>
                    {
                        Number(currentPage) !== 1
                        && <button onClick={handlePrevClick}>Prev</button>
                    }
                
                    {
                        Number(currentPage) !== Number(totalPages) 
                        && <button onClick={handleNextClick}>Next</button> 
                    }
                        {currentPage} of {totalPages}
                </div>
             }      <section className="grid-container">
                    {pokeState.map(pokemon => <PokeItem key={pokemon.id} pokemon={pokemon} />)}
                    </section>
            </div>
        )
    }
}
                        
