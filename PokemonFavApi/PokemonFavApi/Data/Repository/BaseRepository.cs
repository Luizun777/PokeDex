using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PersonaApi.Data.Repository
{
    public class BaseRepository
    {
        private readonly string cnnString;

        public BaseRepository(string cnnString)
        {
            this.cnnString = cnnString;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(cnnString);
        }
    }
}
