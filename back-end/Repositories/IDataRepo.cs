using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public interface IDataRepo
    {
        public ICollection<int> GetIDs();
        public ICollection<AmadeusLogging> GetLoggings(int id);
        public ICollection<AmadeusLogging> GetDosingFinals();
        public ICollection<AmadeusProportioningrecord> GetProportioningrecords();
        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticle(string article);
        public ICollection<AmadeusProportioningrecord> GetProportioningRecordsByArticleAndDate(string article, DateTime datefrom, DateTime dateuntil);
        public int GetDosingTypePerID(int id);
    }
}
