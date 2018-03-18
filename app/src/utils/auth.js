export function getAuthHeader(sso_token) {
    return ({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sso_token,
            'Content-Type': 'application/json',
        },
    });
}