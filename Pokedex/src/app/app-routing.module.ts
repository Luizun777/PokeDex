import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeFavComponent } from './poke-fav/poke-fav.component';

const routes: Routes = [
  { path: 'PokeList', component: PokeListComponent },
  { path: 'PokeFav', component: PokeFavComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'PokeList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
