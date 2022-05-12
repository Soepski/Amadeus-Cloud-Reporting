export interface Proportioningrecord {
    proportioningrecordDbid: number;
    proportioningrecordId: string;
    articleId: string;
    articleName: string;
    batchId: string;
    lotId: string;
    ingredientboxid: string;
    boxId: string;
    requestedamount: number;
    articledensity: number;
    actualamount: number;
    measureddensity: number;
    measuredangleofrepose: number;
    startTime: string | null;
    endTime: string | null;
    requestreceivedtime: string | null;
    proportioninglocation: number;
    manufacturingorderid: string;
    proportioningsequencenr: number;
    requiredtolerance: number;
    requiredalarmtolerance: number;
    ingredientlotid: string;
    proportioningstatus: number;
}