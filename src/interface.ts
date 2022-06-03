export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

// Nếu ta thêm trực tiếp abilities vào interface Pokemon nó sẽ hơi rắc rối:
// ta sẽ phải sửa cả bên app
// abilities = {ability: {name: }}
export interface PokemonDetail extends Pokemon {
  abilities?: {
    ability:string;
    name:string;
  }[]
}
// cần để abilities là "?" - optional; vì Bên App.tsx ta đã truyền <PokemonCollection pokemons={pokemons}/>
// 1 pokemons là PokemonDetail required "abilities" , 1 pokemons là Pokemon không có abilities không có "abilities"