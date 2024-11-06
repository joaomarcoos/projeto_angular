import { Routes } from '@angular/router';
import { CocktailMenuComponent } from './components/cocktail-menu/cocktail-menu.component';
import { DetailsCocktailComponent } from './components/details-cocktail/details-cocktail.component';

export const routes: Routes = [
  {
    path:'', redirectTo:'cocktailMenu', pathMatch: 'full'
  },
  {
    path:'cocktailMenu', component: CocktailMenuComponent
  },
  {
    path:'detailsCocktail/:cocktailID', component: DetailsCocktailComponent
  }
];
