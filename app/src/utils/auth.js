export default function getAuthHeader(sso_token) {
    return ({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sso_token,
         
        },
    });
}