import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "process";
import { getCommands } from "./get_commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Pokedex } from "./pokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
    pokedex: Pokedex,
}

export const initState = () => {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    })

    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: new Pokedex,
    }
}