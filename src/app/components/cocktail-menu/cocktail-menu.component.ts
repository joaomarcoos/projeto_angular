import { Component} from '@angular/core';
import { CocktailListComponent } from "../cocktail-list/cocktail-list.component";
import { FormsModule} from '@angular/forms';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../models/Cocktail';

@Component({
  selector: 'app-cocktail-menu',
  standalone: true,
  imports: [CocktailListComponent, FormsModule],
  templateUrl: './cocktail-menu.component.html',
  styleUrl: './cocktail-menu.component.scss'
})
export class CocktailMenuComponent {
  cocktailName: string = '';
  listCocktailName: Cocktail[] = [];

  constructor(private cocktailService: CocktailService){}

  getCocktailByName(){
    if(this.cocktailName.trim()){
      this.cocktailService.getCocktailByName(this.cocktailName).subscribe({
        next:(data)=>{
          this.listCocktailName = data;
          console.log('Nome do cocktail: ', data)
        },
        error:(err)=>console.error('Erro ao buscar cocktail: ', err)
      });
    }
  }
}
