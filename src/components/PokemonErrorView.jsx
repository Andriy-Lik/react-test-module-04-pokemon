import errorImage from './img/error.jpg';

export default function PokemonErrorViev({ message }) {
    return (
        <div role="alert">
            <img src={errorImage} width="240" alt="sadcat" />
            <p>{message}</p>
        </div>
    );
}