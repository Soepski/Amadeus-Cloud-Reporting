using Amadeus_Cloud_Reporting_Back_end.Logic;
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
    public class ArticleController : Controller
    {
        private readonly ArticleLogic _logic;

        public ArticleController(IArticleRepo articlerepo, IMapper mapper)
        {
            _logic = new ArticleLogic(articlerepo, mapper);
        }

        //Get all plants from all sides and all customers
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<ArticleViewModel>>> GetArticles()
        {
            try
            {
                ICollection<ArticleViewModel> articleViewModels = _logic.GetArticles();
                return Ok(articleViewModels);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting articles by plant ID");
            }
        }

        //Get all plants from a specific customer
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<ArticleViewModel>>> GetArticleByPlantID(int id)
        {

            try
            {
                ICollection<ArticleViewModel> articleViewModels = _logic.GetArticlesByPlantID(id);
                return Ok(articleViewModels);
            }
            catch (Exception ex)
            {
                return this.Content(ex.Message + " while getting articles by plant ID");
            }
        }
    }
}
