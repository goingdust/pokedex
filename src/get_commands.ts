import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";

export const getCommands = (): Record<string, CLICommand> => {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex.",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message.",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "Get the next page of location areas.",
            callback: commandMapForward
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of location areas.",
            callback: commandMapBack
        },
        explore: {
            name: "explore",
            description: "Get a list of all Pokemon in a location area.",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Make an attempt to catch a Pokemon.",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspect a Pokemon in the Pokedex.",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "Displays a list of all Pokemon in Pokedex.",
            callback: commandPokedex
        }
    }
}