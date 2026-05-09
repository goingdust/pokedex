import { describe, expect, test } from "vitest";
import { cleanInput } from "./clean_input.js";
import { Cache } from "./pokecache.js";

describe.each([
    {
        input: '  Hello   WoRld  ',
        expected: ['hello', 'world'],
    },
    // TODO: more test cases here
])('cleanInput($input)', ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input)

        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            // likewise, the `toBe` function will fail the test if the values are not equal
            expect(actual[i]).toBe(expected[i]);
        }
    })
})

test.concurrent.each([
    {
        key: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
        val: "testdata",
        interval: 500,
    },
    {
        key: "https://pokeapi.co/api/v2/location-area/?offset=20&limit=20",
        val: "moretestdata",
        interval: 1000,
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise(resolve => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
})