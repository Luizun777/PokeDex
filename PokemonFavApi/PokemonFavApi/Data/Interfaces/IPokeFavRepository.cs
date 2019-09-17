using PokemonFavApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonFavApi.Data.Interfaces
{
    public interface IPokeFavRepository
    {
        bool insertaPokemonFavorito(PokeFav z);
        Task<IEnumerable<PokeFav>> VerPokemon();
        Task<int> VerPokemonId(int id_pokemon);
        bool EliminarFav(int id);
    }
}
