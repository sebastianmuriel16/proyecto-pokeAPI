const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    Headers: {
        'Content-TYpe': 'application/json;charset=utf-8',
    },
});

const sectionPokemons = document.querySelector('#container-pokemons');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');


let offset = 1;
let limit = 12;


async function getPokemons(offset, limit) {

    for (let i = offset; i <= limit; i++) {
        const { res, data } = await api.get(`pokemon/${i}`);
        const pokemons = data;
        createPokemons(pokemons);
    }
}

async function createPokemons(pokemon) {

    const pokemonCard = document.createElement('div');//card
    pokemonCard.setAttribute('class', 'pokemonCard');

    ///////////////////////////////
    const containerPokemon = document.createElement('div'); //face front
    containerPokemon.setAttribute('class', 'container-pokemon');
    containerPokemon.classList.add('front');
    const containerPokemonImg = document.createElement('div');
    containerPokemonImg.setAttribute('class', 'container-pokemon-img');
    const imgPokemon = document.createElement('img');
    const numeracion = document.createElement('h2');
    numeracion.setAttribute('class', 'tag');
    const name = document.createElement('h2');
    name.setAttribute('class', 'pokemon-name');

    imgPokemon.setAttribute('src', pokemon.sprites.front_default);
    const nameText = document.createTextNode(pokemon.name);
    const numeracionText = document.createTextNode(`#${pokemon.id.toString().padStart(3, '0')}`);
    name.appendChild(nameText);
    numeracion.appendChild(numeracionText);
    containerPokemonImg.appendChild(imgPokemon);

    containerPokemon.appendChild(containerPokemonImg);
    containerPokemon.appendChild(numeracion);
    containerPokemon.appendChild(name);


    //parte de atras
    const containerPokemonBack = document.createElement('div');
    containerPokemonBack.setAttribute('class', 'container-pokemon-back'); //face back
    containerPokemonBack.classList.add('back');
    const containerImgBack = document.createElement('div');
    containerImgBack.setAttribute('class', 'container-pokemon-img-back');
    const pokemonImgBack = document.createElement('img');
    pokemonImgBack.setAttribute('src', pokemon.sprites.other['official-artwork'].front_default);
    const nameBack = document.createElement('h2');
    nameBack.setAttribute('class', 'pokemon-name');
    const nameTextBack = document.createTextNode(pokemon.name);
    nameBack.appendChild(nameTextBack);
    const statsBack = document.createElement('div');
    statsBack.setAttribute('class', 'stats-container');

    const stats = pokemon.stats;

    stats.map(stat => {
        const p = document.createElement('p');
        p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsBack.appendChild(p);
    })


    containerImgBack.appendChild(pokemonImgBack);
    containerImgBack.appendChild(nameBack);
    containerPokemonBack.appendChild(containerImgBack);
    containerPokemonBack.appendChild(statsBack);

    pokemonCard.appendChild(containerPokemon);
    pokemonCard.appendChild(containerPokemonBack);

    sectionPokemons.appendChild(pokemonCard);
}

async function getPokemonsApi() {
    const { res, data } = await api.get('pokemon');
    const pokemons = data.results;
    console.log(pokemons);
    createPokemons(pokemons);
}



getPokemons(offset, limit);

next.addEventListener('click', () => {
    sectionPokemons.innerHTML = '';
    offset = limit + 1;
    limit += 12;
    getPokemons(offset, limit);
})

previous.addEventListener('click', () => {

    if (offset === 1) {
        return;
    } else {
        sectionPokemons.innerHTML = '';
        offset -= 12;
        limit -= 12;
        getPokemons(offset, limit);
    }
})