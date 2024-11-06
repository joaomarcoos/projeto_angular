import { Component } from '@angular/core';
import { Cocktail } from '../../models/Cocktail';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../../services/cocktail.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details-cocktail',
  standalone: true,
  imports: [SpinnerComponent, NgIf],
  templateUrl: './details-cocktail.component.html',
  styleUrl: './details-cocktail.component.scss'
})
export class DetailsCocktailComponent {
  cocktailId: string | null = null;
  cocktail: Cocktail | null = null;
  isLoading: boolean = true;

  constructor(private router: ActivatedRoute, private cocktailService: CocktailService){}
  ngOnInit(): void {
    this.getDetailCocktail();
  }

  getDetailCocktail():void{
    this.cocktailId = this.router.snapshot.paramMap.get('cocktailID');
    console.log('coquetel data: ', this.cocktailId)
    if(this.cocktailId){
      this.cocktailService.getCocktailById(this.cocktailId).subscribe({
        next: (data) => {
          this.cocktail = data;
          this.isLoading = false;
          console.log('Detalhes do coquetel: ', this.cocktail)
        },
        error: (err) => console.error('Erro ao buscar detalhes do coquetel: ', err)
      })
    }


  }

}
