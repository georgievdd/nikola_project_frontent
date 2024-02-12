import {IReservationOptionsTimes} from "../interfaces/houses/reservation";

export const showAlert = (message: string, variant?: 'alert-danger' | 'alert-success' | 'alert-warning') => {
    // Create a div element
    const alertDiv = document.createElement('div');

    // Apply class and message
    alertDiv.className = variant || 'alert-danger';
    alertDiv.innerText = message;

    // Append to body
    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
}

const blackList = ["default", "earliest", "latest"]
export function createTimesList(list: IReservationOptionsTimes): string[] {
    const result: string[] = [list.default]
    Object.keys(list).forEach(key => {
        if (blackList.includes(key) || key === list.default) return
        result.push(key)
    })
    return result
}
export const currentMonthIndex = new Date().getMonth()