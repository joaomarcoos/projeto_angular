import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cocktail } from '../models/Cocktail';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  private apiUrlLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  private apiUrlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  private apiUrlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  private apiUrlTeorAlcoholic = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  private apiUrlTypeGlass = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
  private apiUrlIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  getCocktailsByLetter(letter: string): Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlLetter}${letter}`)
    .pipe(
      map(response => response.drinks || [])
    );
  }

  getCocktailByName(name: string): Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlName}${name}`)
    .pipe(
      map(response => response.drinks || [])
    );
  }

  getCocktailByCategory():Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlCategory}`)
    .pipe(
      map(response => response.drinks || [])
    )
  }

  getCocktailByTeorAlcoholic(): Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlTeorAlcoholic}`)
    .pipe(
      map(response => response.drinks || [])
    );
  }

  getCocktailTypeGlass():Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlTypeGlass}`)
    .pipe(
      map(response => response.drinks || [])
    );
  }

  getCocktailIngredient(): Observable<Cocktail[]>{
    return this.http.get<{drinks: Cocktail[]}>(`${this.apiUrlIngredient}`)
    .pipe(
      map(response => response.drinks || [])
    );
  }
}
