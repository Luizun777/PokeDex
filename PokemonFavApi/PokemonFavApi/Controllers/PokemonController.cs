using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PokemonFavApi.Data.Interfaces;
using PokemonFavApi.Model;

namespace PokemonFavApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly IPokeFavRepository _fav;

        public PokemonController(IPokeFavRepository fav)
        {
            _fav = fav;
        }

        [HttpPost]
        public IActionResult Post([FromBody] PokeFav pokemon)
        {
            try
            {
                return Ok(_fav.insertaPokemonFavorito(pokemon));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _fav.VerPokemon());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> VerPokemonId(int id)
        {
            try
            {
                return Ok(await _fav.VerPokemonId(id));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("[action]")]
        public IActionResult Delete(int id)
        {
            try
            {
                return Ok(_fav.EliminarFav(id));
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}