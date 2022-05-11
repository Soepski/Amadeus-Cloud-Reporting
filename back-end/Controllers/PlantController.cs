using Amadeus_Cloud_Reporting_Back_end.Logic;
using Amadeus_Cloud_Reporting_Back_end.Models;
using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlantController : Controller
    {
        private readonly PlantLogic _logic;

        public PlantController(IPlantRepo plantrepo, IMapper mapper)
        {
            _logic = new PlantLogic(plantrepo, mapper);
        }

        //Get all plants from all sides and all customers
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<int>>> GetPlantIDs()
        {
            try
            {
                ICollection<int> ids = _logic.GetPlantIDs();
                return Ok(ids);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting plants");
            }
        }

        //Get all plants from a specific customer
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Plant>>> GetPlantsByCustomerID(int id)
        {

            return Ok();
        }

    }
}
