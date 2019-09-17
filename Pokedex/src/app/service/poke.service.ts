import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeUrl } from '../service/PokeUrl';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor( private http: HttpClient ) { }

  // Servidor PokAapi

  PokemonList() {
    return this.http.get( PokeUrl.ApiUrl + 'pokemon' );
  }

  PokemonId( name: string ) {
    return this.http.get( PokeUrl.ApiUrl + 'pokemon/' + name);
  }

  PokemonListPage( url: string ) {
    return this.http.get( url );
  }

  PokeId( id: number ) {
    return this.http.get( PokeUrl.ApiUrl + 'pokemon-species/' + id );
  }

  TypesPokemon( url: string ) {
    return this.http.get(url);
  }

  // Servidor Producción Pokemon Favorito

  InsertarFav( pokeFav: any ) {
    return this.http.post( PokeUrl.NetApi + 'Pokemon', pokeFav);
  }

  PokemonListFav() {
    return this.http.get( PokeUrl.NetApi + 'Pokemon' );
  }

  PokemonListFavId( id: any ) {
    return this.http.get( PokeUrl.NetApi + 'Pokemon/VerPokemonId', { params: {'id': id} });
  }

  PokemonElimFav( id: any ) {
    return this.http.delete( PokeUrl.NetApi + 'Pokemon/Delete', { params: {'id': id} });
  }

}
