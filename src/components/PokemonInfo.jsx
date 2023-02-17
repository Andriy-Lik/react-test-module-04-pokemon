import { Component } from "react";
import PokemonErrorViev from './PokemonErrorView';
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../servises/pokemon-api';

export default class PokemonInfo extends Component {
    state ={
        pokemon: null,
        error: null,
        status: 'idle'
    }

    componentDidUpdate(prevProps, prevstate) {
        const prevName = prevProps.pokemonName;
        const nextName = this.props.pokemonName;

        if (prevName !== nextName) {
            this.setState({ status: 'pending' });

            pokemonAPI.fetchPokemon(nextName)
            .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
            .catch(error => this.setState({ error, status: 'rejected' }))
            .finally(() => this.setState({ loading: false }));
            
            // fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
            // .then(response => {
            //     if (response.ok) {
            //         return response.json();
            //     }

            //     return Promise.reject(
            //         new Error(`Нет покемона с именем ${nextName}`),
            //     );
            // })
            // .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
            // .catch(error => this.setState({ error, status: 'rejected' }))
            // .finally(() => this.setState({ loading: false }));
        }
    }

    render() {
        const { pokemon, error, status } = this.state;
        const { pokemonName } = this.props;

        if (status === 'idle') {
            return <div>Введите имя покемона.</div>;
        }

        if (status === 'pending') {
            return <PokemonPendingView pokemonName={pokemonName} />;
        }

        if (status === 'rejected') {
            return <PokemonErrorViev message={error.message} />;
        }

        if (status === 'resolved') {
            return <PokemonDataView pokemon={pokemon} />;
        }

        // return (
        // <div>
        //     {error && <h1>{error.message}</h1>}
        //     {loading && <div>Загружаем...</div>}
        //     {!pokemonName && <div>Введите имя покемона.</div>}
        //     {pokemon && (
        //         <div>
        //             <p>{pokemon.name}</p>
        //             <img 
        //                 src={pokemon.sprites.other['official-artwork'].front_default}
        //                 alt={pokemon.name} 
        //                 width="240"
        //             />
        //         </div>
        //     )}
        // </div>
        // );
    }
}