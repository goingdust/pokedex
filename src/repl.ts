import { cleanInput } from './clean_input.js';
import { State } from './state.js';

export const startREPL = async (state: State) => {
    state.readline.prompt();

    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandName = words[0];

        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }

        try {
            if (commandName === 'explore' || commandName === 'catch' || commandName === 'inspect') {
                const name = words[1];
                await cmd.callback(state, name);

                state.readline.prompt();
                return;
            }

            await cmd.callback(state);

            state.readline.prompt();
        } catch (error) {
            console.log((error as Error).message);
            state.readline.prompt();
        }
    })
}