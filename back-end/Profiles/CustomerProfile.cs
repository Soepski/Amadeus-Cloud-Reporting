using Amadeus_Cloud_Reporting_Back_end.Models;
using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Profiles
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<Customer, CustomerViewModel>().ReverseMap();
        }
    }
}
