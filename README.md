# ZEFIX

Thin wrapper around the ZEFIX REST API to search and retrieve data of swiss companies.

See the public [Swagger file](https://www.zefixintg.admin.ch/ZefixPublicREST/) for the Zefix PublicREST API [here](https://www.zefixintg.admin.ch/ZefixPublicREST/).

## Setup

```bash
nvm use
npm install
```

Don't forget to update the `.env` file with the needed values properly:

```
USR=<ZEFIX_USER_NAME>
PWD=<ZEFIX_PASSWORD>
COMPANY=<COMPANY_SEARCH_FOR>
ENDPOINT=<TEST_OR_PROD_ENDPOINT_OF_ZEFIX_API>
```

TEST endpoint: https://www.zefixintg.admin.ch/ZefixPublicREST/api/v1
PROD endpoint: https://www.zefix.admin.ch/ZefixPublicREST/api/v1

## Demo
To build the demo, please run `npm run build`.
The demo can be found here: `src/demo.ts` and can simply be run via `npm start`.
