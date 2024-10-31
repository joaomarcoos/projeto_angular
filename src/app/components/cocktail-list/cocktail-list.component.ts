import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cocktail } from '../../models/Cocktail';
import { CocktailService } from '../../services/cocktail.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { forkJoin, map, race, tap } from 'rxjs';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [NgFor, SpinnerComponent, NgIf],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit, OnChanges{

  @Input() selectedCategory!: string;
  @Input() selectedTeorAlcoholic!: string;
  @Input() selectedTypeGlass!: string;
  @Input() cocktailNames: Cocktail[] = [];

  cocktails: Cocktail[] = [];
  originalListCocktails: Cocktail[] = [];
  paginatedCocktails: Cocktail[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  isLoading: boolean = true;
  notFound: boolean = false;

  constructor(private cocktailService: CocktailService){}

  ngOnInit(): void {
    this.loadCocktails();

  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['cocktailNames']){
        if(this.cocktailNames && this.cocktailNames.length > 0){
          this.cocktails = this.cocktailNames;
          this.notFound = true;
        }
          this.loadCocktails()
          this.notFound = false;
      }


      if(changes['selectedCategory']){

        this.filterCocktailsByCategory();
      }

      if(changes['selectedTeorAlcoholic']){
        this.filterCocktailsByTeorAlcoholic();
      }
      if(changes['selectedTypeGlass']){
        this.filterCocktailsByTypeGlass();
      }
  }

  loadCocktails(): void {
    this.isLoading = true;
    const allCocktails: Cocktail[] = [];

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const cocktailAllRequest = alphabet.map(letter =>
      this.cocktailService.getCocktailsByLetter(letter).pipe(
        tap((data) =>{
          if(data && data.length > 0){
            allCocktails.push(...data);
            // console.log("all cocktails: ", allCocktails)
          }
        })
      )
    )

    // console.log("requisição do cockteis: ", cocktailAllRequest)


    forkJoin(cocktailAllRequest).subscribe({
      next:()=>{
        // console.log("dados no forkJoin: ", this.cocktails = allCocktails)

        this.cocktails = allCocktails.sort((nameCocktail, letter) => nameCocktail.strDrink.localeCompare(letter.strDrink));
        this.originalListCocktails = [...this.cocktails];
        this.notFound = allCocktails.length === 0;

        this.calculatePage();
        this.updatePaginatedCocktails();
        this.isLoading = false;
      },
      error: (err)=>{
        console.error('Erro ao buscar os cocktéis', err);
        this.cocktails = [];
        this.notFound = true;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

 filterCocktailsByCategory():void{

  if(this.selectedCategory){
    this.cocktails = this.originalListCocktails.filter(cocktail => cocktail.strCategory.toLowerCase().includes(this.selectedCategory.toLowerCase()));

    this.currentPage = 1;
    this.calculatePage();
    this.updatePaginatedCocktails();
  }
 }

 filterCocktailsByTeorAlcoholic():void{
  if(this.selectedTeorAlcoholic){
    this.cocktails = this.originalListCocktails.filter(cocktail => cocktail.strAlcoholic.toLowerCase().includes(this.selectedTeorAlcoholic.toLowerCase()));
    console.log('filtrador teor alcoolico: ', this.cocktails)

    this.currentPage = 1;
    this.calculatePage();
    this.updatePaginatedCocktails();
 }
}

filterCocktailsByTypeGlass():void{
  if(this.selectedTypeGlass){
    this.cocktails = this.originalListCocktails.filter(cocktail => cocktail.strGlass.toLowerCase().includes(this.selectedTypeGlass.toLowerCase()));
    console.log('filtrador teor alcoolico: ', this.cocktails)

    this.currentPage = 1;
    this.calculatePage();
    this.updatePaginatedCocktails();
  }
}


  calculatePage():void{
    this.totalPages = Math.ceil(this.cocktails.length / this.itemsPerPage);
  }

  updatePaginatedCocktails(): void {

    this.totalPages = Math.ceil(this.cocktails.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCocktails = this.cocktails.slice(startIndex, endIndex);

  }

  previewPage():void{
    if(this.currentPage > 1){
      this.currentPage--;
    }
    this.updatePaginatedCocktails();
  }

  nextPage(): void{
    if(this.currentPage < this.totalPages){
      this.currentPage++;
    }
    this.updatePaginatedCocktails();
  }
}
