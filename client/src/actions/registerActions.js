import * as types from './actionsTypes'
import { userService } from '../services/user.service';
import { toast } from 'react-toastify';
 let options = {
    autoClose: 3000,
    hideProgressBar: true,
};
export function createAccount(user){
  //  debugger;
    console.log('registerActions',user)
    return {type:types.CREATE_USER,user}
}

export function userSuccessLoged(user){
    return {type:types.CREATE_USER_SUCCESS,user}
}
export function saveUser(user){
    return function(dispatch){
        return userService.register(user)
        .then(response => {
            console.log('created',response)
          dispatch(userSuccessLoged(response));
        //  toast.success("Account is successfully created!", options)
        }).catch(error => {
        
        });
    }
}