import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(interval?: number) {
        this.#cache = new Cache(interval || 5000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area/`;

        const cacheLocations: any = this.#cache.get(url);

        if (cacheLocations) {
            return cacheLocations;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const locations: ShallowLocations = await response.json();

            this.#cache.add(url, locations);

            return locations;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cacheLocation: any = this.#cache.get(url);

        if (cacheLocation) {
            return cacheLocation;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const location: Location = await response.json();

            this.#cache.add(url, location);

            return location;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cachePokemon: any = this.#cache.get(url);

        if (cachePokemon) {
            return cachePokemon;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const pokemon: Pokemon = await response.json();

            this.#cache.add(url, pokemon);

            return pokemon;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
        }
    }

    cleanup() {
        this.#cache.stopReapLoop()
    }
}

export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: {
        name: string,
        url: string,
    }[]
}

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};

export type Pokemon = {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    stats: {
        base_stat: number,
        effort: number,
        stat: {
            name: string,
            url: string,
        }
    }[],
    types: {
        slot: number,
        type: {
            name: string,
            url: string,
        }
    }[]
}