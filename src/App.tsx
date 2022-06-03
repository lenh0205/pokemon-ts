import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpened: boolean;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // vì ta thấy pokemons sẽ có "name", "url" nên sẽ là string, nhưng initialValue là [] -> ta có thể dùng <string[]>
  // nhưng nếu ta muốn kỹ -> tạo 1 interface Pokemon -> rồi gắn vào Pokemon[] vì nó là 1 Array với nhiều Pokemon bên trong
  const [nextUrl, setNextUrl] = useState<string>("");
  // nextUrl chứa link cho lần tiếp theo nên sẽ là <string>
  const [loading, setLoading] = useState<boolean>(true);
  // thông tin chi tiết của từng pokemon
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0, // state sẽ lưu trữ id của con pokemon đc ta chọn
    isOpened: false, // state thể hiện bảng thông tin của pokemon hiện/ẩn
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);

      // response của từng Pokemon gồm "name" và "url"
      // "url" là 1 API giúp ta lấy đc thông tin chi tiết của pokemon đó
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((prev) => [...prev, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);

    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((prev) => [...prev, poke.data]);
    });
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {/* sẽ bị lỗi nếu bên PokemonCollection chưa khai báo type cho prop đc truyền*/}

        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
