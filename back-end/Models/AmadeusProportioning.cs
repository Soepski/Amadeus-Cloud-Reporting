using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class AmadeusProportioning
    {
        public AmadeusProportioning()
        {
            AmadeusIntermediates = new HashSet<AmadeusIntermediate>();
            AmadeusLoggingparams = new HashSet<AmadeusLoggingparam>();
            AmadeusLoggings = new HashSet<AmadeusLogging>();
        }

        public int ProportioningDbid { get; set; }
        public int ArticleDbid { get; set; }
        public int ProportioningRecordDbid { get; set; }
        public int? SourceDbid { get; set; }
        public int DestinationDbid { get; set; }

        public virtual AmadeusArticle ArticleDb { get; set; }
        public virtual AmadeusPmbox DestinationDb { get; set; }
        public virtual AmadeusProportioningrecord ProportioningRecordDb { get; set; }
        public virtual AmadeusPmbox SourceDb { get; set; }
        public virtual ICollection<AmadeusIntermediate> AmadeusIntermediates { get; set; }
        public virtual ICollection<AmadeusLoggingparam> AmadeusLoggingparams { get; set; }
        public virtual ICollection<AmadeusLogging> AmadeusLoggings { get; set; }
    }
}
