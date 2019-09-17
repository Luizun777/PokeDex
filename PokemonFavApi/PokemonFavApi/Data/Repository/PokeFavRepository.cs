using Dapper;
using PersonaApi.Data.Repository;
using PokemonFavApi.Data.Interfaces;
using PokemonFavApi.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonFavApi.Data.Repository
{
    public class PokeFavRepository : BaseRepository, IPokeFavRepository
    {
        public PokeFavRepository( string conn ) : base(conn)
        {

        }

        public bool insertaPokemonFavorito(PokeFav z)
        {
            IDbTransaction dbTransaction;

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id_pokemon", z.id_Pokemon);
            parameters.Add("@name", z.name);
            parameters.Add("@img", z.img);

            using (IDbConnection db = GetConnection())
            {
                db.Open();
                dbTransaction = db.BeginTransaction();
                try
                {
                    db.ExecuteScalar("uspInsertPokeFav", commandType: CommandType.StoredProcedure, param: parameters, transaction: dbTransaction);
                    dbTransaction.Commit();
                    db.Close();
                    return true;
                }
                catch (Exception)
                {
                    dbTransaction.Rollback();
                    db.Close();
                    return false;
                }
            }
        }

        public async Task<IEnumerable<PokeFav>> VerPokemon()
        {
            using (IDbConnection db = GetConnection())
            {
                db.Open();
                try
                {
                    var per = await db.QueryAsync<PokeFav>("uspVerFavoritos", commandType: CommandType.StoredProcedure);
                    db.Close();
                    return per;
                }
                catch (Exception)
                {
                    db.Close();
                    return null;
                }
            }
        }

        public async Task<int> VerPokemonId(int id_pokemon)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id_pokemon", id_pokemon);
            using (IDbConnection db = GetConnection())
            {
                db.Open();
                try
                {
                    var per = await db.QuerySingleAsync<int>("uspPokeFavId", commandType: CommandType.StoredProcedure, param: parameters);
                    db.Close();
                    return per;
                }
                catch (Exception)
                {
                    db.Close();
                    return 0;
                }
            }
        }

        public bool EliminarFav(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id_pokemon", id);
            using (IDbConnection db = GetConnection())
            {
                db.Open();
                try
                {
                    db.ExecuteScalar("uspEliminarFav", commandType: CommandType.StoredProcedure, param: parameters);
                    db.Close();
                    return true;
                }
                catch (System.Exception)
                {
                    db.Close();
                    return false;
                }
            }
        }
    }
}
