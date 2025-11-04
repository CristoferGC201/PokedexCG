// Importamos CommonModule
import { CommonModule, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokeService } from '../core/services/poke.service';

@Component({
  selector: 'poke-details',
  standalone: true, // <-- Esta propiedad ya la deberías tener
  // Añadimos CommonModule
  imports: [CommonModule, TitleCasePipe, NgOptimizedImage, RouterLink],
  template: `
    @if (pokeResource.isLoading()) {
      <p>Loading...</p>
    } @else if (pokeResource.error()) {
      <p>Error loading Pokémon</p>
    } @else {
      @if (pokeResource.value(); as pokemon) {
        
        <div class="poke-details">
          <img
            width="200"
            height="200"
            [ngSrc]="pokemon.sprites.front_default"
            [alt]="name()"
          />

          <h1 class="title">{{ name() | titlecase }}</h1>

          <div>
            @for (type of pokemon.types; track type) {
              <span class="type-badge" [ngClass]="type.type.name"> 
                {{ type.type.name | titlecase }} 
              </span>
            }
          </div>

          <div class="info-container">
            <div class="info-item">
              <strong>Peso:</strong>
              <span>{{ pokemon.weight / 10 }} kg</span>
            </div>
            <div class="info-item">
              <strong>Altura:</strong>
              <span>{{ pokemon.height / 10 }} m</span>
            </div>
          </div>
          <a routerLink="/" class="back-link">← Back to Pokémon List</a>
        </div>


        <div class="pokemon-detail-card">
          <h3>Habilidades</h3>
          <div class="abilities-container">
            @for (abilityInfo of pokemon.abilities; track $index) {
              <div class="ability-item">
                @if (!abilityInfo.is_hidden) {
                  <span><strong>Principal:</strong> {{ abilityInfo.ability.name | titlecase }}</span>
                } @else {
                  <span><strong>Oculta:</strong> {{ abilityInfo.ability.name | titlecase }}</span>
                }
              </div>
            }
          </div>
        </div>

        <div class="pokemon-detail-card">
          <h3>Estadísticas</h3>
          <div class="stats-container">
            @for (statInfo of pokemon.stats; track $index) {
              <div class="stat-row">
                <span class="stat-name">{{ statInfo.stat.name | titlecase }}</span>
                <span class="stat-value">{{ statInfo.base_stat }}</span>
                <div class="stat-bar-background">
                  <div class="stat-bar-value" [style.width.%]="statInfo.base_stat / 2.55"></div>
                </div>
              </div>
            }
          </div>
        </div>
      
      }
    }
  `,
  styleUrl: './details.css',
})
export default class Details {
  readonly name = input<string>('');
  readonly #pokeService = inject(PokeService);
  protected readonly pokeResource = this.#pokeService.getPokemon(this.name);
}