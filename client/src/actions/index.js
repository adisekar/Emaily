import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    // use same action of Fetch user to update with credits, as when fetching user, will also get credits to update header
    dispatch({ type: FETCH_USER, payload: res.data });
};