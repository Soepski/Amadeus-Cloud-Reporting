using Amadeus_Cloud_Reporting_Back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public class PlantRepo : IPlantRepo
    {
        private readonly AmadeusDBContext _context;
        public PlantRepo(AmadeusDBContext context)
        {
            _context = context;
        }

        //Get all plants from all customers
        public List<int> GetPlantIDs()
        {
            return _context.AmadeusProportioningrecords.Select(i => i.Proportioninglocation).Distinct().ToList();
        }

        //Get plants from a specific customer
        public List<Plant> GetPlantsByCustomerID(int id)
        {
            throw new NotImplementedException();
        }

        //Get specific plant information
        public Plant GetPlantByID(int id)
        {
            throw new NotImplementedException();
        }
    }
}
