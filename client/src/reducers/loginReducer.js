let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    loggedIn: true,
    user
} : {};
console.log('USERRRRR',user)
export default function loginReducers(state = initialState, action) {
    console.log('loginReducers state',action)
    switch (action.type) {
        case 'LOG_USER':
        return {
            loggingIn: true,
            user: action.login
          };
        default:
            return state;
    }
}