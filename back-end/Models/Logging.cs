using System;
using System.Collections.Generic;
using System.Collections;

#nullable disable

namespace Amadeus_Cloud_Reporting_Back_end
{
    public partial class Logging
    {
        public int LoggingDbid { get; set; }
        public int ProportioningDbid { get; set; }
        public int? C3DesiredCrankPosition { get; set; }
        public float? C3DesiredSlidePosition { get; set; }
        public BitArray C3Knockers { get; set; }
        public BitArray C3Vibrators { get; set; }
        public float? C1DesiredFlow { get; set; }
        public float? C1SlideOpening { get; set; }
        public float? C1SlideOscillation { get; set; }
        public float? C1ExpectedFlow { get; set; }
        public float? C1OscillationSpeed { get; set; }
        public float? C1Productactivationfactor { get; set; }
        public float? C1Productactivationcycletime { get; set; }
        public BitArray C1PlvKnocker { get; set; }
        public BitArray C1Outputenabled { get; set; }
        public BitArray C1Newdatarequired { get; set; }
        public BitArray C1Done { get; set; }
        public float? CsSlideOpening { get; set; }
        public float? CsSlideOscillation { get; set; }
        public float? CsOscillationSpeed { get; set; }
        public float? CsProductactivationfactor { get; set; }
        public float? CsProductactivationcycletime { get; set; }
        public int? CsFillingstage { get; set; }
        public BitArray CsPlvKnocker { get; set; }
        public BitArray CsMaxflowreached { get; set; }
        public BitArray CsStuffingdone { get; set; }
        public float? D2eSlideOpening { get; set; }
        public float? D2eSlideOscillation { get; set; }
        public float? D2eExpectedFlow { get; set; }
        public float? D2eOscillationSpeed { get; set; }
        public float? D2eProductactivationfactor { get; set; }
        public float? D2eProductactivationcycletime { get; set; }
        public long? D2eD2eStage { get; set; }
        public BitArray D2ePlvKnocker { get; set; }
        public BitArray D2eDone { get; set; }
        public int? IfTypeofdosing { get; set; }
        public float? IfNetWeight1 { get; set; }
        public float? IfNetWeight2 { get; set; }
        public float? IfNetWeight3 { get; set; }
        public float? IfNetWeight4 { get; set; }
        public float? IfNetWeight5 { get; set; }
        public float? IfNetWeight6 { get; set; }
        public float? IfNetWeight7 { get; set; }
        public float? IfNetWeight8 { get; set; }
        public float? IfNetWeight9 { get; set; }
        public float? IfNetWeight10 { get; set; }
        public float? IfNetWeight11 { get; set; }
        public float? IfSetpoint { get; set; }
        public float? IfAccuracy { get; set; }
        public float? IfDosedWeight { get; set; }
        public int? IfDosedTime1 { get; set; }
        public int? IfDosedTime2 { get; set; }
        public int? IfDosedTime3 { get; set; }
        public int? IfDosedTime4 { get; set; }
        public int? IfDosedTime5 { get; set; }
        public int? IfDosedTime6 { get; set; }
        public int? IfDosedTime7 { get; set; }
        public float? IfTareweight { get; set; }
        public float? IfStandstillEp { get; set; }
        public float? IfStandstillFlow { get; set; }
        public BitArray IfDosingActive { get; set; }
        public BitArray IfSameproduct { get; set; }
        public BitArray IfStandstill { get; set; }
        public float? FFilteredWeight1 { get; set; }
        public float? FFilteredWeight2 { get; set; }
        public float? FFilteredWeight3 { get; set; }
        public float? FFilteredWeight4 { get; set; }
        public float? FFilteredWeight5 { get; set; }
        public float? FFilteredWeight6 { get; set; }
        public float? FFilteredWeight7 { get; set; }
        public float? FFilteredWeight8 { get; set; }
        public float? FFilteredWeight9 { get; set; }
        public float? FFilteredWeight10 { get; set; }
        public float? FFilteredWeight11 { get; set; }
        public float? FFlow1 { get; set; }
        public float? FFlow2 { get; set; }
        public float? FFlow3 { get; set; }
        public float? FFlow4 { get; set; }
        public float? FFlow5 { get; set; }
        public float? FFlow6 { get; set; }
        public float? FFlow7 { get; set; }
        public float? FFlow8 { get; set; }
        public float? FFlow9 { get; set; }
        public float? FFlow10 { get; set; }
        public float? FFlow11 { get; set; }
        public float? PlantLoadcell { get; set; }
        public float? PlantTemperature { get; set; }
        public float? PlantMoisture { get; set; }
        public float? PlantActualTorque { get; set; }
        public float? PlantCrankPosition { get; set; }
        public float? PlantSlidePosition { get; set; }
    }
}
