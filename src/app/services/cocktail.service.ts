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
}
