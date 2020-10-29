# ZEFIX

Thin wrapper around the ZEFIX REST API to search and retrieve data of swiss companies.

**The ZEFIX REST API points to the test system until the final version is released.**

See the public [Swagger file](https://www.zefixintg.admin.ch/ZefixPublicREST/) for the Zefix PublicREST API [here](https://www.zefixintg.admin.ch/ZefixPublicREST/).

## Setup

```bash
nvm use
npm install
```

Don't forget to update the `.env` file with the needed values properly.

## Demo

The demo can be found here: `src/demo.ts` and can simply be run via `npm start`.
