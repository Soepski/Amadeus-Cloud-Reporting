using Amadeus_Cloud_Reporting_Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Controllers
{
    public class PlantController : Controller
    {
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<int>>> GetPlants()
        {
            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Plant>>> GetPlantByCustomerID(int id)
        {

            return Ok();
        }
    }
}
