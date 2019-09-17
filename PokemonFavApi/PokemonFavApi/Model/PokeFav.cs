using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonFavApi.Model
{
    public class PokeFav
    {
        public int id { get; set; }
        public int id_Pokemon { get; set; }
        public string name { get; set; }
        public string img { get; set; }
    }
}
