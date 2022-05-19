using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public interface IArticleRepo
    {
        public List<AmadeusArticle> GetArticles();
        public List<AmadeusArticle> GetArticlesByPlantID(int id);
        public List<AmadeusArticle> GetArticleByID(int id);
        public List<AmadeusArticle> GetArticlesByProportioningRecords();
    }
}
