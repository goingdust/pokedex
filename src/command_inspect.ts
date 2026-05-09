import { State } from "./state.js";

export const commandInspect = async (state: State, name: string) => {
  if (!name) {
    console.log("Hmm... you need to give a name of a Pokemon in order to inspect one.");
    return;
  }

  const pokemon = state.pokedex.get(name);

  if (!pokemon) {
    console.log("You have not caught that pokemon.");
  } else {
    console.log(`Name: ${name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    pokemon.stats.forEach(item => {
      console.log(`  - ${item.stat.name}: ${item.base_stat}`)
    });
    console.log("Types:");
    pokemon.types.forEach(item => {
      console.log(`  - ${item.type.name}`);
    });
  }
}