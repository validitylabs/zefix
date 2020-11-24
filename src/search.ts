import {default as axios} from 'axios';
import {createBasicAuthHeader} from './utils';

/**
    POST https://www.zefixintg.admin.ch/ZefixPublicREST/api/v1/company/search HTTP/1.1
    Authorization: Basic <USR>:<PWD>
    Content-Type: application/json; charset=utf-8
    
    {
        "activeOnly": true,
        "name": "<COMPANY_NAME>"    
    }
 */
interface DFIEString {
    de: string;
    en: string;
    it: string;
    fr: string;
}

interface ILegalForm {
    uid: string;
    name: DFIEString;
    id: number;
    shortName: DFIEString;
}

export interface ISearchResult {
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

export const search = async (
    term: string,
    usr: string,
    pwd: string,
    endpoint: string,
    activeOnly = false
): Promise<ISearchResult[] | null> => {
    const response = await axios.post(
        `${endpoint}/company/search`,
        {
            activeOnly,
            name: term
        },
        {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: createBasicAuthHeader(usr, pwd)
            }
        }
    );

    if (response.status !== 200) {
        return null;
    }

    return response.data;
};
