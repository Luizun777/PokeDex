import { Component, OnInit } from '@angular/core';
import { PokeService } from '../service/poke.service';
import { ListPokemon } from '../Model/ListPokemon';
import { Pokemon } from '../Model/Pokemon';
import { FormControl, FormGroup } from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  providers: [MessageService]
})
export class PokeListComponent implements OnInit {

  // From
  PokeFrom: FormGroup;

  // List
  List: ListPokemon[];
  ListResp: ListPokemon[];
  ListaPokemon: any = [];
  PaginasPokemon: any[] = [];

  // btn
  btn_prev: boolean;
  btn_next: boolean;

  // String
  PokeUrlActual: string;
  
  // num
  PagActual: number = 1;
  PagTotal: number;

  // bool
  spin:boolean;
  error: boolean;

  constructor( private api: PokeService, private messageService: MessageService ) { }

  ngOnInit() {
    this.FomrIn();
    this.getPokemonList();
    this.Paginas()
  }

  FomrIn() {
    this.PokeFrom = new FormGroup({
      id: new FormControl(0),
      id_Pokemon: new FormControl(0),
      name: new FormControl(''),
      img: new FormControl('')
    });
  }

  getPokemonList() {
    this.error = false;
    this.spin = true;
    let Llength: number = 0
    let lista: ListPokemon = null;
    let pokemon: Pokemon = null;
    this.api.PokemonList().subscribe( (z: any) => {
      if ( z.next === null ) {
        this.btn_next = true;
      }
      if ( z.previous === null ) {
        this.btn_prev = true;
      }
      lista = {
        count: z.count,
        next: z.next,
        previous: z.previous,
        results: []
      };
      this.List = [];
      this.List.push(lista);
      this.ListaPokemon = [];
      for (const p of z.results) {
        this.api.PokemonId( p.name ).subscribe( (x: any) => {
          const nombrePokemon: string = this.Mayus(p.name);
          this.api.PokemonListFavId( x.id ).subscribe( async (y: any) => {
            let imagPok = x.sprites.front_default;
            if ( imagPok === null ) {
              imagPok = 'assets/IMG/pokeball.png';
            }
            let pFav = false;
            if ( y === 1 ) {
              pFav = true;
            }
            pokemon = {
              id: x.id,
              name: nombrePokemon,
              imagenes: imagPok,
              fav: pFav,
              url: p.url,
              types: x.types,
              stats: x.stats
            };
            await this.ListaPokemon.push(pokemon);
            this.ListaPokemon.sort( (a, b) => {
              return a.id - b.id;
            });
            Llength = this.ListaPokemon.length
            if ( z.results.length === Llength ) {
              this.spin = false;
            }
          },async ( error: any ) => {
            let imagPok = x.sprites.front_default;
            if ( imagPok === null ) {
              imagPok = 'assets/IMG/pokeball.png';
            }
            let pFav = false;
            pokemon = {
              id: x.id,
              name: nombrePokemon,
              imagenes: imagPok,
              fav: pFav,
              url: p.url,
              types: x.types,
              stats: x.stats
            };
            await this.ListaPokemon.push(pokemon);
            this.ListaPokemon.sort( (a, b) => {
              return a.id - b.id;
            });
            Llength = this.ListaPokemon.length
            if ( z.results.length === Llength ) {
            this.messageService.add({severity:'error', summary: 'Error de conexión "'+error.name+'"', detail:'No pudo establecer una conexión con el servidor'});
              this.spin = false;
            }
            this.error = true;
          });
        });
      }
      this.List[0].results.push( this.ListaPokemon );
    });
  }

  Mayus( nombrePokemon: string ) {
    return nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
  }

  Paginador( n: string, typo:string, i: number ) {
    switch ( typo ) {
      case "inicio":
        this.PagActual = 1;
      break;
      case "prev":
        this.PagActual -= 1;
      break;
      case "nex":
        this.PagActual += 1;
      break;
      case "fin":
        this.PagActual = this.PagTotal;
      break;
      case "select":
        this.PagActual = i;
      break;
    }
    this.spin = true;
    this.error = false;
    this.PokeUrlActual = n;
    let Llength: number = 0
    let lista: ListPokemon = null;
    let pokemon: Pokemon = null;
    this.api.PokemonListPage( this.PokeUrlActual ).subscribe( (z: any) => {
      if ( z.next === null ) {
        this.btn_next = true;
      } else {
        this.btn_next = false;
      }
      if ( z.previous === null ) {
        this.btn_prev = true;
      } else {
        this.btn_prev = false;
      }
      lista = {
        count: z.count,
        next: z.next,
        previous: z.previous,
        results: []
      };
      this.List = [];
      this.List.push(lista);
      this.ListaPokemon = [];
      for (const p of z.results) {
        this.api.PokemonId( p.name ).subscribe( (x: any) => {
          const nombrePokemon: string = this.Mayus(p.name);
          this.api.PokemonListFavId( x.id ).subscribe( (y: any) => {
            let imagPok = x.sprites.front_default;
            if ( imagPok === null ) {
              imagPok = 'assets/IMG/pokeball.png';
            }
            let pFav = false;
            if ( y === 1 ) {
              pFav = true;
            }
            pokemon = {
              id: x.id,
              name: nombrePokemon,
              imagenes: imagPok,
              fav: pFav,
              url: p.url,
              types: x.types,
              stats: x.stats
            };
            this.ListaPokemon.push(pokemon);
            this.ListaPokemon.sort( (a, b) => {
              return a.id - b.id;
            });
            Llength = this.ListaPokemon.length
            if ( z.results.length === Llength ) {
              this.spin = false;
            }
          },async ( error: any ) => {
            this.error = true;
            let imagPok = x.sprites.front_default;
            if ( imagPok === null ) {
              imagPok = 'assets/IMG/pokeball.png';
            }
            let pFav = false;
            pokemon = {
              id: x.id,
              name: nombrePokemon,
              imagenes: imagPok,
              fav: pFav,
              url: p.url,
              types: x.types,
              stats: x.stats
            };
            await this.ListaPokemon.push(pokemon);
            this.ListaPokemon.sort( (a, b) => {
              return a.id - b.id;
            });
            Llength = this.ListaPokemon.length
            if ( z.results.length === Llength ) {
              this.spin = false;
            }
          });
        });
      }
      this.List[0].results.push( this.ListaPokemon );
    });
  }

  insertPokemonFav( id: number, name: string, img: string, index: number) {
    this.spin = true;
    this.PokeFrom.patchValue({
      id_Pokemon: id,
      name: name,
      img: img
    });
    const f = Object.assign({}, this.PokeFrom.value);
    this.api.InsertarFav( f ).subscribe( z => {
      if ( z ) {
        if ( this.PokeUrlActual === undefined ) {
          this.getPokemonList();
          this.messageService.add({severity:'success', summary: 'Atrapaste a un '+name, detail:'Puedes ver más información de '+name+' en la pestaña de favoritos'});
        } else {
          this.Paginador(this.PokeUrlActual, null, this.PagActual);
          this.messageService.add({severity:'success', summary: 'Atrapaste a un '+name, detail:'Puedes ver más información de '+name+' en la pestaña de favoritos'});
        }
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Inténtelo más tarde'});
      }
    },( error: any ) => {
      // this.spin = false;
      this.messageService.add({severity:'error', summary: 'No puedes capturar a '+name, detail:'Error de conexión "'+error.name+'". Inténtelo más tarde'});
      if ( this.PokeUrlActual === undefined ) {
        this.getPokemonList();
      } else {
        this.Paginador(this.PokeUrlActual, null, this.PagActual);
      }
    });
  }

  ElimFav( id_pokemon: number, name: string ) {
    this.spin = true;
    this.api.PokemonElimFav(id_pokemon).subscribe( (x) => {
      if (x) {
        if ( this.PokeUrlActual === undefined ) {
          this.getPokemonList();
          this.messageService.add({severity:'success', summary: 'Liberaste a '+name, detail:'Ya no podrás ver a '+name+' en la pestaña de favoritos'});
        } else {
          this.Paginador(this.PokeUrlActual, null, this.PagActual);
          this.messageService.add({severity:'success', summary: 'Liberaste a '+name, detail:'Ya no podrás ver a '+name+' en la pestaña de favoritos'});
        }
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Inténtelo más tarde'});
      }
    },( error: any ) => {
      this.messageService.add({severity:'error', summary: 'No puedes liberar a '+name, detail:'Error de conexión "'+error.name+'". Inténtelo más tarde'});
      if ( this.PokeUrlActual === undefined ) {
        this.getPokemonList();
      } else {
        this.Paginador(this.PokeUrlActual, null, this.PagActual);
      }
    });
  }

  Paginas() {
    let index = 1;
    for (let i = 0; i <= 960; i+=20) {
      const element = {
        index: index,
        url: 'https://pokeapi.co/api/v2/pokemon?offset='+i+'&limit=20'
      };
      this.PaginasPokemon.push(element)
      index++
    }
    this.PagTotal = this.PaginasPokemon.length;
    
  }

}
