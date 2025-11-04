export interface Pokemon {
  // --- Tus propiedades existentes ---
  types: {
    type: { name: string };
  }[];
  sprites: { front_default: string };

  // --- Propiedades que faltan ---
  weight: number;
  height: number;
  
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}