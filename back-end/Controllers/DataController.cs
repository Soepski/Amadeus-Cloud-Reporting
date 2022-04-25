using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using Amadeus_Cloud_Reporting_Back_end.Logic;
using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;

namespace Amadeus_Cloud_Reporting_Back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : Controller
    {
        private readonly DataLogic _logic;

        public DataController(IDataRepo datarepo, IMapper mapper)
        {
            _logic = new DataLogic(datarepo, mapper);
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<int>>> GetIDs()
        {
            try
            {
                ICollection<int> ids = _logic.GetIDs();
                return Ok(ids);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting logging ids");
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<ActionResult<List<PlantViewModel>>> GetLoggings(int id)
        {

            try
            {
                ICollection<PlantViewModel> loggingViewModels = _logic.GetLoggings(id);
                return Ok(loggingViewModels);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting loggings by id");
            }
        }

        [HttpGet]
        [Route("get/finals")]
        public async Task<ActionResult<List<PlantViewModel>>> GetDosingFinals()
        {
            try
            {
                ICollection<PlantViewModel> loggingViewModels = _logic.GetDosingFinals();
                return Ok(loggingViewModels);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting loggings by finals");
            }
        }
    }
}
