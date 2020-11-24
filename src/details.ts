import {default as axios} from 'axios';
import {createBasicAuthHeader} from './utils';

/**
    GET https://www.zefixintg.admin.ch/ZefixPublicREST/api/v1/company/uid/<UID> HTTP/1.1
    Content-Type: application/json; charset=utf-8
    Authorization: Basic <USR>:<PWD>
 */

interface ICompanyOldNames {
    sequenceNr: number;
    name: string;
    translation: string[] | null;
}

interface ILegalForm {
    uid: string;
    name: DFIEString;
    id: number;
    shortName: DFIEString;
}

interface ICompanyShort {
    uid: string | null;
    registryOfCommerceId: number;
    ehraid: number;
    sogcDate: string | null;
    name: string;
    legalSeat: string;
    legalSeatId: number;
    legalForm: ILegalForm;
    chid: string | null;
    status: 'ACTIVE' | 'CANCELLED' | 'BEING_CANCELLED' | null;
}

interface IMutationType {
    id: number;
    key: string;
}

interface ISogcPublication {
    registryOfCommerceId: number | null;
    registryOfCommerceCanton: string | null;
    registryOfCommerceJournalDate: string | null;
    sogcDate: string | null;
    sogcId: number | null;
    registryOfCommerceJournalId: number | null;
    message: string | null;
    mutationTypes: IMutationType[] | null;
}

interface DFIEString {
    de: string;
    en: string;
    it: string;
    fr: string;
}

export interface IAddress {
    poBox: string | null;
    swissZipCode: string | null;
    careOf: string | null;
    addon: string | null;
    city: string | null;
    street: string | null;
    houseNumber: string | null;
    organisation: string | null;
}

export interface IDetailsResult {
    oldNames: ICompanyOldNames[] | null;
    purpose: string | null;
    legalSeatId: number;
    wasTakenOverBy: ICompanyShort[] | null;
    furtherHeadOffices: ICompanyShort[] | null;
    uid: string | null;
    capitalCurrency: string | null;
    sogcPub: ISogcPublication[] | null;
    sogcDate: string | null;
    headOffices: ICompanyShort[] | null;
    hasTakenOver: ICompanyShort[] | null;
    auditCompanies: ICompanyShort[] | null;
    branchOffices: ICompanyShort[] | null;
    address: IAddress;
    zefixDetailWeb: DFIEString;
    ehraid: number;
    legalSeat: string;
    legalForm: ILegalForm;
    chid: string | null;
    capitalNominal: string | null;
    registryOfCommerceId: number;
    cantonalExcerptWeb: string;
    name: string;
    translation: string[] | null;
    canton: string;
    status: 'ACTIVE' | 'CANCELLED' | 'BEING_CANCELLED' | null;
}

export const details = async (
    uid: string,
    usr: string,
    pwd: string,
    endpoint: string
): Promise<IDetailsResult | null> => {
    const response = await axios.get(`${endpoint}/company/uid/${uid}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: createBasicAuthHeader(usr, pwd)
        }
    });

    if (response.status !== 200) {
        return null;
    }

    return response.data[0];
};
