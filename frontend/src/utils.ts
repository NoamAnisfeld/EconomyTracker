import { apiEndpoint } from "./globals";

export function apiUrl(subpath: string): string {
    return new URL(subpath, apiEndpoint).href;
}

function parseResponse(response: Response): Promise<unknown> {
    try {
        return response.clone().json();
    } catch (e) {
        return response.clone().text();
    }
}

export async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    return await parseResponse(response);
}

export async function postJson(url: string, data: unknown) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return await parseResponse(response);
}

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

export function dateParts(date: Date) {
    return {
        year: date.getFullYear(),
        monthNumber: date.getMonth() + 1,
        monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'Julu', 'August', 'September', 'October', 'November', 'December'][date.getMonth()],
        monthShortName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()],
        monthDay: date.getDate(),
        hour: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
    };
}
