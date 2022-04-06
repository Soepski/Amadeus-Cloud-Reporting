using Amadeus_Cloud_Reporting_Back_end.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Logic
{
    public class DataLogic
    {
        private readonly IDataRepo _repo;
        private readonly IMapper _mapper;

        public DataLogic(IDataRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public ICollection<int> GetIDs()
        {

            ICollection<int> ids = _repo.GetIDs();

            return ids;
        }

        public ICollection<LoggingViewModel> GetLoggings(int id)
        {

            ICollection<Logging> loggings = _repo.GetLoggings(id);
            foreach (Logging logging in loggings)
            {
                if (logging.IfNetWeight1 < 0)
                {
                    logging.IfNetWeight1 = 0;
                }
                if (logging.IfNetWeight2 < 0)
                {
                    logging.IfNetWeight2 = 0;
                }
                if (logging.IfNetWeight3 < 0)
                {
                    logging.IfNetWeight3 = 0;
                }
                if (logging.IfNetWeight4 < 0)
                {
                    logging.IfNetWeight4 = 0;
                }
                if (logging.IfNetWeight5 < 0)
                {
                    logging.IfNetWeight5 = 0;
                }
                if (logging.IfNetWeight6 < 0)
                {
                    logging.IfNetWeight6 = 0;
                }
                if (logging.IfNetWeight7 < 0)
                {
                    logging.IfNetWeight7 = 0;
                }
                if (logging.IfNetWeight8 < 0)
                {
                    logging.IfNetWeight8 = 0;
                }
                if (logging.IfNetWeight9 < 0)
                {
                    logging.IfNetWeight9 = 0;
                }
                if (logging.IfNetWeight10 < 0)
                {
                    logging.IfNetWeight10 = 0;
                }
                if (logging.IfNetWeight11 < 0)
                {
                    logging.IfNetWeight11 = 0;
                }

            }
            ICollection<LoggingViewModel> loggingViewModels = _mapper.Map<ICollection<LoggingViewModel>>(loggings);

            return loggingViewModels;
        }

        public ICollection<LoggingViewModel> GetDosingFinals()
        {
            ICollection<Logging> loggings = _repo.GetDosingFinals();
            ICollection<LoggingViewModel> loggingViewModels = _mapper.Map<ICollection<LoggingViewModel>>(loggings);

            return loggingViewModels;
        }
    }
}
