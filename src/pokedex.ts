import { Pokemon } from "./pokeapi.js";

export class Pokedex {
  #map = new Map<string, { createdAt: number, pokemon: Pokemon }>();

  add(key: string, pokemon: Pokemon) {
    this.#map.set(key, {
      createdAt: Date.now(), pokemon: pokemon,
    });
  }

  get(key: string) {
    return this.#map.get(key)?.pokemon;
  }

  getAllPokemon() {
    return this.#map.values();
  }
}