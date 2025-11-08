import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

import { Pokemon } from '../../services/pokemon';
import { IPokemon } from '../../interfaces/IPokemon';
import { ActivatedRoute } from '@angular/router';

// 1. IMPORTA 'addIcons' DE IONICONS
import { addIcons } from 'ionicons';
// 2. IMPORTA EL ÍCONO 'close'
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPokemonPage implements OnInit {

  public pokemon: IPokemon | null = null;
  private id: string | null = null; 

  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { 
    // 3. AÑADE EL ÍCONO A LA LIBRERÍA
    addIcons({ close });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    console.log('ID recibido (Manualmente):', this.id);
    
    if (this.id) {
      this.pokemonService.getPokemonDetail(this.id).subscribe({
        next: (data) => {
          this.pokemon = data;
          console.log('Datos del Pokémon:', this.pokemon);
        },
        error: (err) => {
          console.error('Error al cargar datos del pokémon:', err);
        }
      });
    } else {
      console.error('No se pudo obtener un ID de la URL');
    }
  }

  close() {
    this.navCtrl.back();
  }
}