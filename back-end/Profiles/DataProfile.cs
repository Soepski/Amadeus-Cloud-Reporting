using Amadeus_Cloud_Reporting_Back_end.Models.ViewModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Profiles
{
    public class DataProfile : Profile
    {
        public DataProfile()
        {
            CreateMap<AmadeusLogging, LoggingViewModel>().ReverseMap();
            CreateMap<AmadeusProportioningrecord, ProportioningrecordViewModel>().ReverseMap();
        }
    }
}
