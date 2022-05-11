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
            //return _context.AmadeusProportioningrecords.Select(i => i.Proportioninglocation)
        }
    }
}
