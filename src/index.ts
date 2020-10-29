import {search, ISearchResult} from './search';
import {details, IDetailsResult} from './details';

export {ISearchResult, IDetailsResult};

interface IProps {
    usr: string;
    pwd: string;
}

export class Zefix {
    usr;
    pwd;

    constructor({usr, pwd}: IProps) {
        this.usr = usr;
        this.pwd = pwd;
    }

    // Sometimes the UID can be an empty string (whitespaces only), we get rid of this and check the value afterwards
    public isValidString = (value: string): boolean => {
        if (!value || value.trim().length === 0) {
            return false;
        }
        return true;
    };

    public searchCompany = async (searchTerm: string, activeOnly = false): Promise<ISearchResult[] | null> => {
        return search(searchTerm, this.usr, this.pwd, activeOnly);
    };

    public getCompanyDetails = async (uid: string): Promise<IDetailsResult | null> => {
        if (!this.isValidString(uid)) {
            return null;
        }
        return details(uid, this.usr, this.pwd);
    };
}
