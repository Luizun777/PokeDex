import { Component, OnInit } from '@angular/core';
import { PokeService } from '../service/poke.service';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-poke-fav',
  templateUrl: './poke-fav.component.html',
  styleUrls: ['./poke-fav.component.scss'],
  providers: [MessageService]
})
export class PokeFavComponent implements OnInit {

  // List
  List: any[] = [];

  // bool
  spin:boolean;
  error: boolean;
  sinPokemon: boolean;

  constructor( private api: PokeService, private messageService: MessageService ) { }

  ngOnInit() {
    this.error = false;
    this.sinPokemon = false;
    this.ListFav();
  }

  ListFav() {
    this.sinPokemon = false;
    this.error = false;
    this.spin = true;
    let list: any = null;
    let Llength: number = 0
    this.List = [];
    this.api.PokemonListFav().subscribe( (z: any) => {
      if( z.length !== 0 ) {
        for (const p of z) {
          let imagPok = p.img;
          if ( imagPok === null ) {
            imagPok = 'assets/IMG/pokeball.png';
          }
          this.api.PokeId( p.id_Pokemon ).subscribe( (x: any) => {
            let filtIdioma = x.flavor_text_entries.filter( f => f.language.name === 'es' );
            this.api.PokemonId( p.name.toLowerCase().trim() ).subscribe( (y: any) => {
              list = {
                id: p.id,
                id_Pokemon: p.id_Pokemon,
                img: imagPok,
                name: p.name,
                descr: filtIdioma[0].flavor_text,
                types: y.types,
                stats: y.stats
              }
              this.List.push(list)
              Llength = this.List.length
              if ( z.length === Llength ) {
                this.spin = false;
              }
            });
          },( error: any ) => {
            this.api.PokemonId( p.name.toLowerCase().trim() ).subscribe( (y: any) => {
              list = {
                id: p.id,
                id_Pokemon: p.id_Pokemon,
                img: imagPok,
                name: p.name,
                descr: error.status+' Pokeinfo '+error.error+'!!',
                types: y.types,
                stats: y.stats
              }
              this.List.push(list)
              Llength = this.List.length
              if ( z.length === Llength ) {
                this.spin = false;
              }
            });
          });
        }
      } else {
        this.spin = false;
        this.sinPokemon = true;
      }
    },( error: any ) => {
      this.sinPokemon = false;
      this.spin = false;
      this.error = true;
      this.messageService.add({severity:'error', summary: 'Error de conexión "'+error.name+'"', detail:'No pudo establecer una conexión con el servidor'});
    });
  }

  ElimFav( id_pokemon: number, name: string ) {
    this.spin = true;
    this.api.PokemonElimFav(id_pokemon).subscribe( (z) => {
      this.ListFav();
      this.messageService.add({severity:'success', summary: 'Liberaste a '+name, detail:'Ya no podrás ver a '+name+' en la pestaña de favoritos'});
    },( error: any ) => {
      this.List = [];
      this.ListFav();
    });
  }

}
