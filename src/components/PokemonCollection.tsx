import React from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>; // ta hover vào setDetail trong phần useState() trong App.tsx
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  // sẽ lỗi nếu nó chưa biết type của pokemons là gì

  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) { // chỉ khi nào false thì mới đổi thành true
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };

  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}

        {pokemons.map((pokemon) => {
          return (
            <div onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonCollection;
