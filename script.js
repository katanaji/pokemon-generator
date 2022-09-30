const pokemonContainer = document.getElementById('pokemon-container');
const pokemonName = document.getElementById('name');
const pokemonAbilities = document.getElementById('abilities');
const newPokemonBtn = document.getElementById('new-pokemon');
const loader = document.getElementById('loader');

let apiPokemon = [];
let pokemon = '';

// Show Loading
function loading() {
    loader.hidden = false;
    pokemonContainer.hidden = true;
}

// Hide Loading
function complete() {
    pokemonContainer.hidden = false;
    loader.hidden = true;
}

// Get abilities of Pokemon
async function getAbilities() {
    loading();
    apiURL = pokemon.url;
    try {
        const response = await fetch(apiURL);
        apiPokemon = await response.json();
        console.log(apiPokemon);
        const abilitiesArray = apiPokemon.abilities.map(entry => entry.ability.name);
        if (!abilitiesArray) {
            pokemonAbilities.textContent = 'Abilities: Unknown';
        } else {
            pokemonAbilities.textContent = 'Abilities: ' + abilitiesArray.join(', ');
        }
        } catch (error) {
        
    }
    complete();
}

// Show New Pokemon
function newPokemon() {
    loading();
    const totalPokemon = apiPokemon.count;
    pokemon = apiPokemon.results[Math.floor(Math.random() * totalPokemon)];
    // Set Pokemon, Hide Loader
    pokemonName.textContent = pokemon.name;
    complete();
    getAbilities();
}

// Get Pokemon From API
async function getPokemon() {
    loading();
    apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    try {
        const response = await fetch(apiURL);
        apiPokemon = await response.json();
        newPokemon();
    } catch (error) {
        // Catch Error Here, e.g.: alert(error)
    }
}


// Event Listeners
newPokemonBtn.addEventListener('click', getPokemon);

// On Load
getPokemon();