using System;
using System.Collections.Generic;
using System.Collections;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class Article
    {
        public int ArticleDbid { get; set; }
        public string ArticleId { get; set; }
        public string Name { get; set; }
        public float? Density { get; set; }
        public float? InIfMaxweight { get; set; }
        public float? InIfStandstillft { get; set; }
        public float? InIfStandstilltt { get; set; }
        public float? InC1Gain { get; set; }
        public float? InC1Minflow { get; set; }
        public float? InC1Adful { get; set; }
        public float? InC1Adfll { get; set; }
        public float? InC1Maxflow { get; set; }
        public float? InC2PolyFactors1 { get; set; }
        public float? InC2PolyFactors2 { get; set; }
        public float? InC2PolyFactors3 { get; set; }
        public float? InC2PolyFactors4 { get; set; }
        public float? InC2PolyFactors5 { get; set; }
        public float? InC2LnFactor { get; set; }
        public float? InC2OscillationSpeed { get; set; }
        public float? InC2MinimalOscillation { get; set; }
        public float? InC2OscillationFactor { get; set; }
        public float? InCsOsillationSpeed { get; set; }
        public float? InCsMinimalOscillation { get; set; }
        public float? InCsOscillationFactor { get; set; }
        public float? InCsMaxflow { get; set; }
        public float? InCsStartthreshold { get; set; }
        public float? InCsScantime { get; set; }
        public float? InCsDensity { get; set; }
        public float? InCsProductactivationfactor { get; set; }
        public float? InCsProductactivationcycletime { get; set; }
        public BitArray InCsPlvKnocker { get; set; }
    }
}
