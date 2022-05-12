using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus_Cloud_Reporting_Back_end.Models.ViewModels
{
    public class ProportioningrecordViewModel
    {
        public int ProportioningrecordDbid { get; set; }
        public string ProportioningrecordId { get; set; }
        public string ArticleId { get; set; }
        public string ArticleName { get; set; }
        public string BatchId { get; set; }
        public string LotId { get; set; }
        public string Ingredientboxid { get; set; }
        public string BoxId { get; set; }
        public float Requestedamount { get; set; }
        public float Articledensity { get; set; }
        public float Actualamount { get; set; }
        public float Measureddensity { get; set; }
        public float Measuredangleofrepose { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime? Requestreceivedtime { get; set; }
        public int Proportioninglocation { get; set; }
        public string Manufacturingorderid { get; set; }
        public int Proportioningsequencenr { get; set; }
        public float Requiredtolerance { get; set; }
        public float Requiredalarmtolerance { get; set; }
        public string Ingredientlotid { get; set; }
        public int Proportioningstatus { get; set; }
    }
}
