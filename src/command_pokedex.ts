import { State } from "./state.js";

export const commandPokedex = async (state: State) => {
  console.log("Your Pokedex:");
  state.pokedex.getAllPokemon().forEach(item => {
    console.log(`  - ${item.pokemon.name}`);
  });
}