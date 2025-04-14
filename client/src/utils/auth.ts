import Cookies from 'js-cookie';

export const checkAuthCookie = () => {
    const authCookie = Cookies.get('access_token');
    console.log(authCookie);
    return authCookie !== undefined;
};