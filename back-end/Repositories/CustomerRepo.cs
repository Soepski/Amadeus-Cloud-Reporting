using Amadeus_Cloud_Reporting_Back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public class CustomerRepo : ICustomerRepo
    {
        private readonly AmadeusDBContext _context;
        public CustomerRepo(AmadeusDBContext context)
        {
            _context = context;
        }

        public Customer GetCustomerByID(int id)
        {
            throw new NotImplementedException();
        }

        public List<Customer> GetCustomers()
        {
            //return _context.Customer.Select(i => i.Name).ToList();
            throw new NotImplementedException();
        }
    }
}
