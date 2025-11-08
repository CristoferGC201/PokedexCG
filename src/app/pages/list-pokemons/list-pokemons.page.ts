import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';

import { Pokemon } from '../../services/pokemon';
import { IPokemon } from '../../interfaces/IPokemon';

// 1. IMPORTA EL ROUTER
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListPokemonsPage implements OnInit {

  constructor(
    private pokemonService: Pokemon,
    private loadingCtrl: LoadingController,
    private router: Router // 2. INYECTA EL ROUTER
  ) { }
  
  public pokemons: IPokemon[] = [];
  
  ngOnInit() {
    this.getMorePokemons();
  }

  // Esta función es la del Paso 12 (Infinite Scroll)
  async getMorePokemons(event?: any) {

    let loading: HTMLIonLoadingElement | null = null;
    if (!event) {
      loading = await this.loadingCtrl.create({
        message: 'Cargando...',
        spinner: 'bubbles',
      });
      await loading.present();
    }

    const request = this.pokemonService.getPokemons();

    if (request === null) {
      console.log('No hay más pokemons que cargar.');
      if (loading) await loading.dismiss();
      if (event) {
        event.target.disabled = true;
        event.target.complete();
      }
      return;
    }
    
    request.subscribe({
      next: (data: IPokemon[]) => {
        this.pokemons.push(...data);
        console.log('Pokemons cargados:', this.pokemons);
        
        if (loading) loading.dismiss();
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        console.error('Error al cargar pokemons:', err);
        
        if (loading) loading.dismiss();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  // 3. ESTA ES LA NUEVA FUNCIÓN DEL PASO 13
  goToPage(id: number) {
    this.router.navigate(['/detail-pokemon', id]);
  }
}