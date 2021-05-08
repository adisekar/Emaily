import { FETCH_USER } from '../actions/types';

// Default state is null, so we dont know if user logged in/not
export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; //Sets value of false if, payload is '' when user not logged in
        default:
            return state;
    }
}