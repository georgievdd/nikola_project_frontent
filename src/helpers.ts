export const showAlert = (message: string, variant?: 'alert-danger' | 'alert-success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = variant || 'alert-danger';
    alertDiv.innerText = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
}