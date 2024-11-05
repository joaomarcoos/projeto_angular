import { Component } from '@angular/core';
import { Cocktail } from '../../models/Cocktail';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-cocktail',
  standalone: true,
  imports: [],
  templateUrl: './details-cocktail.component.html',
  styleUrl: './details-cocktail.component.scss'
})
export class DetailsCocktailComponent {
  cocktail: Cocktail | null = null;

  constructor(private router: ActivatedRoute,){}
  ngOnInit(): void {
  }

  getDetailCocktail():void{
    const cocktailData = this.router.snapshot.paramMap.get('cocktail');
    if(cocktailData){
      this.cocktail = JSON.parse(cocktailData);

      console.log(this.cocktail);
    }
  }

}
