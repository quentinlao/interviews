export default function authHeader() {
    console.log(
        '🚀 ~ file: auth-header.tsx ~ line 2 ~ authHeader ~ authHeader',
        process.env.REACT_APP_JWT_INTERVIEW
    );

    return {
        Authorization:
            'Bearer ' + process.env.REACT_APP_JWT_INTERVIEW,
    };
}
