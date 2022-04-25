using Amadeus_Cloud_Reporting_Back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public interface IPlantRepo
    {
        public List<Plant> GetPlants();
        public Plant GetPlantByCustomerID(int id);
    }
}
