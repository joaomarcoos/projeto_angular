import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cocktail } from '../../models/Cocktail';
import { CocktailService } from '../../services/cocktail.service';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [NgFor, SpinnerComponent, NgIf],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit, OnChanges{

  @Input() selectedCategory!: string;
  @Input() cocktailNames: Cocktail[] = [];
  @Input() listCocktailCategory: Cocktail[] = [];

  cocktails: Cocktail[] = [];
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


      else if(changes['selectedCategory'] && this.selectedCategory){
        console.log('Estrutura de listCocktailCategory:', JSON.stringify(this.listCocktailCategory, null, 2));

        this.cocktails = this.listCocktailCategory
        .filter((category)=>{
          const isMath = category.strCategory === this.selectedCategory;
          console.log('Verificando categoria:', category.strCategory, '==', this.selectedCategory, '=>', isMath);
          return isMath;
        })

        if (this.cocktails.length === 0) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }

        console.log('filtrados', this.cocktails)
      }
        this.currentPage = 1;
        this.calculatePage();
        this.updatePaginatedCocktails();
  }

  loadCocktails(): void {
    this.isLoading = true;
    this.cocktailService.getCocktailsByLetter('a').subscribe({
      next:(data)=>{

        if(data && data.length>0){
          this.cocktails = data;
          this.notFound = false;
        }else{
          this.cocktails = [];
          this.notFound = true;
        }
        this.calculatePage();
        this.updatePaginatedCocktails();
        this.isLoading = false;
      },
      error: (err)=>{
        console.error('Erro ao buscar os cocktéis', err);
        this.cocktails = [];
        this.notFound = true;
        this.isLoading = false;
      }
    })
  }


  calculatePage():void{
    this.totalPages = Math.ceil(this.cocktails.length / this.itemsPerPage);
  }

  updatePaginatedCocktails(): void {

    this.totalPages = Math.ceil(this.cocktailNames.length / this.itemsPerPage);
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
