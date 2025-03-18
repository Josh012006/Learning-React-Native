export function getPokemonId (url: string) : number {
    const id = url.split("/");

    return parseInt(id[6], 10);
}