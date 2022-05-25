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
            return _context.AmadeusLoggings.Select(i => i.ProportioningDbid).Distinct().ToList();
        }
        public ICollection<AmadeusLogging> GetLoggings(int id)
        {
            ICollection<AmadeusLogging> loggings = _context.AmadeusLoggings.Where(i => i.ProportioningDbid == id).ToList();
            return loggings.OrderBy(o => o.LoggingDbid).ToList();
        }

        public ICollection<AmadeusLogging> GetDosingFinals()
        {
            var loggings = _context.AmadeusLoggings;

            var query =
                from d in loggings.Select(m => new { m.ProportioningDbid }).Distinct()
                from m in loggings
                    .Where(m => m.ProportioningDbid == d.ProportioningDbid)
                    .OrderByDescending(m => m.LoggingDbid)
                    .Take(1)
                select m;

            return query.ToList();
            
        }

        public ICollection<AmadeusProportioningrecord> GetProportioningrecords()
        {
            
            return _context.AmadeusProportioningrecords.ToList();
        }

        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticle(string article)
        {

            var proportioningrecords = _context.AmadeusProportioningrecords;
            var articles = _context.AmadeusArticles;

            var query =
                from p in proportioningrecords.Where(a => a.ArticleId == article)
                select p;
            
            return query.ToList();
        }

        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticleAndDate(string article, DateTime datefrom, DateTime dateuntil)
        {

            var proportioningrecords = _context.AmadeusProportioningrecords;
            var articles = _context.AmadeusArticles;

            var query =
                from p in proportioningrecords.Where(a => a.ArticleId == article)
                    .Where(d => d.StartTime >= datefrom.Date && d.EndTime <= dateuntil.Date)
                select p;

            return query.ToList();
        }

        public int GetDosingTypePerID(int id)
        {
            var loggings = _context.AmadeusLoggings;

            var query =
                from l in loggings.Where(a => a.ProportioningDbid == id).Select(a => a.IfTypeofdosing)
                select l;

            return query.First();
            
        }
    }
}
