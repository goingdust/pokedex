export const cleanInput = (input: string): string[] => {
    if (input.trim().length === 0) return [];
    return input.trim().toLocaleLowerCase().split(' ').filter((str) => str.length > 0);
}