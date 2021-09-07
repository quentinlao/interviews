/**
 * authenticiation header use form request
 * @returns
 */
export default function authHeader() {
    return {
        Authorization:
            'Bearer ' + process.env.REACT_APP_JWT_INTERVIEW,
    };
}
