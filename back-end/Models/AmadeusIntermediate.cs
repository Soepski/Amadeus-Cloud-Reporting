using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class AmadeusIntermediate
    {
        public int IntermediateDbid { get; set; }
        public int ProportioningDbid { get; set; }
        public int ArticleDbid { get; set; }
        public string[] ArticleName { get; set; }
        public short? MeasurementTime { get; set; }
        public DateTime? Timestamp { get; set; }
        public float? OscillationFactor { get; set; }
        public float? OscillationMin { get; set; }
        public float? OscillationSpeed { get; set; }
        public float? Flow { get; set; }
        public float? Opening { get; set; }
        public float? ActivationFactor { get; set; }
        public short? AdlVersion { get; set; }
        public float? Stdev { get; set; }

        public virtual AmadeusArticle ArticleDb { get; set; }
        public virtual AmadeusProportioning ProportioningDb { get; set; }
    }
}
