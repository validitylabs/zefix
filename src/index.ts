import {search, ISearchResult} from './search';
import {details, IDetailsResult} from './details';

export {ISearchResult, IDetailsResult};

interface IProps {
    usr: string;
    pwd: string;
    endpoint: string;
}

export class Zefix {
    usr;
    pwd;
    endpoint;

    constructor({usr, pwd, endpoint}: IProps) {
        this.usr = usr;
        this.pwd = pwd;
        this.endpoint = endpoint;
    }

    // Sometimes the UID can be an empty string (whitespaces only), we get rid of this and check the value afterwards
    public isValidString = (value: string): boolean => {
        if (!value || value.trim().length === 0) {
            return false;
        }
        return true;
    };

    public searchCompany = async (searchTerm: string, activeOnly = false): Promise<ISearchResult[] | null> => {
        return search(searchTerm, this.usr, this.pwd, this.endpoint, activeOnly);
    };

    public getCompanyDetails = async (uid: string): Promise<IDetailsResult | null> => {
        if (!this.isValidString(uid)) {
            return null;
        }
        return details(uid, this.usr, this.pwd, this.endpoint);
    };
}
