import Cookies from 'js-cookie';
export function isAuthenticated() {
    const token = Cookies.get('token'); // Get the token from cookies
    return token ? true : false;
  }