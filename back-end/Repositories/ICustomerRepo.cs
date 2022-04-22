using Amadeus_Cloud_Reporting_Back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Repositories
{
    public interface ICustomerRepo
    {
        public List<Customer> GetCustomers();
        public Customer GetCustomerByID(int id);
    }
}
