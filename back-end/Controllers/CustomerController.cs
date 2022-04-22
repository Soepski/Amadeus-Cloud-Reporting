using Amadeus_Cloud_Reporting_Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Controllers
{
    public class CustomerController : Controller
    {
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<int>>> GetCustomers()
        {
            try
            {
                ICollection<Customer> ids = _logic.GetIDs();
                return Ok(ids);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting logging ids");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Customer>>> GetCustomerByID(int id)
        {

            return Ok();
        }
    }
}
