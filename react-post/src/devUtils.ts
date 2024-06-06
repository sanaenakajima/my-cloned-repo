// src/devUtils.ts
export const transformResponse = (response2: Response) => {
    const allHeaders = response2.headers;
    if (allHeaders && typeof allHeaders.forEach === 'function') {
        const headers: { [key: string]: string } = {};
        allHeaders.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            ...response2,
            headers
        };
    } else {
        return response2;
    }
};