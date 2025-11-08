import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { PokemonResponse, IPokemon } from '../interfaces/IPokemon';

@Injectable({
  providedIn: 'root',
})
export class Pokemon { 

  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private nextUrl: string = ''; 

  constructor(private http: HttpClient) { }

  // --- FUNCIÓN 1: OBTENER LA LISTA ---
  getPokemons(): Observable<IPokemon[]> | null {

    if(this.nextUrl === null) {
      console.warn('Ya no hay más URLs, deteniendo.');
      return null;
    }

    const url = (this.nextUrl) ? this.nextUrl : this.baseUrl;
    
    return this.http.get<PokemonResponse>(url).pipe(
      
      map(response => {
        this.nextUrl = response.next; 
        return response.results;
      }),
      
      switchMap(results => {
        const pokemonRequests = results.map(pokemon => {
          return this.http.get<IPokemon>(pokemon.url);
        });
        return forkJoin(pokemonRequests);
      })
    );
  } // <-- ¡AQUÍ TERMINA getPokemons!


  // --- FUNCIÓN 2: OBTENER UN DETALLE ---
  getPokemonDetail(id: string | number): Observable<IPokemon> {
    // Usamos 'baseUrl' (que es .../pokemon) y le añadimos /id
    const url = `${this.baseUrl}/${id}`;
  
    // Hacemos la petición GET para obtener un solo IPokemon
    return this.http.get<IPokemon>(url);
  }

} // <-- ¡AQUÍ TERMINA LA CLASE!