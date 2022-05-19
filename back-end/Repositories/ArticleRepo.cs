using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public class ArticleRepo : IArticleRepo
    {
        private readonly AmadeusDBContext _context;
        public ArticleRepo(AmadeusDBContext context)
        {
            _context = context;
        }

        public List<AmadeusArticle> GetArticleByID(int id)
        {
            throw new NotImplementedException();
        }

        public List<AmadeusArticle> GetArticles()
        {
            return _context.AmadeusArticles.ToList();
        }

        public List<AmadeusArticle> GetArticlesByPlantID(int id)
        {
            var articles = _context.AmadeusArticles;
            var proportioningrecords = _context.AmadeusProportioningrecords;

            var query =
                from s in articles
                join r in proportioningrecords on s.ArticleId equals r.ArticleId
                where r.Proportioninglocation == id
                select s;

            return query.ToList();

        }

        public List<AmadeusArticle> GetArticlesByProportioningRecords()
        {
            var articles = _context.AmadeusArticles;
            var proportioningrecords = _context.AmadeusProportioningrecords;

            var query =
                from s in articles
                join r in proportioningrecords on s.ArticleId equals r.ArticleId
                select s;

            return query.ToList();

        }

    }
}
