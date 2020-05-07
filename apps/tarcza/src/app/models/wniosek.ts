export interface Wniosek {
    applicationId: string;
    userName: string;
    companyName: string;
    applicationDateRequested: string;
    applicationDateDecision: string;
    applicationStatus: string;
    amountRequested: number;
    amountGranted: number;
    contractId: string;
    decisionId: string;
    nrNip: string;
    parentApplicationId: string;
    isClaimAllowed: string;
    odwolania: Wniosek[];
}
