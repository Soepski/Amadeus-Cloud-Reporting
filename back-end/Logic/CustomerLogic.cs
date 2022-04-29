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
    public class CustomerLogic
    {
        private readonly ICustomerRepo _repo;
        private readonly IMapper _mapper;

        public CustomerLogic(ICustomerRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        //Get all customers
        public ICollection<CustomerViewModel> GetCustomers()
        {

            ICollection<Customer> customers = _repo.GetCustomers();
            ICollection<CustomerViewModel> customerViewModels = _mapper.Map<ICollection<CustomerViewModel>>(customers);

            return customerViewModels;
        }

        //Get specific customer per ID
        public CustomerViewModel GetCustomerByID(int id)
        {
            Customer customer = _repo.GetCustomerByID(id);
            CustomerViewModel customerViewModel = _mapper.Map<CustomerViewModel>(customer);

            return customerViewModel;
        }
    }
}
