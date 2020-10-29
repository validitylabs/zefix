export const createBasicAuthHeader = (usr: string, pwd: string): string => {
    return `Basic ${Buffer.from(`${usr}:${pwd}`).toString('base64')}`;
};
