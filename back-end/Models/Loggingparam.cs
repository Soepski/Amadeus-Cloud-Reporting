using System;
using System.Collections.Generic;
using System.Collections;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class Loggingparam
    {
        public int LoggingparamDbid { get; set; }
        public float? C1Gain { get; set; }
        public float? C1Minflow { get; set; }
        public float? C1Adful { get; set; }
        public float? C1Adfll { get; set; }
        public float? C1Maxflow { get; set; }
        public float? C2PolyFactors0 { get; set; }
        public float? C2PolyFactors1 { get; set; }
        public float? C2PolyFactors2 { get; set; }
        public float? C2PolyFactors3 { get; set; }
        public float? C2PolyFactors4 { get; set; }
        public float? C2LnFactor { get; set; }
        public float? C2OscillationSpeed { get; set; }
        public float? C2MinimalOscillation { get; set; }
        public float? C2OscillationFactor { get; set; }
        public float? CsOscillationSpeed { get; set; }
        public float? CsMinimalOscillation { get; set; }
        public float? CsOscillationFactor { get; set; }
        public float? CsMaxflow { get; set; }
        public float? CsStartThreshold { get; set; }
        public float? CsScanTime { get; set; }
        public float? CsDensity { get; set; }
        public float? CsProductActivationFactor { get; set; }
        public float? CsProductActivationCycleTime { get; set; }
        public BitArray CsPlvKnocker { get; set; }
        public int? IfTypeOfDosing { get; set; }
        public BitArray IfStart { get; set; }
        public BitArray IfStop { get; set; }
        public float? IfSetpoint { get; set; }
        public float? IfAccuracy { get; set; }
        public float? IfMaxweight { get; set; }
        public float? IfStandStillFt { get; set; }
        public float? IfStandStillTt { get; set; }
        public BitArray IfSameProduct { get; set; }
        public float? PlantLoadcell { get; set; }
        public int? PlantCrankPosition { get; set; }
        public int? PlantActualTorque { get; set; }
        public int? PlantTemperature { get; set; }
        public int? PlantMoisture { get; set; }
    }
}
