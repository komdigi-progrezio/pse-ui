export function getToken() {
    return localStorage.getItem('token') || null;
}
export function getRefreshToken() {
    return localStorage.getItem('refresh_token') || null;
}
