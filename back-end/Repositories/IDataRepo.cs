using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public interface IDataRepo
    {
        public ICollection<int> GetIDs();
        public ICollection<Logging> GetLoggings(int id);
        public ICollection<Logging> GetDosingFinals();
    }
}
