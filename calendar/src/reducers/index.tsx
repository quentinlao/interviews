import { combineReducers } from 'redux';
import zoom from './zoom';

/* export interface IRootState {
    auth: IAuth;
}
export interface IAuth {
    isLoggedIn: boolean;
    username: string;
    email: string;
    roles: [];
} */
export default combineReducers({
    zoom,
});
