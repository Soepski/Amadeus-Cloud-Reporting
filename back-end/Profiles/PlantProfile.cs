using Amadeus_Cloud_Reporting_Back_end.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Profiles
{
    public class PlantProfile : Profile
    {
        public PlantProfile()
        {
            CreateMap<Plant, PlantViewModel>().ReverseMap();
        }
    }
}
