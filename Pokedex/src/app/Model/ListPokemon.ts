import { Pokemon } from './Pokemon';
export interface ListPokemon {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
