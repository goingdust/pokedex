import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export const commandCatch = async (state: State, name: string) => {
  if (!name) {
    console.log("Hmm... you need to give the name of a Pokemon in order to catch one.");
    return;
  }

  console.log(`Throwing a Pokeball at ${name}...`);

  const pokemon: Pokemon | undefined = await state.pokeAPI.fetchPokemon(name);

  if (!pokemon) {
    // TODO fix this
    // console.log("Hmm... that doesn't seem to be a valid name. Please enter a valid Pokemon.");
    return;
  }

  const catchRoll = pokemon.base_experience + (Math.random() * 1000);

  if (catchRoll < 500) {
    console.log(`${name} was caught!`);
    state.pokedex.add(name, pokemon);
  } else {
    console.log(`${name} escaped!`);
  }
}