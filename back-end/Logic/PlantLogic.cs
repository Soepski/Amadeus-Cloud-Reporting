using Amadeus_Cloud_Reporting_Back_end.Models;
using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Logic
{
    public class PlantLogic
    {
        private readonly IPlantRepo _repo;
        private readonly IMapper _mapper;

        public PlantLogic(IPlantRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public ICollection<PlantViewModel> GetPlants()
        {

            ICollection<Plant> plants = _repo.GetPlants();
            ICollection<PlantViewModel> plantViewModels = _mapper.Map<ICollection<PlantViewModel>>(plants);

            return plantViewModels;
        }

        public ICollection<PlantViewModel> GetPlantsByCustomerID(int id)
        {

            ICollection<Plant> plants = _repo.GetPlantsByCustomerID(id);
            ICollection<PlantViewModel> plantViewModels = _mapper.Map<ICollection<PlantViewModel>>(plants);

            return plantViewModels;
        }
    }
}
