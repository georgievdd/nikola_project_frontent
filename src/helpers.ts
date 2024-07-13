import { useState } from "react";

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

export const useValue = <T>(defaultValue: any = null) => {
    const [value, setValue] = useState<T>(defaultValue);
    return {
        get: () => value,
        set: (v: T) => setValue(v)
    }
}

export const getImageUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`
}

export function waitForNextTask() {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}