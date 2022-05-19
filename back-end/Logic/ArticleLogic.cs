using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Logic
{
    public class ArticleLogic
    {
        private readonly IArticleRepo _repo;
        private readonly IMapper _mapper;

        public ArticleLogic(IArticleRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        //Get all plants
        public ICollection<ArticleViewModel> GetArticles()
        {

            ICollection<AmadeusArticle> articles = _repo.GetArticles();
            ICollection<ArticleViewModel> articleViewModels = _mapper.Map<ICollection<ArticleViewModel>>(articles);

            return articleViewModels;
        }

        //Get plants from specific customer 
        public ICollection<ArticleViewModel> GetArticlesByPlantID(int id)
        {

            ICollection<AmadeusArticle> articles = _repo.GetArticlesByPlantID(id);
            ICollection<ArticleViewModel> articleViewModels = _mapper.Map<ICollection<ArticleViewModel>>(articles);

            return articleViewModels;
        }

        //Get plants from specific customer 
        public ICollection<ArticleViewModel> GetArticlesByProportioningRecords()
        {

            ICollection<AmadeusArticle> articles = _repo.GetArticlesByProportioningRecords();
            ICollection<ArticleViewModel> articleViewModels = _mapper.Map<ICollection<ArticleViewModel>>(articles);

            return articleViewModels;
        }
    }
}
