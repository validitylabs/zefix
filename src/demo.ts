import {Zefix} from './index';

const zefix = new Zefix({
    usr: process.env.USR as string,
    pwd: process.env.PWD as string,
    endpoint: process.env.ENDPOINT as string
});

try {
    zefix
        // Search company by name
        .searchCompany(process.env.COMPANY as string)
        .then((result) => {
            // console.log(JSON.stringify(result, null, 4));
            const companyUids: string[] = [];

            if (result && result.length > 0) {
                console.log('------------------------------------------------------------------------');
                result.forEach((company, index) => {
                    if (company.uid && zefix.isValidString(company.uid)) {
                        console.log(`Company found: ${result[index].name}`);
                        companyUids.push(company.uid);
                    } else {
                        console.log(`Company UID invalid: ${result[index].name} (will be ignored)`);
                    }
                });
                console.log('------------------------------------------------------------------------');
            } else {
                console.log('No company found');
            }

            return companyUids;
        })
        .then((companyUids) => {
            companyUids.forEach((companyUid) => {
                // Get company details by UID
                try {
                    zefix.getCompanyDetails(companyUid).then((result) => {
                        if (result) {
                            // console.log(JSON.stringify(result, null, 4));
                            const address = {
                                organisation: result.address.organisation,
                                careOf: result.address.careOf,
                                street: result.address.street,
                                houseNumber: result.address.houseNumber,
                                addon: result.address.addon,
                                poBox: result.address.poBox,
                                city: result.address.city,
                                swissZipCode: result.address.swissZipCode
                            };
                            const props = {
                                uid: result.uid,
                                name: result.name,
                                legalSeat: result.legalSeat,
                                legalForm: `${result.legalForm.name.en} (${result.legalForm.shortName.en})`,
                                status: result.status,
                                purpose: result.purpose,
                                canton: result.canton,
                                capitalNominal: result.capitalNominal,
                                capitalCurrency: result.capitalCurrency,
                                address,
                                zefixDetailWeb: result.zefixDetailWeb.en
                            };
                            console.log(props);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
} catch (error) {
    console.error(error);
}
