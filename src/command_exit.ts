import { type State } from "./state.js";

export const commandExit = async (state: State) => {
    console.log('Closing the Pokedex... Goodbye!');
    setTimeout(() => {
        state.pokeAPI.cleanup();
        state.readline.close();
        process.exit(0);
    }, 2000);
};