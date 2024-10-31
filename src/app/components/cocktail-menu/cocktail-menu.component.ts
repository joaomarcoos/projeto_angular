import { Component, OnInit} from '@angular/core';
import { CocktailListComponent } from "../cocktail-list/cocktail-list.component";
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../models/Cocktail';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cocktail-menu',
  standalone: true,
  imports: [CocktailListComponent, FormsModule, ReactiveFormsModule, NgIf,NgFor],
  templateUrl: './cocktail-menu.component.html',
  styleUrl: './cocktail-menu.component.scss'
})
export class CocktailMenuComponent implements OnInit{
  cocktailName: string = '';
  filterType: string = '';
  selectedCategory: string = '';
  selectedTeorAlcoholic: string = '';
  selectedTypeGlass: string = '';

  selectCategoryControl = new FormControl('');
  selectTeorAlcoholicControl = new FormControl('');
  selectTypeGlassControl = new FormControl('');


  listCocktailName: Cocktail[] = [];
  listCocktailCategory: Cocktail[] = [];
  listCocktailTeorAlcoholic: Cocktail[] = [];
  listCocktailTypeGlass: Cocktail[] = [];
  listCocktailIngredient: Cocktail[] = [];

  constructor(private cocktailService: CocktailService){}
  ngOnInit(): void {
    this.getCocktailByCategory();
    this.getCocktailByTeorAlcoholic();
    this.getCocktailByTypeGlass();
    this.getCocktailByIngredient()
  }

  getCocktailByName(){
    if(this.cocktailName.trim()){
      this.cocktailService.getCocktailByName(this.cocktailName).subscribe({
        next:(data)=>{
          this.listCocktailName = data;
          // console.log('Nome do cocktail: ', data)
        },
        error:(err)=>console.error('Erro ao buscar cocktail: ', err)
      });
    }
  }

  getCocktailByCategory():void{

    this.cocktailService.getCocktailByCategory().subscribe({
      next:(data)=>{
        this.listCocktailCategory = data;
        // console.log('Categorias dos cocktails: ', this.listCocktailCategory)
      },
      error:(err)=>console.error('Erro ao buscar categorias de cocktails: ', err)
    });
  }

  getCocktailByTeorAlcoholic():void{
    this.cocktailService.getCocktailByTeorAlcoholic().subscribe({
      next:(data)=>{
        this.listCocktailTeorAlcoholic = data;
        // console.log('Cocktails com teor alcoolico: ', this.listCocktailTeorAlcoholic)
      },
      error:(err)=>console.error('Erro ao buscar cocktails com teor alcoolico: ', err)
    });
  }

  getCocktailByTypeGlass():void{
    this.cocktailService.getCocktailTypeGlass().subscribe({
      next:(data)=>{
        this.listCocktailTypeGlass = data;
        // console.log('Cocktails por glass: ', this.listCocktailTypeGlass)
      },
      error:(err)=>console.error('Erro ao buscar cocktails por glass: ', err)
    })
  }

  getCocktailByIngredient():void{
    this.cocktailService.getCocktailIngredient().subscribe({
      next:(data)=>{
        this.listCocktailIngredient = data;
        // console.log('Cocktails por ingrediente: ', this.listCocktailIngredient)
      },
      error:(err)=>console.error('Erro ao buscar cocktails por ingrediente: ', err)
    })
  }

  applyFilter():void{
    if(this.filterType === 'name'){
      this.getCocktailByName();
    }
    if(this.filterType === 'category'){
      // this.getCocktailByCategory();
      this.selectedCategory = this.selectCategoryControl.value ?? '';
      console.log('categoria selecionada', this.selectedCategory)
    }
    if(this.filterType === 'teorAlcoholic'){
      this.selectedTeorAlcoholic = this.selectTeorAlcoholicControl.value ?? '';
      console.log('Teor Alcoólico selecionada', this.selectedTeorAlcoholic)
    }
    if(this.filterType === 'typeGlass'){
      this.selectedTypeGlass = this.selectTypeGlassControl.value?? '';
      console.log('Tipo de Glass selecionado', this.selectedTypeGlass)
    }
  }
}
