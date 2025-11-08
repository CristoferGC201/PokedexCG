// Para la respuesta de la lista de pokemons (GET /pokemon)
export interface PokemonResponse {
  count: number;
  next: string;
  previous: null | string;
  results: Pokemon[]; // Usa la interface simple de Pokemon
}

// Interface simple para cada item de la lista
export interface Pokemon {
  name: string;
  url: string;
}

// --- Interface para el detalle del Pokemon (GET /pokemon/{id}) ---

// Esta es la interface principal para el detalle
export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Type[];
  abilities: Ability[];
  stats: IStats[]; // Usando la interface IStats
}

export interface Sprites {
  front_default: string;
  other?: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}