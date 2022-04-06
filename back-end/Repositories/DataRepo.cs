using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public class DataRepo : IDataRepo
    {
        private readonly AmadeusDBContext _context;
        public DataRepo(AmadeusDBContext context)
        {
            _context = context;
        }
        public ICollection<int> GetIDs()
        {
            return _context.Loggings.Select(i => i.ProportioningDbid).Distinct().ToList();
        }
        public ICollection<Logging> GetLoggings(int id)
        {
            ICollection<Logging> loggings = _context.Loggings.Where(i => i.ProportioningDbid == id).ToList();
            return loggings.OrderBy(o => o.LoggingDbid).ToList();
        }

        public ICollection<Logging> GetDosingFinals()
        {
            var loggings = _context.Loggings;

            var query =
                from d in loggings.Select(m => new { m.ProportioningDbid }).Distinct()
                from m in loggings
                    .Where(m => m.ProportioningDbid == d.ProportioningDbid)
                    .OrderByDescending(m => m.LoggingDbid)
                    .Take(1)
                select m;

            return query.ToList();

        }
    }
}
