import { startREPL } from './repl.js';
import { initState } from './state.js';

const main = async () => {
    const state = initState();
    await startREPL(state);
}

main();