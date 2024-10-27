import { Routes } from '@angular/router';
import { CocktailMenuComponent } from './components/cocktail-menu/cocktail-menu.component';

export const routes: Routes = [
  {
    path:'', redirectTo:'cocktailMenu', pathMatch: 'full'
  },
  {
    path:'cocktailMenu', component: CocktailMenuComponent
  }
];
