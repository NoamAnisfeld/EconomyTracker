import { API_PATH } from "./globals.js";

export function generateId(): string {
    return String(Math.random());
}

export function apiPath(route: string): string {
    return `${API_PATH}/${route}`;
}

export const HttpCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    updated: 204, // a common usecase for 204 No Content
} as const;

