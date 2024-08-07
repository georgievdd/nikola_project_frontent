import { SyntheticEvent } from "react";
import { ApiError } from "./entity/Error";

export const showAlert = (message: string, variant?: 'alert-danger' | 'alert-success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = variant || 'alert-danger';
    alertDiv.innerText = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
}

export function getDateFromKey(key: string) {
    const from = key.split('-').map(e => +e)
    return new Date(from[2], from[1] - 1, from[0])
}
export const getImageUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`
}

export function waitForNextTask() {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}

export class JSONCookie {
    private data: Record<string, string> = {}
    constructor(str: string) {
        str.split(';').forEach(pair => {
            const [key, value] = pair.trim().split('=')
            this.data[key] = value
        })
    }
    get(key: string) {
        return this.data[key]
    }
}


export const normalize = (v: number) => v > 1 ? 1 / v : v


export const importStyles = (styles: Record<string, string>) =>
    (strings: TemplateStringsArray): string =>
        strings[0].split(' ').map(e => styles[e] || '').join(' ')

export const isApiError = (data: any): data is ApiError => {
    return 'detail' in data
}