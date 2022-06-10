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
            var loggings = _context.AmadeusLoggings;
            var proportionings = _context.AmadeusProportionings;

            var query =
                from p in proportionings.Where(q => q.ProportioningRecordDbid == id)

                from l in loggings
                    .Where(i => i.ProportioningDbid == p.ProportioningDbid)
                    .OrderBy(o => o.LoggingDbid)

                select l;   

            return query.ToList();
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
            //oud
            return _context.AmadeusProportioningrecords.ToList();

            //nieuw
            //var proportionings = _context.AmadeusProportionings;
            //var proportioningrecords = _context.AmadeusProportioningrecords;

            //var query =
            //    from p in proportionings
            //    from pr in proportioningrecords.Where(q => q.ProportioningrecordDbid == p.ProportioningDbid)
            //        .OrderByDescending(o => o.ProportioningrecordDbid)
            //    select pr;

            //return query.Take(100).ToList();
        }

        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticle(string article)
        {
            //oud
            var proportioningrecords = _context.AmadeusProportioningrecords;
            var articles = _context.AmadeusArticles;

            var query =
                from p in proportioningrecords.Where(a => a.ArticleId == article)
                select p;

            return query.ToList();


            //nieuwe
            //var proportioningrecords = _context.AmadeusProportioningrecords;
            //var articles = _context.AmadeusArticles;
            //var proportings = _context.AmadeusProportionings;

            //var query =
            //    from a in articles.Where(q => q.ArticleId == article)
            //    from i in proportings.Where(w => w.ArticleDbid == a.ArticleDbid)
            //    from p in proportioningrecords.Where(z => z.ProportioningrecordDbid == i.ProportioningDbid)
            //    select p;

            //return query.ToList();
        }

        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticleAndDate(string article, DateTime datefrom, DateTime dateuntil)
        {
            //oud
            var proportioningrecords = _context.AmadeusProportioningrecords;
            var articles = _context.AmadeusArticles;

            var query =
                from pr in proportioningrecords.Where(a => a.ArticleId == article)
                    .Where(d => d.StartTime >= datefrom.Date && d.EndTime <= dateuntil.Date)
                select pr;

            return query.ToList();

            //nieuwe
            //var proportioningrecords = _context.AmadeusProportioningrecords;
            //var proportionings = _context.AmadeusProportionings;
            //var articles = _context.AmadeusArticles;

            //var query =
            //    from a in articles.Where(q => q.ArticleId == article)
            //    from p in proportionings.Where(w => w.ArticleDbid == a.ArticleDbid)
            //    from pr in proportioningrecords.Where(z => z.ProportioningrecordDbid == p.ProportioningDbid)
            //        .Where(d => d.StartTime >= datefrom.Date && d.EndTime <= dateuntil.Date)
            //    select pr;

            //return query.ToList();
        }

        public int GetDosingTypePerID(int id)
        {
            var loggings = _context.AmadeusLoggings;
            var proportioning = _context.AmadeusProportionings;

            var query =
                from p in proportioning.Where(i => i.ProportioningRecordDbid == id)
                from l in loggings.Where(a => a.ProportioningDbid == p.ProportioningDbid).Select(a => a.IfTypeofdosing)
                select l;

            return query.First();
        }

        public int GetTotalProportioningCount()
        {
            var proportioningrecords = _context.AmadeusProportioningrecords;

            var query =
                from p in proportioningrecords
                select p;

            return query.Count();
        }

        public int GetTotalProportioningCountByArticle(string article)
        {
            var proportioningrecords = _context.AmadeusProportioningrecords;
            var articles = _context.AmadeusArticles;

            var query =
                from p in proportioningrecords.Where(q => q.ArticleId == article)
                select p;

            return query.Count();
        }
    }
}
