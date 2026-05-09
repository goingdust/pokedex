import { Location } from "./pokeapi.js";
import { State } from "./state.js";

export const commandExplore = async (state: State, name: string) => {
  if (!name) {
    console.log("Hmm... you need to give a name of a location area in order to explore.");
    return;
  }

  console.log(`Exploring ${name}...`)
  const location: Location | undefined = await state.pokeAPI.fetchLocation(name)

  if (!location) {
    // TODO fix this
    // console.log("Hmm... that doesn't seem to be a valid name. Please enter a valid location area.");
    return;
  }

  location.pokemon_encounters.forEach(encounter => {
    console.log(`- ${encounter.pokemon.name}`);
  });
}