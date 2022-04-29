using Amadeus_Cloud_Reporting_Back_end.Logic;
using Amadeus_Cloud_Reporting_Back_end.Models;
using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly CustomerLogic _logic;

        public CustomerController(ICustomerRepo customerrepo, IMapper mapper)
        {
            _logic = new CustomerLogic(customerrepo, mapper);
        }

        //Get all customers
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<int>>> GetCustomers()
        {
            try
            {
                ICollection<CustomerViewModel> customers = _logic.GetCustomers();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting customer");
            }
        }

        //Get specific customer inforamtion by ID
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Customer>>> GetCustomerByID(int id)
        {
            try
            {
                CustomerViewModel customer = _logic.GetCustomerByID(id);
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting customer by id");
            }
        }
    }
}
