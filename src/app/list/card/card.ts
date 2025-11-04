// Imports: Añadimos 'HttpResourceRef' de '@angular/common/http'
import { CommonModule, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Component, input, computed, Signal } from '@angular/core';
import { PokeResult } from '../../core/models/poke-result.model';
import { PokeImgPipe } from './poke-img-pipe';
import { RouterLink } from '@angular/router';
import { PokeService } from '../../core/services/poke.service';
import { Pokemon } from '../../core/models/pokemon.model';
import { HttpResourceRef } from '@angular/common/http'; // <-- AÑADIDO

@Component({
  selector: 'poke-card',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, PokeImgPipe, NgOptimizedImage, RouterLink], 
  template: `
    <a class="poke-card" [routerLink]="pokeResult().name">
      <img
        width="120"
        height="120"
        [ngSrc]="pokeResult().url | pokeImg"
        [alt]="pokeResult().name"
      />
      <p>{{ pokeResult().name | titlecase }}</p>

      <ng-container *ngIf="pokemonDetails.value() as pokemon">
        <div class="types-container">
          
          <span *ngFor="let typeInfo of pokemon.types" 
                class="type-pill" 
                [ngClass]="typeInfo.type.name">
            {{ typeInfo.type.name | titlecase }}
          </span>
          </div>
      </ng-container>
    </a>
  `,
  styleUrl: './card.css',
})
export class Card {
  readonly pokeResult = input.required<PokeResult>();
  readonly pokemonName = computed(() => this.pokeResult().name);

  // --- LÓGICA CORREGIDA ---

  // 1. El tipo no es 'Signal', es 'HttpResourceRef'
  readonly pokemonDetails: HttpResourceRef<Pokemon | undefined>; // <-- CORREGIDO

  constructor(private pokeService: PokeService) {
    // 2. Esta línea ahora es correcta, porque los tipos coinciden
    this.pokemonDetails = this.pokeService.getPokemon(this.pokemonName);
  }
}